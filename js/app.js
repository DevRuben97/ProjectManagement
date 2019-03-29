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
     else if (ruta.endsWith("/UserData.html")){
         VerifyIdentity();
         Get_UserData();
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
    $("#ForgotPassword").attr("hidden",true);
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
    $("#ForgotPassword").attr("hidden",false);
    $("#ModalTitle").text("Iniciar Sesión");
    
    var LoginButton= $("#btnSaveProject");
    LoginButton.off("click");
    LoginButton.text("ACCEDER");
    LoginButton.on("click",function(e){

        var email= $("#txtCorreo");
        var password= $("#txtContraseña");

        var array= [email,password]
        if (Validate(array)){

            firebase.auth().signInWithEmailAndPassword(email.val(), password.val()).then(function(){
                 //Confirmation Message:
                alert(`Bienvenido: ${email.val()}`);
                window.location.href= "AdminPanel.html"
            }).catch(function(error) {
               
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode.includes("auth/wrong")){
                    alert("El Correo o la contraseña estan mal. Trate una vez mas");
                }
                else{
                    console.log("A Error was created: "+ errorCode+"-"+errorMessage);
                    alert(errorMessage);
                }       
                e.preventDefault();
              });          
              e.preventDefault();
              
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
          alert("ha ocurrido un error al realizar el proceso"+ error);
         console.log(error);
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
function Get_UserData(){

    //Get the current user:
    firebase.auth().onAuthStateChanged(function(user){
        if (user!= null){
    //References of data:
    $("#UserID").val(user.uid);
    $("#UserEmail").val(user.email);
        }
    })

}
function ChangePassword(){
    //Change the password of the current user:
    if (confirm("¿Estas seguro de cambiar la contraseña?")){
        
       var uid= $("#UserID").val();
       var email= $("#UserEmail").val();

       if (uid==null || uid== ""){
        var email= prompt("Indique su correo electronico");

        if (email!= null){
            //Enviar un correo electronico para cambiar la contraseña:
            firebase.auth().sendPasswordResetEmail(email).then(function(){
                alert(`Un mensaje de restablecimiento de contraseña fue enviado a: ${email}. Verifiquelo`);
            }).catch(function(error){
                alert("A ocurrido un error inesperado");
                console.log(error);
            })
        }
    }
    else{
        var password;
        var rePassword;
        var feild= false;

        password= prompt("Indique la contraseña nueva");
        if (password!= null){

            rePassword= prompt("Repita la contraseña");

            if (password.length<9){
                alert("La Longitud de la contraseña debe der ser igual o mayor a 9.");
                feild= true;
            }
            else if (password!= rePassword){
                alert("Las contraseñas no coiciden");
                feild= true;
            }
            else{
                firebase.auth().onAuthStateChanged(function(user){
    
                    user.updatePassword(password).then(function(){
                        alert("La Contraseña fue actualizada correctamente");
                    }).then(function(error){
                        alert("A Ocurrido un error al realizar el proceso de cambio.");
                        console.log(error);
                    })
                })
            }
        }
        else{
            alert("Debe de indicar una contraseña valida");
            feild= true;
        }

        if (feild){
            //Volver a ejecutar la funcion en caso de alla error en el proceso.
            ChangePassword(); 
        }
    }

    }
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