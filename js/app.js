// Initialize Firebase
var config = {
  apiKey: "AIzaSyB_4LUjUHayofzuven2lR6PMpUUHSH9UqQ",
  authDomain: "trying-firebase-e005a.firebaseapp.com",
  databaseURL: "https://trying-firebase-e005a.firebaseio.com",
  projectId: "trying-firebase-e005a",
  storageBucket: "gs://trying-firebase-e005a.appspot.com/",
  messagingSenderId: "846233981925"
};
firebase.initializeApp(config);

var user = null;
var database = firebase.database();

var loginBtn = $('#start-login');
var usuariosConectados = null;
var conectadoKey = '';
var rooms = null;

loginBtn.on('click', googleLogin);
$(window).on('unload', signOut);

// Get a reference to the database service
var database = firebase.database();

function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      user = result.user;
      console.log(user);
      var db= firebase.database().ref('users/' + user.uid);
      db.push({
        username: user.displayName,
        email: user.email,
        profile_picture : user.photoURL
      })
    });

}

 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyA-vDy14Bg2RzGMdNu7Nk4_BkHq8nHJi6k",
  authDomain: "laboratoria2-645d4.firebaseapp.com",
  databaseURL: "https://laboratoria2-645d4.firebaseio.com",
  projectId: "laboratoria2-645d4",
  storageBucket: "gs://laboratoria2-645d4.appspot.com",
  messagingSenderId: "442249700342"
};
firebase.initializeApp(config);


var fichero;
var storageRef;
var databaseRef;
var $progressBar = $('#progreso');

// oculta la barra
$progressBar.hide();

function inicializar() {
fichero = document.getElementById('fichero');

fichero.addEventListener('change', subirImagen);

// Create a root reference  
storageRef = firebase.storage().ref('images/');
databaseRef = firebase.database().ref('images/');

mostrarImagenes();
}

function subirImagen() {
var imagenASubir = fichero.files[0];
var uploadTask = storageRef.child(imagenASubir.name).put(imagenASubir);
var $showUpload = $progressBar.find('#progress-bar-upload');

$showUpload.css({ width: '0%' });
$progressBar.fadeIn('slow');  

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot) {
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

  $showUpload.css({ width: progress + '%' });
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  var downloadURL = uploadTask.snapshot.downloadURL;

  crearNodoDB(imagenASubir.name, downloadURL);

  setTimeout(function() {
    // $progressBar.addClass('hidden');
    $progressBar.fadeOut('swing');
  }, 1000);
});
}

function mostrarImagenes() {
databaseRef.on('value', function(snapshot) {
  var datos = snapshot.val();
  var result = '';

  for (var key in datos)  {
    result += '<img width="200" class="img-thumbnail" src="' + datos[key].url + '" />';
  }

  document.getElementById('imagenes-firebase').innerHTML = result;
});
}

function crearNodoDB(nombreImagen, url) {
databaseRef.push({
  name: nombreImagen,
  url: url
});
}

window.onload = inicializar;

