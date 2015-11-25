package com.v5ent.rapid4j.plugin.httpclient;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.json.JSONStringer;
import org.junit.Test;
import org.restlet.data.ChallengeScheme;
import org.restlet.data.MediaType;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.ClientResource;


public class HttpClientTest {

	@Test
	public void jUnitTest() {
		String url ="http://www.baidu.com/";
		get(url);
	}

	/**
	 * HttpClient连接SSL
	 * <section>"d:\\tomcat.keystore"</section>
	 */
	private void ssl(String url,String pathtoKeystore) {
		DefaultHttpClient httpclient = new DefaultHttpClient();
		try {
			KeyStore trustStore = KeyStore.getInstance(KeyStore
					.getDefaultType());
			FileInputStream instream = new FileInputStream(new File(pathtoKeystore));
			try {
				// 加载keyStore d:\\tomcat.keystore
				trustStore.load(instream, "123456".toCharArray());
			} catch (CertificateException e) {
				e.printStackTrace();
			} finally {
				try {
					instream.close();
				} catch (Exception ignore) {
				}
			}
			// 穿件Socket工厂,将trustStore注入
			SSLSocketFactory socketFactory = new SSLSocketFactory(trustStore);
			// 创建Scheme
			Scheme sch = new Scheme("https", 8443, socketFactory);
			// 注册Scheme
			httpclient.getConnectionManager().getSchemeRegistry().register(sch);
			// 创建http请求(get方式)
			HttpGet httpget = new HttpGet("https://localhost:8443/myDemo/Ajax/serivceJ.action");
			System.out.println("executing request" + httpget.getRequestLine());
			HttpResponse response = httpclient.execute(httpget);
			HttpEntity entity = response.getEntity();
			System.out.println("----------------------------------------");
			System.out.println(response.getStatusLine());
			if (entity != null) {
				System.out.println("Response content length: "
						+ entity.getContentLength());
				String ss = EntityUtils.toString(entity);
				System.out.println(ss);
				EntityUtils.consume(entity);
			}
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (KeyManagementException e) {
			e.printStackTrace();
		} catch (UnrecoverableKeyException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (KeyStoreException e) {
			e.printStackTrace();
		} finally {
			httpclient.getConnectionManager().shutdown();
		}
	}

	/**
	 * post方式提交表单（模拟用户登录请求）
	 */
	private void postForm() {
		// 创建默认的httpClient实例.
		HttpClient httpclient = new DefaultHttpClient();
		// 创建httppost
		HttpPost httppost = new HttpPost(
				"http://localhost:8080/myDemo/Ajax/serivceJ.action");
		// 创建参数队列
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("username", "admin"));
		formparams.add(new BasicNameValuePair("password", "123456"));
		UrlEncodedFormEntity uefEntity;
		try {
			uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");
			httppost.setEntity(uefEntity);
			System.out.println("executing request " + httppost.getURI());
			HttpResponse response;
			response = httpclient.execute(httppost);
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				System.out.println("--------------------------------------");
				System.out.println("Response content: "
						+ EntityUtils.toString(entity, "UTF-8"));
				System.out.println("--------------------------------------");
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源
			httpclient.getConnectionManager().shutdown();
		}
	}

	/**
	 * 发送 post请求访问本地应用并根据传递参数不同返回不同结果
	 */
	private void post(String url) {
		// 创建默认的httpClient实例.
		HttpClient httpclient = new DefaultHttpClient();
		// 创建httppost
		HttpPost httppost = new HttpPost(url);
		// 创建参数队列
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("type", "house"));
		UrlEncodedFormEntity uefEntity;
		try {
			uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");
			httppost.setEntity(uefEntity);
			System.out.println("executing request " + httppost.getURI());
			HttpResponse response;
			response = httpclient.execute(httppost);
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				System.out.println("--------------------------------------");
				System.out.println("Response content: "
						+ EntityUtils.toString(entity, "UTF-8"));
				System.out.println("--------------------------------------");
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源
			httpclient.getConnectionManager().shutdown();
		}
	}
	public static void main(String[] args) {
		try {
			makeRequest() ;
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private static final String LDAP_USERNAME="kermit";
	  private static final String LDAP_PASSWORD="kermit";
	  
	  private static ClientResource getClientResource(String uri) throws IOException{
	    ClientResource clientResource = new ClientResource(uri);
	    clientResource.setChallengeResponse(ChallengeScheme.HTTP_BASIC, LDAP_USERNAME, LDAP_PASSWORD);
	    return clientResource;
	  }
	  
	public static String makeRequest() throws Exception 
	{
	    //instantiates httpclient to make request
	    DefaultHttpClient httpclient = new DefaultHttpClient();
	    //url with the post data
	    String uri ="http://192.168.1.160:8002/activiti-rest/service/runtime/process-instances/";
	    //convert parameters into JSON object
	    String s = "{\"processDefinitionKey\":\"ERP-Purchase-AdjustMaster\",\"variables\":[{\"name\": \"venderName\", \"value\": \"test\"},{\"name\": \"priceFileId\", \"value\":\"test\"}]}";
	    System.out.println(s);
	    Representation rep = new StringRepresentation(s, MediaType.APPLICATION_JSON);
	    JSONObject jsObj = new JSONObject(getClientResource(uri).post(rep).getText());
	    System.out.println("Returned process: " + jsObj);
	    if (jsObj.has("id")) {
	      return  jsObj.getString("id");
	    } else {
	      return null;
	    }
	}

	/**
	 * 发送 get请求
	 */
	private void get(String url) {

		HttpClient httpclient = new DefaultHttpClient();

		try {
			// 创建httpget.
			HttpGet httpget = new HttpGet(url);
			System.out.println("executing request " + httpget.getURI());
			// 执行get请求.
			HttpResponse response = httpclient.execute(httpget);
			// 获取响应实体
			HttpEntity entity = response.getEntity();
			System.out.println("--------------------------------------");
			// 打印响应状态
			System.out.println(response.getStatusLine());
			if (entity != null) {
				// 打印响应内容长度
				System.out.println("Response content length: "
						+ entity.getContentLength());
				// 打印响应内容
				System.out.println("Response content: "
						+ EntityUtils.toString(entity));
			}
			System.out.println("------------------------------------");
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源
			httpclient.getConnectionManager().shutdown();
		}
	}

}
