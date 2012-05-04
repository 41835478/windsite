package com.wind.site.command;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeUtility;

import org.hibernate.criterion.Order;
import org.hibernate.criterion.R;
import org.jsoup.Jsoup;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.dao.Page;
import com.wind.core.util.DateUtils;
import com.wind.site.mail.impl.WindMailSender;
import com.wind.site.model.MailQueue;
import com.wind.site.service.IAdminService;
import com.wind.uc.model.UCBlog;
import com.wind.uc.model.UCBlogField;
import com.wind.uc.service.IUCService;

import freemarker.template.Template;

/**
 * 发送邮件事件
 * 
 * @author fxy
 * 
 */
public class MailSendCommand implements IMailSendCommand {
	private static final Logger logger = Logger.getLogger(MailSendCommand.class
			.getName());
	private IUCService ucService;
	private IAdminService adminService;
	private JavaMailSender mailSender;
	/**
	 * Freemarker 环境
	 */
	private FreeMarkerConfigurer fcg;

	/**
	 * 发送邮件
	 */
	public void mailSend() {
		// 周报
		try {
			logger.info("mail send starting");
			Template template = fcg.getConfiguration().getTemplate(
					"assets/mail/weeklymail.ftl");
			Map<String, Object> params = getWeeklyMailMap();
			weeklymailStart(new Page<MailQueue>(1, 100), template, params);
			logger.info("mail send ended");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void weeklymailStart(Page<MailQueue> page, Template template,
			Map<String, Object> params) {
		List<MailQueue> queues = adminService.findAllByCriterion(page,
				MailQueue.class, R.eq("type", "weeklymail"));
		if (queues != null && queues.size() > 0) {
			for (MailQueue mail : queues) {
				try {
					WindMailSender sender = new WindMailSender();
					sender.setFrom(new InternetAddress("xintao@xintaonet.com",
							MimeUtility.encodeText("新淘网", "GB2312", "B")));
					sender.setSender(mailSender);
					sender.setParams(adminService.getWeeklyMailByUserId(mail
							.getUser_id()));
					sender.getParams().putAll(params);
					sender.setTemplate(template);
					sender.setTo(mail.getToEmail());
					sender.setSubject("新淘网周报");
					sender.send();
					adminService.deleteAll(MailQueue.class, R.eq("type",
							"weeklymail"), R.eq("user_id", mail.getUser_id()));
					Thread.sleep(5);
				} catch (Exception e) {
					e.printStackTrace();
					if (e instanceof MailSendException) {
						try {
							Thread.sleep(120 * 1000);
						} catch (InterruptedException e1) {
							e1.printStackTrace();
						}
					}
				}
			}
		}
		if (page.isHasNextPage()) {
			page.setPageNo(page.getNextPage());
			weeklymailStart(page, template, params);
		}
	}

	private Map<String, Object> getWeeklyMailMap() {
		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String, String>> blogs = new ArrayList<Map<String, String>>();
		List<UCBlog> blogList = ucService.findAllByCriterionAndOrder(
				new Page<UCBlog>(1, 10), UCBlog.class, Order.desc("dateline"),
				R.eq("classid", 15));
		if (blogList != null && blogList.size() > 0) {
			Map<String, String> blogMap = null;
			for (UCBlog blog : blogList) {
				blogMap = new HashMap<String, String>();
				blogMap.put("uid", String.valueOf(blog.getUid()));
				blogMap.put("bid", String.valueOf(blog.getBlogid()));
				blogMap.put("subject", blog.getSubject());
				blogMap.put("username", blog.getUsername());
				Calendar c = Calendar.getInstance();
				c.set(1970, 0, 1, 8, 0, 0);
				c.add(Calendar.SECOND, blog.getDateline());
				blogMap.put("dateline", DateUtils.format(c.getTime(),
						DateUtils.YYYY_MM_DD));
				UCBlogField field = ucService.get(UCBlogField.class, blog
						.getBlogid());
				if (field != null) {
					String message = Jsoup.parse(field.getMessage()).text();
					if (message.length() > 100) {
						message = message.substring(0, 100) + "...";
					}
					blogMap.put("message", message);
				}
				blogs.add(blogMap);
			}
		}
		result.put("blogs", blogs);
		result.put("fanliSites", adminService.getFanliSite());
		return result;
	}

	/**
	 * @return the fcg
	 */
	public FreeMarkerConfigurer getFcg() {
		return fcg;
	}

	/**
	 * @param fcg
	 *            the fcg to set
	 */
	public void setFcg(FreeMarkerConfigurer fcg) {
		this.fcg = fcg;
	}

	/**
	 * @return the mailSender
	 */
	public JavaMailSender getMailSender() {
		return mailSender;
	}

	/**
	 * @param mailSender
	 *            the mailSender to set
	 */
	public void setMailSender(JavaMailSender mailSender) {
		this.mailSender = mailSender;
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
