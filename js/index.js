// "use strict"
/// <reference types="../@types/jquery" />
let rowData=document.getElementById('rowData')
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
// $(".open-close-tap").on("click",function(){
//     $(".nav-content").animate({left: 0}, 500)
//     $(".open-close-icon").removeClass("fa-bars");
//     $(".open-close-icon").addClass("fa-xmark");
// })
// $(".open-close-tap").on("click",function(){
//     let boxWidth = $(".nav-content").outerWidth()
//     $(".nav-content").animate({ left: -boxWidth }, 500)
//     $(".open-close-icon").addClass("fa-bars");
//     $(".open-close-icon").removeClass("fa-xmark");



// ---> category in side nav
$("#category").on("click",async function(){
    $(".sideNav").animate({left: -$(".nav-content").outerWidth(),"overflow":"hidden"}, 500)
    await getCategory()
})
async function getCategory(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    data = await response.json()
// console.log(data);
    displayCategory(data.categories)
  
    }
let category;
function displayCategory(array){
let cartona=``
for (let i = 0; i < array.length; i++) {
cartona+=`
<div class="col-md-3">
                <div onclick="filterCategoryMeal('${array[i].strCategory}')" class="pointer position-relative category-img">
                    <img class="w-100" src='${array[i].strCategoryThumb}' alt="${array[i].strCategory}" srcset="">
                    <div class="OverLayerMeal  position-absolute text-black text-center">
                        <h3 class="fw-medium fs-3 text-center" id="category">${array[i].strCategory}</h3>
                        <p class="short-paragraph" >${array[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>

                    </div>
                </div>
        </div>
        `
rowData.innerHTML=cartona
}
}

async function filterCategoryMeal(category){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    data = await response.json()
// console.log(data.meals);
displayMealCategory(data.meals)
    }
function displayMealCategory(array){
    let cartona=``
    for (let i = 0; i < array.length; i++) {
    cartona+=`
    <div class="col-md-3">
                    <div onclick="getMealInstructions('${array[i].idMeal}')" class="pointer position-relative category-img">
                        <img class="w-100" src='${array[i].strMealThumb}' alt="${array[i].strMeal}" srcset="">
                        <div class="OverLayerMeal  position-absolute text-black text-center d-flex align-items-center justify-content-center">
                            <h3 class="fw-medium fs-3 text-center" id="category">${array[i].strMeal}</h3>
                        </div>
                    </div>
            </div>
            `
    rowData.innerHTML=cartona
    
    }
    }
async function getMealInstructions(idMeal){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    data = await response.json()
console.log(data);
}


