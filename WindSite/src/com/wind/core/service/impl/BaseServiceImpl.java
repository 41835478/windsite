package com.wind.core.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.R;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.dao.IDaoService;
import com.wind.core.dao.Page;
import com.wind.core.service.IBaseService;
import com.wind.site.command.TaobaoSessionCommand;
import com.wind.site.model.AD;
import com.wind.site.model.PageDetailLayout;
import com.wind.site.model.PageSearchLayout;
import com.wind.site.model.SiteCommission;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.SiteTheme;

/**
 * Service基类实现
 * 
 * @author fxy
 * 
 */
@Transactional
public class BaseServiceImpl implements IBaseService {
	private static final Logger logger = Logger.getLogger(BaseServiceImpl.class
			.getName());
	private IDaoService daoService;

	@Override
	public Map<String, List<Map<String, Object>>> getAds(String userId) {
		Map<String, List<Map<String, Object>>> result = new HashMap<String, List<Map<String, Object>>>();
		// 日志右侧
		List<AD> ads = this.findAllByCriterion(AD.class,
				R.eq("pageType", AD.BLOG_RIGHT), R.eq("isValid", true),
				R.eq("user_id", userId));
		List<Map<String, Object>> br = new ArrayList<Map<String, Object>>();
		Map<String, Object> ad = null;
		if (ads != null && ads.size() > 0) {
			for (AD a : ads) {
				ad = new HashMap<String, Object>();
				ad.put("adType", a.getAdType());
				ad.put("adMeta", new Gson().fromJson(a.getAdMeta(),
						new TypeToken<Map<String, String>>() {
						}.getType()));
				br.add(ad);
			}
		}
		result.put(AD.BLOG_RIGHT, br);// 存储日志右侧广告位列表
		// 画报内容顶部
		ads = this.findAllByCriterion(AD.class,
				R.eq("pageType", AD.HUABAO_TOP), R.eq("isValid", true),
				R.eq("user_id", userId));
		br = new ArrayList<Map<String, Object>>();
		if (ads != null && ads.size() > 0) {
			for (AD a : ads) {
				ad = new HashMap<String, Object>();
				ad.put("adType", a.getAdType());
				ad.put("adMeta", new Gson().fromJson(a.getAdMeta(),
						new TypeToken<Map<String, String>>() {
						}.getType()));
				br.add(ad);
			}
		}
		result.put(AD.HUABAO_TOP, br);// 存储画报内容顶部广告位列表
		return result;
	}

