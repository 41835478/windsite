package com.wind.site.env;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;

import com.wind.core.cache.ICache;
import com.wind.core.cache.impl.DefaultCacheImpl;
import com.wind.core.cache.impl.TempDefaultCacheImpl;
import com.wind.core.exception.SystemException;
import com.wind.site.model.Activity;
import com.wind.site.model.Channel;
import com.wind.site.model.CoolSite;
import com.wind.site.model.DianPuCategory;
import com.wind.site.model.ForumType;
import com.wind.site.model.KeyWord;
import com.wind.site.model.LayoutModel;
import com.wind.site.model.LoginLog;
import com.wind.site.model.Member;
import com.wind.site.model.PageModule;
import com.wind.site.model.Site;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.T_MallBrandCat;
import com.wind.site.model.T_PosterTag;
import com.wind.site.model.T_ShopCat;
import com.wind.site.model.TaobaoKeywordCategory;
import com.wind.site.model.User;
import com.wind.site.model.WidgetType;
import com.wind.site.model.YiqifaCategory;
import com.wind.site.model.YiqifaMall;

/**
 * 环境管理器
 * 
 * @author fxy
 * 
 */
public class EnvManager {
	private static final Logger logger = Logger.getLogger(EnvManager.class
			.getName());

	private static ICache<String, Object> cache;
	private static ICache<String, Object> tempCache;
	/**
	 * 淘宝环境
	 */
	private static TaobaoEnv taobaoEnv;
	/**
	 * 站点环境
	 */
	private static SiteEnv siteEnv;
	/**
	 * 缺省PID
	 */
	private static String defaultPid;

	/**
	 * 启动监听
	 */
	private static IEnvListener listener;
	/**
	 * 应用根目录
	 */
	private static String path;

	private static String zonePath;

	private static String tdjEt = "";

	/**
	 * 存储当前所有线程激活的Session
	 */
	private static final Map<String, HttpSession> threadSessions = new ConcurrentHashMap<String, HttpSession>();

	/**
	 * 当前线程变量集合
	 */
	private static final ThreadLocal<Map<Object, Object>> threadContext = new ThreadLocal<Map<Object, Object>>() {

		protected synchronized Map<Object, Object> initialMapValue() {
			return new HashMap<Object, Object>();
		}

		protected Map<Object, Object> initialValue() {
			return initialMapValue();
		}
	};
	/**
	 * 用户键
	 */
	private static final String USER = "USER";
	/**
	 * 应用键
	 */
	private static final String APPTYPE = "APPTYPE";
	/**
	 * 买家返利键
	 */
	private static final String MEMBER = "MEMBER";
	/**
	 * 邀请码
	 */
	private static final String INVITATION = "INVITATION";
	/**
	 * 用户登录日志键
	 */
	private static final String LOGIN_LOG = "LOGIN_LOG";
	/**
	 * 淘宝Session键
	 */
	private static final String SESSION = "SESSION";

	/**
	 * 注册Session,每次请求开始调用
	 * 
	 * @param user
	 */
	public static void registerSession(HttpSession session) {
		if (session != null) {
			String strThreadName = Thread.currentThread().getName();
			threadSessions.put(strThreadName, session);// 存放当前线程关联Session
			// logger.info("注册Session[" + session.getId() + "],已激活["
			// + EnvManager.getThreadSessionCount() + "]");
		}
	}

	public void init() {
		if (listener != null) {
			listener.init();
			cache = new DefaultCacheImpl(listener.getAdminService());// 初始化本地缓存
			tempCache = new TempDefaultCacheImpl(listener.getAdminService());// 初始化本地缓存

			logger.info("环境初始化成功");
		} else {
			SystemException.handleMessageException("环境监听启动失败");
		}
	}

	public static ICache<String, Object> getCache() {
		return cache;
	}

	public static ICache<String, Object> getTempCache() {
		return tempCache;
	}

	public static Map<String, YiqifaMall> getYiqifaMalls() {
		return siteEnv.getYiqifaMalls();
	}

	public static void setYiqifaMalls(Map<String, YiqifaMall> malls) {
		siteEnv.setYiqifaMalls(malls);
	}

	public static List<YiqifaCategory> getYiqifaCats() {
		return siteEnv.getYiqifaCats();
	}

	public static void setYiqifaCats(List<YiqifaCategory> cats) {
		siteEnv.setYiqifaCats(cats);
	}

	public static Map<String, List<LayoutModel>> getTemplates() {
		return siteEnv.getTempaltes();
	}

