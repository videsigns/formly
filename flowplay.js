// Select all elements with class .hero-heading
if (window.innerWidth >= 768) {
  const heroHeadingElements = document.querySelectorAll(".hero-heading");

  // Loop through each element to set up the scroll trigger and animation
  heroHeadingElements.forEach((element) => {
    // Split the element's text into individual words
    const words = element.textContent.trim().split(" ");

    // Wrap each word with a span element and add them back to the element
    element.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(" ");
    element.style.opacity = "1";
    // Set up the slide-in animation for each word
    gsap.fromTo(
      element.querySelectorAll(".word"),
      {
        y: 50, // Slide in from 50px below the element's original position
        opacity: 0, // Start with 0 opacity
      },
      {
        y: 0, // End at the original position
        opacity: 1, // End with 100% opacity
        stagger: 0.1, // Stagger the animation of each word by 0.1 second,
        onComplete: () => {
          // Animation for .hero-paragraph after heading animation is done
          const heroParagraph = document.querySelector(".hero-paragraph");
          heroParagraph.style.opacity = "1";

          gsap.fromTo(
            heroParagraph,
            {
              y: 50, // Slide in from 50px below the element's original position
              opacity: 0, // Start with 0 opacity
            },
            {
              y: 0, // End at the original position
              opacity: 1, // End with 100% opacity
              ease: "power4.out",
              duration: 0.25, // Duration of the animation in seconds
              onComplete: () => {
                // Animation for .button-wrapper and its child elements
                const buttonWrapper = document.querySelector(".button-wrapper");
                buttonWrapper.style.opacity = "1";

                gsap.fromTo(
                  buttonWrapper.children,
                  {
                    y: 50, // Slide in from 50px below the element's original position
                    opacity: 0, // Start with 0 opacity
                  },
                  {
                    y: 0, // End at the original position
                    opacity: 1, // End with 100% opacity
                    ease: "power4.out",
                    duration: 0.25, // Duration of the animation in seconds
                    stagger: 0.1, // Stagger the animation of each child element by 0.1 second
                  }
                );
              },
            }
          );
        },
      }
    );
  });
}

// Select all elements with class .heading-large
const headingLargeElements = document.querySelectorAll(".heading-large");

// Loop through each element to set up the scroll trigger and animation
headingLargeElements.forEach((element) => {
  // Wrap each word with a span element and add them back to the element
  const words = element.textContent.trim().split(" ");
  element.innerHTML = words
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");

  // Set up the slide-in animation for each word
  gsap.from(element.querySelectorAll(".word"), {
    y: 50, // Slide in from 50px below the element's original position
    opacity: 0, // Start with 0 opacity
    stagger: 0.1, // Stagger the animation of each word by 0.1 second
    scrollTrigger: {
      trigger: element, // Element to trigger the animation
      start: "top 90%", // Animation starts when the element's top reaches 80% of the viewport
      end: "center center", // Animation ends when the element's center reaches the center of the viewport
      scrub: true, // The animation will play on scrub (scrolling)
    },
  });
});

$(window).scroll(function () {
  var scrollTop = $(this).scrollTop();
  var scrollPercentage =
    (scrollTop / ($(document).height() - $(window).height())) * 100;
  if (scrollPercentage >= 10) {
    // When scroll is at 5%
    $(".nav-links-wrapper").addClass("bottom");
  } else {
    $(".nav-links-wrapper").removeClass("bottom");
  }
  if (scrollPercentage >= 0 && scrollPercentage <= 2) {
    // Updated scroll range to 0% to 5%
    var paddingValue = (scrollPercentage / 2) * 2.3; // Change the value to the desired rem size
    var opacityValue = scrollPercentage / 2;
    $(".nav-links.white").css({
      "padding-left": paddingValue + "rem",
      "padding-right": paddingValue + "rem",
      opacity: opacityValue,
    });
  }
});

// Get all the feature cards
const featureCards = document.querySelectorAll(".feature-card");

// Define the options for the IntersectionObserver
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1,
};

// Keep track of the currently active card
let currentActiveCard = null;

function callback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // If there is a currently active card, remove the 'active' class from it
      if (currentActiveCard) {
        currentActiveCard.classList.remove("active");
      }
      // Add 'active' class to the card that is in view
      entry.target.classList.add("active");

      // Update the currently active card
      currentActiveCard = entry.target;
    }
  });
}

// Create an intersection observer
const observer = new IntersectionObserver(callback, options);

// Start observing all the feature cards
featureCards.forEach((card) => {
  observer.observe(card);
});

