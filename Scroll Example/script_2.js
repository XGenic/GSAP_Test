gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray("section");

sections.forEach(section => {  
  let canvas = section.querySelector("canvas");
  canvas ? initCanvas(section, canvas) : initOther(section);
});

function initCanvas(section, canvas) {
  
  let text = section.querySelector(".text");
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
      markers: true
    }
  })
  .to(text, {
    opacity: 1,
    x: -100,
    duration: 0.5
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