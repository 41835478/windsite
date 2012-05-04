package com.wind.core.dao.util;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.FlushMode;
import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.PropertyProjection;
import org.hibernate.impl.CriteriaImpl;
import org.hibernate.impl.CriteriaImpl.Subcriteria;
import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.hibernate.transform.BasicTransformerAdapter;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.util.Assert;

import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.util.BeanUtils;

public class DaoUtils implements IDaoUtils {

	@SuppressWarnings("unchecked")
	public <T> void pageCriteria(Criteria criteria, Page<T> page) {
		CriteriaImpl impl = (CriteriaImpl) criteria;
		// 先把Projection和OrderBy条件取出来,清空两者来执行Count操作
		Projection projection = impl.getProjection();
		List<CriteriaImpl.OrderEntry> orderEntries = null;
		try {
			orderEntries = (List<CriteriaImpl.OrderEntry>) BeanUtils
					.forceGetProperty(impl, "orderEntries");
			BeanUtils.forceSetProperty(impl, "orderEntries", new ArrayList());
		} catch (Exception e) {
			SystemException.handleMessageException(
					" Runtime Exception impossibility throw ", e);
		}
		// 执行查询
		int totalCount = 0;
		Object result = criteria.setProjection(Projections.rowCount())
				.uniqueResult();
		try {
			if (result instanceof Long) {
				totalCount = ((Long) result).intValue();
			} else if (result instanceof Integer) {
				totalCount = (Integer) result;
			}
		} catch (Exception e) {
			e.printStackTrace();
			totalCount = 0;
		}
		// if (totalCount < 1)
		// return;
		// 将之前的Projection和OrderBy条件重新设回去
		criteria.setProjection(projection);
		if (projection == null) {// 非投影返回为Entity
			criteria.setResultTransformer(Criteria.ROOT_ENTITY);
		} else {// 投影返回类型为Map
			criteria
					.setResultTransformer(WindAliasToEntityMapResultTransformer.INSTANCE);
		}
		try {
			BeanUtils.forceSetProperty(impl, "orderEntries", orderEntries);
		} catch (Exception e) {
			throw new InternalError(" Runtime Exception impossibility throw ");
		}
		page.setTotalCount(totalCount);
		criteria.setFirstResult(page.getStart()).setMaxResults(
				page.getPageSize());
	}

	public Criteria createCriteria(Session session, Class<?> clazz,
			ProjectionList proList, Criterion... criterions) {
		Criteria criteria = session.createCriteria(clazz);
		if (criterions != null && criterions.length > 0) {
			for (Criterion c : criterions) {
				if (c != null)
					criteria.add(c);
			}
		}
		if (proList != null && proList.getLength() > 0) {
			createAssociationCriteria(criteria, proList);// 创建别名及关联关系
			criteria.setProjection(proList);// 设置投影
			criteria
					.setResultTransformer(WindAliasToEntityMapResultTransformer.INSTANCE);// 设置返回类型为Map
		}
		return criteria;
	}

	public Criteria createCriteria(Session session, Class<?> clazz,
			Order order, ProjectionList proList, Criterion... criterions) {
		Criteria criteria = session.createCriteria(clazz);
		if (criterions != null && criterions.length > 0) {
			for (Criterion c : criterions) {
				if (c != null)
					criteria.add(c);
			}
		}
		if (order != null) {
			criteria.addOrder(order);
		}
		if (proList != null && proList.getLength() > 0) {
			createAssociationCriteria(criteria, proList);// 创建别名及关联关系
			criteria.setProjection(proList);// 设置投影
			criteria
					.setResultTransformer(WindAliasToEntityMapResultTransformer.INSTANCE);// 设置返回类型为Map
		}
		return criteria;
	}

	public Query[] createQuery(Session session, String hql,
			Map<String, Object> params) {
		Query[] queries = new Query[2];
		Query queryObject = session.createQuery(hql);
		Query countQueryObject = countHql(session, hql);
		if (params != null) {
			queryObject.setProperties(params);
			countQueryObject.setProperties(params);
		}
		queries[0] = queryObject;
		queries[1] = countQueryObject;
		return queries;
	}

