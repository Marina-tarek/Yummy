// "use strict"
/// <reference types="../@types/jquery" />
let rowData = document.getElementById('rowData')
// ---> loading screen
$(function () {
    console.log("hello")
    $(".loader").fadeOut(1000, function load() {
        $(".loading").slideUp(1000, function (e) {
            $('body').css('overflow', 'auto')
            $('.loading').remove()
        })
    })
})

// --->side nav
$(".open-close-tap").on("click",function tap(){
    $(".nav-content").animate({ width: 'toggle'}, 500)
    if($(".nav-content").css("display","block")){
        $(".nav-header>i").toggleClass('fa-bars fa-xmark',500);
    }
})


// ---> category in side nav
$("#category").on("click", async function () {
    await getCategory()
 
})
async function getCategory() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    data = await response.json()
    // console.log(data);
    displayCategory(data.categories)

}
let category;
function displayCategory(array) {
    let cartona = ``
    for (let i = 0; i < array.length; i++) {
        cartona += `
<div class="col-md-3">
                <div onclick="filterCategoryMeal('${array[i].strCategory}')" class="pointer position-relative category-img">
                    <img class="w-100" src='${array[i].strCategoryThumb}' alt="${array[i].strCategory}" srcset="">
                    <div class="OverLayerMeal  position-absolute text-black text-center">
                        <h3 class="fw-medium fs-3 text-center" id="category">${array[i].strCategory}</h3>
                        <p class="short-paragraph" >${array[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>

                    </div>
                </div>
        </div>
        `
        rowData.innerHTML = cartona
    }
}

async function filterCategoryMeal(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    data = await response.json()
    // console.log(data.meals);
    displayMealCategory(data.meals)
}
function displayMealCategory(array) {
    let cartona = ``
    for (let i = 0; i < array.length; i++) {
        cartona += `
    <div class="col-md-3">
                    <div onclick="getMealInstructions('${array[i].idMeal}')" class="pointer position-relative category-img">
                        <img class="w-100" src='${array[i].strMealThumb}' alt="${array[i].strMeal}">
                        <div class="OverLayerMeal  position-absolute text-black text-center d-flex align-items-center justify-content-center">
                            <h3 class="fw-medium fs-3 text-center" id="category">${array[i].strMeal}</h3>
                        </div>
                    </div>
            </div>
            `
        rowData.innerHTML = cartona

    }
}
async function getMealInstructions(idMeal) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    data = await response.json()
    console.log(data.meals[0]);
    displayMealInstructions(data.meals[0])
}
function displayMealInstructions(food) {
    console.log(food);

  let recepies=''
    for (let i = 1; i < 20; i++) {
        if(food[`strIngredient${i}`]){
recepies +=` <i class="alert alert-info m-2 p-1">${food[`strMeasure${i}`]}${food[`strIngredient${i}`]}</i> 
`
} }
//------------------------------------  فاضل ال  tags 
// let tagsList=''
//  if(!food.strTags==" "){
// let tags=food.strTags.split(',')
// for(let i=0;i<tags.lenght;i++){
// // tagsList+=` <i class="alert alert-info m-2 p-1">${tags[i]}</i> `
// // }
// console.log(`${i}`);
// }
//  }

      let  cartoona = `<div class="col-md-4">
    <img src="${food.strMealThumb}" alt="${food.strMeal}" class="w-100 rounded-3 mb-4">
    <h2>${food.strMeal}</h2>
</div>
<div class="col-md-8">
    <h2>instructions</h2>
    <p>${food.strInstructions}</p>
    <h3>Area : <span class="fw-light">${food.strArea}</span> </h3>
    <h3>Category : <span class="fw-light"> ${food.strCategory}</span> </h3>
    <h3>recipes :</h3>
    <ul class="list-unstyled recipes-list d-flex flex-wrap">
 ${recepies}
    </ul>
    <h3>tags :</h3>
    <ul class="list-unstyled recipes-list d-flex flex-wrap">
    </ul>
    <a href="${food.strSource}" class="btn btn-success text-capitalize me-2" target="_blank">source</a>
    <a href="${food.strYoutube}" class="btn btn-danger text-capitalize" target="_blank">youtube</a>
</div>
                `
        rowData.innerHTML = cartoona

  
}


