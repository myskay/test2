 $(function(){
    var stop = true;
    var reg_tel = /^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|17[0|6|7|8]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/;
   var code_sever = '';
    var timer = function() {
			if($('.get_code').hasClass('active')) {
				$('.get_code').removeClass('active');
			}
			stop = false;
			var m1 = function() {
				if(last_time < 0) {
						if(!$('.get_code').hasClass('active')) {
								$('.get_code').addClass('active');
				          }
				time_box.text('获取验证码');
				stop = true;
			    clearInterval(time_interval);
				return false;
			    }
			    time_box.text('重新获取(' + last_time + ')');
				last_time --;
			}
			var time_box = $('.code-right');
		    var last_time = 60;
			m1();
			var time_interval = setInterval(m1,1000);
		}
// 校验
var check = function() {
	var tel = $('.tel-box').val().trim(),
		code = $('.test-code').val().trim(),
		pwd_f = $('.pwd-f').val().trim(),
		pwd_s = $('.pwd-s').val().trim(),
		img_code = $('.c').val().trim(),
		alert_box = $('.alert_box p');
	alert_box.text('');
	 if(!reg_tel.test(tel)) {
		alert_box.text('手机格式不正确');
		return false;
	}else if(img_code == '') {
		alert_box.text('图片验证码不能为空');
		return false;
	}else if((pwd_f.length < 6 || pwd_f.length > 16) || (pwd_s.length < 6 || pwd_s.length > 16)) {
		alert_box.text('密码格式不正确');
		return false;
	} else if(pwd_f != pwd_s) {
		alert_box.text('两次输入密码不一致');
		return false;
	}
	alert_box.text('');
	if(stop) {
		var url = '',
			alert_box = $('.alert-box'),
			tel = $('.tel-box').val().trim();
			verify = $('#verify').val().trim();
		code_sever = '';
		alert_box.text('');
		if(!reg_tel.test(tel)) {
			alert_box.text('请输入正确的手机号');
			return;
		}
		$.ajax({
			type: "post",
            url: url,
            data: {"user_phone":tel,"verify":verify},
            dataType: "json",
            success: function(data){
               if(data.status == 1) {
                  timer();
               		$('.mask .code-alert').text(data.msg);
               		$('.mask').addClass('show');
               		setTimeout(function() {
               			$('.mask').removeClass('show');
               		},2000)
               		code_sever = data.data;
               }else{
               		$('.mask .code-alert').text(data.msg);
               		$('.mask').addClass('show');
               		setTimeout(function() {
               			$('.mask').removeClass('show');
               		},2000)
               }
            }
        });
	} else {
		return;
	}
}
$(".get_code").on('click',check);
var check1 = function() {
	var tel = $('.tel-box').val().trim(),
		code = $('.test-code').val().trim(),
		pwd_f = $('.pwd-f').val().trim(),
		pwd_s = $('.pwd-s').val().trim(),
		img_code = $('.c').val().trim(),
		alert_box = $('.alert_box p');
	alert_box.text('');
	 if(!reg_tel.test(tel)) {
		alert_box.text('手机格式不正确');
		return false;
	}else if(img_code == '') {
		alert_box.text('图片验证码不能为空');
		return false;
	}else if((pwd_f.length < 6 || pwd_f.length > 16) || (pwd_s.length < 6 || pwd_s.length > 16)) {
		alert_box.text('密码格式不正确');
		return false;
	} else if(pwd_f != pwd_s) {
		alert_box.text('两次输入密码不一致');
		return false;
	}else if(code == '') {
		console.log(alert_box);
		alert_box.text('短信验证码不能为空');
		return false;
	}else if(code != code_sever) {
		alert_box.text('短信验证码错误，请重新点击发送');
		return false;
	}
	alert_box.text('');
	if(stop) {
		var url = '',
			alert_box = $('.alert-box'),
			tel = $('.tel-box').val().trim();
			verify = $('#verify').val().trim();
		code_sever = '';
		alert_box.text('');
		if(!reg_tel.test(tel)) {
			alert_box.text('请输入正确的手机号');
			return;
		}
		} else {
		return;
	}
}

$(".btn").on("click",check1);

             })