	public SQLQuery[] createSqlQuery(Session session, String sql,
			Map<String, Object> params) {
		SQLQuery[] queries = new SQLQuery[2];
		SQLQuery queryObject = session.createSQLQuery(sql);
		SQLQuery countQueryObject = countSql(session, sql);
		if (params != null) {
			queryObject.setProperties(params);
			countQueryObject.setProperties(params);
		}
		queries[0] = queryObject;
		queries[1] = countQueryObject;
		return queries;
	}

	/**
	 * 查询总页数
	 * 
	 * @param hql
	 * @param params
	 * @return
	 */
	protected Query countHql(Session session, String hql) {
		String hqlCount = " select count (*) "
				+ removeSelect(removeOrders(hql));
		Query query = session.createQuery(hqlCount);
		return query;
	}

	/**
	 * 查询总页数
	 * 
	 * @param hql
	 * @param params
	 * @return
	 */
	protected SQLQuery countSql(Session session, String sql) {
		StringBuilder builder = new StringBuilder();
		builder.append("select count(*) countnum from (").append(sql).append(
				") t");
		SQLQuery query = session.createSQLQuery(builder.toString());
		return query;
	}

	@SuppressWarnings("deprecation")
	public void checkWriteOperationAllowed(HibernateTemplate template,
			Session session) throws InvalidDataAccessApiUsageException {
		if (template.isCheckWriteOperations()
				&& template.getFlushMode() != HibernateTemplate.FLUSH_EAGER
				&& FlushMode.NEVER.equals(session.getFlushMode())) {
			throw new InvalidDataAccessApiUsageException(
					"Write operations are not allowed in read-only mode (FlushMode.NEVER) - turn your Session "
							+ "into FlushMode.AUTO or remove 'readOnly' marker from transaction definition");
		}
	}

	public String removeOrders(String hql) {
		Assert.hasText(hql);
		Pattern p = Pattern.compile("order\\s*by[\\w|\\W|\\s|\\S]*",
				Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(hql);
		StringBuffer buffer = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(buffer, "");
		}
		m.appendTail(buffer);
		return buffer.toString();
	}

	public String removeSelect(String hql) {
		Assert.hasText(hql);
		int beginPos = hql.toLowerCase().indexOf("from");
		Assert.isTrue(beginPos != -1, " hql : " + hql
				+ " must has a keyword 'from'");
		return hql.substring(beginPos);
	}

	/**
	 * 强制对当前对象读取数,支持单对象,数组,集合等实体
	 * 
	 * @param proxyObject
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Object> initialize(Object proxyObject) {
		List<Object> proxyList = new ArrayList<Object>();
		if (proxyObject instanceof Object[]) {// 数组类型
			proxyList = Arrays.asList(proxyObject);
		} else if (proxyObject instanceof Collection) {// 集合类型
			proxyList = new ArrayList<Object>((Collection) proxyObject);
		} else {// 单个实体
			proxyList.add(proxyObject);
		}
		if (proxyList != null && proxyList.size() > 0) {
			for (Object proxy : proxyList) {
				if (!Hibernate.isInitialized(proxy))
					Hibernate.initialize(proxy);
			}
		}
		return proxyList;
	}

	/**
	 * 强制对象读取数,支持单对象,数组,集合等实体, 对象读取策略根据对象的关系路径
	 * path格式:根模型属性名(符合属性,支持多对一和一对多的Set类型)/子模型属性名/增子属性名/... 学生/课程(一对多Set类型)/老师
	 * 
	 * @param proxy
	 *            Object
	 * @param path
	 *            String
	 * @throws Exception
	 */

	public void initialize(Object proxyObject, String path) {
		String[] propertyNames = StringUtils.split(path, "/");
		if (propertyNames != null && propertyNames.length > 0) {
			Object proxy = null;
			for (int i = 0; i < propertyNames.length; i++) {
				if (proxy == null) {
					proxy = proxyObject;
				}
				proxy = initializeProperty(proxy, propertyNames[i]);
			}

		}

	}

