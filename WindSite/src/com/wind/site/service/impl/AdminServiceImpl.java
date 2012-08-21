package com.wind.site.service.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.math.BigInteger;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.criterion.R;
import org.hibernate.search.FullTextSession;
import org.hibernate.search.Search;

import com.taobao.api.domain.ArticleUserSubscribe;
import com.taobao.api.domain.PropValue;
import com.taobao.api.request.ItempropvaluesGetRequest;
import com.taobao.api.request.TaobaokeCaturlGetRequest;
import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.service.impl.BaseServiceImpl;
import com.wind.site.env.EnvManager;
import com.wind.site.model.ADBlogStatus;
import com.wind.site.model.ADBlogSystem;
import com.wind.site.model.ADPageStatus;
import com.wind.site.model.ADPageSystem;
import com.wind.site.model.ADPlan;
import com.wind.site.model.DomainHistory;
import com.wind.site.model.Member;
import com.wind.site.model.MemberInfo;
import com.wind.site.model.PageMeta;
import com.wind.site.model.Site;
import com.wind.site.model.SiteImpl;
import com.wind.site.model.T_ItemCat;
import com.wind.site.model.T_PropValue;
import com.wind.site.model.T_TaobaokeReportMember;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.model.User;
import com.wind.site.model.UserPage;
import com.wind.site.model.UserTemplate;
import com.wind.site.model.WeiboDomainHistory;
import com.wind.site.model.WidgetType;
import com.wind.site.service.IAdminService;
import com.wind.site.util.PageUtils;
import com.wind.site.util.TaobaoFetchUtil;
import com.wind.site.util.WindSiteRestUtil;

/**
 * 管理功能业务实现类
 * 
 * @author fxy
 * 
 */
