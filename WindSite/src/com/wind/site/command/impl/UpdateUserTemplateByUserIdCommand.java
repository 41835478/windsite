package com.wind.site.command.impl;

import java.util.List;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.R;

import com.wind.site.model.User;
import com.wind.site.model.UserPage;
import com.wind.site.service.ICommandService;

/**
 * 根据指定用户更新该用户下所有已发布的模板
 * 
 * @author fxy
 * 
 */
public class UpdateUserTemplateByUserIdCommand extends
		AbstractUpdateTemplateCommand {
	@SuppressWarnings("unused")
	private static final Logger logger = Logger
			.getLogger(UpdateUserTemplateByUserIdCommand.class.getName());
	/**
	 * 要排除的页面
	 */
	private String uninclude;

	private User user;

	private String type;

	@Override
	public void execute(ICommandService service) {
		// TODO 停止旧模板更新
		// if (widgetCustomer != null) {
		// // 查询已发布模板页面
		// List<UserTemplate> uts = service.findAllByCriterion(
		// UserTemplate.class, R.eq("user_id", user.getUser_id()), R
		// .eq("status", 1));
		// if (uts != null && uts.size() > 0) {
		// for (UserTemplate ut : uts) {
		// try {
		// deployZone.deploy(fcg, user.getUser_id(), ut.getId(),
		// widgetCustomer);
		// logger.info(user.getNick() + "【" + ut.getName()
		// + "】发布成功");
		// } catch (Exception e) {
		// UCCenterPM pm = new UCCenterPM();
		// pm.setFromuid(0);
		// pm.setMsgto(user.getNick());
		// pm.setSubject("模板自动更新失败通知");
		// pm.setMessage("您在"
		// + DateUtils.format(new Date(),
		// DateUtils.yyyy_MM_DD_HH_MM_SS) + "调整【"
		// + type + "】后。【" + ut.getName()
		// + "】页面在自动更新时发生错误，需要您进入设计器重新发布才可以生效");
		// pm.setInstantly(true);
		// pm.setIsusername(true);
		// pm.setReplypid(0);
		// List<UCCenterPM> pms = new ArrayList<UCCenterPM>();
		// pms.add(pm);
		// SendPmCommand command = new SendPmCommand();
		// command.setPms(pms);
		// CommandExecutor.getCommands().add(command);
		// logger.info(e.getMessage());
		// }
		// }
		// }
		// }
		if (moduleMethod != null) {
			// 查询并发布新版本页面
			List<UserPage> pages = service.findAllByCriterion(UserPage.class, R
					.eq("user_id", user.getUser_id()), R.eq("status", true));
			if (pages != null && pages.size() > 0) {
				for (UserPage page : pages) {
					if (StringUtils.isNotEmpty(uninclude)) {// 排除
						if (uninclude.indexOf(page.getId()) != -1) {
							continue;
						}
					}
					try {
						pageService.deployPage(fcg, page.getUser_id(), page
								.getId(), moduleMethod, false);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
	}

	/**
	 * @return the user
	 */
	public User getUser() {
		return user;
	}

	/**
	 * @param user
	 *            the user to set
	 */
	public void setUser(User user) {
		this.user = user;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	public void setUninclude(String uninclude) {
		this.uninclude = uninclude;
	}

	public String getUninclude() {
		return uninclude;
	}

}
