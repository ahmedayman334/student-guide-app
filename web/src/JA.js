let btn=document.querySelector(".btn")
let x=5;
function GoToPage(){
    if(x && x== 5)
    {
        window.location("/index.html")
    }
}
btn.addEventListener("click",GoToPage)