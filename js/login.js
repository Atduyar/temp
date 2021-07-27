const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signUpButtonM = document.getElementById('signUpM');
const signInButtonM = document.getElementById('signInM');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
    history.pushState({}, null,  window.location.origin + "/signup.html");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
    history.pushState({}, null,  window.location.origin + "/login.html");
});
signUpButtonM.addEventListener('click', () => {
    container.classList.add("right-panel-active");
    history.pushState({}, null,  window.location.origin + "/signup.html");
});

signInButtonM.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
    history.pushState({}, null,  window.location.origin + "/login.html");
});


var api = new ApiAuth();
var loginFormInputs = document.getElementById("loginForm").getElementsByTagName("input");
var signupFormInputs = document.getElementById("signupForm").getElementsByTagName("input");
var user = ApiAuth.GetUser();

function login() {
    user = { emailornickname: loginFormInputs[0].value, password: loginFormInputs[1].value };
    api.resultFunction = (t) => {
        ApiAuth.SaveUser(user);
        window.location.href = window.location.origin;
    };
    api.resultErrFunction = (t) => {
        console.log(t);
        alertify.error(t.message);
    };
    api.Login(user);
}

function signup() {

    user = { emailornickname: signupFormInputs[0].value, password: signupFormInputs[2].value };
    var userR = { email: signupFormInputs[1].value, nickname: signupFormInputs[0].value, password: signupFormInputs[2].value };
    api.resultFunction = (t) => {
        ApiAuth.SaveUser(user);
        window.location.href = window.location.origin;
    };
    api.resultErrFunction = (t) => {
        console.log(t);
        alertify.error(t.message);
    };
    api.Register(userR);

}

function aaa() {
    api.resultFunction = () => {}; //token geçikmisse yapılcak islem
    ApiAuth.GetToken(api);
}