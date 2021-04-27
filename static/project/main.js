// // Elements
// var obj = {
//     big: "",
//     small: ""
// };
// const logo = document.querySelector('.logo');
// const btnStart = document.querySelector('.btn-start');
// const contentsStart = document.querySelector('.contents-start');
// const contentsTopic = document.querySelector('.contents-topic');
// const contentsUpload = document.querySelector('.contents-upload');
// const contentsAnalysis = document.querySelector('.contents-analysis');
// const titAnalysis = document.querySelector('.tit-analysis');
// const btnNextPrev = document.querySelector('.btn-nextprev');
// const btnNext = btnNextPrev.querySelector('.next');
// const btnPrev = btnNextPrev.querySelector('.prev');
// const btnSave = btnNextPrev.querySelector('.save');
// const topicBig = document.querySelector('.topic-big');
// const topicSmall = document.querySelector('.topic-small');
// const topicBigs = topicBig.querySelectorAll('td');
// const topicSmalls = topicSmall.querySelectorAll('td');
// const navBar = document.querySelectorAll('.nav-bar p');
// const record = document.getElementById("record")
// const stop = document.getElementById("stop")
// const soundClips = document.getElementById("sound-clips")
// const chkHearMic = document.getElementById("chk-hear-mic")
//
// const audioCtx = new(window.AudioContext || window.webkitAudioContext)() // 오디오 컨텍스트 정의
//
// const analyser = audioCtx.createAnalyser()
//
//
// function logoClick(){
//     contentsStart.style.display="";
//     contentsTopic.style.display="none";
//     contentsUpload.style.display="none";
//     titAnalysis.style.display="none";
//     contentsAnalysis.style.display="none";
//     btnSave.style.display="none";
//     btnNext.style.display="flex";
//     btnNextPrev.style.display="none";
// }
//
// function startClick(){
//     contentsStart.style.display="none";
//     contentsTopic.style.display="flex";
//     btnNextPrev.style.display="flex";
//     navBar[0].style.borderBottom="1px solid white";
//
// }
//
// function nextClick(){
//     if(contentsTopic.style.display=="flex"){
//         contentsTopic.style.display="none";
//         contentsUpload.style.display="block";
//         navBar[0].style.borderBottom="1px solid rgba(0,0,0,0)";
//         navBar[1].style.borderBottom="1px solid white";
//     }
//     else if(contentsUpload.style.display=="block"){
//         contentsUpload.style.display="none";
//         titAnalysis.style.display="flex";
//         contentsAnalysis.style.display="flex";
//         btnNext.style.display="none";
//         btnSave.style.display="flex";
//         navBar[1].style.borderBottom="1px solid rgba(0,0,0,0)";
//         navBar[2].style.borderBottom="1px solid white";
//     }
// }
//
// function prevClick(){
//     if(contentsTopic.style.display=="flex"){
//         contentsTopic.style.display="none";
//         contentsStart.style.display="";
//         btnNextPrev.style.display="none";
//         btnStart.style.display="";
//         for(var i=0; i<navBar.length; i++){
//           navBar[i].style.borderBottom="1px solid rgba(0,0,0,0)";
//         }
//     }
//     else if(contentsUpload.style.display=="block"){
//         contentsUpload.style.display="none";
//         contentsTopic.style.display="flex";
//         navBar[1].style.borderBottom="1px solid rgba(0,0,0,0)";
//         navBar[0].style.borderBottom="1px solid white";
//         for(var i=0; i<topicBigs.length; i++){
//           topicBigs[i].style.backgroundColor = "rgba(0,0,0,0)";
//         }
//         for(var i=0; i<topicSmalls.length; i++){
//           topicSmalls[i].style.backgroundColor = "rgba(0,0,0,0)";
//         }
//         topicSmall.style.display="none";
//         contentsTopic.querySelector('p').style.display="flex";
//         contentsTopic.querySelector('p').innerHTML="왼쪽의 카테고리를 선택하세요.";
//     }
//     else if(contentsAnalysis.stylebtn-nextprev.display=="flex"){
//         titAnalysis.style.display="none";
//         contentsAnalysis.style.display="none";
//         contentsUpload.style.display="block";
//         btnSave.style.display="none";
//         btnNext.style.display="flex";
//         navBar[2].style.borderBottom="1px solid rgba(0,0,0,0)";
//         navBar[1].style.borderBottom="1px solid white";
//     }
//
// }
//
//
//
//
//
// // EventListener
// logo.addEventListener('click', logoClick);
// btnStart.addEventListener('click', startClick);
// btnNext.addEventListener('click', nextClick);
// btnPrev.addEventListener('click', prevClick);
// topicBig.addEventListener('click', topicBigClick);
// topicSmall.addEventListener('click', topicSmallClick);
//
