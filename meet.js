let peer = new Peer(Math.floor(Math.random() * 0xFFFFFF).toString(16))
let video = document.getElementById("call");
let audio=document.getElementById("audio")
const id_el = document.getElementById("id");
const id_input= document.getElementById("id_input");
const local_video = document.getElementById("localvideo");
const hostbtn = document.getElementById("host");
const hostctr = document.getElementById("host-container");
const id_ctr = document.getElementById("id_container");
const time = document.getElementById("time");
peer.on('open', (id) => {
    id_el.innerText=`Your ID is ${id}`
})
let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
function callfunc(){
    id=id_input.value;
    id_el.style.display="none";
    id_input.style.display="none";
    hostctr.innerHTML="<button id='host' onclick='peer.destroy();'><span class='material-symbols-outlined'> call_end </span></button>"
    id_ctr.style.margin="5px";
    hostbtn.style.backgroundColor="#D50000"
getUserMedia({video: true, audio: true}, function(stream) {
  var call = peer.call(id, stream);
  call.on('stream', function(remoteStream) {
    video.srcObject=remoteStream;
    video.play()
    video.style.display="inline"
    local_video.srcObject=stream;
    local_video.play();
    local_video.style.display="inline"

  });
}, function(err) {
  console.log('Failed to get local stream' ,err);
});
}
peer.on('call', function(call) { 

  id_el.style.display="none";
  id_input.style.display="none";
  hostctr.innerHTML="<button id='host' onclick='peer.disconnect()'><span class='material-symbols-outlined'> call_end </span></button>"
  id_ctr.style.margin="5px";
  hostbtn.style.backgroundColor = "#D50000";
  //when you call someone, broadcast your audio and video
  getUserMedia({video: true,audio:true}, function(stream) {
    call.answer(stream); 
    call.on('stream', function(remoteStream) {
     //I made a stupid mistake here but fixed it
      video.srcObject=remoteStream;
      video.play()
      video.style.animation="bounceIn";
      audio.srcObject=remoteStream;
      audio.play()
      video.style.display="inline";
      local_video.srcObject=stream;
      local_video.play();
    local_video.style.display="inline"

    });
  }, function(err) {
    alert("failed to get your video")
  });
});
peer.on('destroyed',   () => {
  alert("The other person has left the call.")
})
peer.on('error',() => {
  alert('oh noes an error :(    maybe you\'re on the wrong browser? check to see if you are on the same browser as who you are calling.')
})
Mousetrap.bind('up up down down left right left right b a enter', function() {
switch(Math.floor(Math.random() * 5)){
  case 0:
  document.body.style.backgroundImage="url(https://freesvg.org/img/croissant.png)";
  break;
  case 1:
  document.body.style.backgroundImage="url(https://avatars.githubusercontent.com/u/78455503?v=4?s=400)";
  break;
  case 2:
    document.body.style.backgroundImage="url(https://64.media.tumblr.com/0c7f6014aa3683095c6f14c0e41ba0ad/tumblr_p47wmu8e3P1w1x3muo1_500.jpg)"
break;
case 3:
  video.src="https://ia803405.us.archive.org/25/items/rick-astley-never-gonna-give-you-up-hd-4-k-60-fps/Rick%20Astley%20Never%20Gonna%20Give%20You%20Up%20HD%204K%2060%20FPS.mp4"
  video.style.display="inline";
  video.play();
  break;
  case 4:
    time.innerHTML=`<iframe width="942" height="530" src="https://www.youtube.com/embed/CTJ4P1EmiD4" title="Krab Bop Channel" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen autoplay></iframe>`
    break;

}
});
Mousetrap.bind('=',() => {
  video.src='';
  time.innerHTML='';
  document.body.style.backgroundImage="url(./baguette_bg.png)";
  
})