// Performance optimization: Use passive event listeners where possible
const passiveSupported = (() => {
  let passiveSupported = false
  try {
    const options = {
      get passive() {
        passiveSupported = true
        return false
      },
    }
    window.addEventListener("test", null, options)
    window.removeEventListener("test", null, options)
  } catch (err) {
    passiveSupported = false
  }
  return passiveSupported
})()

// Loading screen
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen")

  // Hide loading screen after page loads
  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("hidden")
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }, 1000)
  })
})

// Header scroll effect with throttling for better performance
let ticking = false

function updateHeader() {
  const header = document.getElementById("header")
  const backToTop = document.getElementById("back-to-top")

  if (window.scrollY > 100) {
    header.classList.add("scrolled")
    backToTop.style.display = "block"
  } else {
    header.classList.remove("scrolled")
    backToTop.style.display = "none"
  }

  ticking = false
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateHeader)
    ticking = true
  }
}

window.addEventListener("scroll", requestTick, passiveSupported ? { passive: true } : false)

// Mobile menu toggle with improved accessibility
const menuToggle = document.getElementById("menu-toggle")
const navMobile = document.getElementById("nav-mobile")

menuToggle.addEventListener("click", () => {
  const isOpen = navMobile.classList.contains("active")

  navMobile.classList.toggle("active")
  menuToggle.classList.toggle("active")
  menuToggle.setAttribute("aria-expanded", !isOpen)

  // Prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? "" : "hidden"
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!menuToggle.contains(e.target) && !navMobile.contains(e.target)) {
    navMobile.classList.remove("active")
    menuToggle.classList.remove("active")
    menuToggle.setAttribute("aria-expanded", "false")
    document.body.style.overflow = ""
  }
})

// Enhanced smooth scrolling function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const headerHeight = document.getElementById("header").offsetHeight
    const targetPosition = section.offsetTop - headerHeight

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })
  }
}

// Navigation links smooth scrolling with improved UX
document.querySelectorAll(".nav-link, .nav-link-mobile").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href").substring(1)
    scrollToSection(targetId)

    // Close mobile menu if open
    navMobile.classList.remove("active")
    menuToggle.classList.remove("active")
    menuToggle.setAttribute("aria-expanded", "false")
    document.body.style.overflow = ""
  })
})

// Back to top button
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Enhanced contact form handling with validation
const contactForm = document.getElementById("contact-form")
const formMessage = document.getElementById("form-message")

// Form validation functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePhone(phone) {
  const re = /^[+]?[0-9\s\-$$$$]{10,}$/
  return phone === "" || re.test(phone)
}

function showError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + "-error")
  const field = document.getElementById(fieldId)

  if (errorElement) {
    errorElement.textContent = message
    errorElement.classList.add("show")
  }

  field.style.borderColor = "#ff6b6b"
}

function clearError(fieldId) {
  const errorElement = document.getElementById(fieldId + "-error")
  const field = document.getElementById(fieldId)

  if (errorElement) {
    errorElement.classList.remove("show")
  }

  field.style.borderColor = "rgba(212, 175, 55, 0.2)"
}

function clearAllErrors() {
  ;["name", "email", "message"].forEach(clearError)
}

// Real-time validation
document.getElementById("email").addEventListener("blur", function () {
  const email = this.value.trim()
  if (email && !validateEmail(email)) {
    showError("email", "Please enter a valid email address")
  } else {
    clearError("email")
  }
})

