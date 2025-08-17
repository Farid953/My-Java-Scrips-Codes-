let mypromise=new Promise((Resolve,reject)=>{
let Istrue=true;
if (Istrue) {
    Resolve("okk");
}else{
    reject("noo");
}
});
mypromise.then((result)=>console.log(result)).catch((error)=>console.log(error));
