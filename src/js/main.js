// Register
const registerDiv = $("#registerContainer"); // Asegúrate de que el ID sea correcto
const emailRegister = $("#emailRegister");
const passwordRegister = $("#password");
const repeatPassRegister = $("#repeatPassword");
const btnRegister = $("#btnRegister");

function validateInputs() {
  const emailPattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let fails = 0;
  if (!emailPattern.test(emailRegister.val())) {
    console.log("Patrón de email inválido");
    fails++;
  }

  // Validación de la contraseña (mínimo 6 caracteres, al menos una letra y un número)
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
  if (!passwordPattern.test(passwordRegister.val())) {
    console.log("Patrón de contraseña inválido");
    fails++;
  }

  return fails;
}

function registerUser() {
  let fails = validateInputs(); // Obtener el valor de fails

  if (fails > 0) {
    console.log("Hay algún problema en los datos, verifícalo.");
  } else if (passwordRegister.val() !== repeatPassRegister.val()) {
    console.log("Las contraseñas no son iguales.");
  } else {
    localStorage.setItem("email", emailRegister.val());
    localStorage.setItem("password", passwordRegister.val());
    console.log("Registro exitoso");
  }
}

$(document).ready(function () {
  $("#btnRegister").on("click", registerUser); // Asegúrate de que el botón esté correctamente asignado
});
