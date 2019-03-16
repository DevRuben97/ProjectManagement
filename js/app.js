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
        VerifyIdentity();
     }
     else if (ruta.endsWith("/Home.html")){
         document.getElementById("")
     }
     else if (ruta.endsWith("/ProjectTask.html")){
         VerifyIdentity();

     }
     

     
     
})

//#region Projects Functions
//Save a new project:
function SaveNewProject(){  

    //Get the inputs references
    var name= $("txtProjectName");
    var Details= $("txtDetails");

    var inputs= [name,details];

    if (Validate(inputs)){
        //create the object for sent to firebase database
        var date= new Date();
        var ajaxobj= {
            name: name,
            Details: Details,
            Created: date.getDay()+ '/'+date.getMonth()+'/'+date.getFullYear(),
            Progress: 0.0
        };

    }

    
}
function EditProject(){

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
        var data= [email, password, RepPassword]

        if (Validate(data)){
            //Validate Equal Message
            if (password!= RepPassword){
                SetError(password, "Las contraseñas no son iguales")

            }
            else if (password<9){
                SetError(password, "La contraseña tiene que tener minimo 9 caracteres")
            }
            else{
                //save the user 
                firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){

                  alert("the user was created sucessfully.");
                  ClearInput(data);
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("A error  was created: "+ errorCode+'-'+errorMessage);
                  });
            }
        }
   
        
    })
    
}
function Login(){

    //Login user 
    $("#RepeatPassDiv").attr("hidden",true);
    var LoginButton= $("#btnSaveProject");
    LoginButton.off("click");
    LoginButton.on("click",function(){

        var email= $("#txtCorreo");
        var password= $("#txtContraseña");

        var array= [email,password]
        if (Validate(array)){

            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(){
                alert("Welcome: "+ email);
                window.location.href= "AdminPanel.html";
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("A Error was created: "+ errorCode+"-"+errorMessage);
                alert("Email or password is bad. Please try one more time");
              });
        }
        
    })
}
function LoginOut(){

    firebase.auth().signOut().then(function() {
        window.location.href= "Home.html";
      }).catch(function(error) {
         console.log("A error was created on the loginOut function."+ error);
      });
}
function VerifyIdentity(){  //Verificar si ya se inicio la sesion en la herramienta.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user== null){
            alert("Necesitas iniciar Sesión para acceder a las funciones de esta herramienta")
            window.location.href="Home.html";
        }
      });
}

//#endregion

//#region Task fuctions
var AddTask= function(){

}
var deleteTask= function(){

}
var EditTaskName= function(){

}


//#region Common functions
function Validate(data){

  //validate the inpusts:
  for(e==0;e<data.length;e+=1){
      var valid= false;
      if (data[e].val()== "" || data[e].val()== null){
          $(input).addClass("form-control is-invalid");
          SetError(input[e], "this fiel is riquired");
          valid= false;
          break;
      }
      else{
          valid= true;
      }
  }
  return valid;

}
function SetError(input, message){
    $(input).addClass("form-control is-invalid")
    var parent= $(input).parent();
    $(parent).children("div[class='valid-feedback']")
    .attr("hidden",false).text(message);
}
function ClearInput(inputArray){
    for(e=0;e<inputArray.length;e++){
        $(input).val("");
    }

}
//#endregion