public class AdminServiceImpl extends BaseServiceImpl implements IAdminService {
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
					request, user.getPid());
			String pid = url.split("pid=")[1].split("&")[0];
			if (StringUtils.isNotEmpty(pid)) {
				user.setPid(pid);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void synVersionNo(User user) {// 仅校验非淘宝服务月租用户是否订购分成版
		List<ArticleUserSubscribe> subs = TaobaoFetchUtil.vasSubscribeGet(
				user.getNick(), TaobaoFetchUtil.VAS_APPSTORE);
		Float vn = TaobaoFetchUtil.convertVersionNo(subs);
		if (vn == 0f) {// 如果未订购月租型，则查询分成型
			Float versionNo = WindSiteRestUtil.getNativeUsb(this,
					user.getUser_id());
			if (versionNo > 1.5f) {
				vn = versionNo;
			} else {
				if (null == user.getPid()) {
					synPid(user);
				}
				Long pid = Long.valueOf(user.getPid().replaceAll("mm_", "")
						.replaceAll("_0_0", ""));
				Boolean isFC = TaobaoFetchUtil.isTaobaokeToolRelation(pid);// 获取分成型
				if (isFC) {
					vn = 1.5f;
				}
			}

		}
		if (vn == 0f) {
			T_UserSubscribe tus = this.get(T_UserSubscribe.class,
					user.getUser_id());
			tus.setVersionNo(0f);
			tus.setNick(user.getNick());
			this.update(tus);
		}
	}

	@Override
	public void refreshPageMeta(String id) {
		UserPage page = this.get(UserPage.class, id);
		if (page != null) {
			PageMeta meta = PageUtils.convert(this, page.getUser_id(), page,
					true);// 旧版本需排序
			meta.setUser_id(page.getUser_id());
			if (meta != null) {
				this.save(meta);
			}
		}
	}

	@Override
	public Integer countValidADPlan(String type) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("isDefault", true);
		map.put("isValid", true);
		map.put("type", type);
		return ((Long) this
				.findByHql(
						"select count(t) from ADPlan t where t.isDefault=:isDefault and t.isValid=:isValid and t.type=:type",
						map).get(0)).intValue();
	}

	@Override
	public Integer countValidPage() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", true);
		return ((Long) this.findByHql(
				"select count(t) from ADPageStatus t where isValid=1", map)
				.get(0)).intValue();
	}

	@Override
	public Integer countValidSite() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", 1);
		return ((Long) this.findByHql(
				"select count(t) from ADBlogStatus t where isValid=1", map)
				.get(0)).intValue();
	}

	@Override
	public void reBuildFanliDomainText() {
		List<WeiboDomainHistory> wdhs = this.findAllByCriterion(
				WeiboDomainHistory.class, R.eq("status", 1));
		Map<String, String> result = new HashMap<String, String>();
		if (wdhs.size() > 0) {
			for (WeiboDomainHistory wdh : wdhs) {
				T_UserSubscribe usb = this.get(T_UserSubscribe.class,
						wdh.getUser_id());
				if ((usb != null && usb.getVersionNo() >= 2)) {// 如果是订购用户并且版本是返利或卖家
					String wDomain = wdh.getTdomain();
					result.put(wDomain,
							"http://" + wDomain.replaceFirst("t.", "www."));
					result.put(wDomain.replaceFirst("t.", "x."), "http://"
							+ wDomain.replaceFirst("t.", "www."));
				}
			}
		}
		if (result.size() > 0) {
			try {
				FileWriter fw = new FileWriter(EnvManager.getApachePath()
						+ File.separator + "fanli.txt", false);
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write("www.xintaowang.com" + "					"
						+ "http://www.xintaonet.com");
				bw.newLine();
				bw.write("x.xintaonet.com" + "					"
						+ "http://www.xintaonet.com");
				bw.newLine();
				for (Entry<String, String> entry : result.entrySet()) {
					bw.write(entry.getKey() + "					" + entry.getValue());
					bw.newLine();
				}
				bw.flush();
				bw.close();
				fw.close();
			} catch (IOException e) {
				SystemException.handleMessageException(e);
			}
		}
	}

	@Override
	public void auditWeiboDomain(WeiboDomainHistory dh) {
		if (dh.getStatus() == 3) {// 取消绑定
			Site site = this.get(Site.class, dh.getSite_id());
			if (site != null) {
				site.setWww(null);
			}
		} else if (dh.getStatus() == 1) {// 审核通过
			dh.setDescription(null);
			Site site = this.get(Site.class, dh.getSite_id());
			if (site == null) {
				SystemException.handleMessageException("未找到指定站点");
			}
			if (StringUtils.isNotEmpty(site.getWeibo())) {
				SystemException.handleMessageException("指定站点已配置微博域名");
			}
			site.setWeibo(dh.getTdomain());
			site.setDiscuzx(dh.getTdomain().replaceFirst("t.", "x."));
			try {
				FileWriter fw = new FileWriter(EnvManager.getApachePath()
						+ File.separator + "fanli.txt", true);
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write(site.getWeibo() + "					http://" + site.getWww());
				bw.newLine();
				bw.write(site.getDiscuzx() + "					http://" + site.getWww());
				bw.newLine();
				bw.flush();
				bw.close();
				fw.close();
			} catch (IOException e) {
				SystemException.handleMessageException(e);
			}
			// 刷新缓存中的站点信息
			SiteImpl siteImpl = EnvManager.getSites().get(site.getUser_id());
			if (siteImpl != null) {
				siteImpl.setWeibo(site.getWeibo());
				siteImpl.setDiscuzx(site.getDiscuzx());
				EnvManager.getSites().put(siteImpl.getUser_id(), siteImpl);
			}
		}
		this.update(dh);

	}

	@Override
	public void modifyReportAndTrade() {
		List<T_TaobaokeReportMember> reports = this.findAllByCriterion(
				T_TaobaokeReportMember.class, R.isNotNull("nick"));
		if (reports != null && reports.size() > 0) {
			for (T_TaobaokeReportMember report : reports) {
				String outCode = report.getOuter_code();
				if (StringUtils.isNotEmpty(outCode)
						&& outCode.startsWith("xtfl")) {
					Member member = this.get(Member.class,
							Long.valueOf(outCode.replace("xtfl", "")));
					if (member != null) {
						report.setNick(member.getInfo().getUsername());
					}
				}
			}
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public void modifyMemberAndMemberInfo() {
		String sql = "select username,pwd,email,qq,msn,wangwang,alipay,id from w_fanli_member";
		List<Object[]> result = (List<Object[]>) this.executeNativeSql(sql,
				new HashMap<String, Object>());
		if (result != null && result.size() > 0) {
			for (Object[] obj : result) {
				String username = String.valueOf(obj[0]);
				MemberInfo info = this.findByCriterion(MemberInfo.class,
						R.eq("username", username));
				BigInteger id = (BigInteger) obj[7];
				Member member = this.get(Member.class, id.longValue());
				if (info != null) {
					member.setInfo(info);
					this.update(member);
				} else {
					info = new MemberInfo();
					String pwd = String.valueOf(obj[1]);
					String email = String.valueOf(obj[2]);
					String alipay = String.valueOf(obj[6]);
					String qq = null;
					if (null != obj[3]) {
						qq = String.valueOf(obj[3]);
					}
					String msn = null;
					if (null != obj[4]) {
						msn = String.valueOf(obj[4]);
					}
					String wangwang = null;
					if (null != obj[5]) {
						wangwang = String.valueOf(obj[5]);
					}
					info.setUsername(username);
					info.setAlipay(alipay);
					info.setEmail(email);
					info.setMsn(msn);
					info.setPwd(pwd);
					info.setQq(qq);
					info.setWangwang(wangwang);
					this.save(info);
					member.setInfo(info);
					this.update(member);
				}
			}
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> getFanliSite() {
		String hql = "select new map(s.title as title,s.www as www,s.user_id as user_id,usb.nick as nick) from Site s,T_UserSubscribe usb where usb.user_id=s.user_id and usb.versionNo>=2 and s.www is not null and s.status=1 order by usb.startDate desc";
		return (List<Map<String, Object>>) this.findByHql(new Page(1, 10), hql,
				new HashMap<String, Object>());
	}

	@Override
	public void refreshUserTemplatePageId(Page<UserTemplate> page) {

	}

	@Override
	public void setAdPlanisValid(String nick) {
		List<ADPlan> plans = this.findAllByCriterion(ADPlan.class,
				R.eq("nick", nick));
		if (plans != null && plans.size() > 0) {
			for (ADPlan plan : plans) {
				if (!plan.getIsValid())
					plan.setIsValid(true);
			}
		}
		this.updateAll(plans);// 将所有无效卖家的广告计划设置为无效
	}

	@Override
	public void setAdPlanisInValid(String nick) {
		List<ADPlan> plans = this.findAllByCriterion(ADPlan.class,
				R.eq("nick", nick));
		if (plans != null && plans.size() > 0) {
			for (ADPlan plan : plans) {
				plan.setIsValid(false);
				plan.setUsed(0);
				if (plan.getIsDefault()) {
					if ("index".equals(plan.getType())) {
						// 清空淘客投放的无效广告计划
						List<ADPageSystem> adps = this.findAllByCriterion(
								ADPageSystem.class,
								R.eq("pk.aid", plan.getId()));
						if (adps != null && adps.size() > 0) {
							for (ADPageSystem aps : adps) {
								ADPageStatus apsa = this.get(
										ADPageStatus.class, aps.getPk()
												.getPid());// 查询被投放的页面
								Integer count = apsa.getAds();
								if (count != null && count > 0) {
									apsa.setAds(count - 1);
									this.update(apsa);// 更新页面投放广告数
								}
								this.delete(ADPageSystem.class, aps.getPk());// 删除投放记录
							}
						}
					} else if ("blog".equals(plan.getType())) {
						List<ADBlogSystem> adps = this.findAllByCriterion(
								ADBlogSystem.class,
								R.eq("pk.aid", plan.getId()));
						if (adps != null && adps.size() > 0) {
							for (ADBlogSystem aps : adps) {
								ADBlogStatus apsa = this.get(
										ADBlogStatus.class, aps.getPk()
												.getSid());// 查询被投放的页面
								Integer count = apsa.getAds();
								if (count != null && count > 0) {
									apsa.setAds(count - 1);
									this.update(apsa);// 更新页面投放广告数
								}
								this.delete(ADBlogSystem.class, aps.getPk());// 删除投放记录
							}
						}
					}
				}
			}
		}
		this.updateAll(plans);// 将所有无效卖家的广告计划设置为无效
	}

	@SuppressWarnings("unchecked")
	@Override
	public void refreshAdsBlog() {
		String sql = "select id from w_site where id not in (select id from w_ad_blog_status) and status=1";
		List<String> result = (List<String>) this.executeNativeSql(sql,
				new HashMap<String, Object>());
		if (result != null && result.size() > 0) {
			for (String id : result) {
				Site site = this.get(Site.class, id);
				if (site != null) {
					ADBlogStatus ad = new ADBlogStatus();
					ad.setCid(site.getCid());
					ad.setId(site.getId());
					ad.setAds(0);
					this.save(ad);
				}
			}
			result.clear();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public void refreshAdsUserTemplate() {
		String sql = "select id from w_page where id not in (select id from w_ad_page_status) and status=1";
		List<String> result = (List<String>) this.executeNativeSql(sql,
				new HashMap<String, Object>());
		if (result != null && result.size() > 0) {
			for (String id : result) {
				UserPage page = this.get(UserPage.class, id);
				if (page != null) {
					ADPageStatus aps = new ADPageStatus();
					aps.setAds(0);
					aps.setCid(page.getCid());
					aps.setId(page.getId());
					aps.setUv(page.getUv());
					this.save(aps);
				}
			}
			result.clear();
		}
	}

	@Override
	public void refreshSecondDomainName(Site site) {
		try {
			if (site.getDomainName().startsWith("shop")) {
				return;
			}
			site.setDomainName(site.getDomainName().toLowerCase());
			FileWriter fw = new FileWriter(EnvManager.getApachePath()
					+ File.separator + "seconddomain.txt", true);
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write(site.getDomainName() + ".xintaonet.com"
					+ "					http://shop" + site.getUser_id() + ".xintaonet.com");
			bw.newLine();
			bw.flush();
			bw.close();
			fw.close();
		} catch (IOException e) {
			SystemException.handleMessageException(e);
		}
	}

	@Override
	public void getItemProps(T_ItemCat cat) {
		// this.deleteAll(T_PropValue.class, R.eq("cid", cat.getCid()));// 删除所有
		// T_ItemProp prop = this.findByCriterion(T_ItemProp.class, R.eq("cid",
		// cid));

	}

	@Override
	public void getItemCatPropValues(T_ItemCat cat) {
		this.deleteAll(T_PropValue.class, R.eq("cid", cat.getCid()));// 删除所有
		ItempropvaluesGetRequest request = new ItempropvaluesGetRequest();
		request.setFields(TaobaoFetchUtil.TAOBAOITEMCATPROPVALUE_FIELDS);
		Calendar calendar = Calendar.getInstance();
		calendar.set(2005, 1, 1, 0, 0, 0);
		request.setTimestamp(calendar.getTimeInMillis());
		request.setCid(Long.valueOf(cat.getCid()));
		try {
			List<PropValue> propValues = TaobaoFetchUtil.getItemCatPropValues(
					"0", request);
			if (propValues != null && propValues.size() > 0) {
				T_PropValue value = null;
				for (PropValue prop : propValues) {
					value = new T_PropValue();
					value.setCid(String.valueOf(prop.getCid()));
					value.setIs_parent(prop.getIsParent());
					value.setName(prop.getName());
					value.setName_alias(prop.getNameAlias());
					value.setPid(String.valueOf(prop.getPid()));
					value.setProp_name(prop.getPropName());
					value.setSortOrder(prop.getSortOrder().intValue());
					value.setStatus(prop.getStatus());
					this.save(value);
				}
				cat.setIsSuccess(true);
				this.update(cat);
			} else {
				cat.setIsSuccess(true);
				this.update(cat);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void getGASeller(List<Map<String, Object>> gaResult) {

	}

	@Override
	public void auditDomain(DomainHistory dh) {
		if (dh.getStatus() == 3) {// 取消绑定
			Site site = this.get(Site.class, dh.getSite_id());
			if (site != null) {
				site.setWww(null);
			}
		} else if (dh.getStatus() == 1) {// 审核通过
			dh.setDescription(null);
			Site site = this.get(Site.class, dh.getSite_id());
			if (site == null) {
				SystemException.handleMessageException("未找到指定站点");
			}
			if (StringUtils.isNotEmpty(site.getWww())) {
				SystemException.handleMessageException("指定站点已配置独立域名");
			}
			site.setWww(dh.getWww());
			try {
				FileWriter fw = new FileWriter(EnvManager.getApachePath()
						+ File.separator + "domain.txt", true);
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write(dh.getWww() + "					http://shop" + dh.getUser_id()
						+ ".xintaonet.com");
				bw.newLine();
				bw.flush();
				bw.close();
				fw.close();
			} catch (IOException e) {
				SystemException.handleMessageException(e);
			}
			// 刷新缓存中的站点信息
			SiteImpl siteImpl = EnvManager.getSites().get(site.getUser_id());
			if (siteImpl != null) {
				siteImpl.setWww(site.getWww());
				EnvManager.getSites().put(siteImpl.getUser_id(), siteImpl);
			}
		}
		this.update(dh);
	}

	@Override
	public List<Map<String, Object>> getGATaoke(
			List<Map<String, Object>> gaResult) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (gaResult != null && gaResult.size() > 0) {
			for (Map<String, Object> map : gaResult) {
				String pid = (String) map.get("pid");
				params.put("pid", pid);
				User user = this.findByCriterion(User.class, R.eq("pid", pid));
				if (user != null) {
					user.setSites(this.findAllByCriterion(Site.class,
							R.eq("user_id", user.getUser_id())));
					map.put("user_id", user.getUser_id());
					map.put("nick", user.getNick());
					map.put("uc_id", user.getUc_id());
					if (user.getSites() != null && user.getSites().size() == 1) {
						Site site = user.getSites().get(0);
						map.put("sitetitle", site.getTitle());
						map.put("domain", site.getDomainName());
						map.put("www", site.getWww());
					}
				}
			}
		}
		return gaResult;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SiteImpl> getSiteImpl() {
		Query query = this.getHibernateSession().getNamedQuery(
				"findSiteImplNativeSQL");
		return query.list();
	}

	@Override
	public Map<String, Object> getWeeklyMailByUserId(String userId) {
		Map<String, Object> result = new HashMap<String, Object>();
		User user = this.findByCriterion(User.class, R.eq("user_id", userId));
		user.setSites(this.findAllByCriterion(Site.class,
				R.eq("user_id", user.getUser_id())));
		user.setUsb(this.get(T_UserSubscribe.class, userId));
		result.put("user", user);
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> fyItems(Page<Map<String, Object>> page) {
		String hql = "select new map(count(t.num_iid) as icount,t.num_iid as num_iid,t.click_url as click_url,t.title as title,t.nick as nick,t.commission as commission) from T_TaobaokeItem t group by t.num_iid order by count(t.num_iid) desc";
		Query query = this.getHibernateSession().createQuery(hql);
		query.setFirstResult(0);
		query.setMaxResults(page.getPageSize());
		return query.list();
	}

	@Override
	public <T> void createIndexer(Page<T> page, List<T> temp, Class<T> clazz) {
		FullTextSession fullTextSession = Search.getFullTextSession(this
				.getHibernateSession());
		page.setList(null);
		List<T> shops = this.findAllByCriterion(page, clazz);
		if (shops.size() > 0) {
			for (T shop : shops) {
				try {
					fullTextSession.index(shop);
					// shop.setUpdated(new Date());
					// this.update(shop);
				} catch (Exception e) {
					System.out.println("索引错误");
					temp.add(shop);
				}
			}
		}
		shops.clear();
		if (temp.size() > 0) {
			for (T shop : temp) {
				try {
					fullTextSession.index(shop);
					temp.remove(shop);
				} catch (Exception e) {
					System.out.println("索引错误");
				}
			}
		}
		fullTextSession.flushToIndexes();
		fullTextSession.flush();
		System.out.print("重建完毕" + temp.size());
	}

	@Override
	public void updateOnLine(String id) {
		User oUser = this.get(User.class, id);
		if (oUser != null) {
			oUser.setIsOnline(false);
		}
	}

	@Override
	public void updateMemberOnLine(Long id) {
		Member member = this.get(Member.class, id);
		if (member != null) {
			member.setIsOnline(false);
		}
	}

	@Override
	public List<?> userRegisterAnalytics(String analyticsType,
			String startDate, String endDate) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("start", startDate);
		params.put("end", endDate);
		String sql = " select date(created),count(created) from w_user where created between :start and :end group by date(created)";
		if ("week".equals(analyticsType)) {
			sql = " select week(created),count(created) from w_user where created between :start and :end group by week(created)";
		} else if ("month".equals(analyticsType)) {
			sql = " select month(created),count(created) from w_user where created between :start and :end group by month(created)";
		}
		return this.executeNativeSql(sql, params);
	}

	@Override
	public List<?> userLoginAnalytics(String analyticsType, String startDate,
			String endDate) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("start", startDate);
		params.put("end", endDate);
		String sql = " select date(login),count(login) from w_login_log where login between :start and :end group by date(login)";
		if ("week".equals(analyticsType)) {
			sql = "select dayname(login),count(login) from w_login_log where login between :start and :end group by dayname(login)";
		} else if ("month".equals(analyticsType)) {
			sql = " select month(login),count(login) from w_login_log where login between :start and :end group by month(login)";
		}
		return this.executeNativeSql(sql, params);
	}

	@Override
	public WidgetType getWidgetType(String id) {
		WidgetType type = this.get(WidgetType.class, id);
		this.initialize(type.getWidgets());
		return type;
	}

	@Override
	public List<WidgetType> getWidgetTypes() {
		List<WidgetType> types = this.loadAll(WidgetType.class);
		if (types.size() > 0) {
			for (WidgetType type : types) {
				this.initialize(type.getWidgets());
			}
		}
		return types;
	}

}
