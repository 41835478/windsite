delete  from t_usercredit where id=(select bc_id from w_user where user_id='404237218');
delete  from t_usercredit where id=(select sc_id from w_user where user_id='404237218');
delete  from t_favorite where id=(select favorite_id from t_spaceuser where uid='404237218');
delete  from t_icon where id=(select icon_id from t_spaceuser where uid='404237218');
delete  from t_spaceuser where uid='404237218';
delete  from t_item where gid in (select id from w_itemgroup where user_id='404237218');
delete  from w_template_user where user_id='404237218';
delete  from w_coolsite where user_id='404237218';
delete  from w_site where user_id='404237218';
delete  from w_itemgroupdoctor where user_id='404237218';
delete  from w_itemgroup where user_id='404237218';
delete  from w_user where user_id='404237218';
