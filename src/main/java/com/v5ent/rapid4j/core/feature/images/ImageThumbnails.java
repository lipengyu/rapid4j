package com.v5ent.rapid4j.core.feature.images;

import java.io.IOException;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;

public class ImageThumbnails {

	public static void main(String[] args) throws IOException {
		//size(宽度, 高度)
		//指定大小进行缩放
		/*
		 * 若图片横比200小，高比300小，不变
		 * 若图片横比200小，高比300大，高缩小到300，图片比例不变
		 * 若图片横比200大，高比300小，横缩小到200，图片比例不变
		 * 若图片横比200大，高比300大，图片按比例缩小，横为200或高为300
		 */
		String path = "src/main/java/"+ImageThumbnails.class.getPackage().getName().replace(".", "/");
		System.out.println("start:"+new Date());
		Thumbnails.of(path+"/test.jpg")
			.size(200, 300)
			.toFile(path+"/a380_200x300.jpg");

		Thumbnails.of(path+"/test.jpg")
			.size(2560, 2048)
			.toFile(path+"/a380_2560x2048.jpg");
		System.out.println("end:"+new Date());
		
		//scale(比例)  
		System.out.println("start:"+new Date());
		Thumbnails.of(path+"/test.jpg")   
		        .scale(0.25f)  
		        .toFile(path+"/a380_25%.jpg");  
		  
		Thumbnails.of(path+"/test.jpg")   
		        .scale(1.10f)  
		        .toFile(path+"/a380_110%.jpg");  
		System.out.println("end:"+new Date());
		//keepAspectRatio(false) 默认是按照比例缩放的  
		Thumbnails.of(path+"/test.jpg")   
		        .size(200, 200)   
		        .keepAspectRatio(false)   
		        .toFile(path+"/a380_200x200.jpg"); 
		//rotate(角度),正数：顺时针 负数：逆时针  
		Thumbnails.of(path+"/test.jpg")     
		        .size(1280, 1024)  
		        .rotate(90)   
		        .toFile(path+"/a380_rotate+90.jpg");   
		  
		Thumbnails.of(path+"/test.jpg")     
		        .size(1280, 1024)  
		        .rotate(-90)   
		        .toFile(path+"/a380_rotate-90.jpg");   
		
		//watermark(位置，水印图，透明度)  
		/*Thumbnails.of("images/a380_1280x1024.jpg")  
		    .size(1280,1024)  
		    .watermark(Positions.BOTTOM_RIGHT,ImageIO.read(new File("images/watermark.png")),0.5f)  
		    .outputQuality(0.8f)  
		    .toFile("c:/a380_watermark_bottom_right.jpg");  
		  
		Thumbnails.of("images/a380_1280x1024.jpg")  
		    .size(1280,1024)  
		    .watermark(Positions.CENTER,ImageIO.read(new File("images/watermark.png")),0.5f)  
		    .outputQuality(0.8f)  
		    .toFile("c:/a380_watermark_center.jpg");  */
		// more example to see: http://blog.csdn.net/wangpeng047/article/details/17610451
	}
}
