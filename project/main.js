// Elements
var obj = {
    big: "",
    small: ""
};
const logo = document.querySelector('.logo');
const btnStart = document.querySelector('.btn-start');
const contentsStart = document.querySelector('.contents-start');
const contentsTopic = document.querySelector('.contents-topic');
const contentsUpload = document.querySelector('.contents-upload');
const contentsAnalysis = document.querySelector('.contents-analysis');
const titAnalysis = document.querySelector('.tit-analysis');
const btnNextPrev = document.querySelector('.btn-nextprev');
const btnNext = btnNextPrev.querySelector('.next');
const btnPrev = btnNextPrev.querySelector('.prev');
const btnSave = btnNextPrev.querySelector('.save');
const topicBig = document.querySelector('.topic-big');
const topicSmall = document.querySelector('.topic-small');
const topicBigs = topicBig.querySelectorAll('td');
const topicSmalls = topicSmall.querySelectorAll('td');
const navBar = document.querySelectorAll('.nav-bar p');
const record = document.getElementById("record")
const stop = document.getElementById("stop")
const soundClips = document.getElementById("sound-clips")
const chkHearMic = document.getElementById("chk-hear-mic")

const audioCtx = new(window.AudioContext || window.webkitAudioContext)() // 오디오 컨텍스트 정의

const analyser = audioCtx.createAnalyser()


// Function
// 음성 녹음
function makeSound(stream) {
  const source = audioCtx.createMediaStreamSource(stream)

  source.connect(analyser)
  analyser.connect(audioCtx.destination)

}

if (navigator.mediaDevices) {
  console.log('getUserMedia supported.')

  const constraints = {
      audio: true
  }
  let chunks = []

  navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {

          const mediaRecorder = new MediaRecorder(stream)
          
          chkHearMic.onchange = e => {
              if(e.target.checked == true) {
                  audioCtx.resume()
                  makeSound(stream)
              } else {
                  audioCtx.suspend()
              }
          }
          
          record.onclick = () => {
              mediaRecorder.start()
              console.log(mediaRecorder.state)
              console.log("recorder started")
              record.style.background = "red"
              record.style.color = "black"
              contentsUpload.querySelector('.upload-file').style.display="none";
          }

          stop.onclick = () => {
              mediaRecorder.stop()
              console.log(mediaRecorder.state)
              console.log("recorder stopped")
              record.style.background = ""
              record.style.color = ""
          }

          mediaRecorder.onstop = e => {
              console.log("data available after MediaRecorder.stop() called.")

              const clipName = prompt("오디오 파일 제목을 입력하세요.", new Date())

              const clipContainer = document.createElement('article')
              const clipLabel = document.createElement('p')
              const audio = document.createElement('audio')
              const deleteButton = document.createElement('button')

              clipContainer.classList.add('clip')
              audio.setAttribute('controls', '')
              deleteButton.innerHTML = "삭제"
              clipLabel.innerHTML = clipName

              clipContainer.appendChild(audio)
              clipContainer.appendChild(clipLabel)
              clipContainer.appendChild(deleteButton)
              soundClips.appendChild(clipContainer)

              audio.controls = true
              const blob = new Blob(chunks, {
                  'type': 'audio/ogg codecs=opus'
              })
              chunks = []
              const audioURL = URL.createObjectURL(blob)
              audio.src = audioURL
              console.log("recorder stopped")

              deleteButton.onclick = e => {
                  evtTgt = e.target
                  evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
                  contentsUpload.querySelector('.upload-file').style.display="";
              }
          }

          mediaRecorder.ondataavailable = e => {
              chunks.push(e.data)
          }
      })
      .catch(err => {
          console.log('The following error occurred: ' + err)
      })
}

function logoClick(){
    contentsStart.style.display="";
    contentsTopic.style.display="none";
    contentsUpload.style.display="none";
    titAnalysis.style.display="none";
    contentsAnalysis.style.display="none";
    btnSave.style.display="none";
    btnNext.style.display="flex";
    btnNextPrev.style.display="none";
}

function startClick(){
    contentsStart.style.display="none";
    contentsTopic.style.display="flex";
    btnNextPrev.style.display="flex";
    navBar[0].style.borderBottom="1px solid white";

}

function nextClick(){
    if(contentsTopic.style.display=="flex"){
        contentsTopic.style.display="none";
        contentsUpload.style.display="block";
        navBar[0].style.borderBottom="1px solid rgba(0,0,0,0)";
        navBar[1].style.borderBottom="1px solid white";
    }
    else if(contentsUpload.style.display=="block"){
        contentsUpload.style.display="none";
        titAnalysis.style.display="flex";
        contentsAnalysis.style.display="flex";
        btnNext.style.display="none";
        btnSave.style.display="flex";
        navBar[1].style.borderBottom="1px solid rgba(0,0,0,0)";
        navBar[2].style.borderBottom="1px solid white";
    }
}

