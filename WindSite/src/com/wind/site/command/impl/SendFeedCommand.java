package com.wind.site.command.impl;

import java.util.Map;

import com.wind.site.service.ICommandService;

/**
 * 产生UCHome动态
 * 
 * @author fxy
 * 
 */
public class SendFeedCommand extends AbstractUCCenterCommand {
	private String icon;
	private Integer uid;
	private String username;
	private String title_template;
	private Map<String, Object> title_data;
	private String body_template;
	private Map<String, Object> body_data;
	private String body_general;
	private String target_ids;
	private String[] images;

	@Override
	public void execute(ICommandService service) {
		client.uc_feed_add(icon, uid, username, title_template, title_data,
				body_template, body_data, body_general, target_ids, images);
	}

	/**
	 * @return the icon
	 */
	public String getIcon() {
		return icon;
	}

	/**
	 * @param icon
	 *            the icon to set
	 */
	public void setIcon(String icon) {
		this.icon = icon;
	}

	/**
	 * @return the uid
	 */
	public Integer getUid() {
		return uid;
	}

	/**
	 * @param uid
	 *            the uid to set
	 */
	public void setUid(Integer uid) {
		this.uid = uid;
	}

	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username
	 *            the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return the title_template
	 */
	public String getTitle_template() {
		return title_template;
	}

	/**
	 * @param titleTemplate
	 *            the title_template to set
	 */
	public void setTitle_template(String titleTemplate) {
		title_template = titleTemplate;
	}

	/**
	 * @return the title_data
	 */
	public Map<String, Object> getTitle_data() {
		return title_data;
	}

	/**
	 * @param titleData
	 *            the title_data to set
	 */
	public void setTitle_data(Map<String, Object> titleData) {
		title_data = titleData;
	}

	/**
	 * @return the body_template
	 */
	public String getBody_template() {
		return body_template;
	}

	/**
	 * @param bodyTemplate
	 *            the body_template to set
	 */
	public void setBody_template(String bodyTemplate) {
		body_template = bodyTemplate;
	}

	/**
	 * @return the body_data
	 */
	public Map<String, Object> getBody_data() {
		return body_data;
	}

	/**
	 * @param bodyData
	 *            the body_data to set
	 */
	public void setBody_data(Map<String, Object> bodyData) {
		body_data = bodyData;
	}

	/**
	 * @return the body_general
	 */
	public String getBody_general() {
		return body_general;
	}

	/**
	 * @param bodyGeneral
	 *            the body_general to set
	 */
	public void setBody_general(String bodyGeneral) {
		body_general = bodyGeneral;
	}

	/**
	 * @return the target_ids
	 */
	public String getTarget_ids() {
		return target_ids;
	}

	/**
	 * @param targetIds
	 *            the target_ids to set
	 */
	public void setTarget_ids(String targetIds) {
		target_ids = targetIds;
	}

	/**
	 * @return the images
	 */
	public String[] getImages() {
		return images;
	}

	/**
	 * @param images
	 *            the images to set
	 */
	public void setImages(String[] images) {
		this.images = images;
	}
}
