// ======================
// TYPING EFFECT
// ======================

new Typed(".typing", {

    strings: [
        "AI Engineer",
        "Machine Learning Developer",
        "Python Developer",
        "Software Engineer",
        "Problem Solver"
    ],

    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true

});


// ======================
// PARTICLES BACKGROUND
// ======================

particlesJS("particles-js", {

    particles: {

        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },

        color: {
            value: "#00f5ff"
        },

        shape: {
            type: "circle"
        },

        opacity: {
            value: 0.5
        },

        size: {
            value: 3
        },

        line_linked: {
            enable: true,
            distance: 150,
            color: "#00f5ff",
            opacity: 0.3,
            width: 1
        },

        move: {
            enable: true,
            speed: 2
        }
    },

    interactivity: {

        detect_on: "canvas",

        events: {

            onhover: {
                enable: true,
                mode: "repulse"
            },

            onclick: {
                enable: true,
                mode: "push"
            }

        }
    },

    retina_detect: true

});


// ======================
// THEME TOGGLE
// ======================

const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    if(document.body.classList.contains("light-theme")){

        themeBtn.innerHTML = "☀️";

    }else{

        themeBtn.innerHTML = "🌙";

    }

});


// ======================
// CUSTOM CURSOR
// ======================

const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove", (e)=>{

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    cursor2.style.left = e.clientX - 12 + "px";
    cursor2.style.top = e.clientY - 12 + "px";

});


// ======================
// ACTIVE NAVBAR
// ======================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", ()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop;

        if(scrollY >= sectionTop - 200){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});


// ======================
// SCROLL REVEAL
// ======================

const revealElements = document.querySelectorAll(
".glass-card, .project-card, .timeline-item, .cert-card"
);

function reveal(){

    revealElements.forEach(el=>{

        const windowHeight = window.innerHeight;

        const revealTop = el.getBoundingClientRect().top;

        if(revealTop < windowHeight - 100){

            el.classList.add("show");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();


// ======================
// 3D PROFILE CARD
// ======================

const card = document.querySelector(".profile-card");

card.addEventListener("mousemove", (e)=>{

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 25;
    const rotateX = (0.5 - y / rect.height) * 25;

    card.style.transform =
    `rotateY(${rotateY}deg)
     rotateX(${rotateX}deg)
     scale(1.05)`;

});

card.addEventListener("mouseleave", ()=>{

    card.style.transform =
    "rotateY(0deg) rotateX(0deg) scale(1)";

});


// ======================
// PAGE LOADER
// ======================

window.addEventListener("load", ()=>{

    document.body.style.opacity = "1";

});


// ======================
// SMOOTH SCROLL
// ======================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(
            this.getAttribute("href")
        ).scrollIntoView({

            behavior: "smooth"

        });

    });

});