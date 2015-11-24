package com.v5ent.rapid4j.plugin.activiti;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.binary.Base64;
import org.json.JSONException;
import org.junit.Test;

import com.v5ent.rapid4j.test.TestSupport;


/**
 * @author Mignet
 */
public class ActivitiClientTest extends TestSupport {
  
  @Test
  public void testGetQueueNamesAdmin() throws IOException, JSONException {
    List<String> queueNames = ActivitiClient.getQueueNames("qatester_tools");
    for (String queueName : queueNames) {
      System.out.println(queueName);
    }
    assertNotNull(queueNames);
  }
  
  
  @Test
  public void testGetQueueNames() throws JSONException, IOException {
    List<String> queueNames = ActivitiClient.getQueueNames("qatester_tools");
    for (String queueName : queueNames) {
      System.out.println(queueName);
    }
    assertNotNull(queueNames);
  }
  
  @Test
  public void testGetQueueTestEdgarNames() throws JSONException, IOException {
    List<String> queueNames = ActivitiClient.getQueueNames("qatester_tools");
    for (String queueName : queueNames) {
      System.out.println(queueName);
    }
    assertNotNull(queueNames);
  }
  
  @Test
  public void testNewDiagram() throws IOException, JSONException {
    assertNotNull(ActivitiClient.getProcessIdByName("underwritingQueue"));
    System.out.println("OUTPUT: " + ActivitiClient.getProcessIdByName("bankVerificationQueue"));
    assertNotNull(ActivitiClient.getProcessIdByName("bankVerificationQueue"));
  }
  
  
  @Test
  public void testWithUserInSameLDAPGroup() throws Exception {
    assertNotNull(ActivitiClient.getTaskIdByProcessIdAndActorName(ActivitiClient.getProcessIdByName("underwritingQueue"), "qatester_tools"));
  }
  
  @Test
  public void testGetQueueNamesNonReturn() throws JSONException, IOException {
    List<String> queueNames = ActivitiClient.getQueueNames("dummy");
    assertNull(queueNames);
  }

  @Test
  public void testLoanComplete() throws Exception {
    String underwritingQueueProcessId = ActivitiClient.getProcessIdByName("underwritingQueue");
    Map<String, String> processVariables = new HashMap<String, String>();
    processVariables.put("LoanId", "1");
    String processInstanceId = ActivitiClient.createTaskByProcessId(underwritingQueueProcessId, processVariables);
    assertNotNull(processInstanceId);
    assertNotNull(ActivitiClient.taskQueryByActorNameBySizeAndOrder("qatester_admin", 1, "asc", "open"));
    Map<String, String> completeVariables = new HashMap<String, String>();
    completeVariables.put("disposition", "complete");
    assertTrue(ActivitiClient.completeTaskByIdWithVariables("1", "qatester_tools",completeVariables));
  }

 
  @Test
  public void testLoanInComplete() throws Exception{
    String underwritingQueueProcessId = ActivitiClient.getProcessIdByName("underwritingQueue");
    Map<String, String> processVariables = new HashMap<String, String>();
    processVariables.put("LoanId", "2");
    ActivitiClient.createTaskByProcessId(underwritingQueueProcessId, processVariables);
    assertTrue(ActivitiClient.completeTaskByIdWithVariables("2", "qatester_admin", null));
    assertNotNull(ActivitiClient.taskQueryByActorNameBySizeAndOrder("qatester_admin", 1, "asc", "open"));
    Map<String, String> completeVariables = new HashMap<String, String>();
    completeVariables.put("disposition", "incomplete");
    assertTrue(ActivitiClient.completeTaskByIdWithVariables("2","qatester_tools", completeVariables));
    assertNotNull(ActivitiClient.taskQueryByActorNameBySizeAndOrder("qatester_admin", 1, "asc", "open"));
  }

  @Test
  public void testSaveForLater() throws Exception{
    String underwritingQueueProcessId = ActivitiClient.getProcessIdByName("underwritingQueue");
    Map<String, String> processVariables = new HashMap<String, String>();
    processVariables.put("LoanId", "3");
    String processInstanceId = ActivitiClient.createTaskByProcessId(underwritingQueueProcessId, processVariables);
    System.out.println(processInstanceId);
    assertTrue(ActivitiClient.completeTaskByIdWithVariables("3","qatester_tools", null));
    assertNotNull(ActivitiClient.taskQueryByActorNameBySizeAndOrder("qatester_admin", 1, "asc", "open"));
    Map<String, String> completeVariables = new HashMap<String, String>();
    completeVariables.put("disposition", "saveforlater");
    assertTrue(ActivitiClient.completeTaskByIdWithVariables("3", "qatester_tools",completeVariables));
  }


