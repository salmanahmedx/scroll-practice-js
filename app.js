// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.querySelector(".date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links")

//** Self-Explanation **//

//If we modify css using js it gets added as inline css which has more specificity than external css. To override the height in media queries thats why !important is added.
// toggle method doesn't require the use of important. But the height needs to be added custom everytime a new nav link is added unlike getBoundingClientRect() method

navToggle.addEventListener("click", function () {
    // linksContainer.classList.toggle("show-links")
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`
    } else {
        linksContainer.style.height = 0;
    }
})


const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link")

// ********** fixed navbar ************
window.addEventListener("scroll", function () {
    const scrollHeight = window.pageYOffset; //total pixel that we scrolled
    const navHeight = navbar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        navbar.classList.add("fixed-nav");
    } else {
        navbar.classList.remove("fixed-nav");
    }
    if (scrollHeight > 500) {
        topLink.classList.add("show-link");
    } else {
        topLink.classList.remove("show-link")
    }
})

// ********** smooth scroll ************

// select links
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        //prevent default behavior
        e.preventDefault();

        //navigate to speicic spot
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id)


        //calculating the heights
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains("fixed-nav"); //true/false
        let position = element.offsetTop - navHeight; //provides us the height from top

        if (!fixedNav) {
            position = position - navHeight;
        }
        //why? after we convert our navbar to position fixed, it's out of the flow from our document. Fixed nav don't occupy a position! It's like higher z-index. Before it was fixed, lets say its height was 100 and total top distance of about was 500. After it was fixed, those 100 are not counted and the top distance become 400. So, we deduct navHeight again as it disappeared upon the conversion of fixed nav. Visualize or draw the scenario.


        if (navHeight > 82) {
            position = position + containerHeight;
        }

        window.scrollTo({
            left: 0,
            top: position,
        })

        linksContainer.style.height = 0;
    })
})


