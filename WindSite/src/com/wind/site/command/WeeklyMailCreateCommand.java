package com.wind.site.command;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.criterion.R;

import com.wind.core.dao.Page;
import com.wind.site.command.impl.UnvalidCommand;
import com.wind.site.model.MailQueue;
import com.wind.site.model.User;
import com.wind.site.service.IAdminService;

/**
 * 创建周报email发送队列
 * 
 * @author fxy
 * 
 */
public class WeeklyMailCreateCommand {

	private IAdminService adminService;

	/**
	 * 创建邮件队列
	 */
	@SuppressWarnings("unchecked")
	public void createMail() {
		// 周报
		// 第一步：同步所有仍有效的用户
		List<User> users = (List<User>) adminService
				.findByHql(
						"select u from User as u,T_UserSubscribe as usb where u.user_id=usb.user_id and usb.versionNo>0",
						null);

		for (User user : users) {
			try {
				adminService.synVersionNo(user);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		// 第二步：生成所有无效用户命令
		CommandExecutor.getCommands().add(new UnvalidCommand());
		// try {
		// logger.info("weekly mail create starting");
		// adminService.deleteAll(MailQueue.class, R.eq("type",
		// "weeklymail"));// 清除所有未发送周报
		// addWeeklyMailQueue(new Page<User>(1, 100));
		// logger.info("weekly mail create ended");
		// } catch (Exception e) {
		// e.printStackTrace();
		// }
	}

	@SuppressWarnings( { "unchecked", "unused" })
	private void addWeeklyMailQueue(Page<User> page) {
		List<?> users = adminService
				.findByHql(
						page,
						"select new map(alipay_account as alipay_account,user_id as user_id) from User where alipay_account like '%@%'",
						new HashMap<String, Object>());
		for (Object user : users) {
			if (user != null) {
				String user_id = (String) ((Map<String, Object>) user)
						.get("user_id");
				String alipay_account = (String) ((Map<String, Object>) user)
						.get("alipay_account");
				if (alipay_account.indexOf("@") != -1) {
					MailQueue mail = adminService.findByCriterion(
							MailQueue.class, R.eq("user_id", user_id), R.eq(
									"type", "weeklymail"));
					if (mail == null) {
						mail = new MailQueue();
						mail.setFromEmail("xintao@xintaonet.com");
						mail.setIsSuccess(false);
						mail.setToEmail(alipay_account);
						mail.setType("weeklymail");
						mail.setUser_id(user_id);
						adminService.save(mail);
					}
				}
			}
		}
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			addWeeklyMailQueue(page);
		}
	}

	/**
	 * @return the adminService
	 */
	public IAdminService getAdminService() {
		return adminService;
	}

	/**
	 * @param adminService
	 *            the adminService to set
	 */
	public void setAdminService(IAdminService adminService) {
		this.adminService = adminService;
	}

}
