let peer = new Peer(Math.floor(Math.random() * 0xFFFFFF).toString(16))
let video = document.getElementById("call");
let audio=document.getElementById("audio")
const id_el = document.getElementById("id");
const id_input= document.getElementById("id_input")
peer.on('open', (id) => {
    id_el.innerText=`Your ID is ${id}`
})
let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
function callfunc(){
    id=id_input.value;
getUserMedia({video: true, audio: true}, function(stream) {
  var call = peer.call(id, stream);
  call.on('stream', function(remoteStream) {
    video.srcObject=remoteStream;
    video.play()
    video.style.display="inline"
  });
}, function(err) {
  console.log('Failed to get local stream' ,err);
});
}
peer.on('call', function(call) { //when you call someone, broadcast your audio and video
  getUserMedia({video: true,audio:true}, function(stream) {
    call.answer(stream); 
    call.on('stream', function(remoteStream) {
     //I made a stupid mistake here but fixed it
      video.srcObject=remoteStream;
      video.play()
      audio.src=remoteStream;
      audio.play()
      video.style.display="inline"
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
});
peer.on('disconnected',   () => {
  alert("The other person has left the call.")
})