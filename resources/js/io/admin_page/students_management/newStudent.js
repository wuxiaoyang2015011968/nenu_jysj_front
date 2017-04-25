/*-----------------------------------------------------------------------------
* @DescriSion: 新增学生的相关ajax
* @Version: 	V1.0.0
* @author: 		zhangmeiyun
* @date			2016.07.14
* ==NOTES:=============================================
* v1.0.0(2016.07.14):
* 	初始生成 
* ---------------------------------------------------------------------------*/
KISSY.add('io/admin_page/students_management/newStudent',function(S){
	var urls;
	try {
		urls = PW.Env.url.admin_page.students_management.newStudent;
	}catch(e){
		S.log("地址信息错误");
		return;
	}

	PW.namespace('io.admin_page.students_management.newStudent');

	S.mix(PW.io.admin_page.students_management.newStudent,{
		conn:urls,
		addNewStudentIO:function(data,callback){
			S.IO({
				url:urls.J_getCity,
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
						PW.Eng.msg[0]
					);
				}
			});
		},	
	})
})