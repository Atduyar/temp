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
var apii = new ApiAuth;
getUser()

function getUser() {
    apii.resultFunction = (t)=>{    
        apii.resultFunction = (u)=>{
            console.log(u);
        }
        apii.GetMyProfil(t.token);
        console.log(t);
    };
    apii.resultErrFunction = (t)=>{
        console.log(t);
    };
    ApiAuth.GetToken(apii);
}