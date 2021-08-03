var apiBlogDetail = new ApiAuth();
const urlParams = new URLSearchParams(window.location.search);
const BlogId = urlParams.get('id');

function setBlogDetail(b){
    var title = document.getElementsByClassName("title-bar")[0];
    var titleAut = title.getElementsByClassName("p-publish-title")[0];
    var blogDate = new Date(b.blogDate).toDateString();

    titleAut.innerHTML = blogDate +` <a class='inactive c-p td-u'>${b.authorSummary.authorName}</a> tarafından yazıldı.`;
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