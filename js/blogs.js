var apiBlogs = new ApiAuth();
var firstLoad = false;

getBlogs()

function getBlogs(pageNumber = 1) {
    var blogsHtml = "";
    apiBlogs.resultFunction = (t) => {
        console.log(t);
        apiBlogs.resultFunction = (b) => {
            console.log(b);
            for (var i = 0; i < b.length; i++) {
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
            firstLoad = true;
        }
        apiBlogs.resultErrFunction = apiBlogs.resultErrFunction;
        apiBlogs.PostAuth("blogs/getbypage", t.token, { PageNumber: pageNumber, PageSize: 50 });
    }
    apiBlogs.resultErrFunction = (t) => {
        console.log(t);
    }
    apiBlogs.resultUnAuthFunction = (t) => { //guest giris yapılıyor
        apiBlogs.resultFunction = (b) => {
            console.log(b);
            for (var i = 0; i < b.length; i++) {
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
            firstLoad = true;
        }
        apiBlogs.resultErrFunction = apiBlogs.resultErrFunction;
        apiBlogs.Post("blogs/getbypageGuest", { PageNumber: pageNumber, PageSize: 50 });
    }
    ApiAuth.GetToken(apiBlogs)
}
let documentHeight;
let currentScroll;

function anan() {
    documentHeight = document.body.scrollHeight;
    currentScroll = window.scrollY + window.innerHeight;
    console.log(documentHeight, " - ", currentScroll);
    console.clear();

    setTimeout(anan, 200);
}