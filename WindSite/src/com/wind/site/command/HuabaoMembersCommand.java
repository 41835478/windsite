package com.wind.site.command;

import java.util.List;
import java.util.logging.Logger;

import org.hibernate.criterion.R;

import com.wind.site.env.EnvManager;
import com.wind.uc.model.UCSpace;
import com.wind.uc.service.IUCService;

/**
 * 画报会员更新(每小时更新一次)
 * 
 * @author fxy
 * 
 */
public class HuabaoMembersCommand {
	private static final Logger logger = Logger
			.getLogger(HuabaoMembersCommand.class.getName());
	private IUCService ucService;

	public void synXintaoHuabaoMembers() {
		try {
			logger.info("HuabaoMembers syning");
			List<UCSpace> spaces = ucService.findAllByCriterion(UCSpace.class,
					R.gt("experience", 500));
			if (spaces != null && spaces.size() > 0) {
				for (UCSpace s : spaces) {
					if (!EnvManager.getValidHuabaoMembers().contains(
							s.getUsername())) {
						EnvManager.getValidHuabaoMembers().add(s.getUsername());
					}
				}
			}
			logger.info("HuabaoMembers syned");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @return the ucService
	 */
	public IUCService getUcService() {
		return ucService;
	}

	/**
	 * @param ucService
	 *            the ucService to set
	 */
	public void setUcService(IUCService ucService) {
		this.ucService = ucService;
	}

}
