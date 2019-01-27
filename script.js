var config = {
  apiKey: "AIzaSyArKzmodiE5H86uWUOxC-pgIgapdGd-LBA",
  authDomain: "chat-firebase-50a59.firebaseapp.com",
  databaseURL: "https://chat-firebase-50a59.firebaseio.com",
storageBucket: "gs://chat-firebase-50a59.appspot.com",
  projectId: "chat-firebase-50a59",
  messagingSenderId: "90688095066"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(user=>{
  console.log(user)
  if (user) {
    if(!user.displayName){
      user.updateProfile({
          displayName:document.getElementById("name").value,
          photoURL: document.getElementById("urlimg").value
      }).then(function() {
        // Update successful.
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