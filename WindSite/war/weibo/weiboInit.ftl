//XWB_AD
INSERT INTO `xwb_ad` VALUES (1,'','0',1306827698,'页尾广告','全站','global','global_footer','',0,0,'建议大小，两栏800px *70px，三栏为960px*70px',${user_id}),(2,'','0',1306894648,'页头广告','全站','global','global_header','',0,0,'建议大小，两栏570px *70px，三栏为720px*70px',${user_id}),(3,'','0',1306894660,'右侧banner','全站','global','sidebar','',0,0,'建议大小，180px*任意高度',${user_id});
//XWB_COMPONENT_CFG
INSERT INTO `xwb_component_cfg` VALUES (1,'show_num','5','组件显示的微博数',${user_id}),(2,'group_id','1','名人推荐用户组对应的用户列表ID',${user_id}),(2,'show_num','3','显示的名人数',${user_id}),(3,'show_num','9',NULL,${user_id}),(3,'group_id','2','推荐用户组使用的用户列表ID',${user_id}),(4,'group_id','3','人气关注榜的数据来源，0 使用新浪API >0　对应的用户组',${user_id}),(10,'show_num','10','今日话题显示的微博数',${user_id}),(10,'group_id','1','今日话题使用的话题组',${user_id}),(11,'groups','{\"1\":\"\\u660e\\u661f\",\"2\":\"\\u8349\\u6839\"}',NULL,${user_id}),(9,'show_num','4','随便看看',${user_id}),(5,'list_id','54355137','list id',${user_id}),(5,'show_num','4',NULL,${user_id}),(4,'show_num','5','人气关注榜挂件人数',${user_id}),(6,'show_num','10',NULL,${user_id}),(6,'topic_id','0','0 使用新浪API取数据　> 0 对应的话题组ID',${user_id}),(7,'show_num','9',NULL,${user_id}),(8,'show_num','3',NULL,${user_id}),(2,'topic_id','0','0 使用新浪API取数据　> 0 对应的话题组ID',${user_id}),(10,'source','1','0 使用全局数据 >0 使用本站数据',${user_id}),(9,'source','1','0 使用全局数据 >0 使用本站数据',${user_id}),(1,'source','1','0 使用全局数据 >0 使用本站数据',${user_id}),(8,'source','1','0 使用全局数据 >0 使用本站数据',${user_id}),(12,'topic','微小说','话题微薄的默认话题',${user_id}),(12,'show_num','6','显示微博数',${user_id}),(12,'source','1','微博来源',${user_id}),(17,'show_num','5','组件显示的微博数',${user_id}),(17,'source','0','0 使用全局数据 >0 使用本站数据',${user_id}),(18,'show_num','3',NULL,${user_id});

//INSERT INTO `xwb_component_topic` VALUES (26,2,'Xweibo',1303107194,0,'1303107120',${user_id});
//INSERT INTO `xwb_component_topiclist` VALUES (2,'今日话题',1,'0','2,5',2,${user_id});

INSERT INTO `xwb_component_usergroups` VALUES (3,'自动关注用户列表',1,'11:1,11:1',0,${user_id}),(83,'首次登录引导关注',0,NULL,0,${user_id}),(84,'首页用户推荐(他们在微博)',1,NULL,0,${user_id});

