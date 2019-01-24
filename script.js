var config = {
  apiKey: "AIzaSyArKzmodiE5H86uWUOxC-pgIgapdGd-LBA",
  authDomain: "chat-firebase-50a59.firebaseapp.com",
  databaseURL: "https://chat-firebase-50a59.firebaseio.com",
storageBucket: "gs://chat-firebase-50a59.appspot.com",
  projectId: "chat-firebase-50a59",
  messagingSenderId: "90688095066"
};
firebase.initializeApp(config);

let login=()=>{
  var email=document.getElementById('email').value
  var password=document.getElementById('password').value
  firebase.auth().signInWithEmailAndPassword(email,password).catch((e)=>{
    console.log(e.message);
    console.log(e.code)
  });
}