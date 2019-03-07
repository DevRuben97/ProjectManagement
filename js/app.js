//Firebase settings
const config= {
    apiKey: "AIzaSyCYvqT2IjwWfT7lbIG1KPkH2_YCYUT6AOw",
    authDomain: "projectmanager-bac26.firebaseapp.com",
    databaseURL: "https://projectmanager-bac26.firebaseio.com",
    projectId: "projectmanager-bac26",
    storageBucket: "projectmanager-bac26.appspot.com",
    messagingSenderId: "755466272035"
};
var database;
//Global variables:
$(document).ready(function(){ //Initial Config

     // Initialize Firebase
     firebase.initializeApp(config);
     //DataBase reference:
     database= firebase.database();

     document.getElementById("btnSaveProject").onclick= SaveProject;
})

function SaveProject(){

    //Save a new project:
    
}