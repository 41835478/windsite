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

///////////////////////////////////////////////////////////////////////
//
// Description: 自定义异常
// History:     Aug 7,2008 Antsbase
//
///////////////////////////////////////////////////////////////////////
public class ManyouException
  extends Exception {
  private int _code;

  public ManyouException(int code, String msg) {
    super(msg);
    _code = code;
  }

  public int getCode() {
    return _code;
  }
}