  @Test
  public void endToEndTest() throws Exception {
    String underwritingQueueProcessId = ActivitiClient.getProcessIdByName("underwritingQueue");
    assertNotNull(underwritingQueueProcessId);
    Map<String, String> processVariables = new HashMap<String, String>();
    processVariables.put("LoanId", "00000000000");
    String processInstanceId = ActivitiClient.createTaskByProcessId(underwritingQueueProcessId, processVariables);
    System.out.println("processInstanceId: " + underwritingQueueProcessId);
    assertNotNull(processInstanceId);
    String taskId = ActivitiClient.getTaskIdByProcessIdAndActorName(ActivitiClient.getProcessIdByName("underwritingQueue"), "qatester_tools");
    assertNotNull(taskId);
    assertNotNull(ActivitiClient.claimTaskByIdAndActorName(taskId, "qatester_tools"));

    assertNotNull(ActivitiClient.completeTaskByIdWithVariables(taskId,"qatester_tools", null));

    assertNotNull(ActivitiClient.getTaskCountByActorNameAndStatus("qatester_tools", "closed"));

    Map<String, String> completeVariables = new HashMap<String, String>();
    completeVariables.put("disposition", "saveforlater");
    ActivitiClient.completeTaskByIdWithVariables(taskId,"qatester_tools", completeVariables);
    assertNotNull(ActivitiClient.getTaskCountByActorNameAndStatus("qatester_tools", "closed"));
  }
  
  
  @Test
  public void testUserInSameLDAPGroup() throws Exception {
    assertNotNull(ActivitiClient.getTaskIdByProcessIdAndActorName(ActivitiClient.getProcessIdByName("underwritingQueue"), "qatester_tools"));
  }
  
  
  @Test
  public void testGetProcessIdByName() throws Exception {
    String queueProcessId = ActivitiClient.getProcessIdByName("underwritingQueue");
    assertNotNull(queueProcessId);
  }
  
  @Test
  public void testCreateTaskByProcessId() throws Exception {
    String underwritingQueueProcessId = ActivitiClient.getProcessIdByName("underwritingQueue");
    assertNotNull(underwritingQueueProcessId);
    Map<String, String> processVariables = new HashMap<String, String>();
    processVariables.put("LoanId", "332233555");
    String createComplete = ActivitiClient.createTaskByProcessId(underwritingQueueProcessId, processVariables);
    System.out.println("CREATE COMPLETE: " + createComplete);
    assertNotNull(createComplete);
  }
  
  @Test
  public void testTaskByActorName() throws Exception {
    String processId = ActivitiClient.getProcessIdByName("underwritingQueue");
    String taskId = ActivitiClient.getTaskIdByProcessIdAndActorName(processId, "qatester_tools");
    assertNotNull(taskId);
  }
  
  @Test
  public void testClaimTaskById() throws Exception {
    String processId = ActivitiClient.getProcessIdByName("underwritingQueue");
    String taskId = ActivitiClient.getTaskIdByProcessIdAndActorName(processId, "qatester_tools");
    assertNotNull(ActivitiClient.claimTaskByIdAndActorName(taskId, "qatester_tools"));
  }
  
  @Test
  public void testCompleteTaskById() throws Exception {
    String processId = ActivitiClient.getProcessIdByName("underwritingQueue");
    Map<String, String> processVariables = new HashMap<String, String>();
    processVariables.put("LoanId", "3333333333");
    ActivitiClient.createTaskByProcessId(processId, processVariables);
    String taskId = ActivitiClient.getTaskIdByProcessIdAndActorName(processId, "qatester_tools");
    Map<String, String> completeVariables = new HashMap<String, String>();
    completeVariables.put("disposition", "complete");
    assertNotNull(ActivitiClient.completeTaskByIdWithVariables(taskId,"qatester_tools", completeVariables));
  }
  
