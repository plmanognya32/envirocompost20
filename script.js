// const scroll = new LocomotiveScroll({
//   el: document.querySelector("#maindiv"),
//   smooth: true,
//   stagger: 1,
// });

function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#maindiv"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#maindiv" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#maindiv", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#maindiv").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locomotiveAnimation();

function navigationAnimation() {
  gsap.to("#nav-part1 img", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1div",
      scroller: "#maindiv",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });

  gsap.to("#nav-part2 #links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#page1div",
      scroller: "#maindiv",

      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
}

navigationAnimation();

function videocontainermouseanimation() {
  var videocontain = document.querySelector("#video-containerdiv");
  var playbtn = document.querySelector("#playbtn");

  videocontain.addEventListener("mouseenter", function () {
    gsap.to(playbtn, {
      scale: 1,
      opacity: 1,
    });
  });

  videocontain.addEventListener("mouseleave", function () {
    gsap.to(playbtn, {
      scale: 0,
      opacity: 0,
    });
  });

  videocontain.addEventListener("mousemove", function (dets) {
    gsap.to(playbtn, {
      left: dets.x - 50,
      top: dets.y - 50,
    });
  });
}

videocontainermouseanimation();

function loadinganimationheading() {
  gsap.from("#page1div h1", {
    y: 30,
    opacity: 0,
    delay: 0.5,
    duration: 0.8,
    stagger: 0.3,
  });
  gsap.from("#page1div #video-containerdiv", {
    scale: 0.9,
    opacity: 0,
    delay: 1.3,
    stagger: 0.3,
  });
}

loadinganimationheading();

document.addEventListener("mousemove", function (dets) {
  gsap.to("#cursordiv", {
    left: dets.x,
    top: dets.y,
  });
});

// document.querySelector("#child1").addEventListener("mouseenter", function () {
//   gsap.to("#cursordiv", {
//     transform: "translate(-50%, -50%) scale(1)",
//   });
// });

// document.querySelector("#child1").addEventListener("mouseleave", function () {
//   gsap.to("#cursordiv", {
//     transform: "translate(-50%, -50%) scale(0)",
//   });
// });

function cursormoveanimation() {
  document.querySelectorAll(".child").forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to("#cursordiv", {
        transform: "translate(-50%, -50%) scale(1)",
      });
    });
  });

  document.querySelectorAll(".child").forEach(function (elem) {
    elem.addEventListener("mouseleave", function () {
      gsap.to("#cursordiv", {
        transform: "translate(-50%, -50%) scale(0)",
      });
    });
  });
}

cursormoveanimation();

document.addEventListener("DOMContentLoaded", function () {
  const childElements = document.querySelectorAll("#page3div .child");

  childElements.forEach((child) => {
    child.addEventListener("click", function () {
      let animationClass = "";
      switch (this.id) {
        case "child1":
        case "child3":
          animationClass = "move-left";
          break;
        case "child2":
        case "child4":
          animationClass = "move-right";
          break;
      }

      this.classList.add("clicked", animationClass);

      setTimeout(() => {
        let pageToNavigate = "";

        switch (this.id) {
          case "child1":
            pageToNavigate = "google.com";
            break;
          case "child2":
            pageToNavigate = "gmail.com";
            break;
          case "child3":
            pageToNavigate = "chat.openai.com";
            break;
          case "child4":
            pageToNavigate = "coolors.com";
            break;
        }

        window.location.href = pageToNavigate;
      }, 500);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuContent = document.getElementById("menuContent");
  const closeButton = document.getElementById("closeButton");

  menuToggle.addEventListener("click", function () {
    if (menuOverlay.classList.contains("active")) {
      // Close the menu
      closeMenu();
    } else {
      // Open the menu
      openMenu();
    }
  });

  closeButton.addEventListener("click", function () {
    closeMenu();
  });

  // Function to open the menu
  function openMenu() {
    menuOverlay.classList.add("active");
    menuContent.classList.add("active");
  }

  // Function to close the menu
  function closeMenu() {
    menuOverlay.classList.remove("active");
    menuContent.classList.remove("active");
  }
});
