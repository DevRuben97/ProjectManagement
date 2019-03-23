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
        Get_ProjectList();
     }
     else if (ruta.endsWith("/Home.html")){
         document.getElementById("")
     }
     else if (ruta.endsWith("/ProjectTask.html")){
         VerifyIdentity();
         TaskList();

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
//Project list of the user:
  
}
//#endregion

//#region Users
function AddUser(){

    $("#RepeatPassDiv").attr("hidden",false);
    $("#ModalTitle").text("REGISTRAR NUEVO USUARIO");
    var Savebutton= $("#btnSaveProject");
    Savebutton.off("click");
    Savebutton.text("REGISTRAR USUARIO");
    Savebutton.on("click",function(e){

        //Save the new user:
        var email= $("#txtCorreo");
        var password= $("#txtContraseña");
        var RepPassword= $("#txtRepeatPassword");
        //Validate the data:
        var data= [email, password, RepPassword];

        if (Validate(data)){
            //Validate Equal Message
            if (password.val()!= RepPassword.val()){
                SetError(RepPassword, "Las contraseñas no son iguales")
                e.preventDefault();

            }
            else if (Number(password.val())<9){
                SetError(password, "La contraseña tiene que tener minimo 9 caracteres")
                e.preventDefault();
            }
            else{
                //save the user 
                firebase.auth().createUserWithEmailAndPassword(email.val(), password.val())
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var DataError= "A error  was created: "+ errorCode+'-'+errorMessage;
                    alert(DataError);
                    console.log(DataError);
                  });
                  alert(`El Usuario: ${email.val()} fue creado correcatamen. Proceda a iniciar Sesión`);
                  ClearInput(data);
                  e.preventDefault();
            }
        }
        else{
            e.preventDefault();
        }
   
        
    })
    
}
function Login(){

    //Login user 
    $("#RepeatPassDiv").attr("hidden",true);
    $("#ModalTitle").text("Iniciar Sesión");
    
    var LoginButton= $("#btnSaveProject");
    LoginButton.off("click");
    LoginButton.text("ACCEDER")
    LoginButton.on("click",function(e){

        var email= $("#txtCorreo");
        var password= $("#txtContraseña");

        var array= [email,password]
        if (Validate(array)){

            firebase.auth().signInWithEmailAndPassword(email.val(), password.val())
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("A Error was created: "+ errorCode+"-"+errorMessage);
                alert("Email or password is bad. Please try one more time");
                e.preventDefault();
              });
              //Confirmation Message:
              alert("Bienvenido: "+ email);
              window.location.href= "AdminPanel.html";
        }
        else{
            e.preventDefault();
        }
        
    })
}
function LoginOut(){

   if(confirm("¿Estas seguro de cerrar la sesión?")){

    firebase.auth().signOut().then(function() {
        window.location.href= "Home.html";
      }).catch(function(error) {
          alert("A error was created on the loginOut function."+ error);
         console.log("A error was created on the loginOut function."+ error);
      });
   }
}
function VerifyIdentity(){  //Verificar si ya se inicio la sesion en la herramienta.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user== null){
            alert("Necesitas iniciar Sesión para acceder a las funciones de esta herramienta")
            window.location.href="Home.html";
        }
        else{
            //Set the information: 
            $("#LoginUser").text(user.email);
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
var TaskList= function(){

}


//#region Common functions
function Validate(data){

  //validate the inpusts:
  var valid= false;
  for(var e=0;e<data.length;e++){     
      if ($(data[e]).val()== ""){
          SetError(data[e], "Este campo es requerido");
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
    //Show a error message on a input 
    $(input).addClass("form-control is-invalid")
    var parent= $(input).parent();
    $(parent).children("div[class='invalid-feedback']")
    .attr("hidden",false).text(message);
}
function ClearInput(inputArray){
    for(var e=0;e<inputArray.length;e++){
        $(inputArray[e]).val("");

        //Clear the inputs with error messages:
        var parent= $(inputArray[e]).parent();
        $(parent).children("div[class='invalid-feedback']")
        .attr("hidden",true).text("");
    }

}
//#endregion