package com.wind.core.exception;

import org.apache.commons.lang.exception.NestableRuntimeException;

/**
 * 异常基类
 * 
 * @author fxy
 * 
 */
public abstract class BaseException extends NestableRuntimeException {

	private static final long serialVersionUID = -1830876806238693641L;

	public BaseException() {
		super();
	}

	public BaseException(Throwable nested) {
		super(nested);
	}

	/**
	 * 获取异常标识符
	 * 
	 * @return
	 */
	public abstract String getKey();

	/**
	 * 获取异常参数
	 */
	public abstract String[] getArguments();
}
