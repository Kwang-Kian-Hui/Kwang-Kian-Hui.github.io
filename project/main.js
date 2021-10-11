// ----- Navigation -----

(() =>{
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);
    
    function showNavMenu(){
        navMenu.classList.add("open");
        // bodyScrollingToggle();
    }

    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
        // bodyScrollingToggle();
    }

    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() =>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }

    document.addEventListener("click", (event) => {
        if(event.target.classList.contains("link-item")){
            // ensure event.target.hash has a value before overriding default behavior 
            if(event.target.hash != ""){
                event.preventDefault();
                const hash = event.target.hash;
                console.log(hash);
                // add and remove active and hide tags respectively for current page
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // add and remove active and hide tags respectively for new page
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                
                navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active","inner-shadow");

                // only if navigation is performed on the menu
                if(navMenu.classList.contains("open")){
                    event.target.classList.add("active","inner-shadow");
                    event.target.classList.remove("outer-shadow","hover-in-shadow");
                    hideNavMenu();
                }else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if(hash === item.hash){
                            item.classList.add("active","inner-shadow");
                            item.classList.remove("outer-shadow","hover-in-shadow");  
                        }
                    })
                    fadeOutEffect();
                }
            }
        }
    })
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


// ----- about section skill tabs -----
(() => {
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active")){
            const target = event.target.getAttribute("data-target");
            console.log(target);

            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow");

            console.log(aboutSection.querySelector(".tab-content.active"));
            console.log(aboutSection.querySelector(target));
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();