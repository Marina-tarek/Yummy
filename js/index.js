/// <reference types="../@types/jquery" />
let rowData = document.getElementById('rowData')
let mainSection = document.getElementById("main-section")
let inputOfLetter = document.getElementById("inputOfLetter")
// ---> loading screen
$(function () {
    $(".loader").fadeOut(1000, function load() {
        $(".loading").fadeOut(1000, function () {
            $('body').css('overflow', 'auto')
            searchByName("")

        })
    })
})
// --->inner spine
function showSpine() {
    $(".innerLoading").toggleClass('hidden show', 3000)
}
function hideSpine() {
    $(".innerLoading").toggleClass('show hidden', 3000)
}

// --->side nav
$(".open-close-tap").on("click", function tap() {
    $(".nav-content").animate({ width: 'toggle' }, 500)
    if ($(".nav-content").css("display", "block")) {
        $(".nav-header>i").toggleClass('fa-align-justify fa-xmark', 500);
        showMenuItems()
    } else {
        hideMenuItems()
    }
})

function showMenuItems() {
    for (let i = 0; i < 5; i++) {
        $(".nav-links li").eq(i).animate({ top: 0 }, (i + 5) * 100)
    }
}
function hideMenuItems() {
    for (let i = 0; i < 5; i++) {
        $(".nav-links li").eq(i).animate({ top: 'toggle' }, (i + 5) * 100)
        $(".nav-links li").removeAttr("style")
    }
}
//---->check if search bar show or not
function check() {
    if (!$("#rowSearch").hasClass('d-none')) {
        $("#rowSearch").addClass('d-none')
    }
}
// ---> category in side nav
$("#category").on("click", function () {
    check()
    getCategory()
    $(".nav-content").animate({ width: 'toggle' }, 500)
    $(".nav-header>i").toggleClass('fa-align-justify fa-xmark', 500);
})
async function getCategory() {
    showSpine()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    data = await response.json()
    displayCategory(data.categories)
    hideSpine()
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
    showSpine()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    data = await response.json();
    displayMealCategory(data.meals);
    hideSpine()
}
///-----control--{Main Fnction}------> displayMealCategory/&/displayMealsOfThisArea /&/displayMealsIngredient
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
    showSpine()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    data = await response.json()
    displayMealInstructions(data.meals[0])
    console.log(typeof(data.meals[0].strTags));
    hideSpine()
}
function displayMealInstructions(food) {
    console.log(food);

    let recepies = ''
    for (let i = 1; i < 20; i++) {
        if (food[`strIngredient${i}`]) {
            recepies += ` <i class="alert alert-info m-2 p-1">${food[`strMeasure${i}`]}${food[`strIngredient${i}`]}</i>`
        }
    }
    let tagsList=``
     if(food.strTags!=null){
    let tags=food.strTags.split(",")
    for (var i = 0; i < tags.length; i++) {
    tagsList+=` <i class="alert alert-danger m-2 p-1">${tags[i]}</i> `
    }
     }

    let cartoona = `<div class="col-md-4">
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
    ${tagsList}
    </ul>
    <a href="${food.strSource}" class="btn btn-success text-capitalize me-2" target="_blank">source</a>
    <a href="${food.strYoutube}" class="btn btn-danger text-capitalize" target="_blank">youtube</a>
</div>
                `
    rowData.innerHTML = cartoona
}

// ---->Area Section
$("#area").on("click", function () {
    check()
    getArea()
    $(".nav-content").animate({ width: 'toggle' }, 500)
    $(".nav-header>i").toggleClass('fa-align-justify fa-xmark', 500);
})
async function getArea() {
    showSpine()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    area = await response.json();
    displayArea(area.meals)
    hideSpine()
}

