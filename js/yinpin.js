window.onload = function(){
	var audio = document.getElementById('audio'),
	tx,x,
	play = document.getElementById('PlayAndPause'),
	prev = document.getElementById('pre'),
	next = document.getElementById('next'),
	musicbar = document.getElementById('musicAudioProgressPar'),
	playedbar = document.getElementById('musicAudioProgress'),
	musicwidth = musicbar.clientWidth;
	currentSrcIndex = 0;
	audio.loop = false;
	audio.autoplay = false;
	 $(audio).on("canplay",function(){
	 	var totalTime=parseInt(audio.duration/60);
        var seconds=parseInt(audio.duration%60);
        if(totalTime==0){
            if(seconds>9){
                totalTime="00:"+seconds;
            }else{
                totalTime="00:0"+seconds;
            }
        }else{
            var totalTimePre,totalTimeNext;
            if(totalTime>9){
                totalTimePre=totalTime;
            }else{
                totalTimePre="0"+totalTime;
            }
            if(seconds>9){
                totalTimeNext=seconds;
            }else{
                totalTimeNext="0"+seconds;
            }
            totalTime=totalTimePre+":"+totalTimeNext;
        }
        document.getElementById("totalTime").innerText=totalTime;
	 });
	 function getCurrentTime(){
         var currentTime = audio.currentTime;
         var totalTime = parseInt(currentTime/60);
         var seconds = parseInt(currentTime%60);
         if(totalTime == 0){
            if(seconds>9){
            	totalTime = "00:"+seconds;
            }else{
            	totalTime = "00:0"+seconds;
            }
         }else{
            	var totalTimePre,totalTimeNext;
            	if(totalTime>9){
            		totalTimePre = totalTime;
            	}else{
            		totalTimePre="0"+totalTime;
            	}
            	if(seconds>9){
            		totalTimeNext = seconds;
            	}else{
            		totalTimeNext = "0"+seconds;
            	}
            		totalTime = totalTimePre+":"+totalTimeNext;
            	}
            	document.getElementById("currentTime").innerText = totalTime;
            }
	 var progressTimer;
	play.onclick = function(){
		if(audio.paused){
			audio.play();
			$(this).attr('src','img/suspend_btn_v1@2x.png');
			progressTimer = window.setInterval(audioProgress,100);
		}else{
			audio.pause();
			$(this).attr('src','img/play_btn_v1@2x.png');
		}
	};
	function updateplayedbar(){
		var musicbarwidth = musicbar.clientWidth;
		var playedbarwidth = (audio.currentTime/audio.duration)*musicbarwidth;
		playedbar.style.width = playedbarwidth+'px';
		
	};
	function audioProgress(){
		if(audio.currentTime <audio.duration){
            if(audio.played){
                //更新当前时间
                getCurrentTime()
                //更新进度条
                updateplayedbar();
            }
        }else{
            clearInterval(progressTimer);
            console.log(play);
            play.src = "img/play_btn_v1@2x.png";
        }
	}
	musicbar.onclick = function(event){
		var newcurrentTime = (event.offsetX/musicwidth)*audio.duration;
		audio.currentTime = newcurrentTime;
		var playedwidth = (audio.currentTime/audio.duration)*musicwidth;
		playedbar.style.width = playedwidth+"px";
	}
	playedbar.onclick = function(event){
		var newcurrentTime = (event.offsetX/musicwidth)*audio.duration;
		audio.currentTime = newcurrentTime;
		var playedwidth = (audio.currentTime/audio.duration)*musicwidth;
		playedbar.style.width = playedwidth+"px";
	}
	document.getElementById("musicAudioProgress").addEventListener('touchend',function(){isdrag = false;});
	document.getElementById("musicAudioProgress").addEventListener('touchstart',selectmouse);
	document.getElementById("musicAudioProgress").addEventListener('touchmove',movemouse);
	
	function movemouse(e){
		 if (isdrag){
		  var n = tx + e.touches[0].pageX - x;
		          var touchcurrenttime = (n/musicwidth)*audio.duration;
		          audio.currentTime = touchcurrenttime;
		          var touchwidth = (audio.currentTime/audio.duration)*musicwidth;
		            $("#musicAudioProgress").css("width",touchwidth);
		             return false;
		           }
		      }

      function selectmouse(e){
		        isdrag = true;
		       tx = parseInt(document.getElementById("musicAudioProgress").style.width+0);
		        x = e.touches[0].pageX;
		          return false;
         }
      
      
}