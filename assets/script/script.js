window.onscroll = function() {myFunction()};
window.onload = function(){
    document.getElementById("burger").addEventListener( 'click', changeClass);
}

function changeClass() {
    if (document.getElementById("burger").className.match(/(?:^|\s)is-active(?!\S)/)){
        document.getElementById("burger").className = document.getElementById("burger").className.replace(/(?:^|\s)is-active(?!\S)/g , '' );
        document.getElementById("navbarContent").className = document.getElementById("navbarContent").className.replace(/(?:^|\s)is-active(?!\S)/g , '' );
    } else {
        document.getElementById("burger").className += " is-active";
        document.getElementById("navbarContent").className += " is-active";
    }
 }

function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    }
}