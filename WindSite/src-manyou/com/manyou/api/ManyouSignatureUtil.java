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

import java.io.UnsupportedEncodingException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public final class ManyouSignatureUtil
 {
  private ManyouSignatureUtil()
      {
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    extractManyouParamsFromArray
// Description: 提取参数数组
// Parameters:  
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public static Map<String, CharSequence> extractManyouParamsFromArray(Map<CharSequence, CharSequence[]> reqParams)
      {
       if (null == reqParams)
          {
           return null;
          }
       Map<String,CharSequence> result = new HashMap<String,CharSequence>(reqParams.size());
       for (Map.Entry<CharSequence,CharSequence[]> entry : reqParams.entrySet())
           {
            String key = entry.getKey().toString();
            if (ManyouParam.isInNamespace(key))
                {
                 CharSequence[] value = entry.getValue();
                 if (value.length > 0)
                    {
                     result.put(key, value[0]);
                    }
                }
           }
       return result;
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    extractManyouNamespaceParams
// Description: 提取漫游参数
// Parameters:  Map<CharSequence, CharSequence> reqParams
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public static Map<String, CharSequence> extractManyouNamespaceParams(Map<CharSequence, CharSequence> reqParams)
      {
       if (null == reqParams)
          {
           return null;
          }
       Map<String,CharSequence> result = new HashMap<String,CharSequence>(reqParams.size());
       for (Map.Entry<CharSequence,CharSequence> entry : reqParams.entrySet())
           {
            String key = entry.getKey().toString();
            if (ManyouParam.isInNamespace(key))
               {
                result.put(key, entry.getValue());
               }
           }
       return result;
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    extractManyouParams
// Description: 提取漫游参数值
// Parameters:  Map<CharSequence, CharSequence> reqParams
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public static EnumMap<ManyouParam, CharSequence> extractManyouParams(Map<CharSequence, CharSequence> reqParams)
      {
       if (null == reqParams)
          {
           return null;
          }
       EnumMap<ManyouParam, CharSequence> result =
       new EnumMap<ManyouParam, CharSequence>(ManyouParam.class);
       for (Map.Entry<CharSequence, CharSequence> entry: reqParams.entrySet())
           {
            ManyouParam matchingManyouParam = ManyouParam.get(entry.getKey().toString());
            if (null != matchingManyouParam)
                {
                 result.put(matchingManyouParam, entry.getValue());
                }
           }
       return result;
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    convert
// Description: 将参数对转换为字符串
// Parameters:  
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public static List<String> convert(Collection<Map.Entry<String, CharSequence>> entries)
      {
       List<String> result = new ArrayList<String>(entries.size());
       for (Map.Entry<String, CharSequence> entry: entries)
          {
           result.add(ManyouParam.stripSignaturePrefix(entry.getKey()) + "=" + entry.getValue());
          }
       return result;
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    convertManyouParams
// Description: 将参数对转换为字符串
// Parameters:  
// Returns:    
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public static List<String> convertManyouParams(Collection<Map.Entry<ManyouParam, CharSequence>> entries)
      {
       List<String> result = new ArrayList<String>(entries.size());
       for (Map.Entry<ManyouParam, CharSequence> entry: entries)
          {
           result.add(entry.getKey().getSignatureName() + "=" + entry.getValue());
          }
       return result;
      }

///////////////////////////////////////////////////////////////////////
//
// Function:    generateSignature
// Description: 进行MD5加密
// Parameters:  
// Returns:     
// Throws:      
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
  public static String generateSignature(List<String> params, String secret)
      {
       StringBuffer buffer = new StringBuffer();
       Collections.sort(params);
       for (String param : params)
           {
            buffer.append(param + "&");
           }
       buffer.append(secret);
       try {
            java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
            StringBuffer result = new StringBuffer();
            for (byte b : md.digest(buffer.toString().getBytes("UTF-8")))
                {
                 result.append(Integer.toHexString((b & 0xf0) >>> 4));
                 result.append(Integer.toHexString(b & 0x0f));
                }
            return result.toString();
           }
       catch (java.security.NoSuchAlgorithmException ex)
           {
            System.err.println("MD5 does not appear to be supported" + ex);
            return "";
           }
       catch (UnsupportedEncodingException uee)
           {
            System.err.println("UTF8 encoding does not appear to be supported" + uee);
            return "";
           }
      }
 }
