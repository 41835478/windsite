package com.wind.site.command.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.wind.site.model.UCCenterPM;
import com.wind.site.service.ICommandService;

/**
 * 发送短消息命令
 * 
 * @author fxy
 * 
 */
public class SendPmCommand extends AbstractUCCenterCommand {
	private static final Logger logger = Logger.getLogger(SendPmCommand.class
			.getName());
	List<UCCenterPM> pms = new ArrayList<UCCenterPM>();

	@Override
	public void execute(ICommandService service) {
		if (pms != null && pms.size() > 0) {
			for (UCCenterPM pm : pms) {
				client.uc_pm_send(pm.getFromuid(), pm.getMsgto(), pm
						.getSubject(), pm.getMessage(), pm.getInstantly(), pm
						.getReplypid(), pm.getIsusername());
				logger.info("【" + pm.getSubject() + "】短消息发送成功");
			}
		}
	}

	/**
	 * @return the pms
	 */
	public List<UCCenterPM> getPms() {
		return pms;
	}

	/**
	 * @param pms
	 *            the pms to set
	 */
	public void setPms(List<UCCenterPM> pms) {
		this.pms = pms;
	}

}
