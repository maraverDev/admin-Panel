// Register
const reigsterDiv = $("#registerSection");
const emailRegister = $("#emailRegister");
const passwordRegister = $("#passwordRegister");
const repeatPassRegister = $("#repeatPassword");
const btnRegister = $("#btnRegister");

function validateInputs() {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  let fails = 0;
  if (!emailPattern.test(emailRegister)) {
    console.log("patron email caca");
    fails++
  }

  // Validación de la contraseña (mínimo 6 caracteres, al menos una letra y un número)
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
  if (!passwordPattern.test(passwordRegister)) {
    console.log("patron contrase;a caca");
    fails++
  }
}


function registerUser () {
    if (fails === 0) {
        
    }
}


$('btnRegister').on('click', register)



// Login
const loginDiv = $("#loginSection");
const emailLogin = $("#emailLogin");
const passwordLogin = $("#passwordLogin");
const btnLogin = $("#btnLogin");
