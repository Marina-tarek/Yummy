/// <reference types="../@types/jquery" />
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const btnSubmit=document.getElementById("btnSubmit")
$("form").on("submit", function (event) {
    event.preventDefault();

});

inputs[0].addEventListener("input", function () {
    validationName()
  
})
inputs[1].addEventListener("input", function () {
    validationEmail()
   
})
inputs[2].addEventListener("input", function () {
    validationPhone()
  
})
inputs[3].addEventListener("input", function () {
    validationAge()

})
inputs[4].addEventListener("input", function () {
    validationPassword()

})
// form.addEventListener("input",function(){
//     if (validationName() && validationEmail() && validationPassword()&& validationAge()){
//         console.log("good");
//         btnSubmit.classList.remove("disabled")
        
//     }
// })


function validationName() {
    const regexStyle = /^(?:[a-zA-Z\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
    if (regexStyle.test(inputs[0].value.toLowerCase())) {
        inputs[0].classList.add("is-valid")
        inputs[0].classList.remove("is-invalid")
        return true
    } else {

        inputs[0].classList.add("is-invalid")
        inputs[0].classList.remove("is-valid")
        return false
    }
}

function validationEmail() {
    const regexStyle =/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regexStyle.test(inputs[1].value.toLowerCase())) {
        inputs[1].classList.add("is-valid")
        inputs[1].classList.remove("is-invalid")
        return true
    } else {
        inputs[1].classList.add("is-invalid")
        inputs[1].classList.remove("is-valid")
        return false
    }
}

function validationPhone(){
    const regexStyle=/^01[0125][0-9]{8}$/
    if (regexStyle.test(inputs[2].value)) {
        inputs[2].classList.add("is-valid")
        inputs[2].classList.remove("is-invalid")
        return true
    } else {
        inputs[2].classList.add("is-invalid")
        inputs[2].classList.remove("is-valid")
        return false
    }
}
function validationAge(){
    const regexStyle=/^[1-9]?[0-9]{1}$|^100$/
    if (regexStyle.test(inputs[3].value)) {
        inputs[3].classList.add("is-valid")
        inputs[3].classList.remove("is-invalid")
        return true
    } else {
        inputs[3].classList.add("is-invalid")
        inputs[3].classList.remove("is-valid")
        return false
    }
}
function validationPassword() {
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (regexStyle.test(inputs[4].value.toLowerCase())) {
        inputs[4].classList.add("is-valid")
        inputs[4].classList.remove("is-invalid")
        return true
    } else {
        inputs[4].classList.add("is-invalid")
        inputs[4].classList.remove("is-valid")
        return false
    }
}

