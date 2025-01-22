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

  // console.log("Email ingresado:", emailValue);
  // console.log("Contraseña ingresada:", passwordValue);

  if (!emailPattern.test(emailValue)) {
    // console.log("❌ Patrón de email inválido");
    fails++;
  }

  if (!passwordPattern.test(passwordValue)) {
    // console.log("❌ Patrón de contraseña inválido");
    fails++;
  }

  return fails;
}

function registerUser() {
  let fails = validateInputs();

  if (fails > 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Hay algún problema en los datos, verifícalo.",
    });
  } else if (passwordRegister.val() !== repeatPassRegister.val()) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Las contraseñas no son iguales.",
    });
  } else {
    let email = emailRegister.val().trim();
    let password = passwordRegister.val().trim();
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === email)) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Ya existe una cuenta asociada a este correo.",
      });
      return;
    }
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    let timerInterval;
    Swal.fire({
      title: "Registro en proceso",
      html: "Cargando registros, quedan <b></b> milisegundos.",
      timer: 500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        window.location.href = "admin.html";
      }
    });
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
    window.location.href = "admin.html";
  } else {
    Swal.fire({
      title: "No existe una cuenta con esa información",
      text: "Revisa los datos o regístrate.",
      cancelButtonText: "Atrás",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "green",
      confirmButtonText: "Registrarme",
    }).then((result) => {
      if (result.isConfirmed) {
        goRegister();
      }
    });
  }
}

$(document).ready(function () {
  $("#btnRegister").on("click", registerUser);
  $("#btnLogin").on("click", loginUser);
  $("#toLogin").on("click", goLogin);
  $("#toRegister").on("click", goRegister);
});

let users = JSON.parse(localStorage.getItem("users")) || [];
let userData = users.map((user) => [user.email, user.password]);

new DataTable("#table", {
  columns: [{ title: "Email" }, { title: "Contraseña" }],
  data: userData,
  language: {
    processing: "Procesando...",
    search: "Buscar:",
    lengthMenu: "Mostrar _MENU_ registros",
    info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
    infoFiltered: "(filtrado de un total de _MAX_ registros)",
    loadingRecords: "Cargando...",
    zeroRecords: "No se encontraron resultados",
    emptyTable: "Ningún dato disponible en esta tabla",
    paginate: {
      first: "Primero",
      previous: "Anterior",
      next: "Siguiente",
      last: "Último",
    },
    aria: {
      sortAscending: ": Activar para ordenar la columna de manera ascendente",
      sortDescending: ": Activar para ordenar la columna de manera descendente",
    },
  },
});
