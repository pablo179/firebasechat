var config = {
  apiKey: "AIzaSyDDotuK2qAi_NR9yuWdmMIYM-bpVjqn2sU",
  authDomain: "migroupware.firebaseapp.com",
  databaseURL: "https://migroupware.firebaseio.com",
  projectId: "migroupware",
  storageBucket: "migroupware.appspot.com",
  messagingSenderId: "895464504942"
};
firebase.initializeApp(config);
  let nam =document.getElementById("nombre")
  let mens = document.getElementById("mensaje")
  let env =document.getElementById ("btnenviar")
  let chat =document.getElementById ("chatUl")
  var database=firebase.database();
  env.addEventListener("click", ()=>{
       firebase.database().ref('michat').push({
           nombre: document.getElementById("nombre").value,
           mensaje:document.getElementById("mensaje").value,
       })
})