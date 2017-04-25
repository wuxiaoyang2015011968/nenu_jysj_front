/*-----------------------------------------------------------------------------
* @Description:     填写学籍页面ajax相关js
* @Version:         1.0.0
* @author:          zhangmeiyun
* @date             2016.7.15
* ==NOTES:=============================================
* v1.0.0(2016.7.15):
     初始生成
* ---------------------------------------------------------------------------*/
KISSY.add('io/admin_page/students_management/officeInfo' , function(S){
	var urls;
	try{
		urls = PW.Env.url.admin_page.students_management.officeInfo;
	}catch(e){
		S.log('地址信息错误');
		return;
	}

	PW.namespace('io.admin_page.students_management.officeInfo');

	S.mix(PW.io.admin_page.students_management.officeInfo, {
		conn: urls,
		showOfficeInfoIO:function(data,callback){
			S.IO({
				url:urls.showStudentInfo,
				type:'get',
				data:data,
				dataType:'json',
				success:function(rs){
					callback(
						rs.code == 0,
						rs.data,
						rs.errMsg
						);
				},
				error:function(rs){
					callback(
						false,
						null,
						PW.Env.msg[0]
					);
				}
			});
		}
		
	});
});