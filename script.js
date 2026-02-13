const yearNode = document.getElementById("year");
if (yearNode) yearNode.textContent = new Date().getFullYear();

const revealNodes = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealNodes.forEach((node, i) => {
  node.style.transitionDelay = `${Math.min(i * 80, 320)}ms`;
  observer.observe(node);
});

const navLinks = Array.from(document.querySelectorAll(".nav a"));
const sectionTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActive = () => {
  let activeId = "";
  sectionTargets.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top <= 120) activeId = section.id;
  });
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
  });
};

window.addEventListener("scroll", setActive, { passive: true });
window.addEventListener("load", setActive);

const floatingCta = document.querySelector(".floating-cta");
const contactSection = document.querySelector("#contact");

const updateFloatingCta = () => {
  if (!floatingCta || !contactSection) return;
  const contactTop = contactSection.getBoundingClientRect().top;
  const shouldHide = contactTop < window.innerHeight - 120;
  floatingCta.style.opacity = shouldHide ? "0" : "1";
  floatingCta.style.pointerEvents = shouldHide ? "none" : "auto";
};

window.addEventListener("scroll", updateFloatingCta, { passive: true });
window.addEventListener("resize", updateFloatingCta);
window.addEventListener("load", updateFloatingCta);
