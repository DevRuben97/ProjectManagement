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
var btnNewButton;
var btnCloseButton;
//Global variables:
$(document).ready(function(){ //Initial Config

     // Initialize Firebase
     firebase.initializeApp(config);
     //DataBase reference:
     database= firebase.database();


     //Determinar el tipo de configuracion:
     var ruta= window.location.href;
     if (ruta.endsWith("/AdminPanel.html")){
        document.getElementById("btnSaveProject").onclick= SaveNewProject;
     }
     else if (ruta.endsWith("/Home.html")){
         document.getElementById("")
     }
     else if (ruta.endsWith("/ProjectTask.html")){

     }
     

     
     
})

//#region Projects Functions
//Save a new project:
function SaveNewProject(){  

    //Get the inputs references
    var name= document.getElementById("txtProjectName");
    var Details= document.getAnimations("txtDetails");

    
}
function Get_ProjectList(){

}
//#endregion

//#region Users
function AddUser(){

    $("#RepeatPassDiv").attr("hidden",false);
    var Savebutton= $("#btnSaveProject");
    Savebutton.off("click");
    Savebutton.on("click",function(){

        //Save the new user:
        var email= $("#txtCorreo");
        var password= $("#txtContraseña");
        var RepPassword= $("#txtRepeatPassword");
        //Validate the data:
        var data= [email.val(), password.val(), RepPassword.val()]

        
    })
    
}
function Login(){

    //Login user 
    $("#RepeatPassDiv").attr("hidden",true);
    var LoginButton= $("#btnSaveProject");
    LoginButton.off("click");
    LoginButton.on("click",function(){

        
    })
}
function LoginOut(){

}
function VerifyIdentity(){  //Verificar si ya se inicio la sesion en la herramienta.

}

//#endregion

//#region Common functions
function Validate(data){

  //validate the inpusts:
  for(e==0;e<data.length;e+=1){
      if (data[e]== "" || data[e]== null){
          
      }
  }

}
function SetError(input, message){
    $(input).addClass("form-control is-invalid")
    
}
//#endregion