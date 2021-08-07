var mySidenav = document.getElementById("mySidenav");
var myMask = document.getElementById("myMask");

const capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
    first.toLocaleUpperCase(locale) + rest.join('')

function openNav() {
    mySidenav.style.display = "block";
    //myMask.style.display = "block";
    setTimeout(() => { mySidenav.style.opacity = "1"; }, 100);/* sadece opacity dokun  */
    //setTimeout(() => { myMask.style.backgroundColor = "rgba(0,0,0,0.4)"; }, 100);/* sadece rgb ye dokun */
    
}

function closeNav() {
    mySidenav.style.opacity = "0";/* sadece opacity dokun */
    //myMask.style.backgroundColor = "rgba(0,0,0,0)";/* sadece rgb ye dokun */
    setTimeout(() => { mySidenav.style.display = "none"; }, 500);/* sadece sondaki sayıya dokun -transition: 0.3s*/
    //setTimeout(() => { myMask.style.display = "none"; }, 500);/* sadece sondaki sayıya dokun -transition: 0.3s*/

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