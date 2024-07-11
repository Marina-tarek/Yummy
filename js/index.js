// "use strict"
/// <reference types="../@types/jquery" />

// loading screen
$(function () {
    console.log("hello")
    $(".loader").fadeOut(1000, function () {
        $(".loading").slideUp(1000, function (e) {
            $('body').css('overflow', 'auto')
            $('.loading').remove()
        })
    })
})