	public static void setTemplates(Map<String, List<LayoutModel>> templates) {
		siteEnv.setTempaltes(templates);
	}

	public static Map<Long, PageModule> getModules() {
		return siteEnv.getModules();
	}

	public static void setModules(Map<Long, PageModule> modules) {
		siteEnv.setModules(modules);
	}

	public static Integer getADPageLimit() {
		return siteEnv.getAdPageLimit();
	}

	public static Integer getADBlogLimit() {
		return siteEnv.getAdBlogLimit();
	}

	public static void setADPageLimit(Integer limit) {
		siteEnv.setAdPageLimit(limit);
	}

	public static void setADBlogLimit(Integer limit) {
		siteEnv.setAdBlogLimit(limit);
	}

	public static Boolean isAudit() {
		return taobaoEnv.getIsAudit();
	}

	public static IEnvListener getListener() {
		return listener;
	}

	public void setListener(IEnvListener listener) {
		EnvManager.listener = listener;
	}

	public static void setDianpuCats(
			Map<String, List<DianPuCategory>> dianpuCats) {
		siteEnv.setDianpuCats(dianpuCats);
	}

	public static Map<String, List<DianPuCategory>> getDianpuCats() {
		return siteEnv.getDianpuCats();
	}

	public static void setDayTaoke(List<Map<String, Object>> dayTaoke) {
		siteEnv.setDayTaoke(dayTaoke);
	}

	public static List<Map<String, Object>> getDayTaoke() {
		return siteEnv.getDayTaoke();
	}

	public static void setDaySeller(List<Map<String, Object>> daySeller) {
		siteEnv.setDaySeller(daySeller);
	}

	public static List<Map<String, Object>> getDaySeller() {
		return siteEnv.getDaySeller();
	}

	public static void setWeekTaoke(List<Map<String, Object>> weekTaoke) {
		siteEnv.setWeekTaoke(weekTaoke);
	}

	public static List<Map<String, Object>> getWeekTaoke() {
		return siteEnv.getWeekTaoke();
	}

	public static void setWeekSeller(List<Map<String, Object>> weekSeller) {
		siteEnv.setWeekSeller(weekSeller);
	}

	public static List<Map<String, Object>> getWeekSeller() {
		return siteEnv.getWeekSeller();
	}

	public static void setMonthTaoke(List<Map<String, Object>> monthTaoke) {
		siteEnv.setMonthTaoke(monthTaoke);
	}

	public static List<Map<String, Object>> getMonthTaoke() {
		return siteEnv.getMonthTaoke();
	}

	public static void setMonthSeller(List<Map<String, Object>> monthSeller) {
		siteEnv.setMonthSeller(monthSeller);
	}

	public static List<Map<String, Object>> getMonthSeller() {
		return siteEnv.getMonthSeller();
	}

	public static void setAllTaoke(List<Map<String, Object>> allTaoke) {
		siteEnv.setAllTaoke(allTaoke);
	}

	public static List<Map<String, Object>> getAllTaoke() {
		return siteEnv.getAllTaoke();
	}

	public static void setAllSeller(List<Map<String, Object>> allSeller) {
		siteEnv.setAllSeller(allSeller);
	}

	public static List<Map<String, Object>> getAllSeller() {
		return siteEnv.getAllSeller();
	}

	public static void setTotalWords(List<KeyWord> totalWords) {
		siteEnv.setTotalWords(totalWords);
	}

	public static List<KeyWord> getTotalWords() {
		return siteEnv.getTotalWords();
	}

	public static void setLadyWords(List<KeyWord> ladyWords) {
		siteEnv.setLadyWords(ladyWords);
	}

	public static List<KeyWord> getLadyWords() {
		return siteEnv.getLadyWords();
	}

	public static void setManWords(List<KeyWord> manWords) {
		siteEnv.setManWords(manWords);
	}

	public static List<KeyWord> getManWords() {
		return siteEnv.getManWords();
	}

	public static void setHotTags(List<T_PosterTag> hotTags) {
		siteEnv.setHotTags(hotTags);
	}

	public static List<T_PosterTag> getHotTags() {
		return siteEnv.getHotTags();
	}

	public static void setPosterTags(List<T_PosterTag> posterTags) {
		siteEnv.setPosterTags(posterTags);
	}

	public static List<T_PosterTag> getPosterTags() {
		return siteEnv.getPosterTags();
	}

