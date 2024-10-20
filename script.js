document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const header = document.querySelector("header");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (id === "top") {
          navLinks.forEach((link) => link.classList.remove("active"));
        } else {
          navLinks.forEach((link) => {
            if (link.getAttribute("href").substring(1) === id) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      }
    });
  }, observerOptions);

  // 觀察每個 section
  sections.forEach((section) => {
    observer.observe(section);
  });

  // 觀察 header
  observer.observe(header);

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1); // 去掉 "#" 符號
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