INSERT INTO `xwb_components` VALUES (1,'热门转发与评论','热门转发与评论',0,1,1,'hotWb','当天转发最多的微博列表（倒序排列）',NULL,'wb',${user_id}),(2,'用户组','用户组',2,1,1,'starRcm','一组用户的列表',NULL,'user',${user_id}),(3,'推荐用户','推荐用户',3,1,2,'userRcm','指定某些用户的列表（右边栏）',NULL,'user',${user_id}),(5,'自定义微博列表','自定义微博列表',5,1,1,'official','某些指定用户发布的微博列表',NULL,'wb',${user_id}),(6,'话题推荐列表','话题推荐列表',6,1,2,'hotTopic','一组话题列表',NULL,'others',${user_id}),(7,'可能感兴趣的人','可能感兴趣的人',0,1,2,'guessYouLike','根据当前用户的IP、个人资料推荐相关联的用户列表',NULL,'user',${user_id}),(8,'同城微博','同城微博',0,1,1,'cityWb','根据当前用户的IP地址判断地区，并展示该地区用户的微博列表',NULL,'wb',${user_id}),(9,'随便看看','随便看看',0,1,1,'looklook','一段特点时间内发布的（一般为最新）的微博列表，随机展现',NULL,'wb',${user_id}),(10,'今日话题','今日话题',0,1,1,'todayTopic','自动获取与今日话题相关的微博消息。话题可以在“运营管理-话题推荐管理”中设置',NULL,'others',${user_id}),(12,'话题微博','话题微博',12,1,1,'topicWb','当前设定话题的相关微博列表',NULL,'wb',${user_id}),(15,'最新用户','最新用户',0,1,2,'newestWbUser','本站最新开通微博的用户列表',NULL,'user',${user_id}),(14,'最新微博','最新微博',15,1,1,'newestWb','当前站点最新发布的微博列表',NULL,'wb',${user_id}),(13,'专题banner图','专题banner图',13,1,1,'pageImg','在页面中添加一个宽度为560px的banner图片',NULL,'others',${user_id}),(16,'微博发布框','微博发布框',0,1,1,'sendWb','微博发布框',NULL,'others',${user_id}),(18,'活动列表','活动列表',0,1,2,'eventList','活动列表',NULL,'others',${user_id}),(19,'本地关注榜','本地关注榜',0,1,2,'localFollowTop','本地关注榜',NULL,'user',${user_id});

INSERT INTO `xwb_item_groups` VALUES (1,2,83,'首次登录引导关注',0,${user_id});

INSERT INTO `xwb_nav` VALUES (132,'活动',0,1,100,35,0,'',2,0,${user_id}),(130,'微博广场',0,1,0,1,0,'',2,0,${user_id}),(131,'名人堂',0,1,0,3,0,'',2,0,${user_id}),(21,'我的首页',0,1,50,2,1,'',2,1,${user_id});

INSERT INTO `xwb_page_manager` VALUES (1,10,'今日话题',1,1,1,1,0,'{\"show_num\":\"10\",\"source\":\"0\",\"topic\":\"Xweibo\"}'),(1,14,'本站最新微博',1,3,1,363,0,'{\"show_num\":\"10\"}'),(1,7,'可能感兴趣的人',2,2,1,364,0,'{\"show_num\":\"3\"}'),(2,7,'可能感兴趣的人',2,2,1,11,0,'{\"show_num\":\"10\"}'),(45,13,'随便看看banner图',1,1,1,357,0,'{\"link\":\"\",\"src\":\"\\/var\\/upload\\/pic\\/component_img_1303108721.png\",\"width\":\"560\",\"height\":\"\"}'),(45,14,'本站最新微博',1,2,1,356,0,'{\"show_num\":\"20\"}'),(44,13,'banner图',1,1,1,355,0,'{\"link\":\"http:\\/\\/\",\"src\":\"\\/var\\/upload\\/pic\\/component_img_1303108508.png\",\"width\":\"560\",\"height\":\"\"}'),(44,8,'同城微博',1,2,1,353,0,'{\"source\":\"0\",\"page_type\":\"1\",\"show_num\":\"15\"}'),(44,19,'本地关注榜',2,2,1,354,0,'{\"show_num\":\"6\"}'),(47,5,'自定义集体微博',1,2,1,361,0,'{\"list_id\":\"0\",\"page_type\":\"1\",\"show_num\":\"15\"}'),(46,13,'自定义话题Banner',1,1,1,359,0,'{\"link\":\"\",\"src\":\"\\/var\\/upload\\/pic\\/component_img_1303109588.png\",\"width\":\"560\",\"height\":\"\"}'),(47,13,'自定义集体微博',1,1,1,360,0,'{\"link\":\"\",\"src\":\"\\/var\\/upload\\/pic\\/component_img_1303110458.png\",\"width\":\"560\",\"height\":\"\"}'),(46,12,'自定义话题微博列表',1,2,1,358,0,'{\"topic\":\"xweibo\",\"source\":\"0\",\"page_type\":\"1\",\"show_num\":\"15\"}'),(1,12,'大家都在聊',1,2,1,366,0,'{\"topic\":\"\\u5fae\\u535a\",\"source\":\"0\",\"page_type\":\"0\",\"show_num\":\"10\"}');

