/* ----- Navigation -----*/

(() =>{
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);
    
    function showNavMenu(){
        navMenu.classList.add("open");
    }

    function hideNavMenu(){
        navMenu.classList.remove("open");
    }
})();

(() => {
    // console.log("hide all sections except for active one")
    const sections = document.querySelectorAll(".section");
    // console.log(sections);

    sections.forEach((section) => {
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    });
})();