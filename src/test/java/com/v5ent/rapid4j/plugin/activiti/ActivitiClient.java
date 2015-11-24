package com.v5ent.rapid4j.plugin.activiti;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONStringer;
import org.restlet.data.ChallengeScheme;
import org.restlet.data.MediaType;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.ClientResource;
import org.slf4j.Logger;

/**
 * @author Mignet
 */
public class ActivitiClient {

  private static final Logger logger = org.slf4j.LoggerFactory.getLogger(ActivitiClient.class);
  
  private static final String REST_URI = "http://activiti-dev.com:8090/api/activiti/v1";
  private static final String LDAP_USERNAME="xxxx";
  private static final String LDAP_PASSWORD="xxxx";
  
  private static ClientResource getClientResource(String uri) throws IOException{
    ClientResource clientResource = new ClientResource(uri);
    clientResource.setChallengeResponse(ChallengeScheme.HTTP_BASIC, LDAP_USERNAME, LDAP_PASSWORD);
    return clientResource;
  }
  
  public static List<String> getQueueNames(String username) throws JSONException, IOException{
    String authenticateUserUri = REST_URI + "/identity/users/"+username;
    Representation authenticateUserJSON = getClientResource(authenticateUserUri).get(MediaType.APPLICATION_JSON);
    JSONObject authenticateObject = new JSONObject(authenticateUserJSON.getText());
    logger.info("Get Queue Name: " + authenticateObject);
    if (!authenticateObject.opt("id").equals(null)) {
      List<String> queueForUser = new ArrayList<String>();
      String uri = REST_URI +"/repository/process-definitions";
      Representation response = getClientResource(uri).get(MediaType.APPLICATION_JSON);
      JSONObject object = new JSONObject(response.getText());
      JSONArray arr = (JSONArray) object.get("data");
      for (int i = 0; i < arr.length(); i++) {
        JSONObject ob = (JSONObject) arr.get(i);
        queueForUser.add(ob.get("name").toString());
      }
      return queueForUser;
    }
    return null;
  }

  public static String claimAndCompleteTaskByProcessIdAndActorName(String processInstanceId, String actorName) throws JSONException, IOException {
    try {
      String authenticateUserUri = REST_URI + "/identity/users/"+actorName;
      Representation authenticateUserJSON = getClientResource(authenticateUserUri).get(MediaType.APPLICATION_JSON);
      JSONObject authenticateObject = new JSONObject(authenticateUserJSON.getText());
      logger.info("AuthenticateObject: " + authenticateObject);
      if (!authenticateObject.opt("id").equals(null)) {
        String getTaskUri = REST_URI + "/runtime/tasks?candidate=" + actorName + "&size=1&order=asc&taskDefinitionKey=UnassignedLoan";
        Representation response = getClientResource(getTaskUri).get(MediaType.APPLICATION_JSON);
        JSONObject object = new JSONObject(response.getText());
        if (object != null) {
          JSONArray arr = (JSONArray) object.get("data");
          for (int i = 0; i < arr.length(); i++) {
            JSONObject ob = (JSONObject) arr.get(i);
            if (processInstanceId != null) {
              if (ob.get("processDefinitionId").equals(processInstanceId)) {
                logger.info("Returned task: " + ob);
                if (ob.get("id") != null) {
                  String claimUri = REST_URI + "/runtime/tasks/" + ob.get("id");
                  logger.info("Claim URI: " + claimUri);
                  JSONStringer jsAssignee = new JSONStringer();
                  jsAssignee.object().key("assignee").value(actorName);
                  jsAssignee.key("owner").value(actorName);
                  jsAssignee.endObject();
                  logger.info("jsAssignee: " + jsAssignee.toString());
                  
                  JSONStringer jsClaim = new JSONStringer();
                  jsClaim.object().key("action").value("claim");
                  jsClaim.endObject();
                  logger.info("jsClaim: " + jsClaim.toString());
                  
                  JsonRepresentation jsonAssigneeRepresentation = new JsonRepresentation(jsAssignee);
                  logger.info("jsonAssigneeRepresentation: " + jsonAssigneeRepresentation.getText());
                  
                  JsonRepresentation jsonClaimRepresentation = new JsonRepresentation(jsClaim);
                  logger.info("jsonClaimRepresentation: " + jsonClaimRepresentation.getText());
                  
                  Representation assigneeResponse = getClientResource(claimUri).put(jsonAssigneeRepresentation);
                  Representation claimResponse = getClientResource(claimUri).post(jsonClaimRepresentation);
                    
                  logger.info("Assignee Response: " + assigneeResponse.getText());
                  
                  if (claimResponse.getText() == null) {
                    boolean completeTask = ActivitiClient.completeTaskByIdWithVariables(ob.getString("description").toString(), actorName, null);
                    logger.info("Complete Response: "  + completeTask);
                    if (completeTask) {
                       JSONObject taskByLoan = getTaskByLoanId(ob.getString("description").toString());
                       JSONArray taskByLoanArray = (JSONArray) taskByLoan.get("data");
                       if (!taskByLoanArray.isNull(0)) {
                         JSONObject obTask = (JSONObject) taskByLoanArray.get(0);
                         JSONStringer jsAssigneeAfterComplete = new JSONStringer();
                         jsAssigneeAfterComplete.object().key("assignee").value(actorName);
                         jsAssigneeAfterComplete.key("owner").value(actorName);
                         jsAssigneeAfterComplete.endObject();
                         JsonRepresentation jsonAssigneeAfterCompleteRepresentation = new JsonRepresentation(jsAssigneeAfterComplete);
                         String claimAfterCompleteUri = REST_URI + "/runtime/tasks/" + obTask.get("id");
                         getClientResource(claimAfterCompleteUri).put(jsonAssigneeAfterCompleteRepresentation);
                       }
                      return ob.getString("description");
                    }
                  }
                }
              }
            }
          }
        }
        return null;
      }
      return null;
    }catch (Exception e){
      logger.error("claimAndCompleteTaskByProcessIdAndActorName", e);
      return null;
    }
  }
  
