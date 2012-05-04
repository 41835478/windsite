package com.wind.core.dao;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;

/**
 * Dao接口
 * 
 * @author fxy
 * 
 */
public interface IDaoService {

	/**
	 * Hibernate Search 分页查询
	 * 
	 * @param <T>
	 * @param page
	 * @param clazz
	 * @param key
	 * @param fields
	 * @return
	 */
	<T> List<T> findAllByLucene(Page<T> page, Class<T> clazz, String key,
			String[] fields);

	/**
	 * 执行本地SQL
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	List<?> executeNativeSql(String sql, Map<String, Object> params);

	/**
	 * 执行本地SQL(更新)
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	int executeNativeUpdateSql(String sql, Map<String, Object> params);

	/**
	 * 返回HibernateSession
	 * 
	 * @return
	 */
	Session getHibernateSession();

	/**
	 * 返回实体对象,不存在则返回NULL(不能利用二级缓存)
	 * 
	 * @param <T>
	 *            实体类型
	 * @param clazz
	 *            实体Class
	 * @param id
	 *            标识ID
	 * @return
	 */
	<T> T get(Class<T> clazz, Serializable id);

	/**
	 * 返回一个代理对象,不存在则抛出异常(可利用二级缓存)
	 * 
	 * @param <T>
	 *            实体类型
	 * @param clazz
	 *            实体Class
	 * @param id
	 *            标识ID
	 * @return
	 */
	<T> T load(Class<T> clazz, Serializable id);

	/**
	 * 查询所有实体
	 * 
	 * @param <T>
	 *            实体类型
	 * @param clazz
	 *            实体Class
	 * @return
	 */
	<T> List<T> loadAll(Class<T> clazz);

	/**
	 * 查询所有实体
	 * 
	 * @param <T>
	 *            实体类型
	 * @param clazz
	 *            实体Class
	 * @param criterion
	 *            条件数组
	 * @return
	 */
	<T> List<T> findAllByCriterion(Class<T> clazz, Criterion... criterion);

	/**
	 * 查询所有实体
	 * 
	 * @param <T>
	 *            实体类型
	 * @param clazz
	 *            实体Class
	 * @param criterion
	 *            条件数组
	 * @return
	 */
	<T> List<T> findAllByCriterionAndOrder(Class<T> clazz, Order order,
			Criterion... criterion);

	/**
	 * 投影查询所有实体
	 * 
	 * @param <T>
	 * @param clazz
	 * @param proList
	 * @param criterion
	 * @return
	 */
	<T> List<T> findAllByCriterion(Class<T> clazz, ProjectionList proList,
			Criterion... criterion);

	/**
	 * 查询单个实体
	 * 
	 * @param <T>
	 *            实体类型
	 * @param clazz
	 *            实体Class
	 * @param criterion
	 *            条件数组
	 * @return
	 */
	<T> T findByCriterion(Class<T> clazz, Criterion... criterion);

	/**
	 * 投影查询单个实体
	 * 
	 * @param <T>
	 * @param clazz
	 * @param proList
	 * @param criterion
	 * @return
	 */
	<T> T findByCriterion(Class<T> clazz, ProjectionList proList,
			Criterion... criterion);

	/**
	 * 分页查询实体
	 * 
	 * @param <T>
	 *            实体类型
	 * @param page
	 *            分页类
	 * @param clazz
	 *            实体Class
	 * @param criterion
	 *            条件数组
	 * @return
	 */
	<T> List<T> findAllByCriterionAndOrder(Page<T> page, Class<T> clazz,
			Order order, Criterion... criterion);

	/**
	 * 分页查询实体
	 * 
	 * @param <T>
	 *            实体类型
	 * @param page
	 *            分页类
	 * @param clazz
	 *            实体Class
	 * @param criterion
	 *            条件数组
	 * @return
	 */
	<T> List<T> findAllByCriterion(Page<T> page, Class<T> clazz,
			Criterion... criterion);

	/**
	 * 投影分页查询实体
	 * 
	 * @param <T>
	 * @param page
	 * @param clazz
	 * @param proList
	 * @param criterion
	 * @return
	 */
	<T> List<T> findAllByCriterion(Page<T> page, Class<T> clazz,
			ProjectionList proList, Criterion... criterion);

	/**
	 * 
	 * @param <T>
	 *            实体类型
	 * @param page
	 *            分页类
	 * @param hql
	 *            HQL
	 * @param params
	 *            参数Map
	 * @return
	 */
	<T> List<T> findByHql(Page<T> page, String hql, Map<String, Object> params);

	/**
	 * 
	 * @param <T>
	 *            实体类型
	 * @param hql
	 *            HQL
	 * @param params
	 *            参数Map
	 * @return
	 */
	List<?> findByHql(String hql, Map<String, Object> params);

	/**
	 * 
	 * @param <T>
	 *            实体类型
	 * @param page
	 *            分页类
	 * @param hqlQueryName
	 *            Hql Query Name
	 * @param params
	 *            参数Map
	 * @return
	 */
	<T> List<T> findByHqlQueryName(Page<T> page, String hqlQueryName,
			Map<String, Object> params);

	/**
	 * 
	 * @param <T>
	 *            返回类型
	 * @param hqlQueryName
	 *            Hql Query Name
	 * @param params
	 *            参数Map
	 * @return
	 */
	<T> List<T> findByHqlQueryName(String hqlQueryName,
			Map<String, Object> params);

	/**
	 * 
	 * @param <T>
	 *            实体类型
	 * @param page
	 *            分页类
	 * @param sqlQueryName
	 *            Sql Query Name
	 * @param params
	 *            参数Map
	 * @return
	 */
	<T> List<T> findBySqlQueryName(Page<T> page, String sqlQueryName,
			Map<String, Object> params);

	/**
	 * 
	 * @param <T>
	 *            返回类型
	 * @param sqlQueryName
	 *            Sql Query Name
	 * @param params
	 *            参数Map
	 * @return
	 */
	<T> List<T> findBySqlQueryName(String sqlQueryName,
			Map<String, Object> params);

	/**
	 * 更新对象
	 * 
	 * @param object
	 */
	void update(Object object);

	/**
	 * 批量更新对象
	 * 
	 * @param objects
	 */
	void updateAll(Collection<?> objects);

	/**
	 * 保存对象
	 * 
	 * @param object
	 */
	void save(Object object);

	/**
	 * 批量保存对象
	 * 
	 * @param Objects
	 */
	void saveAll(Collection<?> Objects);

	/**
	 * 删除指定ID对象
	 * 
	 * @param id
	 */
	<T> T delete(Class<T> clazz, Serializable id);

	/**
	 * 删除满足条件的所有对象
	 * 
	 * @param <T>
	 * @param clazz
	 * @param criterion
	 */
	<T> void deleteAll(Class<T> clazz, Criterion... criterion);

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
}
