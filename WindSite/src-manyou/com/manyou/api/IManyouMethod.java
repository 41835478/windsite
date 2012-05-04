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

public interface IManyouMethod
 {
  public String methodName();

  public int numParams();

  public boolean requiresSession();

  public int numTotalParams();

  public boolean takesFile();
 }
