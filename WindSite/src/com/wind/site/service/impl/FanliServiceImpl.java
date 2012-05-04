package com.wind.site.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.core.exception.SystemException;
import com.wind.core.service.impl.BaseServiceImpl;
import com.wind.site.env.EnvManager;
import com.wind.site.model.FanliKeyWordsLinks;
import com.wind.site.model.User;
import com.wind.site.service.IFanliService;

/**
 * 返利业务实现类
 * 
 * @author fxy
 * 
 */
public class FanliServiceImpl extends BaseServiceImpl implements IFanliService {

	@SuppressWarnings("unchecked")
	@Override
	public void changeKeyWords(List<FanliKeyWordsLinks> links, User user) {
		if (links != null && links.size() > 0) {
			String user_id = user.getUser_id();
			String site_id = user.getSites().get(0).getId();
			String nick = user.getNick();
			this.deleteAll(FanliKeyWordsLinks.class, R.eq("user_id", user_id),
					R.eq("site_id", site_id));// 删除所有
			for (FanliKeyWordsLinks word : links) {// 重新添加
				word.setNick(nick);
				word.setSite_id(site_id);
				word.setSortOrder(0);
				word.setUser_id(user_id);
				this.save(word);
			}
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("user_id", user_id);
			params.put("site_id", site_id);
			List<Map<String, String>> news = (List<Map<String, String>>) this
					.findByHql(
							"select new map(title as k,url as v) from FanliKeyWordsLinks where user_id=:user_id and site_id=:site_id",
							params);
			try {
				if (news != null && news.size() > 0) {
					String domainName = "shop" + user_id;
					File jsFile = new File(EnvManager.getUserPath(domainName)
							+ "keywords.js");
					File parent = new File(jsFile.getParent());
					if (!parent.exists()) {
						parent.mkdirs();
					}
					if (!jsFile.exists()) {// 如果不存在则是第一次发布
						jsFile.createNewFile();
					}
					FileUtils.writeStringToFile(jsFile, "var blogWords="
							+ new Gson().toJson(news,
									new TypeToken<List<Map<String, String>>>() {
									}.getType()), "UTF-8");
				}
			} catch (Exception e) {
				SystemException.handleMessageException(e);
			}
		}
	}

	@Override
	public Integer countFanliTradeByMemberId(Long memberId, String type,
			Integer... status) {
		String hql = "select count(*) from FanliTrade where flMember.id=:memberId ";
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("memberId", memberId);
		if (StringUtils.isNotEmpty(type)) {
			if ("BUY".equals(type)) {// 购买返利
				hql += " and type='BUY' ";
			} else {// 推广返利
				hql += " and type='ADS' ";
			}
		}
		if (status != null && status.length == 1) {
			map.put("status", status[0]);
			hql += " and status=:status ";
		}
		return ((Long) this.findByHql(hql, map).get(0)).intValue();
	}

	@Override
	public Integer countFanliTradeBySiteId(String siteId, String type,
			Integer... status) {
		String hql = "select count(*) from FanliTrade where site_id=:siteId ";
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("siteId", siteId);
		if (StringUtils.isNotEmpty(type)) {
			if ("BUY".equals(type)) {// 购买返利
				hql += " and type='BUY' ";
			} else {// 推广返利
				hql += " and type='ADS' ";
			}
		}
		if (status != null && status.length == 1) {
			map.put("status", status[0]);
			hql += " and status=:status ";
		}
		return ((Long) this.findByHql(hql, map).get(0)).intValue();
	}

	@Override
	public Double sumFanliMoneyByMemberId(Long memberId, String type,
			Integer... status) {
		String hql = "select sum(commission) from FanliTrade where flMember.id=:memberId ";
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("memberId", memberId);
		if (StringUtils.isNotEmpty(type)) {
			if ("BUY".equals(type)) {// 购买返利
				hql += " and type='BUY' ";
			} else {// 推广返利
				hql += " and type='ADS' ";
			}
		}
		if (status != null && status.length == 1) {
			map.put("status", status[0]);
			hql += " and status=:status ";
		}
		Object obj = this.findByHql(hql, map).get(0);
		return obj != null ? Double.valueOf((String) obj) : 0L;
	}

	@Override
	public Double sumFanliMoneyBySiteId(String siteId, String type,
			Integer... status) {
		String hql = "select sum(commission) from FanliTrade where site_id=:siteId ";
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("siteId", siteId);
		if (StringUtils.isNotEmpty(type)) {
			if ("BUY".equals(type)) {// 购买返利
				hql += " and type='BUY' ";
			} else {// 推广返利
				hql += " and type='ADS' ";
			}
		}
		if (status != null && status.length == 1) {
			map.put("status", status[0]);
			hql += " and status=:status ";
		}
		Object obj = this.findByHql(hql, map).get(0);
		return obj != null ? Double.valueOf((String) obj) : 0L;
	}
}
