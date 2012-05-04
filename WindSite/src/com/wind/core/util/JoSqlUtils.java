package com.wind.core.util;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;
import org.josql.Query;
import org.josql.QueryResults;

import com.wind.core.exception.SystemException;

public class JoSqlUtils {
	public static List<?> find(List<?> srcList, String joSQL) {
		Query query = new Query();
		List<?> listResult = null;
		try {
			query.parse(joSQL);
			QueryResults qr = query.execute(srcList);
			listResult = qr.getResults();
		} catch (Exception e) {
			SystemException.handleMessageException("", e);
		}
		return listResult;
	}

	/**
	 * 根据对象属性条件查询列表中指定对象的值,只查询对象中的某一个属性，返回值属性值对象集合
	 * 
	 * @param srcList
	 *            对象列表数据源
	 * @param modeClass
	 *            要查询的对象
	 * @param selectPropName
	 *            要查询的属性列
	 * @param name
	 *            对象属性名称
	 * @param value
	 *            对象属性值
	 * @return 查询结果列表
	 */
	public static List<?> findSingleProperty(List<?> srcList,
			Class<?> modeClass, String selectPropName, String name,
			Object value, String orderBy) {
		String[] arryName = null;
		Object[] arryValue = null;
		if (name == null && value == null) {
			arryName = new String[0];
			arryValue = new Object[0];
		} else {
			arryName = new String[] { name };
			arryValue = new Object[] { value };
		}
		List<?> listResult = find(srcList, modeClass, arryName, arryValue,
				orderBy);
		List<Object> listReturnResult = new ArrayList<Object>();
		Object objPropValue = null;
		for (int i = 0; i < listResult.size(); i++) {
			Object obj = listResult.get(i);
			try {
				objPropValue = PropertyUtils.getProperty(obj, selectPropName);
			} catch (Exception ex) {
				SystemException.handleMessageException("", ex);
				objPropValue = null;
			}
			listReturnResult.add(objPropValue);
		}
		return listReturnResult;
	}

	/**
	 * 根据对象属性条件查询列表中指定对象的值
	 * 
	 * @param srcList
	 *            对象列表数据源
	 * @param modeClass
	 *            要查询的对象
	 * @param names
	 *            对象属性名称列表
	 * @param values
	 *            对象属性值列表
	 * @return 查询结果列表
	 */
	public static List<?> find(List<?> srcList, Class<?> modeClass,
			String[] names, Object[] values, String orderBy) {
		StringBuffer buffSQL = new StringBuffer();
		buffSQL.append("select * from ").append(modeClass.getName());
		if (names.length > 0)
			buffSQL.append(" where ");
		for (int i = 0; i < names.length; i++) {
			if (i == names.length - 1) {
				buffSQL.append(names[i]).append("= :").append(names[i]).append(
						"_").append(i);
			} else {
				buffSQL.append(names[i]).append("= :").append(names[i]).append(
						"_").append(i).append(" and ");
			}
		}
		if (StringUtils.isNotEmpty(orderBy)) {
			buffSQL.append(" order by " + orderBy);
		}
		Query query = new Query();
		List<?> listResult = null;
		try {
			query.parse(buffSQL.toString());
			for (int i = 0; i < names.length; i++) {
				query.setVariable(names[i] + "_" + i, values[i]);
			}
			QueryResults qr = query.execute(srcList);
			listResult = qr.getResults();
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException();
		}
		return listResult;
	}

	/**
	 * 根据对象属性条件查询列表中指定对象的值
	 * 
	 * @param srcList
	 *            对象列表数据源
	 * @param modeClass
	 *            要查询的对象
	 * @param name
	 *            对象属性名称
	 * @param value
	 *            对象属性值
	 * @return 查询结果列表
	 */
	public static List<?> find(List<?> srcList, Class<?> modeClass,
			String name, Object value, String orderBy) {
		return find(srcList, modeClass, new String[] { name },
				new Object[] { value }, orderBy);
	}

	/**
	 * 查询对象列表中指定属性的值,只查询对象中的某一个属性，返回值属性值对象集合
	 * 
	 * @param srcList
	 *            对象列表数据源
	 * @param modeClass
	 *            要查询的对象
	 * @param selectPropName
	 *            要查询的属性列
	 * @return 查询结果列表
	 */
	public static List<?> findSingleProperty(List<?> srcList,
			Class<?> modeClass, String selectPropName) {
		return findSingleProperty(srcList, modeClass, selectPropName, null,
				null, null);
	}
}
