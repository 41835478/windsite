package com.wind.site.util;

import java.io.File;
import java.util.Iterator;
import java.util.concurrent.DelayQueue;
import java.util.concurrent.Delayed;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.ElementHandler;
import org.dom4j.ElementPath;
import org.dom4j.io.SAXReader;

/**
 * 模拟考试，时间为120分钟，学生可以再30分钟后交卷， 当学生都交完了 或 时间到者考试结束
 * 
 * @author 小e
 * 
 *         2010-4-30 下午11:14:25
 */
class Student implements Runnable, Delayed {
	private String name;
	private long submitTime;// 交卷时间
	private long workTime;// 考试时间

	public Student() {
		// TODO Auto-generated constructor stub
	}

	public Student(String name, long submitTime) {
		super();
		this.name = name;
		workTime = submitTime;
		// 都转为转为ns
		this.submitTime = TimeUnit.NANOSECONDS.convert(submitTime,
				TimeUnit.MILLISECONDS)
				+ System.nanoTime();
	}

	@Override
	public void run() {
		System.out.println(name + " 交卷,用时" + workTime / 100 + "分钟");
	}

	@Override
	public long getDelay(TimeUnit unit) {
		return unit.convert(submitTime - System.nanoTime(), unit.NANOSECONDS);
	}

	@Override
	public int compareTo(Delayed o) {
		Student that = (Student) o;
		return submitTime > that.submitTime ? 1
				: (submitTime < that.submitTime ? -1 : 0);
	}

	public static class EndExam extends Student {
		private ExecutorService exec;

		public EndExam(int submitTime, ExecutorService exec) {
			super(null, submitTime);
			this.exec = exec;
		}

		@Override
		public void run() {
			exec.shutdownNow();
		}
	}

}

class Teacher implements Runnable {
	private DelayQueue<Student> students;
	private ExecutorService exec;

	public Teacher(DelayQueue<Student> students, ExecutorService exec) {
		super();
		this.students = students;
		this.exec = exec;
	}

	@Override
	public void run() {
		try {
			System.out.println("考试开始……");
			while (!Thread.interrupted()) {
				students.take().run();
			}
			System.out.println("考试结束……");
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

	}

}

public class Test {
	static final int STUDENT_SIZE = 45;
	public static final String USER_TSESSION = "tSession"; // 淘宝SESSION
	public static final String USER_USERID = "userId"; // 站长用户标识
	public static final String USER_SITEID = "siteId"; // 站长站点标识
	public static final String USER_NICK = "nick"; // 站长昵称
	public static final String USER_VERSIONNO = "versionNo"; // 站长版本号
	public static final String USER_WWW = "www"; // 站长域名
	public static final String USER_REDIRECT = "redirect"; // 站长域名

	public static void main(String[] args) {
		SAXReader reader = new SAXReader();
		reader.addHandler("/products/Product", new ElementHandler() {
			public void onStart(ElementPath path) {
				// do nothing here...
			}

			public void onEnd(ElementPath path) {
				// process a ROW element
				Element row = path.getCurrent();
				Element rowSet = row.getParent();
				Document document = row.getDocument();
				// prune the tree
				Element root = document.getRootElement();
				Iterator it = root.elementIterator();
				while (it.hasNext()) {
					Element element = (Element) it.next();
					System.out.println(" productCode : " + element.elementText("productCode")
							+ " name : " + element.elementText("name"));
				}
				row.detach();
			}
		});
		Document document = null;
		try {
			File file = new File(
					"C:\\Users\\Administrator\\Downloads\\onsale_products\\onsale_products_20110713.xml");
			document = reader.read(file);
		} catch (DocumentException e) {
			e.printStackTrace();
		}

	}

}