  public static JSONObject getTaskByLoanId(String loanId) throws JSONException, IOException {
    String getTaskByLoanId = REST_URI +"/runtime/tasks?description=" + loanId + "&size=1";
    Representation response = getClientResource(getTaskByLoanId).get(MediaType.APPLICATION_JSON);
    JSONObject object = new JSONObject(response.getText());
    return object;
  }
  
  public static boolean completeTaskByIdWithVariables(String loanId, String actorName, Map<String, String> completeVariables) throws Exception {
    try {
      JSONObject loanjsonObjs = getTaskByLoanId(loanId);
      JSONArray loanArr = (JSONArray) loanjsonObjs.get("data");
      logger.info("LoanArr: " + loanArr);
      if (!loanArr.isNull(0) && loanArr.getJSONObject(0).has("id")) {
        JSONObject loanjsonObj = loanArr.getJSONObject(0);
      	  String uri = REST_URI + "/runtime/tasks/" + loanjsonObj.get("id").toString();

        JSONStringer jsComplete = new JSONStringer();
        jsComplete.object().key("action").value("complete");
        
        if (completeVariables!=null){
          jsComplete.key("variables").array().object();
          for (String completeVariable : completeVariables.keySet()) {
            jsComplete.key("name").value(completeVariable).key("value").value(completeVariables.get(completeVariable));
          }
          jsComplete.endObject().endArray();
        }

        jsComplete.endObject();

        JsonRepresentation jsonCompleteRepresentation = new JsonRepresentation(jsComplete);
        logger.info("jsonCompleteRepresentation: " + jsonCompleteRepresentation.getText());
        if(completeVariables==null || !(loanArr.getJSONObject(0).getString("taskDefinitionKey").equals("SaveForLater") && completeVariables.get("disposition").equals("saveforlater"))) {
          Representation completeResponse = getClientResource(uri).post(jsonCompleteRepresentation, MediaType.APPLICATION_JSON);
          logger.info("Complete Response: " + completeResponse.getText());
          if (completeResponse.getText()==null){
            if (completeVariables!=null && !completeVariables.get("disposition").equals("incomplete")) {
               JSONObject taskByLoan = getTaskByLoanId(loanId);
               JSONArray taskByLoanArray = (JSONArray) taskByLoan.get("data");
               
               if (!taskByLoanArray.isNull(0)) {
                 JSONObject obTask = (JSONObject) taskByLoanArray.get(0);
             
                 JSONStringer jsAssigneeAfterComplete = new JSONStringer();
                 jsAssigneeAfterComplete.object().key("assignee").value(actorName);
                 jsAssigneeAfterComplete.key("owner").value(actorName);
                 jsAssigneeAfterComplete.endObject();
                
                 JsonRepresentation jsonAssigneeAfterCompleteRepresentation = new JsonRepresentation(jsAssigneeAfterComplete);
                 String claimAfterCompleteUri = REST_URI + "/runtime/tasks/" + obTask.get("id");
                 getClientResource(claimAfterCompleteUri).put(jsonAssigneeAfterCompleteRepresentation);
               }
            }
            return true;
          }
        } else {
          return true;
        }
      }
    }catch (Exception e){
      	e.printStackTrace();
        
    }
    return false;
  }
  
