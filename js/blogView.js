var apiBlogDetail = new ApiAuth();
// const urlParams = new URLSearchParams(window.location.search);
// const BlogId = urlParams.get('id');

// getBlogDetail(BlogId);

function setBlogDetail(b){
    var blogContent = document.getElementById("div-makale");

    var title = document.getElementsByClassName("title-bar")[0];
    var titleAut = title.getElementsByClassName("p-publish-title")[0];
    var blogDate = new Date(b.blogDate).toDateString();
    var blogTitle = title.getElementsByClassName("p-main-title")[0];
    var blogTitle = title.getElementsByClassName("p-main-title")[0];
    var tags = document.getElementsByClassName("kategori-bar")[0];
    var img = document.getElementsByClassName("top-bar")[0].getElementsByClassName("img-div")[0].getElementsByTagName("img")[0];
    img.src = b.blogTitlePhotoUrl;
    img.style = "";
    tags.innerHTML = "";
    document.body.innerHTML += `<meta name="description" content="${b.blogSummary}">

    <meta property="og:description" content="${b.blogSummary}">
    
    <meta name="twitter:description" content="${b.blogSummary}">`;

    for(var i = 0;i<b.blogTags.length;i++){
        tags.innerHTML += `<a href="/category/${b.blogTags[i].id}" class="p-kategori inactive c-p td-n">${b.blogTags[i].name}</a>`;
    }
    blogTitle.innerHTML = b.blogTitle;
    titleAut.innerHTML = blogDate +` tarihinde <a class='inactive c-p td-u'>${b.authorSummary.authorName}</a> tarafından yazıldı.`;

    blogContent.innerHTML = "";
    for(var i = 0; i < b.blogContent.length; ++i){
        addBlogContent(b.blogContent[i], blogContent);
    }
}
function addBlogContent(content, blogContent){
    var text = "";
    switch(content.type){
        case "p":
            console.log("p");
            text = `<p class='p-text'>${content.data}</p>`;
            break;
        case "img":
            console.log("img");
            text = 
            `<div class="img-div">
                <img src="${content.data}" alt="foto">
                <p class="img-subtitle inactive">${content.description}</p>
            </div>`
            break;
        case "h":
            console.log("h");
            text =
            `<h1 class="p-main-title">${content.data}</h1>`;
            break;
        case "hr":
            console.log("hr");
            text = "<hr>";
            break;
        case "quote":
            console.log("quote");
            text = `<p class='p-text quote'>${content.data}</p>`;
            break;
        case "sep":
            console.log("sep");
            text = 
            `<div class="div-seperator">
                <p class="seperator inactive">•</p>
                <p class="seperator inactive">•</p>
                <p class="seperator inactive">•</p>
            </div>`
            break;
        default:
            console.log("aaaaaaaaaaaaaaaaa");
    }
    blogContent.innerHTML += text;

}
function getBlogDetail(id, fixUrl = ()=>{}){
    apiBlogDetail.resultFunction = (t)=>{
        apiBlogDetail.resultFunction = (b)=>{
            console.log(b);
            fixUrl(b.blogTitle.split(" ").join("-"));
            setBlogDetail(b);
        }
        apiBlogDetail.GetAuth("blogs/getBlog?id="+id, t.token);
    }
    apiBlogDetail.resultUnAuthFunction = (r)=>{
        apiBlogDetail.resultFunction = (b)=>{
            console.log(b);
            fixUrl(b.blogTitle.split(" ").join("-"));
            setBlogDetail(b);
        }
        apiBlogDetail.GetAuth("blogs/getBlogGuest?id="+id);
    }
    apiBlogDetail.resultErrFunction = (err)=>{
        console.log(err);
    }
    ApiAuth.GetToken(apiBlogDetail);
}

var xxidTemp = new URLSearchParams(window.location.search).get('id');
if(xxidTemp != null){
    getBlogDetail(xxidTemp, (BlogTitle)=>{history.pushState({}, null, "/blogView.html?name=" + BlogTitle + "&id=" + BlogId)});
}

var BlogId = 0;
function setParam(param){
    var x = param.split("-");
    BlogId = x[x.length - 1];
    getBlogDetail(BlogId, (BlogTitle)=>{history.pushState({}, null, "/blogView/" + BlogTitle + "-" + BlogId)});
}