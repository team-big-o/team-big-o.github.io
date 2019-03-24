document.onload = function(){
    document.getElementById("burger").addEventListener('click', changeClass);
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