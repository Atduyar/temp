function setBlogDetail(){}

var apiBlogDetail = new ApiAuth();

function getBlogDetail(id){
    apiBlogDetail.resultFunction = (t)=>{
        apiBlogDetail.resultFunction = (b)=>{
            console.log(b);
        }
        apiBlogDetail.GetAuth("getBlog?id="+id, t);
    }
    apiBlogDetail.resultErrFunction = (err)=>{
        console.log(err);
    }
    apiBlogDetail.resultUnAuthFunction = (r)=>{
        console.log(err);
    }
    ApiAuth.GetToken(apiBlogDetail)
}