function animateElements(selector, start, end, duration, stagger) {
  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) {
    console.error(`No elements found with selector "${selector}"`);
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: elements[0],
      start: start,
      end: end,
      scrub: true,
      //markers: true
    },
  });

  tl.staggerFromTo(
    elements,
    duration,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1 },
    stagger
  );
}

animateElements(".grid-cell", "50% bottom", "0% top", 0.5, 0.1);

// Animate ".grid-cell" elements
if (window.innerWidth > 991) {
  // Call your function
  animateElements(".feature-items-large", "50% bottom", "0% top", 0.5, 0.1);
}

// script.js
const backgroundObject = document.querySelector(".background-object");

// Function to handle the parallax effect
function handleParallaxScroll() {
  const scrollY = window.scrollY;
  backgroundObject.style.transform = `translateY(${scrollY * 0.5}px)`; // Adjust the 0.5 value to control the parallax effect speed
}

// Attach the scroll event listener
window.addEventListener("scroll", handleParallaxScroll);

document.querySelectorAll(".slider").forEach(function (slider) {
  slider.addEventListener("input", function (e) {
    let value =
      ((e.target.value - e.target.min) / (e.target.max - e.target.min)) * 100;
    e.target.style.backgroundImage = `linear-gradient(to right, white ${value}%, transparent ${value}%)`;
  });
});

document.querySelector(".slider-1").addEventListener("input", function (e) {
  const percent =
    ((e.target.value - e.target.min) / (e.target.max - e.target.min)) * 100;
  e.target.style.backgroundImage = `linear-gradient(to right, currentColor ${percent}%, transparent ${percent}%)`;

  // Update the range text
  const volumeTextElement = document.querySelector(".feature-text.volume");
  volumeTextElement.textContent = `${e.target.value}%`;
});

function createStar() {
  let wrapper = document.querySelector(".page-wrapper");

  // Create a new star (dot)
  let star = document.createElement("div");
  star.className = "dot";

  // Randomize the size of the star (1px - 4px)
  let size = Math.random() * 3 + 2;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  // Randomize the opacity of the star (0.5 - 0.7)
  let opacity = Math.random() * 0.2 + 0.5;
  star.style.opacity = opacity;

  // Randomly position the star within the .page-wrapper
  star.style.top = `${Math.random() * wrapper.offsetHeight}px`;
  star.style.left = `${Math.random() * wrapper.offsetWidth}px`;

  // Append the star to the .page-wrapper
  wrapper.appendChild(star);

  // Remove the star after a certain period of time
  setTimeout(() => {
    wrapper.removeChild(star);
  }, 2000);
}

// Create stars every 50 milliseconds
setInterval(createStar, 25);
// Initialize dragging state variables
let isDragging = false;
let initialOffsetX = 0;
let trackWidth = 0;
let activeTrack = null; // Store the currently active track element
let activeDot = null; // Store the currently active dot element

// When the dot is clicked, start dragging
$(".feature-track-dot").on("mousedown", function (e) {
  isDragging = true;
  activeDot = $(this); // Store the reference to the currently active dot
  activeTrack = activeDot.closest(".track"); // Find the track containing the active dot
  initialOffsetX = e.pageX - activeDot.offset().left;
  trackWidth = activeTrack.width();
});

// When the mouse is moved, update the dot, bar, and thumbnail position
$(document).on("mousemove", function (e) {
  if (isDragging && activeDot && activeTrack) {
    // Calculate the new position for the dot and bar
    let newWidth = e.pageX - activeTrack.offset().left - initialOffsetX;
    newWidth = Math.min(Math.max(newWidth, 0), trackWidth); // Keep the width within the track

    // Update the bar width
    activeTrack.find(".feature-track-bar").css("width", newWidth + "px");

    // Update the dot position inside the bar
    activeDot.css("left", newWidth - activeDot.width() / 2 + "px");

    // Update the thumbnail position
    activeTrack.next(".feature-thumbnail").css("left", newWidth + "px");
  }
});

// When the mouse is released, stop dragging
$(document).on("mouseup", function () {
  isDragging = false;
  activeDot = null; // Reset the active dot reference
  activeTrack = null; // Reset the active track reference
});

$(".feature-dropdown-items").on("click", function () {
  // Set all feature-icons to opacity 0
  $(".feature-html-icon").css("opacity", "0");

  // Set the clicked feature-icon to opacity 1
  $(this).children(".feature-html-icon").css("opacity", "1");

  // Get the blur value from data-blur attribute
  var blurValue = $(this).data("blur");

  // Apply the blur effect to the quality icon
  var qualityIcon = $(this).parent().siblings(".quality-icon");

  qualityIcon.css("filter", "blur(" + blurValue + "px)");
});

$(".feature-dropdown-items").eq(3).trigger("click");
