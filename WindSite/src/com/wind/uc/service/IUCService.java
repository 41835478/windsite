package com.wind.uc.service;

import java.util.Map;

import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.service.IBaseService;
import com.wind.site.model.Widget;

import freemarker.template.Template;

/**
 * UCHome 服务
 * 
 * @author fxy
 * 
 */
public interface IUCService extends IBaseService {
	/**
	 * 获取指定日志前一个
	 * 
	 * @param blogId
	 * @param classId
	 * @return
	 */
	Map<String, Object> getPrevBlog(Integer blogId, Integer classId);

	/**
	 * 获取指定日志后一个
	 * 
	 * @param blogId
	 * @param classId
	 * @return
	 */
	Map<String, Object> getNextBlog(Integer blogId, Integer classId);

	/**
	 * 软文推广组件转换
	 * 
	 * @param maps
	 * @param widget
	 * @param classid
	 * @param bloglength
	 * @return
	 */
	Template convertBlogWidget(FreeMarkerConfigurer fcg,
			Map<String, Object> maps, Widget widget, String classid,
			String bloglength);

	/**
	 * 根据UID查询好友ID列表
	 * 
	 * @param uid
	 * @return
	 */
	String getFriends(Integer uid);

	/**
	 * 根据UID查询未通过验证的好友
	 * 
	 * @param uid
	 * @return
	 */
	String getUnFriends(Integer uid);
}
