package com.wind.core.dao.util;

import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.orm.hibernate3.HibernateTemplate;

import com.wind.core.dao.Page;

public interface IDaoUtils {
	/**
	 * 对Criteria进行分页相关操作,包括查出总记录数,设定分页参数
	 * 
	 * @param <T>
	 * @param criteria
	 * @param page
	 */
	<T> void pageCriteria(Criteria criteria, Page<T> page);

	/**
	 * 根据Criterion条件创建Criteria
	 * 
	 * @param session
	 * @param clazz
	 * @param criterions
	 * @return
	 */
	Criteria createCriteria(Session session, Class<?> clazz,
			ProjectionList proList, Criterion... criterions);

	Criteria createCriteria(Session session, Class<?> clazz, Order order,
			ProjectionList proList, Criterion... criterions);

	/**
	 * 根据查询语句与参数Map创建Query对象数组0-实体查询,1-记录数查询
	 * 
	 * @param session
	 * @param hql
	 * @param values
	 * @return
	 */
	Query[] createQuery(Session session, String hql, Map<String, Object> params);

	/**
	 * 根据查询语句与参数Map创建Sql Query对象数组0-实体查询,1-记录数查询
	 * 
	 * @param session
	 * @param sql
	 * @param params
	 * @return
	 */
	SQLQuery[] createSqlQuery(Session session, String sql,
			Map<String, Object> params);

	void checkWriteOperationAllowed(HibernateTemplate template, Session session)
			throws InvalidDataAccessApiUsageException;

	/**
	 * 强制对当前代理对象读取,支持单对象,数组,集合等实体
	 * 
	 * @param proxyObject
	 * @return
	 */
	List<Object> initialize(Object proxyObject);

	/**
	 * 强制对象读取数,支持单对象,数组,集合等实体, 对象读取策略根据对象的关系路径
	 * ath格式:根模型属性名(符合属性,支持多对一和一对多的Set类型)/子模型属性名/增子属性名/... 学生/课程(一对多Set类型)/老师
	 * 
	 * @param proxyObject
	 * @param path
	 */
	void initialize(Object proxyObject, String path);

	/**
	 * 去除hql的order by 子句
	 * 
	 * @param hql
	 * @return
	 */
	String removeOrders(String hql);

	/**
	 * 去除hql的select 子句，未考虑union的情况
	 * 
	 * @param hql
	 * @return
	 */
	String removeSelect(String hql);
}
