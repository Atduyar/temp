var mySidenav = document.getElementById("mySidenav");
var myMask = document.getElementById("myMask");

const capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
    first.toLocaleUpperCase(locale) + rest.join('')

function openNav() {
    
    mySidenav.style = "display block!important; background-color:rgba(17,17,17,1)";
    // mySidenav.style.backgroundColor = "rgba(17,17,17,1)";
    // mySidenav.style.display = " block!important;"
    myMask.style.backgroundColor = "rgba(0,0,0,0.4)";
    myMask.style = " display:block!important;";
}

function closeNav() {
    mySidenav.style.backgroundColor = "rgba(17,17,17,0)";
    myMask.style.backgroundColor = "rgba(0,0,0,0)";
    setTimeout(() => { document.getElementById("mySidenav").style = ""; }, 500);
    setTimeout(() => { document.getElementById("myMask").style = ""; }, 500);

}

var apiNav = new ApiAuth;

getUser()

function getUser() {
    apiNav.resultFunction = (t) => { //token alırsan
        apiNav.resultFunction = (u) => { //kullanıcıyı alırsan
                console.log(u);
                // document.getElementsByClassName("nav-bar")[0].getElementsByClassName("nav-bar-pc")[0].children[0].innerText = capitalizeFirstLetter(u.nickname);
            }
            // apiNav.resultErrFunction = apiNav.resultErrFunction;//kullanıcıyı almasa
        apiNav.GetMyProfil(t.token);
    };
    apiNav.resultErrFunction = (t) => { //token almasa
        console.log(t);
    };
    ApiAuth.GetToken(apiNav);
}