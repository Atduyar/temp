var apiNav = ApiAuth();

getBlogs()
function getBlogs(pageNumber = 1){
    apiNav.resultFunction = (t)=>{
        apiNav.resultFunction = (b)=>{
            console.log(b);
        }
        apiNav.resultErrFunction = apiNav.resultErrFunction;
        apiNav.PostAuth("blogs/getbypageGuest", t, {PageNumber: pageNumber, PageSize: 50});
    }
    apiNav.resultErrFunction = (t)=>{
        console.log(t);
    }
    ApiAuth.GetToken(apiNav)
}