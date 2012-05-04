-- MySQL dump 10.13  Distrib 5.1.50, for Win32 (ia32)

--
-- Dumping data for table `xwb_admin`
--

/*!40000 ALTER TABLE `xwb_ad` DISABLE KEYS */;
/*!INSERT INTO `xwb_admin` VALUES ('3', NULL, NULL,NULL,NULL,NULL,NULL,NULL,'1311032223', '0', 5, USER_ID, 'tUSER_ID.xintaonet.com',NULL,NULL,'USER_NICK','pub','',0,NULL);*/
/*!40000 ALTER TABLE `xwb_ad` ENABLE KEYS */;

--
-- Dumping data for table `xwb_ad`
--

/*!40000 ALTER TABLE `xwb_ad` DISABLE KEYS */;
INSERT INTO `xwb_ad` VALUES (1,'','0',1306827698,'页尾广告','全站','global','global_footer','',0,0,'建议大小，两栏800px *70px，三栏为960px*70px',USER_ID),(2,'','0',1306894648,'页头广告','全站','global','global_header','',0,0,'建议大小，两栏570px *70px，三栏为720px*70px',USER_ID),(3,'','0',1306894660,'右侧banner','全站','global','sidebar','',0,0,'建议大小，180px*任意高度',USER_ID);
/*!40000 ALTER TABLE `xwb_ad` ENABLE KEYS */;

--
-- Dumping data for table `xwb_component_cfg`
--

/*!40000 ALTER TABLE `xwb_component_cfg` DISABLE KEYS */;
INSERT INTO `xwb_component_cfg` VALUES (1,'show_num','5','组件显示的微博数',USER_ID),(2,'group_id','1','名人推荐用户组对应的用户列表ID',USER_ID),(2,'show_num','3','显示的名人数',USER_ID),(3,'show_num','9',NULL,USER_ID),(3,'group_id','2','推荐用户组使用的用户列表ID',USER_ID),(4,'group_id','3','人气关注榜的数据来源，0 使用新浪API >0　对应的用户组',USER_ID),(10,'show_num','10','今日话题显示的微博数',USER_ID),(10,'group_id','1','今日话题使用的话题组',USER_ID),(11,'groups','{\"1\":\"\\u660e\\u661f\",\"2\":\"\\u8349\\u6839\"}',NULL,USER_ID),(9,'show_num','4','随便看看',USER_ID),(5,'list_id','54355137','list id',USER_ID),(5,'show_num','4',NULL,USER_ID),(4,'show_num','5','人气关注榜挂件人数',USER_ID),(6,'show_num','10',NULL,USER_ID),(6,'topic_id','0','0 使用新浪API取数据　> 0 对应的话题组ID',USER_ID),(7,'show_num','9',NULL,USER_ID),(8,'show_num','3',NULL,USER_ID),(2,'topic_id','0','0 使用新浪API取数据　> 0 对应的话题组ID',USER_ID),(10,'source','1','0 使用全局数据 >0 使用本站数据',USER_ID),(9,'source','1','0 使用全局数据 >0 使用本站数据',USER_ID),(1,'source','1','0 使用全局数据 >0 使用本站数据',USER_ID),(8,'source','1','0 使用全局数据 >0 使用本站数据',USER_ID),(12,'topic','微小说','话题微薄的默认话题',USER_ID),(12,'show_num','6','显示微博数',USER_ID),(12,'source','1','微博来源',USER_ID),(17,'show_num','5','组件显示的微博数',USER_ID),(17,'source','0','0 使用全局数据 >0 使用本站数据',USER_ID),(18,'show_num','3',NULL,USER_ID);
/*!40000 ALTER TABLE `xwb_component_cfg` ENABLE KEYS */;

--
-- Dumping data for table `xwb_component_topic`
--

/*!40000 ALTER TABLE `xwb_component_topic` DISABLE KEYS */;
/*!INSERT INTO `xwb_component_topic` VALUES (26,2,'淘宝',1303107194,0,'1303107120',USER_ID)*/;
/*!40000 ALTER TABLE `xwb_component_topic` ENABLE KEYS */;

--
-- Dumping data for table `xwb_component_topiclist`
--

/*!40000 ALTER TABLE `xwb_component_topiclist` DISABLE KEYS */;
/*!INSERT INTO `xwb_component_topiclist` VALUES (2,'今日话题',1,'0','2,5',2,USER_ID)*/;
/*!40000 ALTER TABLE `xwb_component_topiclist` ENABLE KEYS */;

