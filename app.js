let api1 = "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search="
let api2 = "https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageprops|pageimages&format=json&titles="
let getKeyword = async function (params) {
    let respone = await fetch(`${api1}${params}`)
    let data = await respone.json()
    return data
}
let arr = []
let getThumb = async function (params) {
    let respone = await fetch(`${api2}${params}`)
    let data = await respone.json()
    return data
}
let input = document.querySelector(".form-control")
let suggestBar = document.getElementById("search-suggest")
input.addEventListener("input", () => {
    if(input.value !=""){
        suggestBar.style.display="block"
        let string = ""
    getKeyword(input.value)
        .then((data) => {
            // console.log(data);
            for (let index = 0; index < data[1].length; index++) {

                getThumb(data[1][index])
                    .then((thumb) => {
                        let thumbn = ""
                        let arr = Object.values(thumb.query.pages)
                        let des = ""
                        if (arr[0].pageprops["wikibase-shortdesc"] == undefined) {
                            des = ""
                        } else {
                            des = arr[0].pageprops["wikibase-shortdesc"]
                        }
                        if (arr[0].thumbnail == undefined) {
                            thumbn = "https://img.upanh.tv/2022/11/17/No-image-found.jpg"
                        } else {
                            thumbn = arr[0].thumbnail.source
                        }
                        console.log(des);
                        console.log(thumbn);
                        string += `<a  href="${data[3][index]}" target="_blank">
            <div>${data[1][index]}</div>
            <div class="content-container"><img src="${thumbn}" class="img">${des}</div>
            </a>
            `
                        suggestBar.innerHTML = string
                    })

            }
            // console.log(string);

        })
    }else{
        suggestBar.style.display="none"
    }
})
// function getData(url, fn) {
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//     if (xhr.readyState == XMLHttpRequest.DONE) {
//     if (xhr.status === 200) {
//     fn(undefined, JSON.parse(xhr.responseText));
//     } else {
//     fn(new Error(xhr.statusText), undefined);
//     }
//     }
//     };
//     xhr.open('GET', url, true);
//     xhr.send();
// }
// function getThumb(url, fn) {
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//     if (xhr.readyState == XMLHttpRequest.DONE) {
//     if (xhr.status === 200) {
//     fn(undefined, JSON.parse(xhr.responseText));
//     } else {
//     fn(new Error(xhr.statusText), undefined);
//     }
//     }
//     };
//     xhr.open('GET', url, true);
//     xhr.send();
// }
// let input=document.querySelector(".form-control")
// let resultBar=document.querySelector(".search-suggest")
// function fn2(data1,data2) {
//     let value,thumb,des=""
//     if(data2 != undefined){
//      value=Object.values(data2[0].query.pages)
//      thumb=value[0].thumbnail.source
//      des=value[0].ageprops["wikibase-shortdesc"]
    
//     }else{
//         thumb=""
//         des=""
//     }
//     return [des,thumb]
// } 
// function fn(data1,data2) {
//     let string=""
//     for (let index = 0; index < data2[1].length; index++) {
//         let data=getThumb(data2[1][index],fn2)
//         string +=`
//         <div>${data2[1][index]}</div>
//         <div><img src="${data[1]}">${data[0]}</div>
//         `
//         resultBar.innerHTML=string
//     }
// }
// input.addEventListener("input",()=>{
//     getData(`${api1}${input.value}`,fn)

// })