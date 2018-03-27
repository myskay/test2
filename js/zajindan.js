$(function(){
           	 $(".dd").on("click",function(){
           	 	var eggid = $(this).attr("id");
           	 	eggClick($(this),eggid);
           	 });
           	 function eggClick(obj,eggid){
           	 	var token = "{$Think.get.token}";
   	 			$.post('__CONTROLLER__/eggs_data',{'token':token},function(t){
		        	if(t.status == 1){
		           	 	$("#zds").animate({
		           	 		"top":obj.position().top-25,
		           	 		"left":obj.position().left+125
		           	 	},30,function(){
		           	 		if(eggid == "3"){
		                        $("#zds").css({
		                        	"left":obj.position().left 
		                        });
		                        $("#zds img").css({
		                        	"transform":"rotate(-270deg)"
		                        })
		           	 		}
		           	 		console.log(t.data);
							if (t.data.dialog_type == 1) {
								$(".overlay,.dialog").show();
								$(".close").on("click",function(){
									$(".overlay,.dialog").hide();
								})
							}else if (t.data.dialog_type == 2) {
								$(".dialog-two").show();
								$(".close").on("click",function(){
									$(".overlay,.dialog-two").hide();
								})
							}		           	 		
		           	 	});

		        	}else{
		        		alert(t.msg);
		        		return false;
			        }
		        },'json');
           	 }
          })