--
-- Dumping data for table `xwb_component_usergroups`
--

/*!40000 ALTER TABLE `xwb_component_usergroups` DISABLE KEYS */;
INSERT INTO `xwb_component_usergroups` VALUES (3,'自动关注用户列表',1,'11:1,11:1',0,USER_ID),(83,'首次登录引导关注',0,NULL,0,USER_ID),(84,'首页用户推荐(他们在微博)',1,NULL,0,USER_ID);
/*!40000 ALTER TABLE `xwb_component_usergroups` ENABLE KEYS */;

--
-- Dumping data for table `xwb_component_users`
--

/*!40000 ALTER TABLE `xwb_component_users` DISABLE KEYS */;
/*!INSERT INTO `xwb_component_users` VALUES (1,1904178193,3,'微博开放平台','新浪微博API官方帐号',160),(2,1662047260,3,'SinaAppEngine','新浪SAE服务官方帐号',163),(83,1076590735,1,'Xweibo官方','xweibo官方微博',164),(2,1904178193,2,'微博开放平台','新浪微博API官方帐号',162),(2,1076590735,1,'Xweibo官方','新浪Xweibo官方帐号',161),(1,1076590735,1,'Xweibo官方','新浪Xweibo官方帐号',158),(1,1662047260,2,'SinaAppEngine','新浪SAE云服务平台官方帐号',159),(84,1076590735,1,'Xweibo官方','xweibo官方微博',165); */
/*!40000 ALTER TABLE `xwb_component_users` ENABLE KEYS */;

--
-- Dumping data for table `xwb_item_groups`
--

/*!40000 ALTER TABLE `xwb_item_groups` DISABLE KEYS */;
INSERT INTO `xwb_item_groups` VALUES (1,2,83,'首次登录引导关注',0,USER_ID);
/*!40000 ALTER TABLE `xwb_item_groups` ENABLE KEYS */;

--
-- Dumping data for table `xwb_nav`
--

/*!40000 ALTER TABLE `xwb_nav` DISABLE KEYS */;
INSERT INTO `xwb_nav` VALUES (1000,'微博广场',0,1,0,1,0,'',2,0,USER_ID),(21,'我的首页',0,1,1,2,1,'',2,1,USER_ID),(496,'名人堂',0,1,7,3,0,'',2,0,USER_ID),(495,'话题排行榜',0,1,8,6,0,'',2,0,USER_ID);
/*!40000 ALTER TABLE `xwb_nav` ENABLE KEYS */;

--
-- Dumping data for table `xwb_page_manager`
--

/*!40000 ALTER TABLE `xwb_page_manager` DISABLE KEYS */;
INSERT INTO `xwb_page_manager_SUFFIX` VALUES (997, 95, '凡客搜索', 3, 0, 1, 9999, 1, '{\"cid\":\"0\"}', USER_ID),(998, 97, '商品搜索', 3, 0, 1, 10000, 1, '{\"source\":\"1\",\"cid\":\"16\"}', USER_ID),(999, 99, '淘画报搜索', 3, 0, 1, 9997, 1, '{}', USER_ID);
/*!40000 ALTER TABLE `xwb_page_manager` ENABLE KEYS */;

--
-- Dumping data for table `xwb_pages`
--

/*!40000 ALTER TABLE `xwb_pages` DISABLE KEYS */;
/*!INSERT INTO `xwb_pages` VALUES (1,'微博广场','“微博广场”是用户免登录即可查看的页面，包含了今日话题、随便看看等组件。',1,'pub',NULL,USER_ID,0,NULL),(2,'我的首页','“我的首页”是登录用户操作微博的页面，包含了猜你喜欢、推荐话题等组件。',1,'index',NULL,USER_ID,0,NULL),(3,'名人堂','名人堂',1,'celeb',NULL,USER_ID,0,NULL),(4,'我的微博','我的微博',1,'index.profile',NULL,USER_ID,0,NULL),(35,'活动首页','活动列表页，包括最新活动和推荐活动',1,'event',NULL,USER_ID,0,NULL),(6,'话题排行榜','话题排行榜',1,'pub.topics',NULL,USER_ID,0,NULL),(37,'我的收藏','我的收藏',1,'index.favorites',2,USER_ID,0,NULL),(7,'在线直播','在线直播扩展工具',1,'live',NULL,USER_ID,0,NULL),(8,'在线访谈','在线访谈扩展工具',1,'interview',NULL,USER_ID,0,NULL),(1000,'试衣间','试衣间',1,'fiting',NULL,USER_ID,0,NULL),(999,'画报导购','画报导购',1,'posters',NULL,USER_ID,0,NULL),(998,'商品导购','商品导购',1,'items',NULL,USER_ID,0,NULL),(997,'凡客导购','凡客导购',1,'vancls',NULL,USER_ID,0,NULL),(996,'凡客单品详情页','凡客单品详情页',1,'vancl',NULL,USER_ID,0,NULL),(995,'画报详情页','画报详情页',1,'poster',NULL,USER_ID,0,NULL);*/
/*!40000 ALTER TABLE `xwb_pages` ENABLE KEYS */;

