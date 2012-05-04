package com.wind.site.command.impl;

import java.util.logging.Logger;

import com.wind.site.model.CustomeWidget;
import com.wind.site.service.ICommandService;

/**
 * 模板更新命令
 * 
 * @author fxy
 * 
 */
public class UpdateUserTemplateCommand extends AbstractUpdateTemplateCommand {
	private static final Logger logger = Logger
			.getLogger(UpdateUserTemplateCommand.class.getName());

	/**
	 * 当前更新的自定义组件
	 */
	private CustomeWidget widget;

	@Override
	public void execute(ICommandService service) {
		try {
			// TODO 停止旧模板更新
			// List<UsedCustomeWidget> useds = service.findAllByCriterion(
			// UsedCustomeWidget.class, R.eq("widget.id", widget.getId()),
			// R.eq("autoUpdate", true));
			// if (useds.size() > 0) {
			// for (UsedCustomeWidget ucw : useds) {
			// try {
			// deployZone.deploy(fcg, ucw.getUser_id(), ucw
			// .getTemplate().getId(), widgetCustomer);
			// } catch (Exception e) {
			// UCCenterPM pm = new UCCenterPM();
			// pm.setFromuid(0);
			// pm.setMsgto(ucw.getNick());
			// pm.setSubject("模板自动更新失败通知");
			// pm.setMessage("您新淘站点中的【"
			// + ucw.getTemplate().getName()
			// + "】页面使用【"
			// + widget.getNick()
			// + "】设计的【"
			// + widget.getName()
			// + "】自定义组件，在"
			// + DateUtils.format(widget.getUpdated(),
			// DateUtils.yyyy_MM_DD_HH_MM_SS) + "被【"
			// + widget.getNick()
			// + "】更新了。该页面在自动更新时发生错误，需要您进入设计器重新发布才可以生效");
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

		} catch (Exception e) {
			logger.info(e.getMessage());
		}
	}

	public void setWidget(CustomeWidget widget) {
		this.widget = widget;
	}

	public CustomeWidget getWidget() {
		return widget;
	}

}
