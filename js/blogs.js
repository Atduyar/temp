var apiBlogs = new ApiAuth();
let pageNumber = 1;
let pageBlogCounter = 39;

function setBlogs(b) {
    var blogsHtml = "";
    if (pageNumber == 1) {
        var firstBlog = b.shift();
        var divBlog = document.getElementsByClassName("div-blog")[0];
        var blogImg = divBlog.getElementsByClassName("div-image")[0].getElementsByTagName("img")[0];
        var blogTitle = divBlog.getElementsByClassName("div-blog-details")[0].getElementsByClassName("title")[0].getElementsByTagName("p")[0];
        var blogDescriptionDiv = divBlog.getElementsByClassName("div-blog-details")[0].getElementsByClassName("description")[0].getElementsByTagName("p");
        var blogAut = blogDescriptionDiv[0];
        var blogDes = blogDescriptionDiv[1];

        blogDes.innerHTML = firstBlog.blogSummary;
        blogImg.src = firstBlog.blogTitlePhotoUrl;
        blogTitle.innerHTML = firstBlog.blogTitle;
        blogAut.innerHTML = firstBlog.blogDate + " <a class='inactive-blackbg c-p td-u'>" + firstBlog.authorName + "</a> tarafından yazıldı.";
    }
    for (var i = 0; i < b.length; i++) {//((i+((pageNumber == 1)?1:0))%13 == 0)
        blogsHtml +=
            `<div class="blog-item ${((i+((pageNumber == 1)?1:0))%18 > 12)?"blog-list-long":""} ">
            <p class="p-publish-title only-long">
                ${b[i].blogDate} <a class="c-p td-u">${b[i].authorName}</a> tarafından yazıldı.
            </p>
            <img class="img-blog-item" src="${b[i].blogTitlePhotoUrl}" loading="lazy">
            <div class="kategori-bar-blog-item">
                <a href="/category/Politika" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Politika</a>
                <a href="/category/Elestiri" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Eleştiri</a>
            </div>
            <div class="blog-des-group">
                <p class="text-color p-baslik-blog-item c-p">${b[i].blogTitle}</p>
                <p class="p-aciklama-blog-item">${(b[i].blogSummary.length > 250) ? b[i].blogSummary.substring(0, 225) + "...":b[i].blogSummary }</p>
            </div>
        </div>`;
    }
    fakeNavBar(false); //sahte nav barı kapat
    if (b.length < ((pageNumber == 1) ? (pageBlogCounter - 1) : pageBlogCounter)) {
        pageNumberTemp = -1; //make last page 

    }

    document.getElementById("blog-list").innerHTML += blogsHtml;

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
        apiBlogs.PostAuth("blogs/getbypage", t.token, { PageNumber: pageNumber, PageSize: pageBlogCounter });
    }
    apiBlogs.resultErrFunction = (t) => {
        if (t instanceof TypeError) {
            pageNumberTemp = -1; // make last page
            console.log("Sanslı zaman ;D");
        } else {
            console.log(t);
        }
    }
    apiBlogs.resultUnAuthFunction = (t) => { //guest giris yapılıyor
        apiBlogs.resultFunction = (b) => {
            console.log(b);
            setBlogs(b);
        }
        apiBlogs.resultErrFunction = apiBlogs.resultErrFunction;
        apiBlogs.Post("blogs/getbypageGuest", { PageNumber: pageNumber, PageSize: pageBlogCounter });
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
        fakeNavBar(true); //sahte nav barı aç
        pageNumberTemp = pageNumber + 1;
        getBlogs(pageNumber);
    }

    setTimeout(anan, 250);
}

function fakeNavBar(bool) {
    if (!bool) {
        document.getElementById("blog-list-fake").style = "display: none;";
    } else {
        document.getElementById("blog-list-fake").style = "";
    }
}