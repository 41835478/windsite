package com.wind.site.service.impl;

import java.net.URLEncoder;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.queryParser.MultiFieldQueryParser;
import org.apache.lucene.queryParser.ParseException;
import org.apache.lucene.search.Query;
import org.apache.lucene.util.Version;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.R;
import org.hibernate.search.FullTextQuery;
import org.hibernate.search.FullTextSession;
import org.hibernate.search.Search;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import sun.misc.BASE64Encoder;

import com.taobao.api.domain.ArticleBizOrder;
import com.taobao.api.domain.ArticleUserSubscribe;
import com.taobao.api.domain.Shop;
import com.taobao.api.domain.ShopScore;
import com.taobao.api.domain.TaobaokeShop;
import com.taobao.api.request.TaobaokeCaturlGetRequest;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.service.impl.BaseServiceImpl;
import com.wind.site.command.CommandExecutor;
import com.wind.site.command.impl.ReportsGetCommand;
import com.wind.site.command.impl.UnvalidCommand;
import com.wind.site.command.impl.UpdateUserTemplateByUserIdCommand;
import com.wind.site.env.EnvManager;
import com.wind.site.freemarker.IDeployZone;
import com.wind.site.freemarker.method.ModuleMethod;
import com.wind.site.freemarker.method.WidgetCustomerMethod;
import com.wind.site.model.ADPlan;
import com.wind.site.model.ADTaobaokeItem;
import com.wind.site.model.FanliClass;
import com.wind.site.model.Huabao;
import com.wind.site.model.Limit;
import com.wind.site.model.Member;
import com.wind.site.model.MemberInfo;
import com.wind.site.model.NewWeiboSysConfig;
import com.wind.site.model.Site;
import com.wind.site.model.SiteCommission;
import com.wind.site.model.T_Poster;
import com.wind.site.model.T_TaobaokeShop;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.model.User;
import com.wind.site.model.WeiboDomainHistory;
import com.wind.site.model.WeiboSysConfig;
import com.wind.site.service.IPageService;
import com.wind.site.service.ISiteService;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.weibo.config.impl.WeiboConfigImpl;

/**
 * Site服务类
 * 
 * @author fxy
 * 
 */
public class SiteServiceImpl extends BaseServiceImpl implements ISiteService {
	private static final Logger logger = Logger.getLogger(SiteServiceImpl.class
			.getName());

	@Override
	public void addNewWeiboSysConfig(NewWeiboSysConfig config,
			FreeMarkerConfigurer fcg, Site site) {
		this.save(config);
		WeiboDomainHistory dh = new WeiboDomainHistory();
		dh.setIcp(config.getSite_record());
		dh.setNick(config.getNick());
		dh.setSite_id(config.getSite_id());
		dh.setStatus(0);
		dh.setTdomain(site.getWww().replaceFirst("www.", "t."));
		dh.setUser_id(config.getUser_id());
		this.save(dh);
		// TODO 部署静态
		// WeiboConfigImpl.deployWeiboSysConfig(fcg, config, site);
	}

	@Override
	public void addWeiboSysConfig(WeiboSysConfig config,
			FreeMarkerConfigurer fcg, Site site) {
		this.save(config);
		WeiboDomainHistory dh = new WeiboDomainHistory();
		dh.setIcp(config.getSite_record());
		dh.setNick(config.getNick());
		dh.setSite_id(config.getSite_id());
		dh.setStatus(0);
		dh.setTdomain(site.getWww().replaceFirst("www.", "t."));
		dh.setUser_id(config.getUser_id());
		this.save(dh);
		WeiboConfigImpl.deployWeiboSysConfig(fcg, config, site);
	}

	@Override
	public void updateWeiboSysConfig(WeiboSysConfig config,
			FreeMarkerConfigurer fcg, Site site) {
		this.update(config);
		WeiboConfigImpl.deployWeiboSysConfig(fcg, config, site);
	}

