var apiBlogs = new ApiAuth();
let pageNumber = 1;

function setBlogs(b) {
    var blogsHtml = "";
    for (var i = 0; i < b.length; i++) {
        blogsHtml +=
            `<div class="blog-item">
            <img class="img-blog-item" src="${b[i].blogTitlePhotoUrl}">
            <div class="kategori-bar-blog-item">
                <a href="/category/Politika" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Politika</a>
                <a href="/category/Elestiri" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Eleştiri</a>
            </div>
            <p class="text-color p-baslik-blog-item c-p">${b[i].blogTitle}</p>
            <p class="p-aciklama-blog-item">${(b[i].blogSummary.length > 250) ? b[i].blogSummary.substring(0, 225) + "...":b[i].blogSummary }</p>
        </div>`;
    }
    if (b.length < 50) {
        pageNumberTemp = -1;
    }

    if (pageNumber == 1) {
        document.getElementById("blog-list").innerHTML = blogsHtml;
    } else {
        document.getElementById("blog-list").innerHTML += blogsHtml;
    }
    pageNumber++;
}

getBlogs()

function getBlogs(pageNumber = 1) {
    apiBlogs.resultFunction = (t) => {
        console.log(t);
        apiBlogs.resultFunction = (b) => {
            console.log(b);
            setBlogs(b);
        }
        apiBlogs.resultErrFunction = apiBlogs.resultErrFunction;
        apiBlogs.PostAuth("blogs/getbypage", t.token, { PageNumber: pageNumber, PageSize: 50 });
    }
    apiBlogs.resultErrFunction = (t) => {
        if (t instanceof TypeError) {
            pageNumberTemp = -1;
            console.log("Sanslı zaman ;D");
        } 
        else{
            console.log(t);
        }
    }
    apiBlogs.resultUnAuthFunction = (t) => { //guest giris yapılıyor
        apiBlogs.resultFunction = (b) => {
            console.log(b);
            setBlogs(b);
        }
        apiBlogs.resultErrFunction = apiBlogs.resultErrFunction;
        apiBlogs.Post("blogs/getbypageGuest", { PageNumber: pageNumber, PageSize: 50 });
    }
    ApiAuth.GetToken(apiBlogs)
}

let documentHeight;
let currentScroll;
let modifier = 750;
var pageNumberTemp = 2; //1.sayfa cekildiyse

anan();

function anan() {
    documentHeight = document.body.scrollHeight;
    currentScroll = window.scrollY + window.innerHeight;
    if (documentHeight < currentScroll + modifier && pageNumber == pageNumberTemp) {
        console.log("getBlog!!!!!: ", pageNumber);
        pageNumberTemp = pageNumber + 1;
        getBlogs(pageNumber);
    }

    setTimeout(anan, 250);
}