const bluePillImg = document.querySelector("#loader-part1 img");
const redPillImg = document.querySelector("#loader-part2 img");

window.scroll({
  top: 0, 
  left: 0, 
  behavior: 'smooth'
});

gsap.from(bluePillImg, {
  duration: 1.5,
  opacity: 0,
  left: -400,
  ease: "power4.out",
});

gsap.from(redPillImg, {
  duration: 1.5,
  opacity: 0,
  right: -400,
  ease: "power4.out",
});

function animateLoaderWords() {
  const words = ["Grinding", "Learning", "Improving"];
  let currentIndex = 0;
  let split;
  const textElement = document.querySelector(".primary-h2 span");

  function updateText() {
    textElement.textContent = words[currentIndex];
    split = new SplitType(textElement, { type: "chars" });
    animateChars(split.chars);
    currentIndex = (currentIndex + 1) % words.length;
  }

  function animateChars(chars) {
    gsap.from(chars, {
      yPercent: 100,
      stagger: 0.02,
      duration: 1,
      ease: "power4.out",
      onComplete: () => {
        if (split) {
          split.revert();
        }
      },
    });
  }

  setInterval(updateText, 2000);
}
    

function loaderTransiton() {
  window.onload = function () {
    const loaderEndTl = gsap.timeline();
    setTimeout(function () {
      loaderEndTl
        .to(".primary-h2 span", {
          opacity: 0,
        })
        .to(bluePillImg, {
          left: "-800",
        })
        .to(redPillImg, {
          right: "-800",
        })
        .set("#loader-part2-container", {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        })
        .to("#loader-part2-container", {
          delay: 0.5,
          duration: 1,
          opacity: 1,
          width: "100vw",
          height: "100vh",
          borderRadius: "0",
          ease: "power4.out",
          zIndex: "40",
          onComplete: () => {
            bluePillImg.remove();
            redPillImg.remove();
          },
        })
        .to("#loader", {
          opacity: 0,
          duration: 0.5,
          ease: "power4.out",
          onComplete: () => {
            document.querySelector("#loader").remove();
          },
        })
    }, 6200); //the time is 6200
  };
}

animateLoaderWords();
loaderTransiton();