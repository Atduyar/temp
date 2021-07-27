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

const userAction = async() => {
    const response = await fetch('https://api.atduyar.com/api/auth/login', {
        method: 'POST',
        body: loginBody,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log({ emailornickname: email, password: pass });
    console.log(myJson);
}

var loginBody = null;

function login() {
    var email = document.getElementById("loginForm").getElementsByTagName("input");
    var pass = email[1].value;
    email = email[0].value;
    loginBody = { emailornickname: email, password: pass };
    userAction();
}