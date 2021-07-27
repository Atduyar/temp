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

    ApiAuth.SaveUser({ emailornickname: loginFormInputs[0].value, password: loginFormInputs[1].value });

    api.resultFunction = (t) => {
        window.location.href = window.location.origin;
    };
    api.resultErrFunction = (t) => {
        console.log(t);
        alertify.error(t.message);
    };
    api.Login();
}
function aaa() {
    api.resultFunction = ()=>{};//token geçikmisse yapılcak islem
    ApiAuth.GetToken(api);
}