  public static String getProcessIdByName(String queueName) throws IOException, JSONException {
    String uri = REST_URI + "/repository/process-definitions";
    Representation response = getClientResource(uri).get(MediaType.APPLICATION_JSON);
    JSONObject object = new JSONObject(response.getText());
    if (object != null) {
      JSONArray arr = (JSONArray) object.get("data");
      for (int i = 0; i < arr.length(); i++) {
        JSONObject jsonObject = (JSONObject) arr.get(i);
        if (jsonObject.get("key").equals(queueName)) {
          logger.info("Returning processDefinitionId " + jsonObject.get("id"));
          return (String) jsonObject.get("id");
        }
      }
    }
    return null;
  }

  public static String createTaskByProcessId(String processDefinitionId, Map<String, String> taskVariables) throws Exception {
    String uri = REST_URI + "/runtime/process-instances";
    JSONStringer jsRequest = new JSONStringer();
    jsRequest.object().key("processDefinitionId").value(processDefinitionId).key("variables").array().object();
    for (String taskVariable : taskVariables.keySet()) {
      jsRequest.key("name").value(taskVariable).key("value").value(taskVariables.get(taskVariable));
    }
    jsRequest.endObject().endArray();
    jsRequest.endObject();
    Representation rep = new StringRepresentation(jsRequest.toString(), MediaType.APPLICATION_JSON);
    JSONObject jsObj = new JSONObject(getClientResource(uri).post(rep).getText());
    logger.info("Returned process: " + jsObj);
    if (jsObj.has("id")) {
      return  jsObj.getString("id");
    } else {
      return null;
    }
  }

  public static String getTaskIdByProcessIdAndActorName(String processInstanceId, String actorName) throws Exception {
    String uri = REST_URI + "/runtime/tasks?candidate=" +actorName;
    Representation response = getClientResource(uri).get(MediaType.APPLICATION_JSON);
    JSONObject object = new JSONObject(response.getText());
    if (object != null) {
      JSONArray arr = (JSONArray) object.get("data");
      for (int i = 0; i < arr.length(); i++) {
        JSONObject ob = (JSONObject) arr.get(i);
        if (ob.get("processDefinitionId").equals(processInstanceId)) {
          logger.info("Returned task: " + ob);
          logger.info("Returning taskId " + ob.get("id"));
          return (String) ob.get("id");
        }
      }
    }
    return null;
  }

  public static boolean claimTaskByIdAndActorName(String taskId, String actorName) throws Exception {
    String uri = REST_URI + "/runtime/tasks/" + taskId;

    JSONStringer jsClaim = new JSONStringer();
    jsClaim.object().key("action").value("claim");
    jsClaim.endObject();
    logger.info("jsClaim: " + jsClaim.toString());

    JsonRepresentation jsonClaimRepresentation = new JsonRepresentation(jsClaim);
    logger.info("jsonClaimRepresentation: " + jsonClaimRepresentation.getText());
    Representation claimResponse = getClientResource(uri).post(jsonClaimRepresentation, MediaType.APPLICATION_JSON);

    JSONStringer jsAssignee = new JSONStringer();
    jsAssignee.object().key("assignee").value(actorName);
    jsAssignee.key("owner").value(actorName);
    jsAssignee.endObject();
    logger.info("jsAssignee: " + jsAssignee.toString());
    
    JsonRepresentation jsonAssignRepresentation = new JsonRepresentation(jsAssignee);

    getClientResource(uri).put(jsonAssignRepresentation, MediaType.APPLICATION_JSON);

    return claimResponse.getText()==null;
  }


  @SuppressWarnings("unused")
  public static int getTaskCountByActorNameAndStatus(String actorName, String status) throws Exception {
    String uri = REST_URI + "/runtime/tasks?candidate=" + actorName + "&status=" + status;
    Representation response = getClientResource(uri).get(MediaType.APPLICATION_JSON);
    JSONObject object = new JSONObject(response.getText());
    if (object != null) {
      JSONArray arr = (JSONArray) object.get("data");
      logger.info("Tasklist " + actorName + " " + status + " size "	+ arr.length());
      return arr.length();
    }
    return -1;
  }
  
  public static List<String> taskQueryByActorNameBySizeAndOrder(String actorName,int size, String order, String status) throws Exception {
    List<String> taskForActor = new ArrayList<String>();
    String url = REST_URI + "/runtime/tasks?assignee="+ actorName +"&size=" + size + "&order="+order +"&status="+status;
    Representation response = getClientResource(url).get(MediaType.APPLICATION_JSON);
    if (response != null) {
      JSONObject object = new JSONObject(response.getText());
      if (object != null) {
        JSONArray arr = (JSONArray) object.get("data");
        for (int i = 0; i < arr.length(); i++) {
          JSONObject ob = (JSONObject) arr.get(i);
          taskForActor.add(ob.toString());
        }
      }
    }
    return taskForActor;
  }
}