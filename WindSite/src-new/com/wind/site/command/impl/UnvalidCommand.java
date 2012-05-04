package com.wind.site.command.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

import com.wind.site.command.ICommand;
import com.wind.site.env.EnvManager;
import com.wind.site.model.T_UserSubscribe;
import com.wind.site.service.ICommandService;

/**
 * 刷新无效用户文件
 * 
 * @author Administrator
 * 
 */
public class UnvalidCommand implements ICommand {
	private static final Logger logger = Logger.getLogger(UnvalidCommand.class
			.getName());

	@SuppressWarnings("unchecked")
	@Override
	public void execute(ICommandService service) {
		List<T_UserSubscribe> usbs = (List<T_UserSubscribe>) service.findByHql(
				"from T_UserSubscribe where versionNo=0", null);
		logger.info(" unvalid users[" + usbs.size() + "]");
		try {
			FileWriter fw = new FileWriter(EnvManager.getApachePath()
					+ File.separator + "unvalid.txt", false);
			BufferedWriter bw = new BufferedWriter(fw);
			for (T_UserSubscribe usb : usbs) {
				bw.write("shop" + usb.getUser_id() + ".xintaonet.com					##"
						+ usb.getNick() + "##");
				bw.newLine();
			}
			bw.flush();
			bw.close();
			fw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
