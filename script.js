//this works but it shows the main image before the cover div loads
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

//LOADING SCREEL//
gsap.to("#loadingScreen", {
    duration: 3, // Set the duration of the animation
    y: "-100%", // Move the loading screen up to hide it
    ease: "expo.in", // Use ease for smooth animation
    onComplete: () => {
      // After animation is complete, show the main content
      document.getElementById("mainContent").style.display = "block";
    }
  });


//TEXT FILL//
gsap.to("p", {
backgroundPositionX: "0%",
stagger: 1,
scrollTrigger: {
    trigger: "#sec_1",
    markers: false,
    scrub: 1,
    start: -100,
    end: "center center"
}
});


//BOATSCROLL//
gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".boatscroll");

sections.forEach(section => {  
  let canvas = section.querySelector("canvas");
  canvas ? initCanvas(section, canvas) : initOther(section);
});

function initCanvas(section, canvas) {
  
  let context = canvas.getContext("2d");
  canvas.width = 1920;
  canvas.height = 1080;  

  let frameCount = 214;
  const currentFrame = index => (
    `/img/BoatScroll/Adventure_${(index + 1).toString().padStart(5, '0')}.webp`
  );

  let images = []
  let airpods = {
    frame: 0
  };
  
  for (let i = 0; i < frameCount; i++) {
    let img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }

  gsap.timeline({
    onUpdate: render,
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: 0.5,
      end: "+=200%",
      markers: false
    }
  })
  .to(airpods, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    duration: 1
  }, 0);
  
  images[0].onload = render;

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[airpods.frame], 0, 0); 
  }
}

function initOther(section) {
  ScrollTrigger.create({
    trigger: section,
    pin: true,
    end: "+=200%"
  });
}


gsap.timeline({
  scrollTrigger:{
    trigger: ".parent",
    markers: true,
    scrub: 1,
    pin: true,
    start: "top top",
    end: "+=1500"
  }
})
.to(".main_img",{
  scale: 2.5,
})
.to(".other_img",{
  scale: 1.8,
  opacity: 0,
}, 0);



//I NEED TO KEEP PARALLAX DOWN HERE FOR SOME REASON//
gsap.utils.toArray("section").forEach((section, i) => {
  section.bg = section.querySelector(".bg"); 
  
      section.bg.style.backgroundPosition = "50% 0px"; 
  
      gsap.to(section.bg, {
      backgroundPosition: `50% ${-innerHeight / 2}px`,
      ease: "none",
      scrollTrigger: {
          trigger: section,
          markers: false,
          start: "top top", 
          end: "bottom top",
          scrub: true
      }
      });
  });