  @Test
  public void testIncompleteTaskById() throws Exception{
    String processId = ActivitiClient.getProcessIdByName("underwritingQueue");
    Map<String, String> processVariables = new HashMap<String, String>();
    processVariables.put("LoanId", "4444444444");
    ActivitiClient.createTaskByProcessId(processId, processVariables);
    String taskId = ActivitiClient.getTaskIdByProcessIdAndActorName(processId, "qatester_tools");
    Map<String, String> completeVariables = new HashMap<String, String>();
    completeVariables.put("disposition", "incomplete");
    assertNotNull(ActivitiClient.completeTaskByIdWithVariables(taskId,"qatester_tools", completeVariables));
  }
  
  @Test
  public void testSaveForLaterTaskById() throws Exception {
    String processId = ActivitiClient.getProcessIdByName("underwritingQueue");
    Map<String, String> processVariables = new HashMap<String, String>();
    processVariables.put("LoanId", "5555555555");
    String creatProcessId = ActivitiClient.createTaskByProcessId(processId, processVariables);
    System.out.println("CreatedProcessId: " + creatProcessId);
    String taskId = ActivitiClient.getTaskIdByProcessIdAndActorName(processId, "qatester_tools");
    Map<String, String> completeVariables = new HashMap<String, String>();
    completeVariables.put("disposition", "saveforlater");
    assertNotNull(ActivitiClient.completeTaskByIdWithVariables(taskId,"qatester_tools", completeVariables));
  }
  
  @Test
  public void testGetTaskCountByActorNameAndStatus() throws Exception {
    int taskCount = ActivitiClient.getTaskCountByActorNameAndStatus("qatester_tools", "open");
    assertNotNull(taskCount);
  }
  
  @Test
  public void testTaskQueryForActorNameBySizeAndOrder() throws Exception {
    List<String> taskIds = ActivitiClient.taskQueryByActorNameBySizeAndOrder("qatester_tools", 5, "asc", "open");
    for (String taskId : taskIds) {
      System.out.println("TASKID: " + taskId);
    }
    assertNotNull(taskIds);
  }
  
  @Test
  public void testGetTaskClaimAndCompleteTaskByProcessIdAndActorName() throws JSONException, IOException {
    assertNotNull(ActivitiClient.claimAndCompleteTaskByProcessIdAndActorName(ActivitiClient.getProcessIdByName("underwritingQueue"), "qatester_tools"));
  }

  @Test
  public void testGetTaskClaimAndCompleteTaskByProcessIdAndActorNameWithWrongActorName() throws Exception{
    assertNull(ActivitiClient.claimAndCompleteTaskByProcessIdAndActorName(ActivitiClient.getProcessIdByName("underwritingQueue"), "dummy"));
  }

  @Test
  public void testGetTaskClaimAndCompleteTaskByProcessIdAndActorNameWithWrongProcessName() throws Exception{
    assertNull(ActivitiClient.claimAndCompleteTaskByProcessIdAndActorName(ActivitiClient.getProcessIdByName("dummy"), "dummy"));
  }


  @Test
  public void testProccessIdReturnNullWhenInvalid() throws IOException, JSONException {
    assertNull(ActivitiClient.getProcessIdByName("dummy"));
  }

  @Test
  public void testGetTaskByLoanId() throws JSONException, IOException {
    assertNotNull(ActivitiClient.getTaskByLoanId("259190367").getJSONArray("data"));
  }
  
  @Test
  public void testSaveForlater() throws Exception {
    Map<String, String> completeVariables = new HashMap<String, String>();
    completeVariables.put("disposition", "complete");
    ActivitiClient.completeTaskByIdWithVariables("685363", "qatester_tools", completeVariables);
  }
  
  @Test
  public void testSaveForLaterIfAlreadySaveForLater() throws Exception {
    String processId = ActivitiClient.getProcessIdByName("underwritingQueue");
    String taskId = ActivitiClient.getTaskIdByProcessIdAndActorName(processId, "qatester_tools");
    System.out.println("TaskId: " + taskId);
    Map<String, String> completeVariables = new HashMap<String, String>();
    completeVariables.put("disposition", "incomplete");
    assertNotNull(ActivitiClient.completeTaskByIdWithVariables("1111111111","qatester_tools", completeVariables));
  }
}