var config = {
  apiKey: "AIzaSyArKzmodiE5H86uWUOxC-pgIgapdGd-LBA",
  authDomain: "chat-firebase-50a59.firebaseapp.com",
  databaseURL: "https://chat-firebase-50a59.firebaseio.com",
storageBucket: "gs://chat-firebase-50a59.appspot.com",
  projectId: "chat-firebase-50a59",
  messagingSenderId: "90688095066"
};
firebase.initializeApp(config);
var theurlimg=""
var theurlfile=""
firebase.database().ref('chat').on('value',function(snapshot){
  var html='';
  snapshot.forEach(e=>{
    var element=e.val();
    if(element.email==firebase.auth().currentUser.email)html+="<div class='message right'>"
    else html+="<div class='message left'>"
    html+="<div class='meshea'> <div class='point'></div> <span class='mesdate'>"+element.date+"</span><span class='mesname'>"+element.name+"</span></div><div class='mescon'>"
    if(element.file)html+="<a href='"+element.file+"' class='mesfil' target='_blank'> Archivo adjunto</a>"
    if(element.image)html+="<img src="+element.image+" class='mesima'>"
    if(element.message)html+="<p class='text'>"+element.message+"</p>"
    html+="</div></div>"
  })
  document.getElementById('thechat').innerHTML=html;
})

firebase.auth().onAuthStateChanged(user=>{
  if (user) {
    if(!user.displayName){
      user.updateProfile({
          displayName:document.getElementById("name").value,
          photoURL: document.getElementById("urlimg").value
      }).catch(function(error) {
        console.log(error)
      });
    }
    document.getElementById("disnom").innerHTML+=user.displayName;
    document.getElementById("dispic").innerHTML+="<img src="+user.photoURL+">"
    showchat()
  } else {
    showlogin()
  }
});

let signin=()=>{
  var email=document.getElementById("email2").value;
  var password=document.getElementById("password2").value;
  firebase.auth().createUserWithEmailAndPassword(email,password).catch(
    e=>console.log(e)
  )
}

let login=()=>{
  var email=document.getElementById('email').value
  var password=document.getElementById('password').value
  firebase.auth().signInWithEmailAndPassword(email,password).catch(e=>{
    console.log(e.message);
    console.log(e.code)
  });
}
let logout=()=> firebase.auth().signOut();

let showlogin=()=>{
  if(document.getElementById("login").classList.contains("sethide")){
    document.getElementById("login").classList.remove("sethide")
  }
  if(!document.getElementById("signin").classList.contains("sethide")){
    document.getElementById("signin").classList.add("sethide")
  }
  if(!document.getElementById("chat").classList.contains("sethide")){
    document.getElementById("chat").classList.add("sethide")
  }
}
let showsignin=()=>{
  if(!document.getElementById("login").classList.contains("sethide")){
    document.getElementById("login").classList.add("sethide")
  }
  if(document.getElementById("signin").classList.contains("sethide")){
    document.getElementById("signin").classList.remove("sethide")
  }
  if(!document.getElementById("chat").classList.contains("sethide")){
    document.getElementById("chat").classList.add("sethide")
  }
}
let showchat=()=>{
  if(!document.getElementById("login").classList.contains("sethide")){
    document.getElementById("login").classList.add("sethide")
  }
  if(!document.getElementById("signin").classList.contains("sethide")){
    document.getElementById("signin").classList.add("sethide")
  }
  if(document.getElementById("chat").classList.contains("sethide")){
    document.getElementById("chat").classList.remove("sethide")
  }
}
let sendMessage=()=>{
  let email=firebase.auth().currentUser.email
  let name=firebase.auth().currentUser.displayName
  let date= new Date().toLocaleDateString();
  let messagetxt=document.getElementById('mensaje').value;
  let image=theurlimg  
  let file=theurlfile
  firebase.database().ref('chat').push({
    email:email,
    name:name,
    date:date,
    message:messagetxt,
    image:image,
    file:file
  }).then(()=>{
    document.getElementById('mensaje').value=""
    document.getElementById('sendimg').value=""
    document.getElementById('sendimg2').value=""
    theurlimg=""
    theurlfile=""
  }).catch(e=>console.log(e))
}

document.getElementById('sendimg').addEventListener('change', (evento)=>{
  evento.preventDefault();
  var archivo  = evento.target.files[0];
  subirArchivo(archivo);
});  


function subirArchivo(archivo) {
var refStorage = firebase.storage().ref('carpetaArchivos').child(archivo.name);
var uploadTask = refStorage.put(archivo);

uploadTask.on('state_changed', null,
  function(error) {
  console.log('Error al cargar archivo', error);
  },
function() {
  let url=uploadTask.snapshot.ref.getDownloadURL().then((miurl)=>{
    theurlimg=miurl
  })
  
}
);
}

document.getElementById('sendimg2').addEventListener('change', function(evento){
  evento.preventDefault();
  var archivo  = evento.target.files[0];
  subirArchivo2(archivo);
}); 

function subirArchivo2(archivo) {
  var refStorage = firebase.storage().ref('carpetaArchivos').child(archivo.name);
  var uploadTask = refStorage.put(archivo);
  
  uploadTask.on('state_changed', null,
    function(error) {
    console.log('Error al cargar archivo', error);
    },
  function() {
    let url=uploadTask.snapshot.ref.getDownloadURL().then((miurl)=>{
      theurlfile=miurl
    })
    
  }
  );
  }
  