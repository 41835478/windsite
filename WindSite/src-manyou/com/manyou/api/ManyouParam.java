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

import java.util.HashMap;
import java.util.Map;

///////////////////////////////////////////////////////////////////////
//
// Description: 漫游参数名枚举类
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
public enum ManyouParam
  implements CharSequence 
 {
  SIGNATURE,
  USER("user"),
  SESSION_KEY("session_key"),
  EXPIRES("expires"),
  IN_CANVAS("in_canvas"),
  IN_IFRAME("in_iframe"),
  IN_PROFILE("profile"),
  TIME("time"),
  FRIENDS("friends"),
  ADDED("added"),
  PROFILE_UPDATE_TIME("profile_update_time"),
  API_KEY("api_key")
  ;

///////////////////////////////////////////////////////////////////////
//
// Description: 漫游参数的名称
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  private static Map<String, ManyouParam> _lookupTable =
    new HashMap<String, ManyouParam>(ManyouParam.values().length);
  static
      {
       for (ManyouParam param: ManyouParam.values())
           {
            _lookupTable.put(param.toString(), param);
           }
      }

  public static ManyouParam get(String key)
      {
       return isInNamespace(key) ? _lookupTable.get(key) : null;
      }


  public static boolean isInNamespace(String key)
      {
       return null != key && key.startsWith(ManyouParam.SIGNATURE.toString());
      }


  public static boolean isSignature(String key)
      {
       return SIGNATURE.equals(get(key));
      }

  private String _paramName;
  private String _signatureName;

  private ManyouParam()
      {
       this._paramName = "my_sig";
      }

  private ManyouParam(String name)
      {
       this._signatureName = name;
       this._paramName = "my_sig_" + name;
      }

  public char charAt(int index)
      {
       return this._paramName.charAt(index);
      }

  public int length()
      {
       return this._paramName.length();
      }

  public CharSequence subSequence(int start, int end)
      {
       return this._paramName.subSequence(start, end);
      }

  public String toString()
      {
       return this._paramName;
      }
  
  public String getSignatureName()
      {
       return this._signatureName;
      }

  public static String stripSignaturePrefix(String paramName)
      {
       if (paramName != null && paramName.startsWith("my_sig_")) 
           {
            return paramName.substring(7);
           }
       return paramName;
      }
 }