	@SuppressWarnings("unchecked")
	public List<Object> initializeProperty(Object proxyObject, String property) {
		List<Object> proxyList = new ArrayList<Object>();
		if (proxyObject instanceof Object[]) {// 数组类型
			proxyList = Arrays.asList(proxyObject);
		} else if (proxyObject instanceof Collection) {// 集合类型
			proxyList = new ArrayList<Object>((Collection) proxyObject);
		} else {// 单个实体
			proxyList.add(proxyObject);
		}
		List<Object> result = new ArrayList<Object>();
		if (proxyList != null && proxyList.size() > 0) {
			for (Object proxy : proxyList) {
				if (!Hibernate.isInitialized(proxy))
					Hibernate.initialize(proxy);
				Object proxyProperty = null;
				String name = proxy.getClass().getName();
				if (name.indexOf("_$$") != -1) {// 处理Javassist
					name = name.substring(0, name.indexOf("_$$"));
				}
				// TODO 暂时屏蔽
				// FastClass fast = WindSessionFactory.getPoClass(name);
				// String methodName = "get" + property.substring(0,
				// 1).toUpperCase() + property.substring(1, property.length());
				// try {
				// proxyProperty = fast.getMethod(methodName,
				// null).invoke(proxy, null);
				// } catch (InvocationTargetException e) {
				// SystemException.handleMessageException("can't found the property["
				// + property + "]", e);
				// }
				result.addAll(initialize(proxyProperty));
			}
		}
		return result;
	}

	private Criteria createAssociationCriteria(Criteria criteria,
			ProjectionList proList) {
		for (int i = 0; i < proList.getLength(); i++) {
			Projection projection = proList.getProjection(i);
			if (projection instanceof PropertyProjection) {
				PropertyProjection pro = (PropertyProjection) proList
						.getProjection(i);
				proList.add(pro.as("_" + pro.getPropertyName()));// 设置别名
				if (pro.getPropertyName().indexOf(".") != -1) {// 设置关联关系
					String[] properties = pro.getPropertyName().split("\\.");// 需转义
					String alias = null;
					for (int j = 0; j < properties.length - 1; j++) {
						if (alias == null) {
							alias = properties[j];
						} else {
							alias += "." + properties[j];
						}
						createAssociationCriteria(criteria, properties[j],
								alias);
					}
				}
			}
		}
		return criteria;
	}

	@SuppressWarnings("unchecked")
	private Criteria createAssociationCriteria(Criteria criteria,
			String property, String alias) {
		CriteriaImpl impl = (CriteriaImpl) criteria;
		if (property == null)
			return impl;
		for (Iterator<Subcriteria> iter = impl.iterateSubcriteria(); iter
				.hasNext();) {// 检测别名是否已存在
			if (property.equals(iter.next().getPath()))
				return criteria;
		}
		return impl.createAlias(property, alias);
	}

}

/**
 * 自定义解析返回Map,解决投影别名与条件冲突问题
 * 
 * @author fxy
 * 
 */
class WindAliasToEntityMapResultTransformer extends BasicTransformerAdapter
		implements Serializable {

	private static final long serialVersionUID = 4592548936606613998L;

	public static final WindAliasToEntityMapResultTransformer INSTANCE = new WindAliasToEntityMapResultTransformer();

	private WindAliasToEntityMapResultTransformer() {
	}

	public Object transformTuple(Object[] tuple, String[] aliases) {
		Map<String, Object> result = new HashMap<String, Object>(tuple.length);
		for (int i = 0; i < tuple.length; i++) {
			String alias = aliases[i];
			if (alias != null) {// Hack the conflict of Projection with
				// Criterion
				if (alias.startsWith("_")) {
					result.put(alias.substring(1, alias.length()), tuple[i]);
				} else {
					result.put(alias, tuple[i]);
				}
			}
		}
		return result;
	}

	private Object readResolve() {
		return INSTANCE;
	}

	public boolean equals(Object other) {
		return other != null
				&& AliasToEntityMapResultTransformer.class.isInstance(other);
	}

	public int hashCode() {
		return getClass().getName().hashCode();
	}
}