--
-- Dumping data for table `xwb_plugins`
--

/*!40000 ALTER TABLE `xwb_plugins` DISABLE KEYS */;
/*!INSERT INTO `xwb_plugins` VALUES (2,'用户首页聚焦位','开启该插件会将站长设定的内容以图文的形式显示于用户首页中。',1),(3,'个人资料推广位','开启该插件会将站长设定的内容以文字链接的形式显示于用户的个人信息的下方。',1),(4,'登录后引导关注','开启该插件后，用户首次登录会强制关注指定的用户并且引导用户其它推荐用户。',1),(5,'用户反馈意见','左导航会出现一个意见反馈通道',1),(6,'数据本地备份','本站备份一份微博数据',1); */
/*!40000 ALTER TABLE `xwb_plugins` ENABLE KEYS */;

--
-- Dumping data for table `xwb_sys_config`
--

/*!40000 ALTER TABLE `xwb_sys_config` DISABLE KEYS */;
/*!INSERT INTO `xwb_sys_config` VALUES ('rewrite_enable','1',1,USER_ID),('logo','',1,USER_ID),('login_way','1',1,USER_ID),('third_code','',1,USER_ID),('site_record','',1,USER_ID),('address_icon','',1,USER_ID),('head_link','',1,USER_ID),('foot_link','',1,USER_ID),('authen_type','3',1,USER_ID),('authen_big_icon','img/logo/big_auth_icon.png',1,USER_ID),('authen_small_icon','img/logo/small_auth_icon.png',1,USER_ID),('skin_default','1',1,USER_ID),('ad_header','',1,USER_ID),('guide_auto_follow','',1,USER_ID),('ad_footer','',1,USER_ID),('title','USER_NICK',2,USER_ID),('text','新版微博系统更新了大量功能，在原有体系基础上，提供了丰富的运营手段，帮助广大站长利用新浪微博的平台，架设属于自己网站的微博系统。',2,USER_ID),('bg_pic','',2,USER_ID),('oper','2',2,USER_ID),('topic','',2,USER_ID),('link','http://www.xintaowang.com',2,USER_ID),('btnTitle','了解更多',2,USER_ID),('guide_auto_follow_id','3',1,USER_ID),('authen_small_icon_title','我的站点认证',1,USER_ID),('ad_setting','',1,USER_ID),('microInterview_setting','',1,USER_ID),('wb_page_type','2',1,USER_ID),('wb_header_model','1',1,USER_ID),('wb_header_htmlcode','',1,USER_ID),('api_checking','',1,USER_ID),('xwb_discuz_url','',1,USER_ID),('xwb_discuz_enable','',1,USER_ID),('use_person_domain','0',1,USER_ID),('site_short_link','',1,USER_ID),('microLive_setting','',1,USER_ID),('default_use_custom','0',1,USER_ID),('open_user_local_relationship','0',1,USER_ID),('xwb_strategy','',1,USER_ID),('sysLoginModel','0',1,USER_ID),('xwb_login_group_id',84,1,USER_ID);*/
/*!INSERT INTO `xwb_sys_config` VALUES ('site_name','USER_NICK',1,USER_ID),('wb_version','2.2',1,USER_ID),('app_key', '3812233997',1,USER_ID),('app_secret', 'b79fe224dbed1917b323d464ecf11c94',1,USER_ID),('db_prefix', 'xwb_',1,USER_ID),('wb_lang_type','zh_cn',1,USER_ID)*/
/*!40000 ALTER TABLE `xwb_sys_config` ENABLE KEYS */;
-- Dump completed on 2011-06-08 10:58:51