package com.wind.site.util;

import java.util.logging.Logger;

import com.taobao.api.internal.stream.Configuration;
import com.taobao.api.internal.stream.TopCometStream;
import com.taobao.api.internal.stream.TopCometStreamFactory;
import com.taobao.api.internal.stream.connect.ConnectionLifeCycleListener;
import com.taobao.api.internal.stream.message.TopCometMessageListener;
import com.wind.site.command.TopCometStreamCommand;

/**
 * 
 * @author zhenzi 2011-8-12 上午10:14:52
 */
public class TopCometStreamTest {
	private static final Logger logger = Logger
			.getLogger(TopCometStreamCommand.class.getName());
	// private static final String url =
	// "http://10.232.127.32:8080/topcomet/stream";
	private static final String appkey = "12034285";
	private static final String secret = "2c18a03c14736c62a0b70804618f8c45";

	public static void setUpBeforeClass() throws Exception {
	}

	public static void tearDownAfterClass() throws Exception {
	}

	public static void main(String[] args) throws Exception {
		new TopCometStreamTest().testStream();
	}

	public void testStream() throws Exception {
		Configuration conf = new Configuration(appkey, secret, null);

		conf.setMinThreads(2);// 处理消息的线程池中线程最小个数
		conf.setMaxThreads(5);// 处理消息的线程池中线程最大个数
		conf.setQueueSize(100);// 处理消息的线程池中队列大小
		TopCometStream stream = new TopCometStreamFactory(conf).getInstance();
		stream.setConnectionListener(new ConnectionListener(this));
		stream.setMessageListener(new TopCometMessageListenerImpl());
		stream.start();
		logger.info("client started...");

	}

	class ConnectionListener implements ConnectionLifeCycleListener {
		private TopCometStreamTest stream;

		public ConnectionListener() {

		}

		public ConnectionListener(TopCometStreamTest stream) {
			this.stream = stream;

		}

		public void onConnect() {
			logger.info("connect success");
		}

		public void onDisconnect() {
			logger.info("disconnect...");
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
			if (stream != null) {
				try {
					stream.testStream();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

	}

	class TopCometMessageListenerImpl implements TopCometMessageListener {

		public void onReceiveMsg(String message) {
			logger.info("receive:" + message);
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
