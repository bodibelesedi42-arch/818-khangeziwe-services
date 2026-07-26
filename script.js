/* ==========================
   AUTO GALLERY SLIDER
   Scoped and guarded so the script is safe on pages without the slider
========================== */

(() => {
  const galleryImage = document.getElementById("gallery-image");
  if (!galleryImage) return; // no slider here

  const galleryImages = [
    "assets/images/gallery1.jpg",
    "assets/images/gallery2.jpg",
    "assets/images/gallery3.jpg",
    "assets/images/gallery4.jpg",
    "assets/images/gallery5.jpg",
  ];

  const dots = document.querySelectorAll(".dot");
  let currentImage = 0;

  function showGalleryImage(index) {
    galleryImage.style.opacity = 0;
    setTimeout(() => {
      galleryImage.src = galleryImages[index];
      galleryImage.style.opacity = 1;
    }, 300);
    if (dots.length) {
      dots.forEach((dot) => dot.classList.remove("active"));
      if (dots[index]) dots[index].classList.add("active");
    }
  }

  const nextSlideBtn = document.getElementById("next-slide");
  const prevSlideBtn = document.getElementById("prev-slide");

  if (nextSlideBtn)
    nextSlideBtn.addEventListener("click", () => {
      currentImage++;
      if (currentImage >= galleryImages.length) currentImage = 0;
      showGalleryImage(currentImage);
    });

  if (prevSlideBtn)
    prevSlideBtn.addEventListener("click", () => {
      currentImage--;
      if (currentImage < 0) currentImage = galleryImages.length - 1;
      showGalleryImage(currentImage);
    });

  if (dots.length) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentImage = index;
        showGalleryImage(currentImage);
      });
    });
  }

  // autoplay
  setInterval(() => {
    currentImage++;
    if (currentImage >= galleryImages.length) currentImage = 0;
    showGalleryImage(currentImage);
  }, 4000);
})();

/* ==========================
   GALLERY LIGHTBOX
   Scoped and guarded (only runs if lightbox and gallery items exist)
========================== */

(() => {
  const galleryItems = document.querySelectorAll(".gallery-grid img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeLightbox = document.querySelector(".close-lightbox");
  if (!lightbox || !lightboxImg || galleryItems.length === 0) return;

  let currentIndex = 0;

  function showLightboxImage(index) {
    lightboxImg.src = galleryItems[index].src;
  }

  galleryItems.forEach((image, index) => {
    image.addEventListener("click", () => {
      currentIndex = index;
      showLightboxImage(currentIndex);
      lightbox.classList.add("active");
    });
  });

  if (closeLightbox)
    closeLightbox.addEventListener("click", () =>
      lightbox.classList.remove("active"),
    );

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active");
  });

  const nextBtn = document.querySelector(".next-lightbox");
  const prevBtn = document.querySelector(".prev-lightbox");

  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      currentIndex++;
      if (currentIndex >= galleryItems.length) currentIndex = 0;
      showLightboxImage(currentIndex);
    });

  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      currentIndex--;
      if (currentIndex < 0) currentIndex = galleryItems.length - 1;
      showLightboxImage(currentIndex);
    });
})();

/* ==============================
   WHATSAPP FLOAT BUTTON BEHAVIOR
   - shows after page load
   - hides on scroll down, shows on scroll up
============================== */

(() => {
  const wa = document.getElementById("whatsappFloat");
  if (!wa) return;

  // show after a short delay
  window.addEventListener("load", () =>
    setTimeout(() => wa.classList.add("show"), 800),
  );

  // hide on scroll down, show on scroll up
  let lastY = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y > lastY && y > 200) {
        wa.classList.remove("show");
      } else {
        wa.classList.add("show");
      }
      lastY = y;
    },
    { passive: true },
  );
})();
/* ==========================
   TESTIMONIAL SLIDER
========================== */

const testimonials = document.querySelectorAll(".testimonial-card");

if (testimonials.length) {
  let currentTestimonial = 0;

  testimonials[currentTestimonial].classList.add("active");

  setInterval(() => {
    testimonials[currentTestimonial].classList.remove("active");

    currentTestimonial++;

    if (currentTestimonial >= testimonials.length) {
      currentTestimonial = 0;
    }

    testimonials[currentTestimonial].classList.add("active");
  }, 5000);
}

window.onload = () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
};

const topBtn = document.getElementById("topBtn");

if (topBtn) {
  const toggleTopButton = () => {
    topBtn.classList.toggle("show", window.scrollY > 400);
  };

  toggleTopButton();
  window.addEventListener("scroll", toggleTopButton, { passive: true });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
/* HAMBURGER */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("menuOverlay");

function closeMenu() {
  hamburger?.classList.remove("active");
  navLinks?.classList.remove("active");
  overlay?.classList.remove("active");
  document.body.classList.remove("menu-open");

  if (hamburger) {
    hamburger.setAttribute("aria-expanded", "false");
  }
}

function openMenu() {
  hamburger?.classList.add("active");
  navLinks?.classList.add("active");
  overlay?.classList.add("active");
  document.body.classList.add("menu-open");

  if (hamburger) {
    hamburger.setAttribute("aria-expanded", "true");
  }
}

hamburger?.addEventListener("click", () => {
  const isOpen = hamburger.classList.contains("active");
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay?.addEventListener("click", closeMenu);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});
/* ==========================
   COUNTERS
========================== */

const counters = document.querySelectorAll(".counter");

const runCounter = () => {
  counters.forEach((counter) => {
    const target = +counter.dataset.target;
    const suffix = counter.dataset.suffix || "";

    let count = 0;

    const update = () => {
      const increment = target / 80;

      if (count < target) {
        count += increment;

        counter.innerText = `${Math.ceil(count)}${suffix}`;

        requestAnimationFrame(update);
      } else {
        counter.innerText = `${target}${suffix}`;
      }
    };

    update();
  });
};

const stats = document.querySelector(".stats-container");

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    runCounter();

    observer.disconnect();
  }
});

observer.observe(stats);
