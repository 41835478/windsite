package com.wind.site.command.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wind.site.command.ICommand;
import com.wind.site.command.TopCometStreamCommand;
import com.wind.site.model.ReceiveMsg;
import com.wind.site.rest.taobao.TaobaoFetch;
import com.wind.site.service.ICommandService;

/**
 * 处理当前主动通知
 * 
 * @author fxy
 * 
 */
public class TopCometReceiveMsgCommand implements ICommand {
	private static final Logger logger = Logger
			.getLogger(TopCometReceiveMsgCommand.class.getName());
	private String message;

	private TaobaoFetch fetch;

	public TopCometReceiveMsgCommand() {
	}

	public TopCometReceiveMsgCommand(TaobaoFetch fetch, String message) {
		this.fetch = fetch;
		this.message = message;
	}

	@Override
	public void execute(ICommandService service) {
		// POST请求微购API
		try {
			// 校验
			ReceiveMsg msg = new Gson().fromJson(message,
					new TypeToken<ReceiveMsg>() {
					}.getType());// 转换为Java对象，同时生成异步命令
			if (msg != null) {// 如果通知不为空，且属于商品，交易通知
				// POST
				Long user_id = null;
				if (msg.getNotify_item() != null) {
					user_id = msg.getNotify_item().getUser_id();
				} else if (msg.getNotify_trade() != null) {
					user_id = msg.getNotify_trade().getUser_id();
				}

				if (user_id != null) {
					Integer limit = TopCometStreamCommand.userLimits
							.get(user_id);
					if (limit == null) {
						limit = 0;
					}
					if (limit < 30) {// TODO 限制每个用户每天最多发布30条主动微博
						Map<String, Object> payload = new HashMap<String, Object>();
						payload.put("message", message);
						payload.put("user_id", user_id);
						String result = fetch.fetch(
								"http://www.xintaowang.com/comet", payload);
						logger.info(result);
						if ("成功".equals(result)) {
							TopCometStreamCommand.userLimits.put(user_id,
									limit + 1);
						}
					}

				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public static void main(String[] args) {
		String tradeMsg = "{\"notify_trade\":{\"buyer_nick\":\"zyl7502\",\"topic\":\"trade\",\"payment\":\"49.00\",\"nick\":\"zyl7502\",\"status\":\"TradeSuccess\",\"oid\":102016451781073,\"user_id\":71614142,\"tid\":102872254774241,\"type\":\"guarantee_trade\",\"seller_nick\":\"jayjoins\",\"modified\":\"2011-10-02 09:19:53\"}}";
		@SuppressWarnings("unused")
		String itemMsg = "{\"notify_item\":{\"topic\":\"item\",\"num\":530,\"nick\":\"vossiga\",\"status\":\"ItemUpshelf\",\"changed_fields\":\"num,sku\",\"user_id\":71614142,\"num_iid\":13057688369,\"modified\":\"2011-10-02 10:42:23\"}}";
		new TopCometReceiveMsgCommand(new TaobaoFetch(), tradeMsg)
				.execute(null);
	}

	public void setFetch(TaobaoFetch fetch) {
		this.fetch = fetch;
	}

	public TaobaoFetch getFetch() {
		return fetch;
	}

}
