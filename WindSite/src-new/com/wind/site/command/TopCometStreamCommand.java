package com.wind.site.command;

import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;

import com.taobao.api.internal.stream.Configuration;
import com.taobao.api.internal.stream.TopCometStream;
import com.taobao.api.internal.stream.TopCometStreamFactory;
import com.taobao.api.internal.stream.connect.ConnectionLifeCycleListener;
import com.taobao.api.internal.stream.message.TopCometMessageListener;
import com.wind.site.command.impl.TopCometReceiveMsgCommand;
import com.wind.site.rest.taobao.TaobaoFetch;

/**
 * 主动通知
 * 
 * @author fxy
 * 
 */
public class TopCometStreamCommand {
	private static final Logger logger = Logger
			.getLogger(TopCometStreamCommand.class.getName());
	TopCometStream stream;
	public static final ConcurrentHashMap<Long,Integer> userLimits = new ConcurrentHashMap<Long,Integer>();
	private TaobaoFetch fetch;

	/**
	 * 检查主动通知
	 */
	public void checkTopComet() {
		if (stream == null || stream.isStop()) {
			logger.info("top comet is stop,now restart");
			topCometRefresh();
		} else {
			logger.info("top comet is runing");
		}
	}

	public void topCometRefresh() {
		Configuration conf = new Configuration("12321683",
				"b1348afe4faff204a334a6e6e79ef597", null);
		conf.setHttpReadTimeout(120);// 120s
		conf.setMinThreads(2);// 处理消息的线程池中线程最小个数
		conf.setMaxThreads(5);// 处理消息的线程池中线程最大个数
		conf.setQueueSize(100);// 处理消息的线程池中队列大小
		stream = new TopCometStreamFactory(conf).getInstance();
		stream.setConnectionListener(new ConnectionListener(this, stream));
		stream.setMessageListener(new TopCometMessageListenerImpl());
		stream.start();
		logger.info("client started...");
	}

	public static void main(String[] args) {
		TopCometStreamCommand command = new TopCometStreamCommand();
		@SuppressWarnings("unused")
		String tradeMsg = "{\"notify_trade\":{\"buyer_nick\":\"zyl7502\",\"topic\":\"trade\",\"payment\":\"49.00\",\"nick\":\"zyl7502\",\"status\":\"TradeBuyerPay\",\"oid\":102016451781073,\"user_id\":69837310,\"tid\":102016451781073,\"type\":\"guarantee_trade\",\"seller_nick\":\"jayjoins\",\"modified\":\"2011-10-02 09:19:53\"}}";
		String itemMsg = "{\"notify_item\":{\"topic\":\"item\",\"num\":530,\"nick\":\"vossiga\",\"status\":\"ItemUpdate\",\"changed_fields\":\"num,sku\",\"user_id\":95603058,\"num_iid\":13057688369,\"modified\":\"2011-10-02 10:42:23\"}}";
		command.new TopCometMessageListenerImpl().onReceiveMsg(itemMsg);
	}

	public void setFetch(TaobaoFetch fetch) {
		this.fetch = fetch;
	}

	public TaobaoFetch getFetch() {
		return fetch;
	}

	class ConnectionListener implements ConnectionLifeCycleListener {
		private TopCometStreamCommand command;
		@SuppressWarnings("unused")
		private TopCometStream stream;

		public ConnectionListener() {

		}

		public ConnectionListener(TopCometStreamCommand command,
				TopCometStream stream) {
			this.command = command;
			this.stream = stream;
		}

		public void onConnect() {
			logger.info("connect success");
		}

		public void onDisconnect() {
			logger.info("disconnect...");
			// if (stream != null)
			// stream.start();
		}

		public void onException(Throwable throwable) {
			throwable.printStackTrace();
		}

		public void onConnectError(Exception e) {
			logger.info("connection timeout:" + e);
		}

		public void onReadTimeout() {
			logger.info("Read timeout");
		}

		public void onSysErrorException(Exception e) {
			logger.info("SysErrorException:" + e);
		}

		public void onReconnect() {
			logger.info("reconnect");
		}

		public void onMaxReadTimeoutException() {
			logger.info("maxReadTimeoutException");
			if (command != null) {
				// command.topCometRefresh();// 重新启动一个客户端
				// stream.stop();
			}
		}

	}

	class TopCometMessageListenerImpl implements TopCometMessageListener {

		public void onReceiveMsg(String message) {
			if (StringUtils.isNotEmpty(message)) {
				CommandExecutor.getTopComets().add(
						new TopCometReceiveMsgCommand(fetch, message));
				logger.info("receive:" + message);
			}
		}

		public void onConnectReachMaxTime() {
			logger.info("reach max time");
		}

		public void onDiscardMsg(String message) {
			logger.info("discardMsg:" + message);
		}

		public void onServerUpgrade(String message) {
			logger.info("DeployMsg:" + message);
		}

		public void onServerRehash() {
			logger.info("server rehash");
		}

		public void onServerKickOff() {
			logger.info("server kickoff");
		}

		public void onOtherMsg(String message) {
			logger.info("otherMsg:" + message);
		}

		public void onException(Exception ex) {
			logger.info("exception:" + ex);
		}

		public void onConnectMsg(String message) {
			logger.info("connection success message:" + message);
		}

		public void onHeartBeat() {
			logger.info("heart beat");
		}

		public void onClientKickOff() {
			logger.info("client kick off");
		}

	}
}