INSERT INTO `xwb_pages` VALUES (1,'微博广场','“微博广场”是用户免登录即可查看的页面，包含了今日话题、随便看看等组件。',1,'pub',NULL),(2,'我的首页','“我的首页”是登录用户操作微博的页面，包含了猜你喜欢、推荐话题等组件。',1,'index',NULL),(3,'名人堂','名人堂',1,'celeb',NULL),(4,'我的微博','我的微博',1,'index.profile',NULL),(35,'活动首页','活动列表页，包括最新活动和推荐活动',1,'event',NULL),(6,'话题排行榜','话题排行榜',1,'pub.topics',NULL),(37,'我的收藏','我的收藏',1,'index.favorites',2),(7,'在线直播','在线直播扩展工具',1,'live',NULL),(8,'在线访谈','在线访谈扩展工具',1,'interview',NULL);

INSERT INTO `xwb_sys_config` (`key`,`value`,`group_id`,`user_id`) VALUES 
('rewrite_enable','0',1,${user_id}),
('logo','',1,${user_id}),
('login_way','1',1,${user_id}),
('third_code','',1,${user_id}),
('site_record','',1,${user_id}),
('address_icon','',1,${user_id}),
('head_link','',1,${user_id}),
('foot_link','',1,${user_id}),
('authen_type','3',1,${user_id}),
('authen_big_icon','img/logo/big_auth_icon.png',1,${user_id}),
('authen_small_icon','img/logo/small_auth_icon.png',1,${user_id}),
('skin_default','1',1,${user_id}),
('ad_header','',1,${user_id}),
('guide_auto_follow','',1,${user_id}),
('ad_footer','',1,${user_id}),
('title','Xweibo 2.1',2,${user_id}),
('text','新淘网整合新浪微博打造独属的在线微博购物交流平台。',2,${user_id}),
('bg_pic','',2,${user_id}),
('oper','2',2,${user_id}),
('topic','',2,${user_id}),
('link','http://www.xintaonet.com',2,${user_id}),
('btnTitle','了解更多',2,${user_id}),
('guide_auto_follow_id','3',1,${user_id}),
('authen_small_icon_title','我的站点认证',1,${user_id}),
('ad_setting','',1,${user_id}),
('microInterview_setting','',1,${user_id}),
('wb_page_type','2',1,${user_id}),
('wb_header_model','1',1,${user_id}),
('wb_header_htmlcode','',1,${user_id}),
('api_checking','',1,${user_id}),
('xwb_discuz_url','',1,${user_id}),
('xwb_discuz_enable','',1,${user_id}),
('use_person_domain','0',1,${user_id}),
('site_short_link','',1,${user_id}),
('microLive_setting','',1,${user_id}),
('default_use_custom','0',1,${user_id}),
('open_user_local_relationship','0',1,${user_id}),
('xwb_strategy','',1,${user_id}),
('sysLoginModel','0',1,${user_id}),
('xwb_login_group_id',84,1,${user_id}),
('site_name','站点名称',1,${user_id}),
('wb_version','2.1',1,${user_id}),
('app_key', 'WB_AKEY',1,${user_id}),
('app_secret', 'WB_SKEY',1,${user_id}),
('db_prefix', 'xwb_',1,${user_id}),
('wb_lang_type','zh_cn',1,${user_id});