	public static void setHuabaoCounts(Map<String, Integer> counts) {
		siteEnv.setHuabaoCounts(counts);
	}

	public static Map<String, Integer> getHuabaoCounts() {
		return siteEnv.getHuabaoCounts();
	}

	public static void setValidHuabaoMembers(Set<String> validHuabaoMembers) {
		siteEnv.setValidHuabaoMembers(validHuabaoMembers);
	}

	public static Set<String> getValidHuabaoMembers() {
		return siteEnv.getValidHuabaoMembers();
	}

	public static void setForumTypes(List<ForumType> forumTypes) {
		siteEnv.setForumTypes(forumTypes);
	}

	public static List<ForumType> getForumTypes() {
		return siteEnv.getForumTypes();
	}

	public static String getItemsOuterCode() {
		return taobaoEnv.getItems_outer_code();
	}

	public static String getMallsOuterCode() {
		return taobaoEnv.getMalls_outer_code();
	}

	public static String getCatsOuterCode() {
		return taobaoEnv.getCats_outer_code();
	}

	public static String getShopsOuterCode() {
		return taobaoEnv.getShops_outer_code();
	}

	public static String getKeywordsOuterCode() {
		return taobaoEnv.getKeywords_outer_code();
	}

	public static void setRealPath(String path) {
		EnvManager.path = path;
	}

	public static String getUserPath(String domainName) {
		return EnvManager.getZonePath()
				+ File.separator
				+ domainName.substring(domainName.length() - 2,
						domainName.length()) + File.separator
				+ domainName.substring(4, domainName.length()) + File.separator;
	}

	/**
	 * 当前工程绝对路径
	 * 
	 * @return
	 */
	public static String getRealPath() {
		return path;
	}

	public static List<T_ShopCat> getShopCats() {
		return siteEnv.getShopCats();
	}

	public static void setShopCats(List<T_ShopCat> cats) {
		siteEnv.setShopCats(cats);
	}

	public static List<TaobaoKeywordCategory> getKeywordCats() {
		return siteEnv.getKeywordCats();
	}

	public static void setKeywordCats(List<TaobaoKeywordCategory> cats) {
		siteEnv.setKeywordCats(cats);
	}

	public static List<T_MallBrandCat> getBrandCats() {
		return siteEnv.getBrandCats();
	}

	public static void setBrandCats(List<T_MallBrandCat> cats) {
		siteEnv.setBrandCats(cats);
	}

	public static List<T_ItemCat> getRootCats() {
		return siteEnv.getRootCats();
	}

	public static void setRootCats(List<T_ItemCat> rootCats) {
		siteEnv.setRootCats(rootCats);
	}

	public static List<T_ItemCat> getCats() {
		return siteEnv.getCats();
	}

	public static void setCats(List<T_ItemCat> cats) {
		siteEnv.setCats(cats);
	}

	public static void setChannels(List<Channel> channels) {
		siteEnv.setChannels(channels);
	}

	public static List<Channel> getChannels() {
		return siteEnv.getChannels();
	}

	public static void setActivities(List<Activity> activities) {
		siteEnv.setActivities(activities);
	}

	public static List<Activity> getActivities() {
		return siteEnv.getActivities();
	}

	public static List<CoolSite> getCoolSites() {
		return siteEnv.getCoolSites();
	}

	public static void setCoolSites(List<CoolSite> coolSites) {
		siteEnv.setCoolSites(coolSites);
	}

	/**
	 * 得到当前登录日志
	 * 
	 * @return
	 */
	public static LoginLog getLoginLog() {
		Object log = getSessionAttribute(LOGIN_LOG);
		return log != null ? (LoginLog) log : null;
	}

	/**
	 * 设置当前登录日志
	 * 
	 * @param log
	 */
	public static void setLoginLog(LoginLog log) {
		setSessionAttribute(LOGIN_LOG, log);
	}

	/**
	 * 得到当前用户
	 * 
	 * @return
	 */
	public static User getUser() {
		Object user = getSessionAttribute(USER);
		return user != null ? (User) user : null;
	}

	/**
	 * 设置当前用户
	 * 
	 * @param user
	 */
	public static void setUser(User user) {
		setSessionAttribute(USER, user);
		// EnvManager.getOnlineMembers().put(user.getNick(), user);// 新增用户
	}

	public static void setAppType(String appType) {
		setSessionAttribute(APPTYPE, appType);
	}

	public static String getAppType() {
		Object appType = getSessionAttribute(APPTYPE);
		return appType != null ? String.valueOf(appType) : null;
	}

