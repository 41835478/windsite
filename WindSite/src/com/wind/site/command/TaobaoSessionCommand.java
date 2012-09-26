package com.wind.site.command;

import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;

import com.wind.site.command.impl.ReportsGetCommand;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.model.W_UserSubscribe;
import com.wind.site.service.ITaobaoService;
import com.wind.site.util.WindSiteRestUtil;

/**
 * 目前利用获取返利交易记录来延续淘宝SESSION,仅定时同步返利版以上
 * 
 * @author fxy
 * 
 */
public class TaobaoSessionCommand {
	private static final Logger logger = Logger
			.getLogger(TaobaoSessionCommand.class.getName());
	private ITaobaoService taobaoService;

	@SuppressWarnings("unchecked")
	public void synTaobaoSession() {
		logger.info("taobao session is starting");
		List<T_UserSubscribe> usbs = taobaoService.findAllByCriterion(
				T_UserSubscribe.class, R.ge("versionNo", 2f));// 淘宝
		Calendar calendar = Calendar.getInstance();
		List<W_UserSubscribe> wusbs = taobaoService.findAllByCriterion(
				W_UserSubscribe.class, R.gt("endDate", calendar.getTime()),
				R.ge("versionNo", 2f));// 本地
		Set<String> ids = new HashSet<String>();
		if (usbs != null && usbs.size() > 0) {
			for (T_UserSubscribe usb : usbs) {
				ids.add(usb.getUser_id());// 加入淘宝
			}
		}
		if (wusbs != null && wusbs.size() > 0) {
			for (W_UserSubscribe usb : wusbs) {
				ids.add(usb.getUser_id());// 加入本地
			}
		}
		Map<String, Object> params = new HashMap<String, Object>();
		for (String user_id : ids) {
			params.put("user_id", user_id);
			String hql = "select new map(u.appType as appType,u.user_id as user_id,u.tSession as session,u.reportSession as reportSession) from User u where (u.tSession is not null or u.reportSession is not null) and user_id=:user_id";
			List<Map<String, Object>> users = (List<Map<String, Object>>) taobaoService
					.findByHql(hql, params);
			if (users != null && users.size() == 1) {
				Map<String, Object> user = users.get(0);
				Map<String, Object> result = new HashMap<String, Object>();
				WindSiteRestUtil.covertPID(taobaoService, result,
						String.valueOf(user.get("user_id")));// 获取SID
				if (result.get("sid") != null) {
					ReportsGetCommand command = new ReportsGetCommand();
					String reportSession = String.valueOf(user
							.get("reportSession"));
					if (StringUtils.isNotEmpty(reportSession)
							&& !"null".equals(reportSession)) {
						command.setSession(reportSession);
						command.setAppType("1");
					} else {
						command.setSession(String.valueOf(user.get("session")));
						command.setAppType(String.valueOf(user.get("appType")));
					}

					command.setSite_id(String.valueOf(result.get("sid")));
					command.setUser_id(String.valueOf(user.get("user_id")));

					calendar.add(Calendar.DATE, -1);
					command.setStart(calendar.getTime());
					command.setIsTimer(true);// 将该命令标识为定时作业
					CommandExecutor.getCommands().add(command);
				}
			}
		}
	}

	public void setTaobaoService(ITaobaoService taobaoService) {
		this.taobaoService = taobaoService;
	}

	public ITaobaoService getTaobaoService() {
		return taobaoService;
	}
}
