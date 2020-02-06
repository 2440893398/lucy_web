/*弹框大图*/
$('.gb-btn').click(function () {
	$('.Picture').hide();
	$('body').css('overflow','');
});
var imgNum = $(".grid li").length;
var index =0;
function selectimg(index) {
	$('.grid li').removeClass('on');
	$(".grid li").eq(index).addClass("on");
	$('.theme').height($('.theme img').height());
	$('.theme img').attr('src',$('.grid .on').find('img').attr('src'));
}
/*点击列表图*/
$('.grid li').click(".grid",function () {
	$('body').css('overflow','hidden');
	index = $(".grid li").index(this);
	$('.grid li').removeClass('on');
	$(this).addClass("on");
	$('.grid li img').css('display','block');
	$('.Picture').show();
	$('.theme img').attr('src',$('.grid	 .on').find('img').attr('src'));
	$('.theme').height($('.theme img').height());
});
$(".mine").click(function(){
	index --;
	if(index < 0){
		index = imgNum-1;
		selectimg(index);
	}
	selectimg(index);
});
$(".Next").click(function(){
	index ++;
	if( index > imgNum-1){
		index = 0;
		selectimg(index);
	}
	selectimg(index);
});
var updateResult = false;

//添加照片部分
// 初始化实例
var Bucket = 'examplebucket-1250000000';
var Region = 'ap-beijing';
var cos = new COS({

	getAuthorization: function (options, callback) {
		// 异步获取临时密钥
		$.get('http://www.3y14.com:8080/getToken', function (data) {
			var credentials = data.credentials;
			callback({
				TmpSecretId: credentials.tmpSecretId,
				TmpSecretKey: credentials.tmpSecretKey,
				XCosSecurityToken: credentials.sessionToken,
				ExpiredTime: data.expiredTime
			});
		});
	}
});
document.getElementById('file-selector').onchange = function () {
	var file = this.files[0];
	if (!file) return;
	cos.putObject({
		Bucket: '456-1256220500',
		Region: 'ap-beijing',
		Key: 'lucy/' + file.name,
		Body: file,
	}, function (err, data) {
		console.log(err || data);
		if(data != null && data.statusCode == 200){
			alert(file.name+"上传成功！！")
			url = "http://"+data.Location;
			$(".productUrl").val(url)
			updateResult = true;
		}else{
			alert("图片上传失败，请重新上传！")
		}
	});
};