	public static Member getMember() {
		Object member = getSessionAttribute(MEMBER);
		return member != null ? (Member) member : null;
	}

	/**
	 * 设置当前买家返利用户
	 * 
	 * @param user
	 */
	public static void setMember(Member member) {
		setSessionAttribute(MEMBER, member);
	}

	public static Long getInvitation() {
		Object invitation = getSessionAttribute(INVITATION);
		return invitation != null ? (Long) invitation : null;
	}

	/**
	 * 设置当前买家的邀请码(推广人ID)
	 * 
	 * @param invitation
	 */
	public static void setInvitation(Long invitation) {
		setSessionAttribute(INVITATION, invitation);
	}

	/**
	 * 获取当前用户淘宝Session
	 * 
	 * @return
	 */
	public static String getTaobaoSession() {
		Object session = getSessionAttribute(SESSION);
		return session != null ? session.toString() : "";
	}

	public static void setTaobaoSession(String session) {
		setSessionAttribute(SESSION, session);
	}

	/**
	 * 清除线程临时变量，该方法在每次请求结束后调用
	 */
	public static void clear() {
		String strThreadName = Thread.currentThread().getName();
		if (threadSessions.containsKey(strThreadName)) {
			// logger.info("清理Session["
			// + threadSessions.get(strThreadName).getId() + "]");
			threadSessions.remove(strThreadName);// 移除当前线程关联session
		}
		threadContext.get().clear();// 移除当前线程变量
		// logger.info("已激活Session[" + EnvManager.getThreadSessionCount() +
		// "]");
	}

	/**
	 * 获取Session数量
	 * 
	 * @return
	 */
	public static int getSessionCount() {
		SystemException.handleMessageException("暂不支持");
		return 0;
	}

	/**
	 * 获取当前激活Session数量
	 * 
	 * @return
	 */
	public static int getThreadSessionCount() {
		return threadSessions.size();
	}

	/**
	 * 获取ThreadSession集合
	 * 
	 * @return
	 */
	public static Map<String, HttpSession> getThreadSession() {
		return threadSessions;
	}

	/**
	 * 设置Session
	 * 
	 * @param key
	 * @param value
	 */
	public static void setSessionAttribute(String key, Object value) {
		if (getCurrentSession() != null) {
			getCurrentSession().setAttribute(key, value);
		}
	}

	/**
	 * 获取当前Session属性
	 * 
	 * @param key
	 * @return
	 */
	public static Object getSessionAttribute(String key) {
		if (getCurrentSession() != null) {
			return getCurrentSession().getAttribute(key);
		}
		return null;
	}

	/**
	 * 获取当前在线会员集合
	 * 
	 * @return
	 */
	public static Map<String, User> getOnlineMembers() {
		return siteEnv.getMembers();
	}

	/**
	 * 获取当前淘客展示组件集合
	 * 
	 * @return
	 */
	public static List<WidgetType> getWidgets() {
		return siteEnv.getWidgets();
	}

	public static void setWidgets(List<WidgetType> widgets) {
		siteEnv.setWidgets(widgets);
	}

	/**
	 * 正常退出
	 * 
	 */
	public static void logoutSession() {
		if (getCurrentSession() != null) {
			getCurrentSession().invalidate();// 设置当前Session无效
		}
	}

	/**
	 * 清除Session数据
	 * 
	 */
	public static void clearSession(HttpSession session) {
		if (session != null) {
			// logger.info("删除当前Session[" + session.getId() + "]");
			Object obj = session.getAttribute(USER);
			Object mObj = session.getAttribute(MEMBER);
			if (obj != null) {// 新淘网会员
				User sessionUser = (User) obj;
				if (sessionUser != null)
					EnvManager.getListener().getAdminService()
							.updateOnLine(sessionUser.getId());
			}
			if (mObj != null) {// 返利会员
				Member sessionMember = (Member) mObj;
				if (sessionMember != null)
					EnvManager.getListener().getAdminService()
							.updateMemberOnLine(sessionMember.getId());
			}
			if (threadSessions.containsValue(session)) {
				for (Iterator<HttpSession> itr = threadSessions.values()
						.iterator(); itr.hasNext();) {
					if (session.equals(itr.next())) {
						// logger
						// .info("删除当前线程关联的Session[" + session.getId()
						// + "]");
						itr.remove();
					}
				}
			}
		}
	}

