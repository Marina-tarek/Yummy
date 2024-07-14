/// <reference types="../@types/jquery" />

const btnSubmit=document.getElementById("btnSubmit")
$("form").on("submit", function (event) {
    event.preventDefault();
   
});


function validationName(name) {
    const regexStyle = /^(?:[a-zA-Z\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
    if (regexStyle.test(name)) {
        $("#nameInput").addClass("is-valid")
        $("#nameInput").removeClass("is-invalid")
        return true
    } else {
        $("#nameInput").addClass("is-invalid")
        $("#nameInput").removeClass("is-valid")
        return false
    }
   
}

function validationEmail(email) {
    const regexStyle =/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regexStyle.test(email)) {
        $("#emailInput").addClass("is-valid")
        $("#emailInput").removeClass("is-invalid")
        return true
    } else {
        $("#emailInput").addClass("is-invalid")
        $("#emailInput").removeClass("is-valid")
        return false
    }
}

function validationPhone(phone){
    const regexStyle=/^01[0125][0-9]{8}$/
    if (regexStyle.test(phone)) {
        $("#phoneInput").addClass("is-valid")
        $("#phoneInput").removeClass("is-invalid")
        return true
    } else {
        $("#phoneInput").addClass("is-invalid")
        $("#phoneInput").removeClass("is-valid")
        return false
    }
}
function validationAge(age){
    const regexStyle=/^[1-9]?[0-9]{1}$|^100$/
    if (regexStyle.test(age)) {
        $("#ageInput").addClass("is-valid")
        $("#ageInput").removeClass("is-invalid")
        return true
    } else {
        $("#ageInput").addClass("is-invalid")
        $("#ageInput").removeClass("is-valid")
        return false
    }
}
function validationPassword(password){
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (regexStyle.test(password)) {
        $("#passwordInput").addClass("is-valid")
        $("#passwordInput").removeClass("is-invalid")
        return true
    } else {
        $("#passwordInput").addClass("is-invalid")
        $("#passwordInput").removeClass("is-valid")
        return false
    }
}

function validationRepassword(){
if($("#repasswordInput").val()==$("#passwordInput").val()){
    $("#repasswordInput").addClass("is-valid")
    $("#repasswordInput").removeClass("is-invalid")
    return true
}else{
    $("#repasswordInput").addClass("is-invalid")
    $("#repasswordInput").removeClass("is-valid")
    return false
}

}
function submit(){

    if(validationName()&&validationEmail()&&validationPhone()&&validationAge()&&validationPassword()&&validationRepassword()){
$("#btnSubmit").removeClass("disabled")
    }else{
        return false
    }
}

