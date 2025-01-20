const toLogin = $("#toLogin");
const toRegister = $("#toRegister");

// Register
const registerDiv = $("#registerSection");
const emailRegister = $("#emailRegister");
const passwordRegister = $("#password");
const repeatPassRegister = $("#repeatPassword");
const btnRegister = $("#btnRegister");

function goLogin() {
  //al pulsar el toLogin
  if (loginDiv.hasClass("hidden")) {
    loginDiv.removeClass("hidden");
    registerDiv.addClass("hidden");
  }
}
function goRegister() {
  //al pulsar el toRegister
  if (registerDiv.hasClass("hidden")) {
    registerDiv.removeClass("hidden");
    loginDiv.addClass("hidden");
  }
}

function validateInputs() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  let fails = 0;

  let emailValue = emailRegister.val();
  let passwordValue = passwordRegister.val();

  console.log("Email ingresado:", emailValue);
  console.log("Contraseña ingresada:", passwordValue);

  if (!emailPattern.test(emailValue)) {
    console.log("❌ Patrón de email inválido");
    fails++;
  }

  if (!passwordPattern.test(passwordValue)) {
    console.log("❌ Patrón de contraseña inválido");
    fails++;
  }

  return fails;
}

function registerUser() {
  let fails = validateInputs();

  if (fails > 0) {
    console.log("❌ Hay algún problema en los datos, verifícalo.");
  } else if (passwordRegister.val() !== repeatPassRegister.val()) {
    console.log("❌ Las contraseñas no son iguales.");
  } else {
    let email = emailRegister.val().trim();
    let password = passwordRegister.val().trim();
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === email)) {
      console.log("⚠️ Este email ya está registrado.");
      return;
    }
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    console.log("✅ Registro exitoso");
    window.location.href = "admin.html";
  }
}
// Login
const loginDiv = $("#loginSection");
const emailLogin = $("#emailLogin");
const passwordLogin = $("#passwordLogin");
const btnLogin = $("#btnLogin");

function loginUser() {
  let email = emailLogin.val().trim();
  let password = passwordLogin.val().trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    console.log("✅ Inicio de sesión exitoso");
    window.location.href = "admin.html";
  } else {
    console.log("❌ Correo o contraseña incorrectos.");
  }
}

$(document).ready(function () {
  $("#btnRegister").on("click", registerUser);
  $("#btnLogin").on("click", loginUser);
  $("#toLogin").on("click", goLogin);
  $("#toRegister").on("click", goRegister);
});
