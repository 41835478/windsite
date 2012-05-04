package com.wind.core.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils extends org.apache.commons.lang.time.DateUtils {

	/**
	 * yyyy-MM-dd
	 */
	public static final String YYYY_MM_DD = "yyyy-MM-dd";
	/**
	 * yyyy.MM.dd
	 */
	public static final String YYYY_MM_DD_DOT = "yyyy.MM.dd";
	/**
	 * yyyyMMdd
	 */
	public static final String YYYYMMDD = "yyyyMMdd";
	/**
	 * yyyy/MM/dd
	 */
	public static final String YYYY_MM_DD_SOLIDUS = "yyyy/MM/dd";
	/**
	 * yyyy-MM-dd HH:mm:ss
	 */
	public static final String yyyy_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";
	/**
	 * 格式化Date
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static String format(Date date, String pattern) {
		return new SimpleDateFormat(pattern).format(date);
	}
	
	public static void main(String[] args){
		System.out.println(format(new Date(),YYYY_MM_DD));
		System.out.println(format(new Date(),YYYY_MM_DD_DOT));
		System.out.println(format(new Date(),YYYYMMDD));
		System.out.println(format(new Date(),YYYY_MM_DD_SOLIDUS));
		System.out.println(format(new Date(),yyyy_MM_DD_HH_MM_SS));
	}
}