document.getElementById("phone").addEventListener("blur", function () {
  const phone = this.value.trim()
  if (!validatePhone(phone)) {
    showError("phone", "Please enter a valid phone number")
  } else {
    clearError("phone")
  }
})

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  clearAllErrors()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name").trim()
  const email = formData.get("email").trim()
  const phone = formData.get("phone").trim()
  const message = formData.get("message").trim()

  let hasErrors = false

  // Validation
  if (!name) {
    showError("name", "Name is required")
    hasErrors = true
  }

  if (!email) {
    showError("email", "Email is required")
    hasErrors = true
  } else if (!validateEmail(email)) {
    showError("email", "Please enter a valid email address")
    hasErrors = true
  }

  if (!validatePhone(phone)) {
    showError("phone", "Please enter a valid phone number")
    hasErrors = true
  }

  if (!message) {
    showError("message", "Message is required")
    hasErrors = true
  }

  if (hasErrors) {
    showFormMessage("Please correct the errors above.", "error")
    return
  }

  // Show loading state
  const submitBtn = contactForm.querySelector(".btn-submit")
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")

  submitBtn.disabled = true
  btnText.style.display = "none"
  btnLoading.style.display = "inline"

  try {
    // Simulate form submission (replace with actual form submission logic)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    showFormMessage("Thank you! Your message has been sent successfully. We'll get back to you soon.", "success")
    contactForm.reset()
  } catch (error) {
    showFormMessage("Sorry, there was an error sending your message. Please try again.", "error")
  } finally {
    // Reset button state
    submitBtn.disabled = false
    btnText.style.display = "inline"
    btnLoading.style.display = "none"

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none"
    }, 5000)
  }
})

function showFormMessage(message, type) {
  formMessage.textContent = message
  formMessage.className = `form-message ${type}`
  formMessage.style.display = "block"

  // Scroll to message for better UX
  formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" })
}

// Intersection Observer for animations with better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
      observer.unobserve(entry.target) // Stop observing once animated
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".service-card, .about-card")

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(element)
  })
})

// Keyboard navigation improvements
document.addEventListener("keydown", (e) => {
  // Escape key closes mobile menu
  if (e.key === "Escape" && navMobile.classList.contains("active")) {
    navMobile.classList.remove("active")
    menuToggle.classList.remove("active")
    menuToggle.setAttribute("aria-expanded", "false")
    document.body.style.overflow = ""
    menuToggle.focus()
  }
})

// Focus management for mobile menu
navMobile.addEventListener("keydown", (e) => {
  const focusableElements = navMobile.querySelectorAll("a")
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (e.key === "Tab") {
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }
})

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0]
      if (perfData.loadEventEnd - perfData.loadEventStart > 3000) {
        console.warn("Page load time is slow. Consider optimizing resources.")
      }
    }, 0)
  })
}

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Error handling for images and resources
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      e.target.style.display = "none"
    }
  },
  true,
)

// Preload critical resources on hover (for better UX)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener(
    "mouseenter",
    () => {
      const targetId = link.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)
      if (targetSection) {
        // Preload any images in the target section
        const images = targetSection.querySelectorAll("img[data-src]")
        images.forEach((img) => {
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute("data-src")
          }
        })
      }
    },
    { once: true },
  )
})

// Analytics tracking (replace with your analytics code)
function trackEvent(eventName, eventData = {}) {
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, eventData)
  }

  // Console log for development
  console.log("Event tracked:", eventName, eventData)
}

// Track form submissions
contactForm.addEventListener("submit", () => {
  trackEvent("form_submit", {
    form_name: "contact_form",
  })
})

// Track navigation clicks
document.querySelectorAll(".nav-link, .nav-link-mobile").forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("navigation_click", {
      section: link.getAttribute("href").substring(1),
    })
  })
})

// Track service card interactions
document.querySelectorAll(".service-card").forEach((card, index) => {
  card.addEventListener("click", () => {
    trackEvent("service_card_click", {
      service_index: index,
      service_name: card.querySelector("h3").textContent,
    })
  })
})

// Lazy loading for better performance (if needed for future images)
function lazyLoad() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoad)

// Debounced resize handler for responsive adjustments
let resizeTimeout
window.addEventListener(
  "resize",
  () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      // Close mobile menu on resize to desktop
      if (window.innerWidth >= 768 && navMobile.classList.contains("active")) {
        navMobile.classList.remove("active")
        menuToggle.classList.remove("active")
        menuToggle.setAttribute("aria-expanded", "false")
        document.body.style.overflow = ""
      }
    }, 250)
  },
  passiveSupported ? { passive: true } : false,
)

// Declare gtag if it's not already defined
var gtag =
  gtag ||
  (() => {
    console.log("gtag function called (analytics not fully initialized)")
  })

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  // Set initial ARIA states
  menuToggle.setAttribute("aria-expanded", "false")

  // Add focus indicators for keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation")
    }
  })

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation")
  })

  console.log("Lubelo Tech Solutions website initialized successfully!")
})
