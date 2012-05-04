package com.wind.core.dao.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.queryParser.MultiFieldQueryParser;
import org.apache.lucene.queryParser.ParseException;
import org.apache.lucene.util.Version;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.search.FullTextQuery;
import org.hibernate.search.FullTextSession;
import org.hibernate.search.Search;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.wind.core.dao.IDaoService;
import com.wind.core.dao.Page;
import com.wind.core.dao.util.IDaoUtils;
import com.wind.core.exception.DaoException;
import com.wind.core.exception.SystemException;

/**
 * DAO
 * 
 * @author fxy
 * 
 */
@SuppressWarnings( { "unchecked" })
public class DaoServiceImpl extends HibernateDaoSupport implements IDaoService {
	@SuppressWarnings("unused")
	private static final Log logger = LogFactory.getLog(DaoServiceImpl.class);

	private IDaoUtils daoUtils;

	public final static int DEFAULT_BATCH_SIZE = 25;

	@Override
	public <T> List<T> findAllByLucene(Page<T> page, Class<T> clazz,
			String key, String[] fields) {
		FullTextSession fullTextSession = Search.getFullTextSession(this
				.getSession());
		MultiFieldQueryParser parser = new MultiFieldQueryParser(
				Version.LUCENE_29, fields, new StandardAnalyzer(
						Version.LUCENE_29));
		org.apache.lucene.search.Query luceneQuery;
		try {
			luceneQuery = parser.parse(key);
			FullTextQuery fullQuery = fullTextSession.createFullTextQuery(
					luceneQuery, clazz);
			if (page != null) {
				page.setTotalCount(fullQuery.getResultSize());
				fullQuery.setFirstResult(page.getStart());
				fullQuery.setMaxResults(page.getPageSize());
			}
			return fullQuery.list();
		} catch (ParseException e) {
			SystemException.handleMessageException(e);
		}
		return new ArrayList<T>();
	}

	@Override
	public <T> List<T> findAllByCriterionAndOrder(Class<T> clazz, Order order,
			Criterion... criterion) {
		return findAllByCriterionAndOrder(null, clazz, order, criterion);
	}

	@Override
	public <T> List<T> findAllByCriterionAndOrder(Page<T> page, Class<T> clazz,
			Order order, Criterion... criterion) {
		Criteria criteria = daoUtils.createCriteria(getSession(), clazz, order,
				null, criterion);
		if (page != null)
			daoUtils.pageCriteria(criteria, page);
		return criteria.list();
	}

	@Override
	public List<?> executeNativeSql(String sql, Map<String, Object> params) {
		SQLQuery query = getSession().createSQLQuery(sql);
		query.setProperties(params);
		return query.list();
	}

	@Override
	public int executeNativeUpdateSql(String sql, Map<String, Object> params) {
		SQLQuery query = getSession().createSQLQuery(sql);
		query.setProperties(params);
		return query.executeUpdate();
	}

	@Override
	public <T> T get(Class<T> clazz, Serializable id) {
		return (T) this.getHibernateTemplate().get(clazz, id);
	}

	@Override
	public <T> T load(Class<T> clazz, Serializable id) {
		return (T) this.getHibernateTemplate().load(clazz, id);
	}

	@Override
	public <T> List<T> loadAll(Class<T> clazz) {
		return this.getHibernateTemplate().loadAll(clazz);
	}

	@Override
	public <T> T findByCriterion(Class<T> clazz, Criterion... criterion) {
		return findByCriterion(clazz, null, criterion);
	}

	@Override
	public <T> List<T> findAllByCriterion(Class<T> clazz,
			Criterion... criterion) {
		return findAllByCriterion(null, clazz, criterion);
	}

	@Override
	public <T> List<T> findAllByCriterion(Page<T> page, Class<T> clazz,
			Criterion... criterion) {
		return findAllByCriterion(page, clazz, null, criterion);
	}

	@Override
	public <T> List<T> findAllByCriterion(Class<T> clazz,
			ProjectionList proList, Criterion... criterion) {
		return findAllByCriterion(null, clazz, proList, criterion);
	}

	@Override
	public <T> List<T> findAllByCriterion(Page<T> page, Class<T> clazz,
			ProjectionList proList, Criterion... criterion) {
		Criteria criteria = daoUtils.createCriteria(getSession(), clazz,
				proList, criterion);
		if (page != null)
			daoUtils.pageCriteria(criteria, page);
		return criteria.list();
	}

	@Override
	public <T> T findByCriterion(Class<T> clazz, ProjectionList proList,
			Criterion... criterion) {
		return (T) daoUtils.createCriteria(getSession(), clazz, proList,
				criterion).uniqueResult();
	}

