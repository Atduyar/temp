var apiBlogDetail = new ApiAuth();
const urlParams = new URLSearchParams(window.location.search);
const BlogId = urlParams.get('id');

function setBlogDetail(){}


getBlogDetail(BlogId);
function getBlogDetail(id){
    apiBlogDetail.resultFunction = (t)=>{
        apiBlogDetail.resultFunction = (b)=>{
            console.log(b);
        }
        apiBlogDetail.GetAuth("getBlog?id="+id, t.token);
    }
    apiBlogDetail.resultErrFunction = (err)=>{
        console.log(err);
    }
    apiBlogDetail.resultUnAuthFunction = (r)=>{
        console.log(r);
    }
    ApiAuth.GetToken(apiBlogDetail);
}