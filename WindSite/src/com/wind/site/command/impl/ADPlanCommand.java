package com.wind.site.command.impl;

import com.wind.site.command.ICommand;
import com.wind.site.model.ADPlan;
import com.wind.site.service.ICommandService;

/**
 * 刷新广告计划
 * 
 * @author fxy
 * 
 */
public class ADPlanCommand implements ICommand {
	/**
	 * 要投放的广告计划
	 */
	private ADPlan plan;

	@Override
	public void execute(ICommandService service) {
		if (plan.getIsDefault()) {// 必须是主推
			if ("index".equals(plan.getType())) {// 首页推广
				service.adsUserTemplate(plan);// 处理首页投放
			} else if ("blog".equals(plan.getType())) {// 文章推广
				service.adsBlog(plan);// 处理文章投放
			}
		}
	}

	/**
	 * @return the plan
	 */
	public ADPlan getPlan() {
		return plan;
	}

	/**
	 * @param plan
	 *            the plan to set
	 */
	public void setPlan(ADPlan plan) {
		this.plan = plan;
	}
}