	@Override
	public <T> List<T> findByHql(Page<T> page, String hql,
			Map<String, Object> params) {
		Query[] queries = daoUtils.createQuery(getSession(), hql, params);
		if (page != null) {
			Long count = (Long) queries[1].uniqueResult();
			page.setTotalCount(count.intValue());
			queries[0].setFirstResult(page.getStart());
			queries[0].setMaxResults(page.getPageSize());

		}
		return queries[0].list();
	}

	@Override
	public List<?> findByHql(String hql, Map<String, Object> params) {
		return findByHql(null, hql, params);
	}

	@Override
	public <T> List<T> findByHqlQueryName(Page<T> page, String hqlQueryName,
			Map<String, Object> params) {
		String queryString = getSession().getNamedQuery(hqlQueryName)
				.getQueryString();
		Query[] queries = daoUtils.createQuery(getSession(), queryString,
				params);
		if (page != null) {
			Long count = (Long) queries[1].uniqueResult();
			page.setTotalCount(count.intValue());
			queries[0].setFirstResult(page.getStart());
			queries[0].setMaxResults(page.getPageSize());
		}
		return queries[0].list();
	}

	@Override
	public <T> List<T> findByHqlQueryName(String hqlQueryName,
			Map<String, Object> params) {
		return findByHqlQueryName(null, hqlQueryName, params);
	}

	@Override
	public <T> List<T> findBySqlQueryName(Page<T> page, String sqlQueryName,
			Map<String, Object> params) {
		SQLQuery[] queries = daoUtils.createSqlQuery(getSession(), getSession()
				.getNamedQuery(sqlQueryName).getQueryString(), params);
		if (queries == null) {
			DaoException.handleMessageException("can't found out the sqlquery["
					+ sqlQueryName + "]");
		}
		if (page != null) {
			Integer count = (Integer) queries[1].uniqueResult();
			page.setTotalCount(count);
			queries[0].setFirstResult(page.getStart());
			queries[0].setMaxResults(page.getPageSize());
		}
		return queries[0].list();
	}

	@Override
	public <T> List<T> findBySqlQueryName(String sqlQueryName,
			Map<String, Object> params) {
		return findBySqlQueryName(null, sqlQueryName, params);
	}

	@Override
	public void update(Object object) {
		try {
			this.getHibernateTemplate().update(object);
		} catch (Exception e) {
			DaoException.handleMessageException("", e);
		}
	}

	@Override
	public void updateAll(final Collection<?> objects) {
		saveOrUpdateAll(objects, "update");
	}

	@Override
	public void saveAll(Collection<?> objects) {
		saveOrUpdateAll(objects, "save");
	}

	@Override
	public void save(Object object) {
		try {
			this.getHibernateTemplate().save(object);
		} catch (Exception e) {
			DaoException.handleMessageException("", e);
		}
	}

	/**
	 * 批量保存或更新
	 * 
	 * @param objects
	 * @param type
	 */

	private void saveOrUpdateAll(final Collection<?> objects, final String type) {
		try {
			getHibernateTemplate().execute(new HibernateCallback() {
				Object[] objectArray = objects.toArray();

				public Object doInHibernate(Session session)
						throws HibernateException {
					daoUtils.checkWriteOperationAllowed(getHibernateTemplate(),
							session);
					if (objectArray == null) {
						return null;
					}
					int max = objects.size();
					for (int i = 0; i < max; i++) {
						if (type.equalsIgnoreCase("update")) {
							session.update(objectArray[i]);
						} else {
							session.save(objectArray[i]);
						}
						if ((i != 0 && i % DEFAULT_BATCH_SIZE == 0)
								|| i == max - 1) {
							session.flush();
							session.clear();
						}
					}
					return null;
				}
			});
		} catch (Exception e) {
			DaoException.handleMessageException(e.getMessage(), e);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wind.core.dao.IDaoService#delete(java.lang.Class,
	 * java.io.Serializable)
	 */
	@Override
	public <T> T delete(Class<T> clazz, Serializable id) {
		T obj = this.get(clazz, id);
		if (obj != null) {
			this.getHibernateTemplate().delete(obj);
			return obj;
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wind.core.dao.IDaoService#deleteAll(java.lang.Class,
	 * org.hibernate.criterion.Criterion[])
	 */
	@Override
	public <T> void deleteAll(Class<T> clazz, Criterion... criterion) {
		List<T> list = this.findAllByCriterion(clazz, criterion);
		if (list != null && list.size() > 0) {
			this.getHibernateTemplate().deleteAll(list);
		}

	}

	@Override
	public void initialize(Object proxyObject, String path) {
		daoUtils.initialize(proxyObject, path);
	}

	@Override
	public List<Object> initialize(Object proxyObject) {
		return daoUtils.initialize(proxyObject);
	}

	public IDaoUtils getDaoUtils() {
		return daoUtils;
	}

	public void setDaoUtils(IDaoUtils daoUtils) {
		this.daoUtils = daoUtils;
	}

	@Override
	public Session getHibernateSession() {
		return this.getSession();
	}

}
