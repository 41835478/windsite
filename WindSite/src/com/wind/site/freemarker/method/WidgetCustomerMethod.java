package com.wind.site.freemarker.method;

import java.io.StringReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.wind.core.exception.SystemException;
import com.wind.core.service.IBaseService;
import com.wind.site.model.CustomeWidget;
import com.wind.site.model.Huabaos;

import freemarker.template.Template;
import freemarker.template.TemplateMethodModel;
import freemarker.template.TemplateModelException;

/**
 * 获取自定义组件内容(自定义组件【两参数】，画报组件【三参数】)
 * 
 * @author fxy
 * 
 */
public class WidgetCustomerMethod implements TemplateMethodModel {

	private IBaseService baseService;

	private FreeMarkerConfigurer fcg;

	@SuppressWarnings("unchecked")
	@Override
	public Object exec(List args) throws TemplateModelException {
		if (args.size() == 2) {
			String cwid = (String) args.get(0);
			String pid = (String) args.get(1);
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("pid", pid);
			maps.put("spid", pid.replaceAll("mm_", "").replaceAll("_0_0", ""));
			CustomeWidget widget = baseService.get(CustomeWidget.class, cwid);
			if (widget == null) {
				return null;
			}
			try {
				Template template = new Template(widget.getId(),
						new StringReader(widget.getContent()), fcg
								.getConfiguration());
				template.setEncoding("UTF-8");
				return FreeMarkerTemplateUtils.processTemplateIntoString(
						template, maps);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (args.size() == 4) {
			Integer hid = Integer.parseInt((String) args.get(0));
			Integer picId = Integer.parseInt((String) args.get(1));
			String type = (String) args.get(2);
			String nick = (String) args.get(3);
			Huabaos huabaos = baseService.get(Huabaos.class, hid);
			if (huabaos == null) {
				SystemException.handleMessageException("当前指定画报不存在");
			}
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("huabaos", huabaos);
			params.put("type", type);
			params.put("picId", picId);
			params.put("nick", nick);
			params.put("pics", baseService.findByHql(
					"select new map(picId as picId,picSrc as picSrc) from Huabao where hid="
							+ hid + " order by picId",
					new HashMap<String, Object>()));
			try {
				Template template = fcg.getConfiguration().getTemplate(
						"site/admin/widgets/middle-1_1_11.ftl");
				template.setEncoding("UTF-8");
				return FreeMarkerTemplateUtils.processTemplateIntoString(
						template, params);
			} catch (Exception e) {
				SystemException.handleMessageException(e);
			}
		}

		return null;
	}

	/**
	 * @return the baseService
	 */
	public IBaseService getBaseService() {
		return baseService;
	}

	/**
	 * @param baseService
	 *            the baseService to set
	 */
	public void setBaseService(IBaseService baseService) {
		this.baseService = baseService;
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

}