function displayArea(area) {
    let cartona = ``
    for (let i = 0; i < area.length; i++) {
        cartona += `
     <div class="col-md-3">
        <div onclick="getMealsOfThisArea('${area[i].strArea}')" class="pointer position-relative category-img rounded-2">
            <i class="fa-solid fa-house-laptop area-icon"></i>
            <h3 class="fw-medium fs-3 text-center" id="category">${area[i].strArea}</h3>
        </div>
    </div>`
        rowData.innerHTML = cartona
    }
}
async function getMealsOfThisArea(local) {
    showSpine()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${local}`);
    areaMeals = await response.json();
    displayMealCategory(areaMeals.meals);
    hideSpine()
}

// ---->ingrediant section
$("#ingredient").on("click", function () {
    check()
    getIngrediant()
    $(".nav-content").animate({ width: 'toggle' }, 500)
    $(".nav-header>i").toggleClass('fa-align-justify fa-xmark', 500);
})
async function getIngrediant() {
    showSpine()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    ingrediantData = await response.json()
    displayIngredient(ingrediantData.meals.slice(0, 20))
    // console.log(ingrediantData.meals.slice(0, 20));
    hideSpine()
}

function displayIngredient(gredient) {
    let cartona = ``
    for (let i = 0; i < gredient.length; i++) {
        cartona += `
    <div class="col-md-3">
        <div onclick="getMealsIngredient('${gredient[i].strIngredient}')"
            class="pointer position-relative category-img rounded-2 text-center">
            <i class="fa-solid fa-drumstick-bite area-icon"></i>
            <h3 class="fw-medium fs-3 text-center" id="gred">${gredient[i].strIngredient}</h3>
            <p class="short-paragraph">${gredient[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
    </div>  `
        rowData.innerHTML = cartona
    }
}

async function getMealsIngredient(component) {
    showSpine()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${component}`)
    let MealsIngredient = await response.json()
    displayMealCategory(MealsIngredient.meals)
    hideSpine()
}

///------>Search Seaction
$("#search").on("click", function () {
    rowData.innerHTML=""
    $("#rowSearch").removeClass('d-none')
    displaySearch()
    $(".nav-content").animate({ width: 'toggle' }, 500)
    $(".nav-header>i").toggleClass('fa-align-justify fa-xmark', 500);
})

function displaySearch() {
    let searchBox = `
    <div class="row py-5 searchInput">
        <div class="col-md-6">
          <input type="text"  onkeyup="searchByName(this.value)" class="form-control rounded-2 text-white" placeholder="Search By Name" id="inputOfName">
        </div>
        <div class="col-md-6">
            <input type="text"  onkeyup="searchByFirstLtter(value)" class="form-control rounded-2 text-white" placeholder="Search By First Letter" maxlength="1" id="inputOfLetter">
        </div>
    </div>`
    document.getElementById("rowSearch").innerHTML = searchBox

}
// inputOfLetter.on("input",function(){
//     searchByFirstLtter(value) })

///------> search by first letter
async function searchByFirstLtter(letter) {
    showSpine()
    if (letter == "") {
        letter = 'a'
    }
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let data = await response.json()
    console.log(data);
    if (data.meals != null) {
        displayMealCategory(data.meals)
    } else {
        rowData.innerHTML = ""
    }
    hideSpine()
}

///------> search by Meal Name
async function searchByName(name) {
    showSpine()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let list = await response.json()
    displayMealCategory(list.meals)
    hideSpine()

}


// ------->contact us section
$("#contactUs").on("click", function () {
    check()
    displayContactUs()
    $(".nav-content").animate({ width: 'toggle' }, 500)
    $(".nav-header>i").toggleClass('fa-align-justify fa-xmark', 500);
})
function displayContactUs() {
    let form = `
                    <div class="contact vh-100 d-flex justify-content-center align-items-center">
                    <div class="container w-75">
                        <form action="">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <input type="text" onkeyup="validationName(this.value)"  placeholder="Enter Your Name.." class="rounded-2 form-control" id="nameInput">
                                    <p class="invalid-feedback alert alert-danger mt-2">Special characters and numbers not allowed</p>
                                </div>
                                <div class="col-md-6">
                                    <input type="email" placeholder="Enter Your Email.."  onkeyup="validationEmail(this.value)" class="rounded-2 form-control" id="emailInput">
                                    <p class="invalid-feedback alert alert-danger mt-2">Email not valid *exemple@yyy.zzz </p>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" placeholder="Enter Your Phone.." onkeyup="validationPhone(this.value)" class="rounded-2 form-control" id="phoneInput">
                                    <p class="invalid-feedback alert alert-danger mt-2">Enter valid Phone Number</p>
                                </div>
                                <div class="col-md-6">
                                    <input type="number" placeholder="Enter Your Age." onkeyup="validationAge(this.value)" class="rounded-2 form-control" id="ageInput">
                                    <p class="invalid-feedback alert alert-danger mt-2">Enter valid age</p>
                                </div>
                                <div class="col-md-6">
                                    <input type="password" placeholder="Enter Your Password."  onkeyup="validationPassword(this.value)" class="rounded-2 form-control" id="passwordInput">
                                    <p class="invalid-feedback alert alert-danger mt-2">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
                                </div>
                                <div class="col-md-6">
                                    <input type="password" onkeyup="validationRepassword()" placeholder="Repassword" class="rounded-2 form-control" id="repasswordInput">
                                    <p class="invalid-feedback text-start alert alert-danger w-100 mt-2">Enter valid repassword</p>
                                </div>
                            </div>
                            <button class="btn btn-outline-danger px-2 mt-3 text-capitalize disabled" id="btnSubmit">submit</button>
                        </form>

                    </div>
                </div>
    `
    rowData.innerHTML = form
}

