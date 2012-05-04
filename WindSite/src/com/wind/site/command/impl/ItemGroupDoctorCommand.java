package com.wind.site.command.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.criterion.R;

import com.taobao.api.Constants;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.domain.TaobaokeItem;
import com.taobao.api.request.TaobaokeItemsConvertRequest;
import com.taobao.api.response.TaobaokeItemsConvertResponse;
import com.wind.site.env.EnvManager;
import com.wind.site.model.ItemGroupDoctor;
import com.wind.site.model.T_TaobaokeItem;
import com.wind.site.model.User;
import com.wind.site.service.ICommandService;
import com.wind.site.util.TaobaoFetchUtil;

/**
 * 推广组检测异步命令
 * 
 * @author fxy
 * 
 */
public class ItemGroupDoctorCommand extends AbstractTaobaokeCommand {
	private ItemGroupDoctor doctor;

	public ItemGroupDoctorCommand() {
		super();
	}

	@Override
	public void execute(ICommandService service) {
		try {
			TaobaokeItemsConvertRequest request = new TaobaokeItemsConvertRequest();
			request.setFields(TaobaoFetchUtil.TAOBAOKEITEM_FIELDS);
			String num_iids = "";
			for (T_TaobaokeItem item : doctor.getGroup().getItems()) {
				num_iids += item.getNum_iid() + ",";
			}
			String appType = service.findByCriterion(User.class,
					R.eq("nick", nick)).getAppType();
			client = new DefaultTaobaoClient(EnvManager.getUrl(), EnvManager
					.getAppKey(appType), EnvManager.getSecret(appType),
					Constants.FORMAT_JSON, 5000, 5000);
			request.setNumIids(num_iids.substring(0, num_iids.length() - 1));
			request.setNick(nick);
			request.setOuterCode(EnvManager.getItemsOuterCode());// 自定义输入串
			TaobaokeItemsConvertResponse response = client.execute(request);
			if (response.isSuccess()) {// 如果转换成功
				List<TaobaokeItem> tItems = response.getTaobaokeItems();
				Integer error = 0;
				if (tItems == null) {
					tItems = new ArrayList<TaobaokeItem>();
				}
				for (T_TaobaokeItem item : doctor.getGroup().getItems()) {
					Boolean isValid = false;
					for (TaobaokeItem tItem : tItems) {
						if (item.getNum_iid().longValue() == tItem.getNumIid()
								.longValue()) {
							TaobaoFetchUtil.convertItems(item, tItem);
							isValid = true;
							break;
						}
					}
					if (!isValid) {
						error++;// 如果有商品无效,累加1
					}
					item.setIsValid(isValid);// 首先置为无效
				}
				doctor.setState(ItemGroupDoctor.STATE_SUCCESS);// 成功
				doctor.setMsg("共有<span style='color:red;font-weight:bold;'>["
						+ error + "]</span>件商品无效");
				service.updateItemsDoctor(doctor, true);// 更新状态
			} else {
				doctor.setState(ItemGroupDoctor.STATE_ERROR);// 失败
				doctor.setMsg("[" + nick + "]检测推广组["
						+ doctor.getGroup().getName() + "]发生异常:"
						+ response.getMsg());// 记录异常信息
				service.updateItemsDoctor(doctor, false);// 更新状态
			}
		} catch (Exception e) {
			doctor.setState(ItemGroupDoctor.STATE_ERROR);
			doctor.setMsg("[" + nick + "]检测推广组[" + doctor.getGroup().getName()
					+ "]发生异常:" + e.getMessage());// 记录异常信息
			service.updateItemsDoctor(doctor, false);// 更新状态
		}
	}

	/**
	 * @return the doctor
	 */
	public ItemGroupDoctor getDoctor() {
		return doctor;
	}

	/**
	 * @param doctor
	 *            the doctor to set
	 */
	public void setDoctor(ItemGroupDoctor doctor) {
		this.doctor = doctor;
	}

}
