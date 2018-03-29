window.onload = function(){
	var myvideo = document.getElementById('myvideo');
    var play = document.getElementById('playandpause');
    var videobar = document.getElementById('video-progress');
    var playedbar = document.getElementById('played-progress');
    var videowidth = videobar.clientWidth;
    var progressTimer;
    myvideo.autoplay = false;
    myvideo.onclick = function(){
    	playandpause();
    }
    play.onclick = function(){
    	playandpause();
    }
//  播放与暂停
    function playandpause(){
    	if(myvideo.paused){
	  	   myvideo.play();
	  	   play.style.opacity = '0';
	  	   progressTimer = window.setInterval(videoprogress,100);
	     }else{
	  	   myvideo.pause();
	  	   play.style.opacity = '1';
	     }
    }
//  更新视频总时长
    $(myvideo).on("canplay",function(){
    	var totaltime = parseInt(myvideo.duration/60);
    	var seconds = parseInt(myvideo.duration%60);
    	if(totaltime == 0){
    		if(seconds > 9){
    			totaltime='00:'+seconds;
    		}else{
    			totaltime="00:0"+seconds;
    		}
    	}else{
    		var totaltimePre,totaltimeNext;
    		if(totaltime > 9){
    			totaltimePre = totaltime;
    		}else{
    			totaltimePre="0"+totaltime;
    		}
    		if(seconds > 9){
    			totaltimeNext = seconds;
    		}else{
    			totaltimeNext = "0"+seconds;
    		}
    		totaltime = totaltimePre+":"+totaltimeNext;
    	}
    	document.getElementById('totaltime').innerText = totaltime;
    });
//  更新当前时间
    function getcurrentTime(){
    	var currentTime = myvideo.currentTime;
    	var totalTime = parseInt(currentTime/60);
    	var seconds = parseInt(currentTime%60);
    	if(totalTime == 0){
    		if(seconds > 9){
    			totalTime = "00:"+seconds;
    		}else{
    			totalTime = "00:0"+seconds;
    		}
    	}else{
    		var totalTimePre,totalTimeNext;
    		if(totalTime > 9){
    			totalTimePre = totalTime;
    		}else{
    			totalTimePre = "0"+totalTime;
    		}
    		if(seconds > 9){
    			totalTimeNext = seconds;
    		}else{
    			totalTimeNext = "0"+seconds;
    		}
    		totalTime = totalTimePre+":"+totalTimeNext;
    	}
    	document.getElementById('currenttime').innerText = totalTime;
    }
    function updateplayedbar(){
    	var playedbarwidth = (myvideo.currentTime/myvideo.duration)*videowidth;
    	playedbar.style.width = playedbarwidth+'px';
    }
    function videoprogress(){
    	if(myvideo.currentTime < myvideo.duration){
    		if(myvideo.played){
    			getcurrentTime();
    			updateplayedbar();
    		}
    	}else{
    		clearInterval(progressTimer);
    		play.style.opacity = '1';
    		playedbar.style.width = '0px';
    		document.getElementById('currenttime').innerText = "00:00";
    	}
    }
//  点击进度条改变进度
    videobar.onclick = function(event){
		var newcurrentTime = (event.offsetX/videowidth)*myvideo.duration;
		myvideo.currentTime = newcurrentTime;
		var playedwidth = (myvideo.currentTime/myvideo.duration)*videowidth;
		playedbar.style.width = playedwidth+"px";
	}
	playedbar.onclick = function(event){
		var newcurrentTime = (event.offsetX/videowidth)*myvideo.duration;
		myvideo.currentTime = newcurrentTime;
		var playedwidth = (myvideo.currentTime/myvideo.duration)*videowidth;
		playedbar.style.width = playedwidth+"px";
	}
	document.getElementById("played-progress").addEventListener('touchend',function(){isdrag = false;});
	document.getElementById("played-progress").addEventListener('touchstart',selectmouse);
	document.getElementById("played-progress").addEventListener('touchmove',movemouse);
	
	function movemouse(e){
		 if (isdrag){
		  var n = tx + e.touches[0].pageX - x;
		          var touchcurrenttime = (n/videowidth)*myvideo.duration;
		          myvideo.currentTime = touchcurrenttime;
		          var touchwidth = (myvideo.currentTime/myvideo.duration)*videowidth;
		            $("#played-progress").css("width",touchwidth);
		             return false;
		           }
		      }

      function selectmouse(e){
		        isdrag = true;
		       tx = parseInt(document.getElementById("played-progress").style.width+0);
		        x = e.touches[0].pageX;
		          return false;
         }
}



















