// var apiNav = ApiAuth();

getBlogs()
function getBlogs(pageNumber = 1){
    var blogsHtml = "";
    apiNav.resultFunction = (t)=>{
        apiNav.resultFunction = (b)=>{
            console.log(b);
            for(var i = 0;i<b.length;i++){
                blogsHtml += 
                `<div class="blog-item">
                    <img class="img-blog-item" src="${b[i].blogTitlePhotoUrl}">
                    <div class="kategori-bar-blog-item">
                        <a href="/category/Politika" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Politika</a>
                        <a href="/category/Elestiri" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Eleştiri</a>
                    </div>
                    <p class="text-color p-baslik-blog-item c-p">${b[i].blogTitle}</p>
                    <p class="p-aciklama-blog-item">${b[i].blogSummary}</p>
                </div>`;
            }
            document.getElementById("blog-list").innerHTML = blogsHtml;
        }
        apiNav.resultErrFunction = apiNav.resultErrFunction;
        apiNav.PostAuth("blogs/getbypage", t.expiration, {PageNumber: pageNumber, PageSize: 50});
    }
    apiNav.resultErrFunction = (t)=>{
        if(tokenNumber == -1){//guest giris yapılıyor
            apiNav.resultFunction = (b)=>{
                console.log(b);
                for(var i = 0;i<b.length;i++){
                    blogsHtml += 
                    `<div class="blog-item">
                        <img class="img-blog-item" src="${b[i].blogTitlePhotoUrl}">
                        <div class="kategori-bar-blog-item">
                            <a href="/category/Politika" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Politika</a>
                            <a href="/category/Elestiri" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Eleştiri</a>
                        </div>
                        <p class="text-color p-baslik-blog-item c-p">${b[i].blogTitle}</p>
                        <p class="p-aciklama-blog-item">${b[i].blogSummary}</p>
                    </div>`;
                }
                document.getElementById("blog-list").innerHTML = blogsHtml;
            }
            apiNav.resultErrFunction = apiNav.resultErrFunction;
            apiNav.Post("blogs/getbypageGuest", {PageNumber: pageNumber, PageSize: 50});
        }
        else{
            console.log(t);
        }
    }
    var tokenNumber = ApiAuth.GetToken(apiNav)
}