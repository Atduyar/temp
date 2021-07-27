const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signUpButtonM = document.getElementById('signUpM');
const signInButtonM = document.getElementById('signInM');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
signUpButtonM.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButtonM.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


var api = new ApiAuth();

function login() {
    var loginFormInputs = document.getElementById("loginForm").getElementsByTagName("input");

    api.loginBody = { emailornickname: loginFormInputs[0].value, password: loginFormInputs[1].value }
    api.Login();

    console.log("anan");
}