package com.v5ent.rapid4j.core.util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class DateUtils {
	 /** 
     * 获取当前时间 
     *  
     * @param date 
     * @return 
     */  
    public static Date getCurrentDate() {  
        return new Date(System.currentTimeMillis());  
    }  
  
    /** 
     * 将时间置为23时59分钟59秒 
     *  
     * @param date 
     * @return 
     */  
    public static Date setFullPassDay(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.set(Calendar.HOUR_OF_DAY, 23);  
        calendar.set(Calendar.MINUTE, 59);  
        calendar.set(Calendar.SECOND, 59);  
        return calendar.getTime();  
    }  
  
    /** 
     * 将时间后退2小时 
     *  
     * @param date 
     * @return 
     */  
    public static Date getFallBack2Hour(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
  
        calendar.set(Calendar.HOUR_OF_DAY,  
                calendar.get(Calendar.HOUR_OF_DAY) - 2);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    /** 
     * 将时间精确到小时 
     *  
     * @param date 
     * @return 
     */  
    public static Date getTimeHour(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    /** 
     * 获取两个时间间隔的天数 
     *  
     * @param date 
     * @return 
     */  
    public static long getDiffDays(Date startDate, Date endDate) {  
        long difftime = endDate.getTime() - startDate.getTime();  
        return difftime / (24L * 60L * 60L * 1000L);  
    }  
      
  
    /** 
     * 根据日期获取当天起始时间 
     *  
     *  
     * @param date 
     * @return 
     */  
    public static Date getStartDateOfCurrentDay(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.set(Calendar.HOUR_OF_DAY, 0);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    public static Date getStartYesterday(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.add(Calendar.DAY_OF_MONTH, -1);  
        calendar.set(Calendar.HOUR_OF_DAY, 0);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    /** 
     * 根据日期获取下一天起始时间 
     *  
     *  
     * @param date 
     * @return 
     */  
    public static Date getStartDateOfNextDay(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.add(Calendar.DAY_OF_MONTH, 1);  
        calendar.set(Calendar.HOUR_OF_DAY, 0);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    /** 
     * 根据日期当前日期顺延一周后的起始时间 
     *  
     *  
     * @param date 
     * @return 
     */  
    public static Date getStartDateOfNextSevenDay(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.add(Calendar.DAY_OF_MONTH, 7);  
        calendar.set(Calendar.HOUR_OF_DAY, 0);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    /** 
     * 根据日期当前日期顺延一周后的起始时间 
     *  
     *  
     * @param date 
     * @return 
     */  
    public static Date getStartDateOfMonth(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.set(Calendar.DAY_OF_MONTH, 1);  
        calendar.set(Calendar.HOUR_OF_DAY, 0);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    /** 
     * 根据日期当前日期顺延一月后的起始时间 
     *  
     *  
     * @param date 
     * @return 
     */  
    public static Date getStartDateOfNextMonth(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.add(Calendar.MONTH, 1);  
        calendar.set(Calendar.DAY_OF_MONTH, 1);  
        calendar.set(Calendar.HOUR_OF_DAY, 0);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    /* 
     * 封装一天只能的时间区域 
     */  
    public static List<Date> getStaticByDateDateArea(Date date) {  
        List<Date> dates = new ArrayList<Date>();  
        Date startdate = getStartDateOfCurrentDay(date);  
        Date nextday = getStartDateOfNextDay(date);  
        int step = 2;  
        dates.add(startdate);  
        for (int i = 1; i < 12; i++) {  
            Calendar calendar = Calendar.getInstance();  
            calendar.setTime(startdate);  
            calendar.add(Calendar.HOUR_OF_DAY, i * step);  
            dates.add(calendar.getTime());  
        }  
        dates.add(nextday);  
        return dates;  
    }  
  
    /* 
     * 封装一周之内时间区域 
     */  
    public static List<Date> getStaticByWeekDateArea(Date date) {  
        List<Date> dates = new ArrayList<Date>();  
        Date startdate = getStartDateOfCurrentDay(date);  
        Date nextday = getStartDateOfNextSevenDay(date);  
        dates.add(startdate);  
        for (int i = 1; i < 7; i++) {  
            Calendar calendar = Calendar.getInstance();  
            calendar.setTime(startdate);  
            calendar.add(Calendar.DAY_OF_MONTH, i);  
            dates.add(calendar.getTime());  
        }  
        dates.add(nextday);  
        return dates;  
    }  
  
    /* 
     * 封装一周之内时间区域List<String> 
     */  
    public static List<String> getStaticByWeekLabel(Date date) {  
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM-dd");  
        List<String> dates = new ArrayList<String>();  
        Date startdate = getStartDateOfCurrentDay(date);  
        Date nextday = getStartDateOfNextSevenDay(date);  
        dates.add(dateFormat.format(startdate));  
        for (int i = 1; i < 7; i++) {  
            Calendar calendar = Calendar.getInstance();  
            calendar.setTime(startdate);  
            calendar.add(Calendar.DAY_OF_MONTH, i);  
            dates.add(dateFormat.format(calendar.getTime()));  
        }  
        return dates;  
    }  
  
    /* 
     * 封装一月之内时间区域 
     */  
    public static List<Date> getStaticByMonthDateArea(Date date) {  
        List<Date> dates = new ArrayList<Date>();  
        Date startdate = getStartDateOfMonth(date);  
        Date nextday = getStartDateOfNextMonth(date);  
        long daydiff = getDiffDays(startdate, nextday);  
        dates.add(startdate);  
        for (int i = 1; i < daydiff; i++) {  
            Calendar calendar = Calendar.getInstance();  
            calendar.setTime(startdate);  
            calendar.add(Calendar.DAY_OF_MONTH, i);  
            dates.add(calendar.getTime());  
        }  
        dates.add(nextday);  
        return dates;  
    }  
      
    /* 
     *封装一点时间之内的时间区域（天）  
     */  
    public static List<Date> getStaticBySE(Date startDate,Date endDate)  
    {  
        List<Date> dates = new ArrayList<Date>();  
          
        long daydiff = getDiffDays(startDate, endDate);  
        dates.add(startDate);  
        for (int i = 1; i < daydiff; i++) {  
            Calendar calendar = Calendar.getInstance();  
            calendar.setTime(startDate);  
            calendar.add(Calendar.DAY_OF_MONTH, i);  
            dates.add(calendar.getTime());  
        }  
        dates.add(endDate);  
        return dates;  
    }  
  
    /* 
     * 封装一月之内时间区域 
     */  
    public static List<String> getStaticByMonthLabel(Date date) {  
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd");  
        List<String> dates = new ArrayList<String>();  
        Date startdate = getStartDateOfMonth(date);  
        Date nextday = getStartDateOfNextMonth(date);  
        long daydiff = getDiffDays(startdate, nextday);  
        dates.add(dateFormat.format(startdate));  
        for (int i = 1; i < daydiff; i++) {  
            Calendar calendar = Calendar.getInstance();  
            calendar.setTime(startdate);  
            calendar.add(Calendar.DAY_OF_MONTH, i);  
            dates.add(dateFormat.format(calendar.getTime()));  
        }  
        return dates;  
    }  
  
    public static String formatDate(String format, Date date) {  
        SimpleDateFormat dateFormat = new SimpleDateFormat(format);  
        return dateFormat.format(date);  
    }  
}
