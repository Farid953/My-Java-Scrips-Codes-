let mybtn=document.querySelector(".button");
let myh3=document.querySelector(".h3")
mybtn.addEventListener("click",()=>{
 let myP=new Promise((resolve ,reject)=>{
  let myR=new XMLHttpRequest();
  myR.open("GET","Txt.json");

 myR.addEventListener("load",()=>{
    if (myR.status===200) {
        let Info=JSON.parse(myR.responseText)
        resolve(Info)
    }else{
        reject("The Cant be Load")
    }
 })
 myR.send()
 })
myP
.then((x)=>(myh3.innerHTML=x.FullName)).catch((error)=>myh3.innerHTML="Failed to load") 
})













// myBtn.addEventListener("click", () => {
//   let myPromis = new Promise((resolve, reject) => {
//     let myXHR = new XMLHttpRequest();
//     myXHR.open("GET", "https://jsonplaceholder.typicode.com/posts/9");
//     myXHR.addEventListener("load", () => {
//       if (myXHR.status === 200) {
//         let info = JSON.parse(myXHR.responseText);
//         resolve(info);
//       } else {
//         reject(myXHR.status);
//       }
//     });
//     myXHR.send();
//   });

//   myPromis.then((x) => (myH3.innerHTML = x.title)).catch((y) => console.log(y));
// });