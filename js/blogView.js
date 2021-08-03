var apiBlogDetail = new ApiAuth();
const urlParams = new URLSearchParams(window.location.search);
const BlogId = urlParams.get('id');

function setBlogDetail(b){
    var title = document.getElementsByClassName("title-bar")[0];
    var titleAut = title.getElementsByClassName("p-publish-title")[0];
    var blogDate = new Date(b.blogDate).toDateString();
    var blogTitle = title.getElementsByClassName("p-main-title")[0];
    var blogTitle = title.getElementsByClassName("p-main-title")[0];
    var tags = document.getElementsByClassName("kategori-bar")[0];
    var img = document.getElementsByClassName("top-bar")[0].getElementsByClassName("img-div")[0].getElementsByTagName("img");
    img.src = b.blogTitlePhotoUrl;
    tags.innerHTML = "";
    for(var i = 0;i<b.blogTags.length;i++){
        tags.innerHTML += `<a href="/category/${b.blogTags[i].id}" class="p-kategori inactive c-p td-n">${b.blogTags[i].name}</a>`;
    }
    blogTitle.innerHTML = b.blogTitle;
    titleAut.innerHTML = blogDate +` tarihinde <a class='inactive c-p td-u'>${b.authorSummary.authorName}</a> tarafından yazıldı.`;
}

getBlogDetail(BlogId);
function getBlogDetail(id){
    apiBlogDetail.resultFunction = (t)=>{
        apiBlogDetail.resultFunction = (b)=>{
            console.log(b);
            setBlogDetail(b);
        }
        apiBlogDetail.GetAuth("blogs/getBlog?id="+id, t.token);
    }
    apiBlogDetail.resultUnAuthFunction = (r)=>{
        apiBlogDetail.resultFunction = (b)=>{
            console.log(b);
            setBlogDetail(b);
        }
        apiBlogDetail.GetAuth("blogs/getBlogGuest?id="+id);
    }
    apiBlogDetail.resultErrFunction = (err)=>{
        console.log(err);
    }
    ApiAuth.GetToken(apiBlogDetail);
}