const contentsUpload = document.querySelector('.contents-upload');
const record = document.getElementById("record")
const stop = document.getElementById("stop")
const soundClips = document.getElementById("sound-clips")
const chkHearMic = document.getElementById("chk-hear-mic")

const audioCtx = new(window.AudioContext || window.webkitAudioContext)() // 오디오 컨텍스트 정의

const analyser = audioCtx.createAnalyser()
//        const distortion = audioCtx.createWaveShaper()
//        const gainNode = audioCtx.createGain()
//        const biquadFilter = audioCtx.createBiquadFilter()

function makeSound(stream) {
    const source = audioCtx.createMediaStreamSource(stream)

    source.connect(analyser)
    //            analyser.connect(distortion)
    //            distortion.connect(biquadFilter)
    //            biquadFilter.connect(gainNode)
    //            gainNode.connect(audioCtx.destination) // connecting the different audio graph nodes together
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