	@Override
	public void registeMember(Member member, Long parentId) {
		if (parentId != null) {
			try {
				Member parent = this.get(Member.class, parentId);
				if (parent != null
						&& parent.getUser_id().equals(member.getUser_id())) {// 设置推广人，增加推广人推广计数
					member.setParentId(parentId);
					member.setParentUserName(parent.getInfo().getUsername());
					Integer nums = parent.getNums();
					if (nums == null) {
						nums = 0;
					}
					parent.setNums(nums + 1);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		this.save(member);
	}

	@Override
	public Member validateFanliMember(String nick, String username,
			String password, String siteId, String userId) {
		Member member = null;
		MemberInfo info = this.findByCriterion(MemberInfo.class, R.eq(
				"username", username));
		if (info != null) {// 会员资料
			if (password.equals(info.getPwd())) {
				member = this.findByCriterion(Member.class, R.eq("info", info),
						R.eq("user_id", userId), R.eq("site_id", siteId));
				if (member == null) {// 新增该会员为当前站点
					member = new Member();
					member.setInfo(info);// 设置基本信息
					member.setNick(nick);
					member.setUser_id(userId);
					member.setSite_id(siteId);
					member.setCreated(new Date());
					member.setIsOnline(true);
					member.setLastVisit(new Date());
					member.setNums(0);
					member.setType(0);
					member.setVisits(1);
					this.save(member);
				} else {// 会员已存在当前站点
					member.setLastVisit(new Date());// 设置最后访问时间
					Integer visits = member.getVisits();
					if (visits == null) {
						visits = 0;
					}
					member.setVisits(visits + 1);// 设置访问次数
					member.setIsOnline(true);// 设置在线状态
				}
				return member;
			} else {
				SystemException.handleMessageException("用户名对应的密码错误");
			}
		} else {
			SystemException.handleMessageException("用户名不存在");
		}
		return member;
	}

	@Override
	public Member validateCookieFanliMember(String nick, String username,
			String password, String siteId, String userId) {
		Member member = null;
		MemberInfo info = this.findByCriterion(MemberInfo.class, R.eq(
				"username", username));
		if (info != null) {// 会员资料
			// 密码对比
			MessageDigest md5;
			try {
				md5 = MessageDigest.getInstance("MD5");
				byte[] bytes = md5.digest(info.getPwd().toString().getBytes(
						"UTF-8"));
				BASE64Encoder encode = new BASE64Encoder();
				String pwd = URLEncoder.encode(encode.encode(bytes), "UTF-8");
				if (password.equals(pwd)) {
					member = this.findByCriterion(Member.class, R.eq("info",
							info), R.eq("user_id", userId), R.eq("site_id",
							siteId));
					if (member == null) {// 新增该会员为当前站点
						member = new Member();
						member.setInfo(info);// 设置基本信息
						member.setNick(nick);
						member.setUser_id(userId);
						member.setSite_id(siteId);
						member.setCreated(new Date());
						member.setIsOnline(true);
						member.setLastVisit(new Date());
						member.setNums(0);
						member.setType(0);
						member.setVisits(1);
						this.save(member);
					} else {// 会员已存在当前站点
						member.setLastVisit(new Date());// 设置最后访问时间
						Integer visits = member.getVisits();
						if (visits == null) {
							visits = 0;
						}
						member.setVisits(visits + 1);// 设置访问次数
						member.setIsOnline(true);// 设置在线状态
					}
					return member;
				} else {
					SystemException.handleMessageException("用户名对应的密码错误");
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

		} else {
			SystemException.handleMessageException("用户名不存在");
		}
		return member;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ADTaobaokeItem> getRelatePlans(String id, Integer limit) {
		Map<String, Object> params = new HashMap<String, Object>();
		Integer plansCount = ((Long) this.findByHql(
				"select count(t) from ADPlan t", new HashMap<String, Object>())
				.get(0)).intValue();
		params.put("id", id);
		String sql = "SELECT B.pid, B.tid, SUM( LOG( "
				+ plansCount
				+ " / C.nums ) ) AS weight FROM w_ad_plans_tags AS A LEFT JOIN w_ad_plans_tags AS B ON A.tid = B.tid LEFT JOIN w_ad_plantag AS C ON B.tid = C.id WHERE A.pid =:id AND B.pid !=:id GROUP BY B.pid ORDER BY weight DESC limit "
				+ limit;
		List<Object[]> result = (List<Object[]>) this.executeNativeSql(sql,
				params);
		String ids = "";
		boolean isFirst = true;
		List<ADTaobaokeItem> items = new ArrayList<ADTaobaokeItem>();
		if (result != null && result.size() > 0) {
			for (Object[] obj : result) {
				if (isFirst) {
					isFirst = false;
				} else {
					ids += ",";
				}
				ids += "'" + obj[0] + "'";
			}
			sql = "select itemid from w_ad_plan where id in (" + ids + ")";
		} else {
			sql = "select itemid from w_ad_plan where isValid=1 order by created desc limit "
					+ limit;
		}
		List<String> iids = (List<String>) this.executeNativeSql(sql,
				new HashMap<String, Object>());
		if (iids != null && iids.size() > 0) {
			ids = "";
			isFirst = true;
			for (String itemid : iids) {
				if (isFirst) {
					isFirst = false;
				} else {
					ids += ",";
				}
				ids += "'" + itemid + "'";
			}
		}
		items = (List<ADTaobaokeItem>) this.findByHql(
				"from ADTaobaokeItem where id in (" + ids + ")",
				new HashMap<String, Object>());
		return items;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ADPlan> getADPlan(String ids) {
		String planHql = "from ADPlan where id in (" + ids + ")";
		List<ADPlan> plans = (List<ADPlan>) this.findByHql(planHql,
				new HashMap<String, Object>());
		if (plans != null && plans.size() > 0) {
			for (ADPlan plan : plans) {
				this.initialize(plan.getItems());
			}
		}
		return plans;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Huabao> getHuabaoData(Integer hid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", hid);
		List<Huabao> hbs = (List<Huabao>) this.findByHql(
				"from Huabao where hid=:id order by picId", params);
		for (Huabao h : hbs) {
			this.initialize(h.getMarkedItem());
		}
		return hbs;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> getRandomHuabao(Integer limit) {
		Map<String, Object> params = new HashMap<String, Object>();
		String sql = "SELECT t1.id,t1.name,t1.cover,t1.shortname FROM t_huabaos AS t1 JOIN (SELECT ROUND(RAND() * (SELECT MAX(id) FROM  t_huabaos)) AS id) AS t2 WHERE t1.id >= t2.id ORDER BY t1.id ASC LIMIT "
				+ limit;
		List<Object[]> result = (List<Object[]>) this.executeNativeSql(sql,
				params);
		List<Map<String, Object>> huabaos = new ArrayList<Map<String, Object>>();
		if (result != null && result.size() > 1) {
			for (Object[] obj : result) {
				Map<String, Object> hbs = new HashMap<String, Object>();
				hbs.put("id", obj[0]);
				hbs.put("name", obj[1]);
				hbs.put("cover", obj[2]);
				hbs.put("shortName", obj[3]);
				huabaos.add(hbs);
			}
		}
		return huabaos;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T_Poster> getRelateHuabao(Long id, Integer limit) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", id);
		String sql = "SELECT B.hid, B.tid, SUM( LOG( "
				+ EnvManager.getHuabaoCounts().get("totalHuabaos")
				+ " / C.nums ) ) AS weight FROM t_poster_tag AS A LEFT JOIN t_poster_tag AS B ON A.tid = B.tid LEFT JOIN t_postertag AS C ON B.tid = C.id WHERE A.hid =:id AND B.hid !=:id GROUP BY B.hid ORDER BY weight DESC limit "
				+ limit;
		List<Object[]> result = (List<Object[]>) this.executeNativeSql(sql,
				params);
		List<T_Poster> huabaos = new ArrayList<T_Poster>();
		if (result != null && result.size() > 0) {
			String ids = "(";
			boolean isFirst = true;
			for (Object[] obj : result) {
				if (isFirst) {
					isFirst = false;
				} else {
					ids += ",";
				}
				ids += "'" + obj[0] + "'";
			}
			ids += ")";
			huabaos = (List<T_Poster>) this.findByHql(
					"from T_Poster where id in " + ids,
					new HashMap<String, Object>());
		}
		return huabaos;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getNextHuabaos(Long id, Long channelId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", id);
		params.put("channel", channelId);
		String sql = "select t.id as id,t.title as title,t.cover_urls as cover_urls from t_poster t where t.id<:id and t.channel_id=:channel order by id desc limit 1";
		List<Object[]> result = (List<Object[]>) this.executeNativeSql(sql,
				params);
		if (result == null || result.size() == 0) {// 如果是最后一个（即最早上传的画报），则循环至最新的一个（即最后上传的一个）
			sql = "select t.id as id,t.title as title,t.cover_urls as cover_urls from t_poster t where t.channel_id=:channel order by id desc limit 1";
			result = (List<Object[]>) this.executeNativeSql(sql, params);
		}
		Map<String, Object> huabaos = new HashMap<String, Object>();
		if (result != null && result.size() == 1) {
			Object[] obj = result.get(0);
			huabaos.put("id", obj[0]);
			huabaos.put("title", obj[1]);
			huabaos.put("cover_urls", obj[2]);
		}
		return huabaos;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getPrevHuabaos(Long id, Long channelId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", id);
		params.put("channel", channelId);
		String sql = "select t.id as id,t.title as title,t.cover_urls as cover_urls from t_poster t where t.id>:id and t.channel_id=:channel order by id asc limit 1";
		List<Object[]> result = (List<Object[]>) this.executeNativeSql(sql,
				params);
		if (result == null || result.size() == 0) {// 如果是最新的一个（即最后上传的一个），则循环至最后一个（即最早上传的画报）
			sql = "select t.id as id,t.title as title,t.cover_urls as cover_urls from t_poster  t where t.channel_id=:channel order by id asc limit 1";
			result = (List<Object[]>) this.executeNativeSql(sql, params);
		}
		Map<String, Object> huabaos = new HashMap<String, Object>();
		if (result != null && result.size() == 1) {
			Object[] obj = result.get(0);
			huabaos.put("id", obj[0]);
			huabaos.put("title", obj[1]);
			huabaos.put("cover_urls", obj[2]);
		}
		return huabaos;
	}

	@Override
	public Integer countItemsByNick(String nick) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("nick", nick);
		return ((Long) this.findByHql(
				"select count(t) from T_TaobaokeItem t where nick=:nick", map)
				.get(0)).intValue();
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getUserIdByUid(String uid) {
		String hql = "select new map(user_id as user_id) from User where uc_id=:uc_id";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("uc_id", Integer.parseInt(uid));
		List<?> results = this.findByHql(hql, params);
		if (results != null && results.size() == 1) {
			return ((Map<String, String>) results.get(0)).get("user_id");
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getUserIdByUserName(String username) {
		String hql = "select new map(user_id as user_id) from User where nick=:nick";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("nick", username);
		List<?> results = this.findByHql(hql, params);
		if (results != null && results.size() == 1) {
			return ((Map<String, String>) results.get(0)).get("user_id");
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getPID(String userId) {
		String hql = "select new map(u.nick as nick,u.pid as pid,s.title as sitetitle,s.analyticsType as analyticsType,s.laid as laid,s.lid as lid,s.gid as gid) from User u,Site s where u.user_id=:userId and s.user_id=:userId";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userId", userId);
		List<?> results = this.findByHql(hql, params);
		if (results != null && results.size() == 1) {
			return (Map<String, Object>) results.get(0);
		}
		return new HashMap<String, Object>();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T_Poster> searchPosterByTagsFilter(Page<T_Poster> page,
			String words) {
		FullTextSession fullTextSession = Search.getFullTextSession(this
				.getHibernateSession());
		if (StringUtils.isNotEmpty(words)) {
			MultiFieldQueryParser titleParser = new MultiFieldQueryParser(
					Version.LUCENE_29, new String[] { "tags" },
					new StandardAnalyzer(Version.LUCENE_29));
			Query titleQuery;
			try {
				titleQuery = titleParser.parse(words);
				FullTextQuery fullQuery = fullTextSession.createFullTextQuery(
						titleQuery, T_Poster.class);
				if (page != null) {
					page.setTotalCount(fullQuery.getResultSize());
					fullQuery.setFirstResult(page.getStart());
					fullQuery.setMaxResults(page.getPageSize());
				}
				return fullQuery.list();
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T_Poster> searchPosterByTitleFilter(Page<T_Poster> page,
			String words) {
		FullTextSession fullTextSession = Search.getFullTextSession(this
				.getHibernateSession());
		if (StringUtils.isNotEmpty(words)) {
			MultiFieldQueryParser titleParser = new MultiFieldQueryParser(
					Version.LUCENE_29, new String[] { "title" },
					new StandardAnalyzer(Version.LUCENE_29));
			Query titleQuery;
			try {
				titleQuery = titleParser.parse(words);

				FullTextQuery fullQuery = fullTextSession.createFullTextQuery(
						titleQuery, T_Poster.class);
				if (page != null) {
					page.setTotalCount(fullQuery.getResultSize());
					fullQuery.setFirstResult(page.getStart());
					fullQuery.setMaxResults(page.getPageSize());
				}
				return fullQuery.list();
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Huabao> searchHuabaoByFilter(Page<Huabao> page, String words) {
		FullTextSession fullTextSession = Search.getFullTextSession(this
				.getHibernateSession());
		if (StringUtils.isNotEmpty(words)) {
			MultiFieldQueryParser titleParser = new MultiFieldQueryParser(
					Version.LUCENE_29, new String[] { "picDesc" },
					new StandardAnalyzer(Version.LUCENE_29));
			Query titleQuery;
			try {
				titleQuery = titleParser.parse(words);

				FullTextQuery fullQuery = fullTextSession.createFullTextQuery(
						titleQuery, Huabao.class);
				if (page != null) {
					page.setTotalCount(fullQuery.getResultSize());
					fullQuery.setFirstResult(page.getStart());
					fullQuery.setMaxResults(page.getPageSize());
				}
				return fullQuery.list();
			} catch (ParseException e) {
				e.printStackTrace();
			}
		} else {
			String hql = "select new map(picId as picId,picSrc as picSrc,picDesc as picDesc,nums as nums,hid as hid) from Huabao order by id desc";
			return findByHql(page, hql, new HashMap<String, Object>());
		}
		return null;
	}

	@Transactional
	public User synUser(String appType, String user_id, String nick,
			String tSession, Boolean isCheckVersion, String versionNo,
			IDeployZone deployZone, FreeMarkerConfigurer fcg,
			WidgetCustomerMethod widgetCustomer, IPageService pageService,
			ModuleMethod moduleMethod) {
		EnvManager.setAppType(appType);// 设置当前登录的应用
		User user = this.findByCriterion(User.class, R.eq("user_id", user_id));
		if (user == null) {// 新增用户
			logger.info("当前用户[" + nick + "]第一次登录");
			user = new User();
			user.setUser_id(user_id);
			user.setNick(nick);
			user.setAppType(appType);// 设置当前用户类型
			synPid(user);// 同步PID
			synTUser(user, nick);// 同步淘宝公开信息
			if (EnvManager.isAudit()) {// 如果是审核过程中，判断是否带版本号访问，不做订购信息同步
				if (!isCheckVersion) {
					synVersionNo(user, nick, isCheckVersion);// 同步版本号
				} else {// 如果带了版本号，则直接设置版本号访问
					T_UserSubscribe tus = new T_UserSubscribe();
					if (StringUtils.isEmpty(versionNo)) {
						versionNo = "1";
					}
					if ("1".equals(appType)) {// 如果是分成型
						versionNo = "1.5";
					}
					tus.setVersionNo(Float.valueOf(versionNo));
					user.setUsb(tus);
				}
			} else {// 审核过后正常状态，每次同步版本号
				synVersionNo(user, nick, isCheckVersion);// 同步版本号
			}
			user.setLast_visit(new Date());
			user.setVisits(1);
			this.save(user);
			EnvManager.addLastUsers(user);
			List<Site> sites = new ArrayList<Site>();
			Site site = addDefaultSite(user);
			sites.add(site);
			user.setSites(sites);// 加入默认站点
			user.setIsNew(true);
		} else {
			// 手动查询站点,并设置进当前用户
			user.setSites(this.findAllByCriterion(Site.class, R.eq("user_id",
					user_id)));
			if (user.getSites().size() == 0) {// 处理应用内部不知何处将站点的用户标识设置为空的BUG
				String hql = "select new map(site_id as site_id) from UserPage where user_id="
						+ user.getUser_id();
				List<Map<String, Object>> map = this.findByHql(
						new Page<Map<String, Object>>(1, 1), hql,
						new HashMap<String, Object>());
				if (map.size() > 0) {
					Site site = this.get(Site.class, String.valueOf(map.get(0)
							.get("site_id")));
					if (site != null) {
						site.setUser_id(user_id);
						List<Site> sites = new ArrayList<Site>();
						sites.add(site);
						user.setSites(sites);
					}
				}
			}
			if (StringUtils.isEmpty(user.getPid())) {// 同步PID
				synPid(user);
			}
			if (user.getT_created() == null) {// 如果尚未同步淘宝公开信息
				synTUser(user, nick);
			}
			if (EnvManager.isAudit()) {// 如果是审核过程中，判断是否带版本号访问，不做订购信息同步
				if (!isCheckVersion) {
					synVersionNo(user, nick, isCheckVersion);// 同步版本号
				} else {// 如果带了版本号，则直接设置版本号访问
					T_UserSubscribe tus = new T_UserSubscribe();
					if (StringUtils.isEmpty(versionNo)) {
						versionNo = "1";
					}
					if ("1".equals(appType)) {// 如果是分成型
						versionNo = "1.5";
					}
					tus.setVersionNo(Float.valueOf(versionNo));
					user.setUsb(tus);
				}
			} else {// 正常状态，每次更新订购信息
				synVersionNo(user, nick, isCheckVersion);// 同步版本号
			}
		}
		user.setIsOnline(true);
		synLimit(user);// 同步用户限额
		synShop(user);// 同步店铺
		synCommission(user, tSession, deployZone, fcg, widgetCustomer,
				pageService, moduleMethod);// 同步返利
		user.setLast_visit(new Date());
		user.setVisits(user.getVisits() + 1);
		user.setApp(appType);
		if (user.getUsb().getVersionNo() != 1.5) {// 如果不是返利，则设置月租
			user.setAppType("0");
		} else {// 返利
			user.setAppType("1");
		}
		EnvManager.setUser(user);// 注入当前用户
		return user;
	}

	/**
	 * 同步返利内容（如果该会员版本号大于1）
	 * 
	 * @param user
	 */
	private void synCommission(User user, String tSession,
			IDeployZone deployZone, FreeMarkerConfigurer fcg,
			WidgetCustomerMethod widgetCustomer, IPageService pageService,
			ModuleMethod moduleMethod) {
		if ((user.getUsb() != null && user.getUsb().getVersionNo() >= 2)) {
			Site site = user.getSites().get(0);
			SiteCommission commission = this.get(SiteCommission.class, site
					.getId());
			if (commission == null) {
				// 新增返利
				commission = new SiteCommission();
				commission.setUser_id(user.getUser_id());
				commission.setNick(user.getNick());
				commission.setSite_id(site.getId());
				commission.setRegisteCash(0);
				commission.setCommissionLimit(1);
				commission.setCommissionRate(50);
				commission.setAdCommissionRate(10);
				commission.setIsValid(true);
				this.save(commission);
				site.setCommission(commission);
				// 新增的话，抓取最近90天内交易
				ReportsGetCommand command = new ReportsGetCommand();
				command.setSession(EnvManager.getTaobaoSession());
				command.setSite_id(user.getSites().get(0).getId());
				command.setUser_id(user.getUser_id());
				command.setAppType(EnvManager.getAppType());
				Calendar start = Calendar.getInstance();
				start.add(Calendar.DATE, -90);
				command.setStart(start.getTime());
				CommandExecutor.getCommands().add(command);
				if (site.getStatus() != null && 1 == site.getStatus()) {// 如果状态已发布，则自动发布最新
					if (!CommandExecutor.getUpdatecommands().containsKey(// 如果没有包含修改命令
							"u-" + user.getUser_id())) {
						UpdateUserTemplateByUserIdCommand siteCommand = new UpdateUserTemplateByUserIdCommand();
						siteCommand.setDeployZone(deployZone);
						siteCommand.setFcg(fcg);
						siteCommand.setType("站点基本信息");
						siteCommand.setUser(user);
						siteCommand.setWidgetCustomer(widgetCustomer);
						siteCommand.setPageService(pageService);
						siteCommand.setModuleMethod(moduleMethod);
						CommandExecutor.getUpdatecommands().putIfAbsent(
								"u-" + user.getUser_id(), siteCommand);
					}
				}
			} else {// 如果已有，则根据上次登录时间来抓取
				ReportsGetCommand command = new ReportsGetCommand();
				command.setSession(EnvManager.getTaobaoSession());
				command.setSite_id(user.getSites().get(0).getId());
				command.setUser_id(user.getUser_id());
				command.setAppType(EnvManager.getAppType());
				command.setStart(user.getLast_visit());
				CommandExecutor.getCommands().add(command);
			}
			List<FanliClass> clazzes = this.findAllByCriterion(
					FanliClass.class, R.eq("type", 0), R.eq("site_id", site
							.getId()), R.eq("user_id", user.getUser_id()));
			if (clazzes.size() == 0) {
				// 新增默认文章管理【帮助中心】
				FanliClass clazz = new FanliClass();
				clazz.setTitle("帮助中心");
				clazz.setSite_id(site.getId());
				clazz.setUser_id(user.getUser_id());
				clazz.setNick(user.getNick());
				clazz.setType(0);
				clazz.setBlogClass(584);
				clazz.setClassTitle("返利帮助中心");
				clazz.setSortOrder(0);
				this.save(clazz);
			}
			if (StringUtils.isNotEmpty(site.getWww())) {// 如果版本号大于普及版以及已绑定顶级域名（即满足返利版要求）
				if (EnvManager.getAppType().equals(user.getAppType()))// 如果当前登录应用与会员应用版本一致
					user.settSession(tSession);// 存储当前SESSION
			} else
				user.settSession(null);
		} else {
			user.settSession(null);
		}
	}

	/**
	 * 检查当前会员版本号
	 * 
	 * @param user
	 * @param nick
	 */
	public void synVersionNo(User user, String nick, Boolean isCheckVersion) {
		T_UserSubscribe tus = this
				.get(T_UserSubscribe.class, user.getUser_id());
		if (tus == null) {// 如果尚未保存订购记录
			tus = new T_UserSubscribe();
			tus.setUser_id(user.getUser_id());
			tus.setNick(nick);
			if ("1".equals(EnvManager.getAppType())) {// 分成型
				tus.setVersionNo(1.5f);
				this.save(tus);
			} else {// 月租型
				List<ArticleUserSubscribe> subs = TaobaoFetchUtil
						.vasSubscribeGet(nick, TaobaoFetchUtil.VAS_APPSTORE);
				Float vn = TaobaoFetchUtil.convertVersionNo(subs);
				tus.setVersionNo(vn);
				if (vn == 1f) {// 如果是普及版，则判断是否已付费
					ArticleBizOrder order = TaobaoFetchUtil
							.vasOrderSearchLast(nick);
					if (order != null) {
						Float pay = Float.valueOf(order.getTotalPayFee());
						if (pay > 0) {
							tus.setVersionNo(1.6f);// 普及版（付费）
						}
					}
				}
				this.save(tus);
			}
		} else {// 老会员
			boolean isRefresh = (tus.getVersionNo() == 0f);
			List<ArticleUserSubscribe> subs = TaobaoFetchUtil.vasSubscribeGet(
					nick, TaobaoFetchUtil.VAS_APPSTORE);
			Float vn = TaobaoFetchUtil.convertVersionNo(subs);
			if (vn == 1f) {// 如果是普及版，则判断是否已付费
				ArticleBizOrder order = TaobaoFetchUtil
						.vasOrderSearchLast(nick);
				tus.setVersionNo(vn);// 预设1f;
				user.setAppType("0");
				if (order != null) {
					Float pay = Float.valueOf(order.getTotalPayFee());
					if (pay > 0) {
						tus.setVersionNo(1.6f);// 普及版（付费）
					}
				}
				if (tus.getVersionNo() == 1f) {// 如果仍是普及版（未付费用户），则查询是否订购分成版
					Boolean isFC = false;
					try {
						if (StringUtils.isEmpty(user.getPid())) {
							synPid(user);
						}
						if (StringUtils.isEmpty(user.getPid())) {
							SystemException
									.handleMessageException("用户PID错误，请联系客服支持");
						}
						if (null == user.getPid()) {
							synPid(user);
						}
						Long pid = Long.valueOf(user.getPid().replaceAll("mm_",
								"").replaceAll("_0_0", ""));
						isFC = TaobaoFetchUtil.isTaobaokeToolRelation(pid);// 获取分成型
					} catch (Exception e) {
						isFC = false;
					}
					if (isFC) {
						user.setAppType("1");// 如果订购了分成版，则设置为分成
						tus.setVersionNo(1.5f);
					} else {
						user.setAppType("0");
						tus.setVersionNo(1f);
					}
				}
			} else if (vn > 1f) {// 如果是返利，卖家版
				user.setAppType("0");
				tus.setVersionNo(vn);
			} else if (vn == 0f) {// 如果未订购月租型，则查询分成型
				Long pid = Long.valueOf(user.getPid().replaceAll("mm_", "")
						.replaceAll("_0_0", ""));
				Boolean isFC = TaobaoFetchUtil.isTaobaokeToolRelation(pid);// 获取分成型
				if (isFC) {
					user.setAppType("1");// 如果订购了分成版，则设置为分成
					tus.setVersionNo(1.5f);
				} else {
					user.setAppType("0");
					tus.setVersionNo(1f);
					EnvManager.setUser(null);
					SystemException
							.handleMessageException("您尚未订购新淘网月租型：<a href=\"http://fuwu.taobao.com/serv/detail.htm?service_id=300\" target=\"_blank\">订购地址</a>，或分成版步骤：请进入(<strong style=\"color:red\">选择淘宝帐号登录</strong>)淘宝联盟--->淘宝客--->API接入--->新淘网分成版--->立即使用");
				}
			}
			if (isRefresh) {// 如果之前是无效的，则刷新最新
				CommandExecutor.getCommands().add(new UnvalidCommand());
			}
		}
		if (tus.getVersionNo() > 2) {
			setAdPlanisValid(user.getNick());
		}
		user.setUsb(tus);// 设置订购信息
	}

	private void setAdPlanisValid(String nick) {
		List<ADPlan> plans = this.findAllByCriterion(ADPlan.class, R.eq("nick",
				nick));
		if (plans != null && plans.size() > 0) {
			for (ADPlan plan : plans) {
				plan.setIsValid(true);
			}
		}
		this.updateAll(plans);// 将所有无效卖家的广告计划设置为有效
	}

	private void synShop(User user) {
		if (StringUtils.isEmpty(user.getSid())) {
			try {
				Shop shop = TaobaoFetchUtil.getTaobaoShop(EnvManager
						.getAppType(), user.getNick());
				if (shop != null) {
					user.setSid(String.valueOf(shop.getSid()));
					T_TaobaokeShop oShop = this.get(T_TaobaokeShop.class, Long
							.valueOf(user.getUser_id()));
					if (oShop == null) {// 店铺不存在则保存
						oShop = new T_TaobaokeShop();
						oShop.setUserId(Long.valueOf(user.getUser_id()));
						oShop.setCid(shop.getCid());
						oShop.setTitle(shop.getTitle());
						oShop.setPicPath(shop.getPicPath());
						oShop.setSid(shop.getSid());
						oShop.setNick(shop.getNick());
						ShopScore score = shop.getShopScore();
						if (score != null) {
							oShop.setItemScore(score.getItemScore());
							oShop.setServiceScore(score.getServiceScore());
							oShop.setDeliveryScore(score.getDeliveryScore());
						}
						List<TaobaokeShop> shops = TaobaoFetchUtil
								.convertTaobaoShop(EnvManager.getAppType(),
										user.getNick(), shop.getSid() + "");
						if (shops != null && shops.size() == 1) {// 查询信用和佣金比率
							oShop.setCommissionRate(shops.get(0)
									.getCommissionRate());
							oShop.setIsValid(true);
						} else {
							oShop.setIsValid(false);
						}
						oShop.setIsValid(true);
						this.save(oShop);
					} else {// 店铺更新
						oShop.setCid(shop.getCid());
						oShop.setTitle(shop.getTitle());
						oShop.setPicPath(shop.getPicPath());
						oShop.setSid(shop.getSid());
						oShop.setNick(shop.getNick());
						ShopScore score = shop.getShopScore();
						if (score != null) {
							oShop.setItemScore(score.getItemScore());
							oShop.setServiceScore(score.getServiceScore());
							oShop.setDeliveryScore(score.getDeliveryScore());
						}
						List<TaobaokeShop> shops = TaobaoFetchUtil
								.convertTaobaoShop(EnvManager.getAppType(),
										user.getNick(), shop.getSid() + "");
						if (shops != null && shops.size() == 1) {// 查询信用和佣金比率
							oShop.setCommissionRate(shops.get(0)
									.getCommissionRate());
							oShop.setIsValid(true);
						} else {
							oShop.setIsValid(false);
						}
						this.update(shop);
					}
				} else {
					user.setSid("0");
				}
			} catch (Exception e) {
				if (e.getMessage() != null
						&& e.getMessage().indexOf("SHOP_IS_NOT_EXIST") != -1) {
					user.setSid("0");
				}
				e.printStackTrace();
			}
		}
	}

	public void synLimit(User user) {
		Limit limit = this.findByCriterion(Limit.class, R.eq("user_id", user
				.getUser_id()));
		if (limit == null) {
			limit = new Limit();
			limit.setLayouts(2);
			limit.setModules(12);
			limit.setHeaders(1);
			limit.setPages(5);
			limit.setGroups(10);
			limit.setShops(10);
			limit.setFavWidgets(20);
			limit.setWidgets(15);
			limit.setFavForums(100);

			limit.setUser_id(user.getUser_id());
			if (user.getUsb().getVersionNo() >= 2) {
				limit.setBlogAds(5);
				limit.setBlogAdsSites(10);
				limit.setIndexAds(5);
				limit.setIndexAdsSites(50);
			}
			this.save(limit);
		} else {
			if (user.getUsb() != null && user.getUsb().getVersionNo() >= 2) {
				limit.setBlogAds(5);
				limit.setBlogAdsSites(10);
				limit.setIndexAds(5);
				limit.setIndexAdsSites(50);
			}
		}
		user.setLimit(limit);
	}

	public User synTUser(User user, String nick) {
		try {
			com.taobao.api.domain.User tUser = TaobaoFetchUtil.getTaobaoUser(
					EnvManager.getAppType(), user.getUser_id(), nick);
			user.setAlipay_account(tUser.getAlipayAccount());
			user.setAlipay_bind(tUser.getAlipayBind());
			user.setAlipay_no(tUser.getAlipayNo());
			user.setAuto_repost(tUser.getAutoRepost());
			user.setBirthday(tUser.getBirthday());
			// UserCredit bCredit = tUser.getBuyerCredit();
			// if (bCredit != null) {
			// T_UserCredit tbCredit = new T_UserCredit();
			// tbCredit.setLevel(bCredit.getLevel().intValue());
			// tbCredit.setGoodNum(bCredit.getGoodNum().intValue());
			// tbCredit.setScore(bCredit.getScore().intValue());
			// tbCredit.setTotalNum(bCredit.getTotalNum().intValue());
			// user.setBuyer_credit(tbCredit);
			// }
			// UserCredit sCredit = tUser.getSellerCredit();
			// if (sCredit != null) {
			// T_UserCredit tsCredit = new T_UserCredit();
			// tsCredit.setLevel(sCredit.getLevel().intValue());
			// tsCredit.setGoodNum(sCredit.getGoodNum().intValue());
			// tsCredit.setScore(sCredit.getScore().intValue());
			// tsCredit.setTotalNum(sCredit.getTotalNum().intValue());
			// user.setBuyer_credit(tsCredit);
			// }
			user.setCity(tUser.getLocation() != null ? tUser.getLocation()
					.getCity() : null);
			user.setConsumer_protection("true".equals(tUser
					.getConsumerProtection()) ? true : false);
			user.setHas_more_pic(tUser.getHasMorePic());
			user.setItem_img_num(tUser.getItemImgNum().intValue());
			user.setItem_img_size(tUser.getItemImgSize().intValue());
			user.setPromoted_type(tUser.getPromotedType());
			user.setProp_img_num(tUser.getPropImgNum().intValue());
			user.setProp_img_size(tUser.getPropImgSize().intValue());
			user.setSex(tUser.getSex());
			user.setT_created(tUser.getCreated());
			user.setT_last_visit(tUser.getLastVisit());
			user.setT_status(tUser.getStatus());
			user.setT_type(tUser.getType());
		} catch (Exception e) {
			logger.info(e.toString());
		}
		return user;
	}

	/**
	 * 新增默认站点及两个模板
	 * 
	 * @param user
	 * @return
	 */
	public Site addDefaultSite(User user) {
		Site site = new Site();
		site.setUser_id(user.getUser_id());// 用户ID
		site.setDomainName("shop" + user.getUser_id());// 二级域名
		site.setTitle(user.getNick());// 网站标题
		// 移除新会员默认创建旧页面模板的功能
		// UserTemplate template1 = new UserTemplate();
		// template1.setIsDefault(true);
		// template1.setName(user.getNick() + "_模板1");
		// template1.setUser_id(user.getUser_id());
		// template1.setStatus(0);
		// template1.setCid("0");// 默认所有分类
		// List<UserTemplate> templates = new ArrayList<UserTemplate>();
		// templates.add(template1);
		// site.setTemplates(templates);
		this.save(site);
		return site;
	}

	/**
	 * 获取用户PID
	 * 
	 * @param user
	 */
	public static void synPid(User user) {
		TaobaokeCaturlGetRequest request = new TaobaokeCaturlGetRequest();
		request.setCid(0L);
		request.setNick(user.getNick());
		request.setOuterCode(EnvManager.getCatsOuterCode());
		try {
			String url = TaobaoFetchUtil.getItemCatUrl(user.getAppType(),
					request);
			String pid = url.split("pid=")[1].split("&")[0];
			if (StringUtils.isNotEmpty(pid)) {
				user.setPid(pid);
			}
		} catch (Exception e) {
			logger.info(e.toString());
		}
	}

	@SuppressWarnings("unchecked")
	@Transactional
	@Override
	public List<User> searchUserBySiteTitle(String title) {
		Session session = this.getHibernateSession();
		return session.createCriteria(User.class).createAlias("sites", "s")
				.add(R.like("s.title", title, MatchMode.ANYWHERE)).list();
	}

}
