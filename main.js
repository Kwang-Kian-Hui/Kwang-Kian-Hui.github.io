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

                window.scrollTo(top);

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

                if(event.target.classList.contains("portfolio-link")){
                    const filterContainer = document.querySelectorAll(".filter-item");
                    const target = event.target.getAttribute("data-target");
                    // All Web Mobile p5.js Others
                    console.log(filterContainer);
                    
                    filterContainer.forEach((filterItem) => {
                        if(filterItem.classList.contains("active")){
                            filterItem.classList.remove("outer-shadow","active");
                        }
                        const fItem = filterItem.getAttribute("data-target");
                        if(target === fItem){
                            filterItem.classList.add("active","outer-shadow");
                        }
                        portfolioItems = document.querySelectorAll(".portfolio-item");
                        portfolioItems.forEach((pItem) => {
                            if(pItem.getAttribute("data-category") === target){
                                pItem.classList.remove("hide");
                                pItem.classList.add("show");
                            }else{
                                pItem.classList.remove("show");
                                pItem.classList.add("hide");
                            }
                        })
                    })

                    
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
    document.body.classList.toggle("hide-scrolling");
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
    projectDetailsBtn = popup.querySelector(".popup-project-details-btn");

    let itemIndex, slideIndex, screenshots;

    filterContainer.addEventListener("click", (e) => {
        if(e.target.classList.contains("filter-item") && !e.target.classList.contains("active")){
            // deactivate existing active "filter-item"
            filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
            // activate new "filter-item"
            e.target.classList.add("active","outer-shadow");
            const target = e.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if(item.getAttribute("data-category") === target || target === "All"){
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
            if(screenshots.length === 1){
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }else{
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
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
    
    prevBtn.addEventListener("click", () => {
        if(slideIndex === 0){
            slideIndex = screenshots.length-1;
        }else{
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails(){
        // if check any of the value is null if projects have empty values
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".popup-project-details").innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".popup-title h2").innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".popup-project-category").innerHTML = category;
    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0;
        }else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }
})();
