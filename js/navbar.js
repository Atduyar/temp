var mySidenav = document.getElementById("mySidenav");
var myMask = document.getElementById("myMask");

function openNav() {
    mySidenav.style.width = "250px";
    myMask.style = "display:block!important;";
    myMask.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    mySidenav.style.width = "0";
    myMask.style.backgroundColor = "rgba(0,0,0,0)";
    setTimeout(() => { document.getElementById("myMask").style = ""; }, 500);

}

var user = ApiAuth.GetUser();
getUser()

function getUser() {
    console.log(user);
}