	@Override
	@Transactional(readOnly = true)
	public SiteImpl getSiteImplByUserId(String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("user_id", userId);
		org.hibernate.Query query = this.getHibernateSession().getNamedQuery(
				"findSiteImplByUserIdNativeSQL");
		query.setProperties(map);
		SiteImpl impl = null;
		try {
			impl = (SiteImpl) query.uniqueResult();
		} catch (Exception e) {
			logger.info("siteimpl[" + userId + "] is error");
		}

		if (impl != null && impl.getVersionNo() != null
				&& impl.getVersionNo() >= 2) {// 如果已绑定顶级域名并且版本是返利，卖家版
			impl.setAds(getAds(userId));// 广告位
			SiteCommission sc = this.get(SiteCommission.class, impl.getSid());
			if (sc != null) {
				impl.setBulletin(sc.getBulletin());
				impl.setStatement(sc.getStatement());
				impl.setBaiduTongJi(sc.getBaiduTongJi());
				impl.setAdCommissionRate(sc.getAdCommissionRate());
				impl.setCommissionRate(sc.getCommissionRate());
				impl.setSite_isLogin((sc.getIsLogin() != null && sc
						.getIsLogin()) ? "true" : "false");
				impl.setSite_ico(sc.getIco());
				impl.setIsAd(sc.getIsAd());
				impl.setSite_searchView(sc.getSearchView());
				impl.setYiqifa_sid(sc.getYiqifa_sid());
				impl.setYiqifa_username(sc.getYiqifa_username());
				impl.setYiqifa_secret(sc.getYiqifa_secret());

				impl.setSina_appkey(sc.getSina_appkey());
				impl.setTaobao_appkey(impl.getAppKey());
				impl.setQq_appkey(sc.getQq_appkey());
				impl.setSina_appsecret(sc.getSina_appsecret());
				impl.setTaobao_appsecret(impl.getAppSecret());
				impl.setQq_appsecret(sc.getQq_appsecret());
				impl.setUyan(sc.getUyan());

				try {
					PageDetailLayout detailLayout = this.findByCriterion(
							PageDetailLayout.class,
							R.eq("site_id", impl.getSid()));
					if (detailLayout != null) {
						impl.setSite_detailLayout(detailLayout.getLayout());
					}
					PageSearchLayout searchLayout = this.findByCriterion(
							PageSearchLayout.class,
							R.eq("site_id", impl.getSid()));
					if (searchLayout != null) {
						impl.setSite_searchLayout(searchLayout.getLayout());
					}
					impl.setSite_searchBox((sc.getSearchBox() != null && !sc
							.getSearchBox()) ? "false" : "true");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		if (impl != null) {
			SiteTheme theme = this.get(SiteTheme.class, impl.getSid());
			if (theme != null) {
				impl.setSite_skin(theme.getSkin());
				impl.setSite_theme(((theme.getTheme() != null ? theme
						.getTheme() : "") + ""));
			}
		}
		return impl;
	}

	public void setDaoService(IDaoService daoService) {
		this.daoService = daoService;
	}

	public IDaoService getDaoService() {
		return daoService;
	}

	@Override
	public Session getHibernateSession() {
		return daoService.getHibernateSession();
	}

	@Override
	public <T> List<T> findAllByCriterionAndOrder(Class<T> clazz, Order order,
			Criterion... criterion) {
		return daoService.findAllByCriterionAndOrder(clazz, order, criterion);
	}

	@Override
	public <T> List<T> findAllByCriterionAndOrder(Page<T> page, Class<T> clazz,
			Order order, Criterion... criterion) {
		return daoService.findAllByCriterionAndOrder(page, clazz, order,
				criterion);
	}

	@Transactional
	@Override
	public <T> List<T> findAllByLucene(Page<T> page, Class<T> clazz,
			String key, String[] fields) {
		return daoService.findAllByLucene(page, clazz, key, fields);
	}

	@Transactional
	@Override
	public List<?> executeNativeSql(String sql, Map<String, Object> params) {
		return daoService.executeNativeSql(sql, params);
	}

	@Override
	public int executeNativeUpdateSql(String sql, Map<String, Object> params) {
		return daoService.executeNativeUpdateSql(sql, params);
	}

	@Transactional
	@Override
	public <T> List<T> findAllByCriterion(Class<T> clazz,
			Criterion... criterion) {
		List<T> list = this.daoService.findAllByCriterion(clazz, criterion);
		this.initialize(list);
		return list;
	}

	@Transactional
	@Override
	public <T> List<T> findAllByCriterion(Class<T> clazz,
			ProjectionList proList, Criterion... criterion) {
		List<T> list = this.daoService.findAllByCriterion(clazz, proList,
				criterion);
		this.initialize(list);
		return list;
	}

	@Transactional
	@Override
	public <T> List<T> findAllByCriterion(Page<T> page, Class<T> clazz,
			Criterion... criterion) {
		List<T> list = this.daoService.findAllByCriterion(page, clazz,
				criterion);
		this.initialize(list);
		return list;
	}

	@Transactional
	@Override
	public <T> List<T> findAllByCriterion(Page<T> page, Class<T> clazz,
			ProjectionList proList, Criterion... criterion) {
		List<T> list = this.daoService.findAllByCriterion(page, clazz, proList,
				criterion);
		this.initialize(list);
		return list;
	}

	@Transactional
	@Override
	public <T> T findByCriterion(Class<T> clazz, Criterion... criterion) {
		T obj = this.daoService.findByCriterion(clazz, criterion);
		this.initialize(obj);
		return obj;
	}

	@Transactional
	@Override
	public <T> T findByCriterion(Class<T> clazz, ProjectionList proList,
			Criterion... criterion) {
		T obj = this.daoService.findByCriterion(clazz, proList, criterion);
		this.initialize(obj);
		return obj;
	}

	@Transactional
	@Override
	public <T> List<T> findByHql(Page<T> page, String hql,
			Map<String, Object> params) {
		List<T> list = this.daoService.findByHql(page, hql, params);
		this.initialize(list);
		return list;
	}

	@Transactional
	@Override
	public List<?> findByHql(String hql, Map<String, Object> params) {
		List<?> list = this.daoService.findByHql(hql, params);
		this.initialize(list);
		return list;
	}

	@Transactional
	@Override
	public <T> List<T> findByHqlQueryName(Page<T> page, String hqlQueryName,
			Map<String, Object> params) {
		List<T> list = this.daoService.findByHqlQueryName(page, hqlQueryName,
				params);
		this.initialize(list);
		return list;
	}

	@Transactional
	@Override
	public <T> List<T> findByHqlQueryName(String hqlQueryName,
			Map<String, Object> params) {
		List<T> list = this.daoService.findByHqlQueryName(hqlQueryName, params);
		this.initialize(list);
		return list;
	}

	@Transactional
	@Override
	public <T> List<T> findBySqlQueryName(Page<T> page, String sqlQueryName,
			Map<String, Object> params) {
		List<T> list = this.daoService.findBySqlQueryName(page, sqlQueryName,
				params);
		this.initialize(list);
		return list;
	}

	@Transactional
	@Override
	public <T> List<T> findBySqlQueryName(String sqlQueryName,
			Map<String, Object> params) {
		List<T> list = this.daoService.findBySqlQueryName(sqlQueryName, params);
		this.initialize(list);
		return list;
	}

	@Transactional
	@Override
	public <T> T get(Class<T> clazz, Serializable id) {
		T obj = this.daoService.get(clazz, id);
		this.initialize(obj);
		return obj;
	}

	@Transactional
	@Override
	public List<Object> initialize(Object proxyObject) {

		return this.daoService.initialize(proxyObject);
	}

	@Transactional
	@Override
	public void initialize(Object proxyObject, String path) {
		this.daoService.initialize(proxyObject, path);
	}

	@Transactional
	@Override
	public <T> T load(Class<T> clazz, Serializable id) {
		T obj = this.daoService.load(clazz, id);
		this.initialize(obj);
		return obj;
	}

	@Transactional
	@Override
	public <T> List<T> loadAll(Class<T> clazz) {
		List<T> list = this.daoService.loadAll(clazz);
		this.initialize(list);
		return list;
	}

	@Transactional
	@Override
	public void save(Object object) {
		this.daoService.save(object);
	}

	@Transactional
	@Override
	public void saveAll(Collection<?> Objects) {
		this.daoService.saveAll(Objects);
	}

	@Transactional
	@Override
	public void update(Object object) {
		this.daoService.update(object);
	}

	@Transactional
	@Override
	public void updateAll(Collection<?> objects) {
		this.daoService.updateAll(objects);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wind.core.dao.IDaoService#delete(java.lang.Class,
	 * java.io.Serializable)
	 */
	@Transactional
	@Override
	public <T> T delete(Class<T> clazz, Serializable id) {
		return this.daoService.delete(clazz, id);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wind.core.dao.IDaoService#deleteAll(java.lang.Class,
	 * org.hibernate.criterion.Criterion[])
	 */
	@Transactional
	@Override
	public <T> void deleteAll(Class<T> clazz, Criterion... criterion) {
		this.daoService.deleteAll(clazz, criterion);

	}

}
