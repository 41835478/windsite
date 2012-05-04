///////////////////////////////////////////////////////////////////////
//
// Copyright (c) 2005-2008 安石贝(北京)科技有限公司(AntsBase)
// All rights reserved.
// www.antsbase.com
// Project:     MymanRestClient
// Author:      Antsbase
// Date：       Aug 7, 2008
// Description：api
//
///////////////////////////////////////////////////////////////////////
package com.manyou.api;

import java.util.EnumSet;

///////////////////////////////////////////////////////////////////////
//
// Description: 漫游方法的参数名
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
public enum ManyouMethod
  implements IManyouMethod, CharSequence {
  // Authentication
  AUTH_CREATE_TOKEN("manyou.auth.createToken"),
  AUTH_GET_SESSION("manyou.auth.getSession", 1),
  // FQL Query
  // 好友
  FRIENDS_GET_APP_USERS("friend.getAppUsers"),
  FRIENDS_ARE_FRIENDS("friend.areFriends", 2),
  FRIENDS_GET("friend.get", 1), 
  // 用户
  USERS_GET_INFO("user.getinfo", 2),
  USERS_GET_LOGGED_IN_USER("user.getLoggedInUser", 1),
  USERS_IS_APP_ADDED("user.isAppAdded"),
  // XNML
  PROFILE_SET_MYML("profile.setMYML", 4),
  PROFILE_GET_MYML("profile.getMYML", 1),
  // Feed
  FEED_PUBLISH_TEMPLATIZED_ACTION("feed.publishTemplatizedAction", 15),
  //Notifications
  NOTIFICATIONS_SEND("notification.send",4),
  
  //Notifications
  NOTIFICATIONS_GET("notification.get",2),
;
  private String methodName;
  private int numParams;
  private int maxParamsWithSession;
  private boolean takesFile;

  private static EnumSet<ManyouMethod> preAuth = null;
  private static EnumSet<ManyouMethod> postAuth = null;

  public static EnumSet<ManyouMethod> preAuthMethods()
      {
       if (null == preAuth)
          {
           preAuth = EnumSet.of(AUTH_CREATE_TOKEN, AUTH_GET_SESSION);
          }
       return preAuth;
      }

  public static EnumSet<ManyouMethod> postAuthMethods()
      {
       if (null == postAuth)
          {
           postAuth = EnumSet.complementOf(preAuthMethods());
          }
       return postAuth;
      }

  ManyouMethod(String name)
      {
       this(name, 0, false);
      }

  ManyouMethod(String name, int maxParams )
      {
       this(name, maxParams, false);
      }

  ManyouMethod(String name, int maxParams, boolean takesFile )
      {
       assert (name != null && 0 != name.length());
       this.methodName = name;
       this.numParams = maxParams;
       this.maxParamsWithSession = maxParams + ManyouRestClient.NUM_AUTOAPPENDED_PARAMS;
       this.takesFile = takesFile;
      }

  public String methodName()
      {
       return this.methodName;
      }

  public int numParams()
      {
       return this.numParams;
      }

  public boolean requiresSession()
      {
       return postAuthMethods().contains(this);
      }

  public int numTotalParams()
      {
       return requiresSession() ? this.maxParamsWithSession : this.numParams;
      }

  public boolean takesFile()
      {
       return this.takesFile;
      }

  public char charAt(int index)
      {
       return this.methodName.charAt(index);
      }

  public int length()
      {
       return this.methodName.length();
      }

  public CharSequence subSequence(int start, int end)
      {
       return this.methodName.subSequence(start, end);
      }

  public String toString()
      {
       return this.methodName;
      }
 }
