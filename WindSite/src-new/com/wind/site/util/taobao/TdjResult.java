package com.wind.site.util.taobao;

import java.util.Map;

public class TdjResult {
	private String code;
	private String pattern;
	private String templet;
	private Map<String, String> box;
	private TdjResultData data;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public String getTemplet() {
		return templet;
	}

	public void setTemplet(String templet) {
		this.templet = templet;
	}

	public Map<String, String> getBox() {
		return box;
	}

	public void setBox(Map<String, String> box) {
		this.box = box;
	}

	public TdjResultData getData() {
		return data;
	}

	public void setData(TdjResultData data) {
		this.data = data;
	}

}