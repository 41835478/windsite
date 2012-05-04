package com.wind.uc.service.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.dao.Page;
import com.wind.core.exception.SystemException;
import com.wind.core.service.impl.BaseServiceImpl;
import com.wind.site.model.Widget;
import com.wind.uc.model.UCBlog;
import com.wind.uc.model.UCClass;
import com.wind.uc.service.IUCService;

import freemarker.template.Template;

/**
 * UCHome 业务实现类
 * 
 * @author fxy
 * 
 */
public class UCServiceImpl extends BaseServiceImpl implements IUCService {

	@SuppressWarnings("deprecation")
	public List<?> executeNativeBlogSql(String sql, Map<String, Object> params) {
		SQLQuery query = getHibernateSession().createSQLQuery(sql).addScalar(
				"BLOGID", Hibernate.INTEGER).addScalar("SUBJECT",
				Hibernate.STRING);
		query.setProperties(params);
		return query.list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getPrevBlog(Integer blogId, Integer classId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("blogid", blogId);
		params.put("classid", classId);
		String sql = "select b.blogid as blogid,b.subject as subject from uchome_blog b where b.blogid>:blogid and b.classid=:classid order by blogid asc limit 1";
		List<Object[]> result = (List<Object[]>) this.executeNativeBlogSql(sql,
				params);
		if (result == null || result.size() == 0) {
			sql = "select b.blogid as blogid,b.subject as subject from uchome_blog b where b.classid=:classid order by blogid asc limit 1";
			result = (List<Object[]>) this.executeNativeBlogSql(sql, params);
		}
		Map<String, Object> blog = new HashMap<String, Object>();
		if (result != null && result.size() == 1) {
			Object[] obj = result.get(0);
			blog.put("blogid", obj[0]);
			blog.put("subject", obj[1]);
		}
		return blog;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getNextBlog(Integer blogId, Integer classId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("blogid", blogId);
		params.put("classid", classId);
		String sql = "select b.blogid as blogid,b.subject as subject from uchome_blog b where b.blogid<:blogid and b.classid=:classid order by blogid desc limit 1";
		List<Object[]> result = (List<Object[]>) this.executeNativeBlogSql(sql,
				params);
		if (result == null || result.size() == 0) {
			sql = "select b.blogid as blogid,b.subject as subject from uchome_blog b where b.classid=:classid order by blogid desc limit 1";
			result = (List<Object[]>) this.executeNativeBlogSql(sql, params);
		}
		Map<String, Object> blog = new HashMap<String, Object>();
		if (result != null && result.size() == 1) {
			Object[] obj = result.get(0);
			blog.put("blogid", obj[0]);
			blog.put("subject", obj[1]);
		}
		return blog;
	}

	@Override
	public Template convertBlogWidget(FreeMarkerConfigurer fcg,
			Map<String, Object> maps, Widget widget, String classid,
			String bloglength) {
		Template template = null;
		try {
			template = fcg.getConfiguration().getTemplate(
					"site/admin/widgets/" + widget.getName() + ".ftl");
			if (StringUtils.isNotEmpty(classid)) {
				Integer length = 5;
				if (StringUtils.isNotEmpty(bloglength)) {
					try {
						length = Integer.parseInt(bloglength);
					} catch (Exception e) {
						length = 5;
					}
				}
				UCClass clazz = this.get(UCClass.class, Integer
						.parseInt(classid));
				if (clazz != null) {
					maps.put("class", clazz);
					Map<String, Object> params = new HashMap<String, Object>();
					params.put("classid", Integer.parseInt(classid));
					maps
							.put(
									"blogs",
									this
											.findByHql(
													new Page<UCBlog>(1, length),
													"from UCBlog where classid=:classid order by dateline desc",
													params));
				}
			}
		} catch (Exception e) {
			SystemException.handleMessageException(e);
		}
		return template;
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getFriends(Integer uid) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("uid", uid);
		map.put("status", true);
		String hql = "select ucf.id.fuid from UCFriend ucf where ucf.id.uid=:uid and status=:status";
		List<String> ids = (List<String>) this.findByHql(hql, map);
		if (ids.size() > 0) {
			Iterator<String> i = ids.iterator();
			StringBuilder sb = new StringBuilder();
			for (;;) {
				sb.append("[" + String.valueOf(i.next()) + "]");
				if (!i.hasNext())
					break;
				sb.append(",");
			}
			return sb.toString();
		}
		return "";
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getUnFriends(Integer uid) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("uid", uid);
		map.put("status", false);
		String hql = "select ucf.id.fuid from UCFriend ucf where ucf.id.uid=:uid and status=:status";
		List<String> ids = (List<String>) this.findByHql(hql, map);
		if (ids.size() > 0) {
			Iterator<String> i = ids.iterator();
			StringBuilder sb = new StringBuilder();
			for (;;) {
				sb.append("[" + String.valueOf(i.next()) + "]");
				if (!i.hasNext())
					break;
				sb.append(",");
			}
			return sb.toString();
		}
		return "";
	}

}
