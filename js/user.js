
getBlogs(1)

function getBlogs(userId) {
    apiBlogs.resultFunction = (t) => {
        console.log(t);
        apiBlogs.resultFunction = (b) => {
            console.log(b);
            setBlogs(b);
        }
        apiBlogs.resultErrFunction = apiBlogs.resultErrFunction;
        apiBlogs.PostAuth("users/getbypage", t.token, { PageNumber: pageNumber, PageSize: pageBlogCounter });
    }
    apiBlogs.resultErrFunction = (t) => {
        console.log(t);
    }
    apiBlogs.resultUnAuthFunction = (t) => {
        console.log(t);
    }
    ApiAuth.GetToken(apiBlogs)
}