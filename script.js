//this works but it shows the main image before the cover div loads
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

gsap.to("#loadingScreen", {
    duration: 2, // Set the duration of the animation
    y: "-100%", // Move the loading screen up to hide it
    ease: "power2.inOut", // Use ease for smooth animation
    onComplete: () => {
      // After animation is complete, show the main content
      document.getElementById("mainContent").style.display = "block";
    }
  });


  gsap.utils.toArray("section").forEach((section, i) => {
    section.bg = section.querySelector(".bg"); 
  
    // Give the backgrounds some random images
    // section.bg.style.backgroundImage = `url(https://picsum.photos/${innerWidth}/${innerHeight}?random=${i})`;
  
    if (i) {
      section.bg.style.backgroundPosition = `50% ${innerHeight / 2}px`;
  
      gsap.to(section.bg, {
        backgroundPosition: `50% ${-innerHeight / 2}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: true
        }
      });
    } 
    
    else {
      section.bg.style.backgroundPosition = "50% 0px"; 
  
      gsap.to(section.bg, {
        backgroundPosition: `50% ${-innerHeight / 2}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top", 
          end: "bottom top",
          scrub: true
        }
      });
    }
  });


  gsap.to("p", {
    backgroundPositionX: "0%",
    stagger: 1,
    scrollTrigger: {
      trigger: "#sec_1",
      markers: true,
      scrub: 1,
      start: "top center",
      end: "bottom center"
    }
  });