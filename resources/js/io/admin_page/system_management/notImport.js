/*-----------------------------------------------------------------------------
* @Description:     学籍-学生列表ajax相关js
* @Version:         n.n.n
* @author:          lixingyu(starsuniverseLi@gmail.com)
* @date             2016.7.25
* ==NOTES:=============================================
* vn.n.n(2016.7.25):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('io/admin_page/system_management/notImport' , function(S) {
	var urls;
	try {
		urls = PW.Env.url.admin_page.system_management.notImport;
	}catch(e) {
		S.log('地址信息错误');
		return;
	}

	PW.namespace('io.admin_page.system_management.notImport');

	S.mix(PW.io.admin_page.system_management.notImport, {
		conn: urls,
		/*加载学生信息*/
        showImportIO: function(data,callback) {
			S.IO({
				url: urls.showImport,
				type: 'get',
				data: data,
				dataType: 'json',
				success: function(rs) {
					callback(
						rs.code == 0,
						rs.data,
						rs.errMsg
					);
				},
				error: function(rs) {
					callback(
						false,
						null,
						PW.Env.msg[0]
					);
				}
			});
		},
	});
});