function prevClick(){
    if(contentsTopic.style.display=="flex"){
        contentsTopic.style.display="none";
        contentsStart.style.display="";
        btnNextPrev.style.display="none";
        btnStart.style.display="";
        for(var i=0; i<navBar.length; i++){
          navBar[i].style.borderBottom="1px solid rgba(0,0,0,0)";
        }
    }
    else if(contentsUpload.style.display=="block"){
        contentsUpload.style.display="none";
        contentsTopic.style.display="flex";
        navBar[1].style.borderBottom="1px solid rgba(0,0,0,0)";
        navBar[0].style.borderBottom="1px solid white";
        for(var i=0; i<topicBigs.length; i++){
          topicBigs[i].style.backgroundColor = "rgba(0,0,0,0)";
        }
        for(var i=0; i<topicSmalls.length; i++){
          topicSmalls[i].style.backgroundColor = "rgba(0,0,0,0)";
        }
        topicSmall.style.display="none";
        contentsTopic.querySelector('p').style.display="flex";
        contentsTopic.querySelector('p').innerHTML="왼쪽의 카테고리를 선택하세요.";
    }
    else if(contentsAnalysis.style.display=="flex"){
        titAnalysis.style.display="none";
        contentsAnalysis.style.display="none";
        contentsUpload.style.display="block";
        btnSave.style.display="none";
        btnNext.style.display="flex";
        navBar[2].style.borderBottom="1px solid rgba(0,0,0,0)";
        navBar[1].style.borderBottom="1px solid white";
    }

}

function topicBigClick(e) {
    
    for(var i=0; i<topicBigs.length; i++){
        topicBigs[i].style.backgroundColor = "rgba(0,0,0,0)";
    }
    e.target.style.backgroundColor = "rgba(256, 256, 256, 0.25)";
    
    if(e.target.innerHTML=="친구"){
      contentsTopic.querySelector('p').style.display="none";
      topicSmall.style.display="flex";
    }
    else{
      topicSmall.style.display="none";
      contentsTopic.querySelector('p').style.display="flex";
      contentsTopic.querySelector('p').innerHTML="친구 카테고리를 눌러보세요!";
    }

    obj.big = e.target.innerHTML;
}

function topicSmallClick(e) {
    
    for(var i=0; i<topicSmalls.length; i++){
        topicSmalls[i].style.backgroundColor = "rgba(0,0,0,0)";
    }
    if(e.target.tagName=="TD")
      e.target.style.backgroundColor = "rgba(256, 256, 256, 0.25)";

    obj.small = e.target.innerHTML;
    console.log(obj);
}

// file drag and drop
// selecting all required elements
const dropArea = contentsUpload.querySelector('.upload-file'),
dragText = dropArea.querySelector("p"),
button = dropArea.querySelector('.select-file'),
input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  
  dropArea.parentElement.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.parentElement.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.parentElement.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

function showFile(){
  let fileType = file.type; //getting selected file type
  //console.log(fileType);
  let validExtensions = ["audio/x-m4a", "audio/wav"]; //adding some valid audio extensions in array "audio/x-m4a"
  if(validExtensions.includes(fileType)){ //if user selected file is an audio file
    let filename = '<p class="uploadfile">'+file.name+'</p>'; //creating an audio file name
    dropArea.parentElement.innerHTML = filename; //adding that created audio file name inside dropArea container
  }else{
    alert("This is not an audio File!");
    
    console.log(fileType);
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

// chart
var ctx = document.getElementById('myChart'); 
var myChart = new Chart(ctx, {
   type: 'bar', 
   data: {
      labels: ['어', '음', '그', '아', '말끝흐리기', '말 더듬기'], 
      datasets: [{
         label: '# of Value', 
         data: [3, 7, 2, 5, 2, 3], 
         backgroundColor: [ 
           'rgba(255, 99, 132, 0.2)', 
           'rgba(54, 162, 235, 0.2)', 
           'rgba(255, 206, 86, 0.2)', 
           'rgba(75, 192, 192, 0.2)', 
           'rgba(153, 102, 255, 0.2)', 
           'rgba(255, 159, 64, 0.2)' 
          ], 
          borderColor: [ 
            'rgba(255, 99, 132, 1)', 
            'rgba(54, 162, 235, 1)', 
            'rgba(255, 206, 86, 1)', 
            'rgba(75, 192, 192, 1)', 
            'rgba(153, 102, 255, 1)', 
            'rgba(255, 159, 64, 1)' 
          ], 
          borderWidth: 1 
        }] 
      }, 
      options: { 
        scales: { 
          yAxes: [{ 
            ticks: { 
              beginAtZero: true 
            } 
          }] 
        } 
      } 
    });



// EventListener
logo.addEventListener('click', logoClick);
btnStart.addEventListener('click', startClick);
btnNext.addEventListener('click', nextClick);
btnPrev.addEventListener('click', prevClick);
topicBig.addEventListener('click', topicBigClick);
topicSmall.addEventListener('click', topicSmallClick);

