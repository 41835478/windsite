package com.wind.site.command.impl;

import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;

import com.wind.site.model.UserPage;
import com.wind.site.model.UserTemplate;
import com.wind.site.service.ICommandService;

/**
 * 根据模板更新当前模板
 * 
 * @author fxy
 * 
 */
public class UpdateUserTemplateByTemplateCommand extends
		AbstractUpdateTemplateCommand {
	@SuppressWarnings("unused")
	private static final Logger logger = Logger
			.getLogger(UpdateUserTemplateByTemplateCommand.class.getName());
	private UserTemplate template;

	private UserPage page;

	private String pageId;

	@Override
	public void execute(ICommandService service) {
		// 停止旧模板更新
		// if (template != null) {
		// try {
		// deployZone.deploy(fcg, template.getUser_id(), template.getId(),
		// widgetCustomer);
		// } catch (Exception e) {
		// UCCenterPM pm = new UCCenterPM();
		// pm.setFromuid(0);
		// pm.setMsgto(template.getUser_id());
		// pm.setSubject("模板自动更新失败通知");
		// pm.setMessage("您在"
		// + DateUtils.format(new Date(),
		// DateUtils.yyyy_MM_DD_HH_MM_SS) + "修改【"
		// + template.getName()
		// + "】基本信息后。该页面在自动更新时发生错误，需要您进入设计器重新发布才可以生效");
		// pm.setInstantly(true);
		// pm.setIsusername(false);
		// pm.setReplypid(0);
		// List<UCCenterPM> pms = new ArrayList<UCCenterPM>();
		// pms.add(pm);
		// SendPmCommand command = new SendPmCommand();
		// command.setPms(pms);
		// CommandExecutor.getCommands().add(command);
		// logger.info(e.getMessage());
		// }
		// }
		if (page == null && StringUtils.isNotEmpty(pageId)) {// 如果未设置页面并且设置了页面标识
			page = pageService.get(UserPage.class, pageId);
		}
		if (page != null) {
			try {
				pageService.deployPage(fcg, page.getUser_id(), page.getId(),
						moduleMethod, false);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * @return the template
	 */
	public UserTemplate getTemplate() {
		return template;
	}

	/**
	 * @param template
	 *            the template to set
	 */
	public void setTemplate(UserTemplate template) {
		this.template = template;
	}

	public void setPage(UserPage page) {
		this.page = page;
	}

	public UserPage getPage() {
		return page;
	}

	public void setPageId(String pageId) {
		this.pageId = pageId;
	}

	public String getPageId() {
		return pageId;
	}

}
