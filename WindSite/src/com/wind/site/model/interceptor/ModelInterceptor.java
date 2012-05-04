package com.wind.site.model.interceptor;

import java.io.Serializable;
import java.util.Date;

import org.hibernate.EmptyInterceptor;
import org.hibernate.type.Type;

import com.wind.site.env.EnvManager;
import com.wind.site.model.TimestampModel;

/**
 * 对象拦截器
 * 
 * @author fxy
 * 
 */
public class ModelInterceptor extends EmptyInterceptor {

	private static final long serialVersionUID = 4249115233872336280L;

	/*
	 * 创建created时间
	 * 
	 * @see org.hibernate.EmptyInterceptor#onSave(java.lang.Object,
	 * java.io.Serializable, java.lang.Object[], java.lang.String[],
	 * org.hibernate.type.Type[])
	 */
	@Override
	public boolean onSave(Object entity, Serializable id, Object[] state,
			String[] propertyNames, Type[] types) {
		Boolean isCreated = false;
		Boolean isCreatedBy = false;
		Boolean isUpdated = false;
		if (entity instanceof TimestampModel) {
			for (int i = 0; i < propertyNames.length; i++) {
				if ("created".equals(propertyNames[i])) {
					state[i] = new Date();
					isCreated = true;
				} else if ("updated".equals(propertyNames[i])) {
					state[i] = new Date();
					isUpdated = true;
				} else if ("createdBy".equals(propertyNames[i])) {
					if (EnvManager.getUser() != null) {
						state[i] = EnvManager.getUser().getUser_id();
					}
					isCreatedBy = true;
				}
				if (isCreatedBy) {
					if (isCreated) {
						if (isUpdated) {
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	/*
	 * 
	 * 更新updated时间
	 * 
	 * @see org.hibernate.EmptyInterceptor#onFlushDirty(java.lang.Object,
	 * java.io.Serializable, java.lang.Object[], java.lang.Object[],
	 * java.lang.String[], org.hibernate.type.Type[])
	 */
	@Override
	public boolean onFlushDirty(Object entity, Serializable id,
			Object[] currentState, Object[] previousState,
			String[] propertyNames, Type[] types) {
		Boolean isUpdated = false;
		Boolean isUpdatedBy = false;
		if (entity instanceof TimestampModel) {
			for (int i = 0; i < propertyNames.length; i++) {
				if ("updated".equals(propertyNames[i])) {
					currentState[i] = new Date();
					isUpdated = true;
				} else if ("updatedBy".equals(propertyNames[i])) {
					if (EnvManager.getUser() != null) {
						currentState[i] = EnvManager.getUser().getUser_id();
						isUpdatedBy = true;
					}
				}
				if (isUpdatedBy) {
					if (isUpdated) {
						return true;
					}
				}
			}
		}
		return false;
	}

}
