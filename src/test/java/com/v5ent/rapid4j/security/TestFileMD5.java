package com.v5ent.rapid4j.security;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class TestFileMD5 {
	
	public final static String[] hexDigits = { "0", "1", "2", "3", "4", "5",
		"6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };
	
	/**
	 * 获取文件的MD5值
	 * @param file
	 * @return
	 */
	public static String getFileMD5(File file){
		String md5 = null;
		FileInputStream fis = null;
		FileChannel fileChannel = null;
		try {
			fis = new FileInputStream(file);
			fileChannel = fis.getChannel();
			MappedByteBuffer byteBuffer = fileChannel.map(FileChannel.MapMode.READ_ONLY, 0, file.length());
			
			try {
				MessageDigest md = MessageDigest.getInstance("MD5");
				md.update(byteBuffer);
				md5 = byteArrayToHexString(md.digest());
			} catch (NoSuchAlgorithmException e) {
				
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			
			e.printStackTrace();
		} catch (IOException e) {
			
			e.printStackTrace();
		}finally{
			try {
				fileChannel.close();
				fis.close();
			} catch (IOException e) {
				
				e.printStackTrace();
			}
		}
		
		return md5;
	}
	
	/**
	 * 字节数组转十六进制字符串
	 * @param digest
	 * @return
	 */
	private static String byteArrayToHexString(byte[] digest) {
		
		StringBuffer buffer = new StringBuffer();
		for(int i=0; i<digest.length; i++){
			buffer.append(byteToHexString(digest[i]));
		}
		return buffer.toString();
	}
	
	/**
	 * 字节转十六进制字符串
	 * @param b
	 * @return
	 */
	private static String byteToHexString(byte b) {
		//	int d1 = n/16;
			 int d1 = (b&0xf0)>>4;
			 
		//	 int d2 = n%16;
			 int d2 = b&0xf;
			 return hexDigits[d1] + hexDigits[d2];
	}
	
	//入口
	public static void main(String [] args) throws Exception{
		System.out.println("-----测试创建文件的md5后缀----------");
		
		File file = new File("/home/mignet/文档/projects/rustful/test.jpg");
		
		if(!file.exists()){
			file.createNewFile();
		}
		//获取参数
		String parent = file.getParent();
		
		System.out.println(parent);
		String fileName = file.getName();
		System.out.println(fileName);
		//首先获取文件的MD5
		String md5 = getFileMD5(file);
		
		//93d97357be249c61407fa21aa434e72f
		System.out.println("-----获取的md5：" + md5);
		
		//组装
		File md5File = new File(parent + fileName +".md5");
		if(md5File.exists()){
			md5File.delete();
			md5File.createNewFile();
		}
		
		FileOutputStream fos = new FileOutputStream(md5File);
		fos.write(md5.getBytes());
		
		fos.flush();
		fos.close();
		
		System.out.println("--------完成---------");
	}
}