const parallax_elements = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let x = 0;
let y = 0;
let rotatedDegree = 0;

function update(cur){
    parallax_elements.forEach((element) => {

        let speedx = element.dataset.speedx;
        let speedy = element.dataset.speedy;
        let speedz = element.dataset.speedz;
        let speedr = element.dataset.speedr;

        let isInLeft =  parseFloat(getComputedStyle(element).left) < window.innerWidth / 2 ? 1 : -1;
        let z = (cur - parseFloat(getComputedStyle(element).left)) * isInLeft * 0.1;


        element.style.transform = `translateX(calc(-50% + ${-x * speedx}px))
        translateY(calc(-50% + ${y * speedy}px))
        perspective(2300px) translateZ(${z * speedz}px)
        rotateY(${rotatedDegree * speedr}deg)`;
    })
}

update(0);

window.addEventListener("mousemove", (e) => {

    if(timeline.isActive()) return;

    x = e.clientX - window.innerWidth / 2;
    y = e.clientY - window.innerHeight / 2;

    rotatedDegree = (x / (window.innerWidth/2))*20;

    update(e.clientX)
})

if (window.innerWidth >= 725) {
    main.style.maxHeight = `${window.innerWidth * 0.6}px`
} else {
    main.style.maxHeight = `${window.innerWidth * 1.6}px`

}

//GSAP animation

let timeline = gsap.timeline();

Array.from(parallax_elements).filter((element) => !element.classList.contains("text")).forEach((element) => {
    timeline.from(element, {
        top: `${element.offsetHeight / 2 + element.dataset.distance}px`,
        duration: 3.5,
        ease: "power3.out",
    }, "1");
});

timeline.from(".text h1", {
    y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 200,
    duration: 2,
}, "2.5")

timeline.from(".text h2", {
    y: -150,
    opacity: 0,
    duration: 1.5,
}, "3")

timeline.from(".hide", {
    opacity: 0,
    duration: 1.5,
}, "3")


