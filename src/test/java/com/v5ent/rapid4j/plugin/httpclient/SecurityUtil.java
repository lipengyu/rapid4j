package com.v5ent.rapid4j.plugin.httpclient;

import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 加密签名,统一使用commons-codec加密解密
 * @author Mignet
 *
 */
public class SecurityUtil {
	private static final Logger LOGGER = LoggerFactory.getLogger(SecurityUtil.class);
	private static final String CHARSET = "UTF-8";
	
	public static void main(String[] args) throws NoSuchAlgorithmException {
//		String clientId = "CH201508005";
		String clientId = "JDW-CH";
    	String queryBody = "{ \"soNo\": \"D1001\"}";
//    	String securityCode = "w1Kg4G1y-{3Q;mssffX5L56dghREsP4[gdde=";
    	String securityCode = "G1y-{3Q;ms[gdde=";
    	String newOrder = "{"
    			+ "\"ExternalId\":\"D1001\","
    			+ "\"OrderNumber\":\"59-080418-29612345\","
    			+ "\"OrderTime\":\"2015-08-05 18:32:30\","
    			+ "\"ShopName\":\"深圳家电网\","
    			+ "\"ProductLine\":1,"
    			+ "\"R3Code\":\"CH5006260\","
    			+ "\"Count\":1,"
    			+ "\"UnitPrice\":4197.0,"
    			+ "\"PayAmount\":3777.0,"
    			+ "\"PayAccount\":\"12345@qq.com\","
    			+ "\"PayTypeId\":2,"
    			+ "\"Buyer\":\"测试用户\","
    			+ "\"BuyerPhone\":\"13912341234\","
    			+ "\"PostNumber\":\"123456\","
    			+ "\"ProvinceName\":\"四川省\","
    			+ "\"CityName\":\"绵阳市\","
    			+ "\"DistrictName\":\"涪城区\","
    			+ "\"AddressDetail\":\"高新街道凝祥晓月二期中段9幢2单元602\","
    			+ "\"Note\":\"买家留言：  备忘：\","
    			+ "\"InvoiceType\":1,"
    			+ "\"InvoiceName\":\"测试用户\","
    			+ "\"InvoiceAddr\":\"四川省绵阳市高新区四川省绵阳市高新区凝祥晓月二期中段9幢2单元602\"}";
    	try {
			String params = paramEncode(clientId,securityCode,queryBody);//test ok
//			String params = postEncode(clientId,securityCode,newOrder);
			LOGGER.debug("加密及编码结果：",params);
		} catch (Exception e) {
			LOGGER.debug("编码异常：",e);
			e.printStackTrace();
		}
    	 byte b[] = DigestUtils.md5Hex("JDW-CH").getBytes();
         String security = Base64.encodeBase64(b).toString();
         System.out.println("自定义安全码:"+security);
	}
	
	/**
	 * 对url参数进行签名
	 * @param clientId
	 * @param specode
	 * @param json
	 * @return
	 * @throws Exception
	 */
    public static String paramEncode(String clientId,String specode,String json) throws Exception {
        String sBefore = json+specode;
        byte b[] = DigestUtils.md5Hex(sBefore).getBytes();
        String sAfter = Base64.encodeBase64(b).toString();
        System.out.println(sBefore+"经过MD5加密后的字符串："+sAfter);
        System.out.println("经过URL编码之后的字符串："+URLEncoder.encode(sAfter,CHARSET));
        System.out.println("经过URL编码之后的json："+URLEncoder.encode(json,CHARSET));
        
        String result = "clientId="+clientId+"&digest="+URLEncoder.encode(sAfter,CHARSET)+"&body="+URLEncoder.encode(json,CHARSET);
        System.out.println("最终要发送的数据："+result);
        return result;
    }
    
    /**
     * 对post body json进行签名
     * @param clientId
     * @param specode
     * @param json
     * @return
     * @throws Exception
     */
    public static String postEncode(String clientId,String specode,String json) throws Exception {
    	String sBefore = json+specode;
    	byte b[] = DigestUtils.md5Hex(sBefore).getBytes();
    	String sAfter = Base64.encodeBase64(b).toString();
    	System.out.println("签名之前字符串"+sBefore);
    	System.out.println("签名之后字符串："+sAfter);
//    	System.out.println("经过URL编码之后的字符串："+URLEncoder.encode(sAfter,CHARSET));
//    	System.out.println("经过URL编码之后的json："+URLEncoder.encode(json,CHARSET));
    	
    	String result = "{\"clientId\":\""+clientId+"\",\"digest\":\""+sAfter+"\",\"body\":\""+json.replace("\"", "\\\"")+"\"}";
    	System.out.println("最终要发送的数据："+result);
    	return result;
    }
    
}
