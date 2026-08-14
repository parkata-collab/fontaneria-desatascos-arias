(() => {
  const nav = document.querySelector(".site-nav");
  const menuButton = document.querySelector(".menu-toggle");
  const progress = document.querySelector(".scroll-progress");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: motionQuery.matches ? "auto" : "smooth",
      block: "start",
    });
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("is-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  document.querySelectorAll(".nav-links a, .brand").forEach((link) => {
    link.addEventListener("click", () => {
      nav?.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
      menuButton?.setAttribute("aria-label", "Abrir menú");
    });
  });

  document.querySelector(".text-link")?.addEventListener("click", () => scrollToSection("servicios"));

  const updateScroll = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = `${percentage}%`;
    document.documentElement.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.12, 120)}px`);
  };
  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });

  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  } else {
    items.forEach((item) => item.classList.add("is-visible"));
  }

  document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const location = String(form.get("location") || "");
    const type = String(form.get("type") || "Consulta general");
    const detail = String(form.get("detail") || "");
    const subject = encodeURIComponent(`Consulta web · ${type}`);
    const body = encodeURIComponent(`Nombre: ${name}\nMunicipio: ${location}\nTipo de problema: ${type}\n\nDetalle:\n${detail}`);
    const feedback = document.createElement("p");
    feedback.className = "form-feedback";
    feedback.setAttribute("role", "status");
    feedback.textContent = "Hemos preparado el mensaje en tu aplicación de correo.";
    event.currentTarget.querySelector(".form-feedback")?.remove();
    event.currentTarget.querySelector(".form-submit")?.insertAdjacentElement("afterend", feedback);
    window.location.href = `mailto:fugasdavid@hotmail.com?subject=${subject}&body=${body}`;
  });
})();
