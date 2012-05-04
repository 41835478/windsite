package com.wind.site.mail.impl;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.wind.site.mail.AbstractHtmlWindMailSender;

/**
 * 新淘网周报
 * 
 * @author fxy
 * 
 */
public class WindMailSender extends AbstractHtmlWindMailSender {

	@Override
	public void send() throws Exception {
		MimeMessage msg = sender.createMimeMessage();
		MimeMessageHelper helper;
		helper = new MimeMessageHelper(msg, true, "UTF-8");
		helper.setTo(to);
		helper.setFrom(from);
		helper.setSubject(subject);
		String content = FreeMarkerTemplateUtils.processTemplateIntoString(
				template, params);
		helper.setText(content, true);
		sender.send(msg);
	}
}
