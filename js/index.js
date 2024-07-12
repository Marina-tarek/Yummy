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
                <div onclick="filterCategoryMeal('${array[i].strCategory}')" class="pointer position-relative category-img rounded-2">
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
    displayMealCategory(data.meals)
}
///-----control--{Main Fnction}--------> displayMealCategory/&/displayMealsOfThisArea /&/displayMealsIngredient
function displayMealCategory(array) {
    let cartona = ``
    for (let i = 0; i < array.length; i++) {
        cartona += `
    <div class="col-md-3">
                    <div onclick="getMealInstructions('${array[i].idMeal}')" class="pointer position-relative category-img rounded-2">
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
    // console.log(data.meals[0]);
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
    <h3><span class="fw-bolder">Area : </span>${food.strArea} </h3>
    <h3><span class="fw-bolder">Category :</span> ${food.strCategory}</h3>
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

// --->Area Section
$("#area").on("click",function(){
    getArea()
})
async function getArea(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    area = await response.json();
    displayArea(area.meals)
}

function displayArea(area){
    let cartona = ``
    for (let i = 0; i < area.length; i++) {
        cartona += `
<div class="col-md-3">
                <div onclick="getMealsOfThisArea('${area[i].strArea}')" class="pointer position-relative category-img rounded-2">
                  <i class="fa-solid fa-house-laptop area-icon"></i>
                <h3 class="fw-medium fs-3 text-center" id="category">${area[i].strArea}</h3>
                    </div>
                </div>
        </div>
        `
        rowData.innerHTML = cartona
    }
}
async function getMealsOfThisArea(local){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${local}`);
    areaMeals = await response.json();
    displayMealCategory(areaMeals.meals);
}


// --->ingrediant section
$("#ingredient").on("click",function(){
    getIngrediant()
})
async function getIngrediant(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    ingrediantData = await response.json()
    displayIngredient(ingrediantData.meals.slice(0, 20))
    console.log(ingrediantData.meals.slice(0, 20));
}

function displayIngredient(gredient){
    let cartona = ``
    for (let i = 0; i < gredient.length; i++) {
        cartona += `
<div class="col-md-3">
                <div onclick="getMealsIngredient('${gredient[i].strIngredient}')" class="pointer position-relative category-img rounded-2 text-center">
                 <i class="fa-solid fa-drumstick-bite area-icon"></i>
                <h3 class="fw-medium fs-3 text-center" id="gred">${gredient[i].strIngredient}</h3>
                 <p class="short-paragraph" >${gredient[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
        rowData.innerHTML = cartona
    }
    
}

async function getMealsIngredient(component){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${component}`)
   let MealsIngredient = await response.json()
    displayMealCategory(MealsIngredient.meals)
}


