<?php
include('action.abs.php');
include_once (P_CLASS . '/saetv2.ex.class.php');
class proxy_account_mod extends action{
	// 代理帐号列表
	function accountList() {
		$rs = DR('accountProxy.getList');
		TPL::assign('list', $rs['rst']);
		$this->_display('accountProxyList');
	}
	
	function addAccount() {
		$oauthCbUrl = W_BASE_HTTP . URL('mgr/proxy_account.addAccountCallback');
		$oauthCbUrl = str_replace('http://','',$oauthCbUrl);
		$oauthUrl	 = DS('xweibo/xwb.getTokenAuthorizeURL', '', WB_CALLBACK_URL,$oauthCbUrl);
		$oauthUrl .= '&forcelogin=true';
		header('Location:' . $oauthUrl);
	}

	// 添加代理帐号
	function addAccountCallback() {
		$o = new SaeTOAuthV2(WB_AKEY, WB_SKEY);
		$code = V('r:code', '');
		$token = array ();
		if (!empty ($code)) {
			$keys = array ();
			$keys['code'] = $code;
			$keys['redirect_uri'] = WB_CALLBACK_URL;
			try {
				$token = $o->getAccessToken('code', $keys);
			} catch (OAuthException $e) {
			}
		}

		$uid = $token['uid'];

		//USER::setOAuthKey($last_key, true);
		DS('xweibo/xwb.setToken','' ,3, $token['access_token'], $token['refresh_token']);
		$uInfo = DR('xweibo/xwb.getUserShow','',$uid);
		$data = array(
			'sina_uid' => $uid,
			'screen_name' => $uInfo['rst']['screen_name'],
			'v2_access_token' => $token['access_token'],
			'v2_refresh_token' => $token['refresh_token'],
			'token' => '',
			'secret' => ''
		);
		$rs = DR('accountProxy.add', '', $data);
        echo '<html><head><script type="text/javascript">window.opener && window.opener.authoritySuccess();</script></head><body>success!</body></html>';
        exit;
		//$this->_redirect('accountList');
	}

	function delAcount() {
		$id = V('g:id');
		DR('accountProxy.delAccount','', $id);
		$this->_redirect('accountList');
	}
}