	/**
	 * 获取当前Session
	 * 
	 * @return
	 */
	public static HttpSession getCurrentSession() {
		String strThreadName = Thread.currentThread().getName();
		return threadSessions.get(strThreadName);
	}

	public static Map<String, Integer> getAPI() {
		return taobaoEnv.getAPI();
	}

	public static void setSites(Map<String, SiteImpl> sites) {
		siteEnv.setSites(sites);
	}

	public static Map<String, SiteImpl> getSites() {
		return siteEnv.getSites();
	}

	public static List<String> getMemberViews() {
		return siteEnv.getMemberViews();
	}

	public static List<String> getSiteViews() {
		return siteEnv.getSiteViews();
	}

	public static String getAppKey(String appType) {
		if ("1".equals(appType)) {
			return taobaoEnv.getFcAppKey();
		}
		return taobaoEnv.getAppKey();
	}

	public static String getSecret(String appType) {
		if ("1".equals(appType)) {
			return taobaoEnv.getFcSecret();
		}
		return taobaoEnv.getSecret();
	}

	public static String getContainer() {
		return taobaoEnv.getContainer();
	}

	public static String getUrl() {
		return taobaoEnv.getUrl();
	}

	/**
	 * 最新站点
	 * 
	 * @return
	 */
	public static List<Site> getLastSites() {
		return siteEnv.getLastSites();
	}

	/**
	 * 加入最新站点
	 * 
	 * @param site
	 * @return
	 */
	public static List<Site> addLastSite(Site site) {
		for (Site s : siteEnv.getLastSites()) {
			if (s.getId().equals(site.getId())) {
				return siteEnv.getLastSites();
			}
		}
		if (siteEnv.getLastSites().size() == 9) {
			siteEnv.getLastSites().remove(8);
		}
		siteEnv.getLastSites().add(0, site);
		return siteEnv.getLastSites();
	}

	/**
	 * 最新会员
	 * 
	 * @return
	 */
	public static List<User> getLastUsers() {
		return siteEnv.getLastUsers();
	}

	/**
	 * 加入最新会员
	 * 
	 * @param site
	 * @return
	 */
	public static List<User> addLastUsers(User user) {
		for (User u : siteEnv.getLastUsers()) {
			if (u.getId().equals(user.getId())) {
				return siteEnv.getLastUsers();
			}
		}
		if (siteEnv.getLastUsers().size() == 9) {
			siteEnv.getLastUsers().remove(8);
		}
		siteEnv.getLastUsers().add(0, user);
		return siteEnv.getLastUsers();
	}

	public static TaobaoEnv getTaobaoEnv() {
		return taobaoEnv;
	}

	public void setTaobaoEnv(TaobaoEnv taobaoEnv) {
		EnvManager.taobaoEnv = taobaoEnv;
	}

	public static SiteEnv getSiteEnv() {
		return siteEnv;
	}

	public void setSiteEnv(SiteEnv siteEnv) {
		EnvManager.siteEnv = siteEnv;
	}

	public void setZonePath(String zonePath) {
		EnvManager.zonePath = zonePath;
	}

	public static String getHuabaoJsPath() {
		if (StringUtils.isNotEmpty(zonePath)) {
			return zonePath + File.separator + "htdocs" + File.separator
					+ "hposter";
		}
		return EnvManager.getRealPath() + "huabao";
	}

	public static String getZonePath() {
		if (StringUtils.isNotEmpty(zonePath)) {
			return zonePath + File.separator + "htdocs" + File.separator
					+ "zone";
		}
		return EnvManager.getRealPath() + "zone";
	}

	public static String getItemPath() {
		if (StringUtils.isNotEmpty(zonePath)) {
			return zonePath + File.separator + "htdocs" + File.separator
					+ "hitem";
		}
		return EnvManager.getRealPath() + "hitem";
	}

	public static String getShopPath() {
		if (StringUtils.isNotEmpty(zonePath)) {
			return zonePath + File.separator + "htdocs" + File.separator
					+ "hshop";
		}
		return EnvManager.getRealPath() + "hshop";
	}

	public static String getApachePath() {
		if (StringUtils.isNotEmpty(zonePath)) {
			return zonePath;
		}
		return null;
	}

	public void setDefaultPid(String defaultPid) {
		EnvManager.defaultPid = defaultPid;
	}

	public static String getDefaultPid() {
		return defaultPid;
	}

	public static String getTdjEt() {
		return tdjEt;
	}

	public static void setTdjEt(String tdjEt) {
		EnvManager.tdjEt = tdjEt;
	}

}
