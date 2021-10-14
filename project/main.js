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
    const sections = document.querySelectorAll(".section");

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

function bodyScrollingToggle(){
    document.body.classList.toggle("stop-scrolling");
}

// ----- portfolio filter and popup -----

(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".popup-prev"),
    nextBtn = popup.querySelector(".popup-next"),
    closeBtn = popup.querySelector(".popup-close"),
    projectDetailsContainer = popup.querySelector(".popup-details"),
    projectDetailsBtn = popup.querySelector("popup-project-details-btn");

    let itemIndex, slideIndex, screenshots;

    filterContainer.addEventListener("click", (e) => {
        if(e.target.classList.contains("filter-item") && !e.target.classList.contains("active")){
            // deactivate existing active "filter-item"
            filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
            // activate new "filter-item"
            e.target.classList.add("active","outer-shadow");
            const target = e.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if(item.getAttribute("data-category") === target || target === "all"){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    portfolioItemsContainer.addEventListener("click", (e) => {
        if(e.target.closest(".portfolio-item-inner")){
            const portfolioItem = e.target.closest(".portfolio-item-inner").parentElement;
            // get portfolioItem's index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            
            // convert screenshots into array
            screenshots = screenshots.split(",");
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".popup-img");
        // activate loader until the popupImg is loaded
        popup.querySelector(".load-progress-indicator").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // deactivate load progress indicator
            popup.querySelector(".load-progress-indicator").classList.remove("active");
        }
        popup.querySelector(".popup-count").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }

    nextBtn.addEventListener("click", () => {
        if(slideIndex === (screenshots.length - 1)){
            slideIndex = 0;
        }else{
            slideIndex++;
        }
        popupSlideshow();
    })
    //1:27:50
})();
