"use strict";

document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
if (menuToggle && navigation) {
  menuToggle.hidden = false;
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navigation.classList.toggle("is-open", !expanded);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });
  matchMedia("(min-width: 621px)").addEventListener("change", closeMenu);
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const filterBar = document.querySelector("[data-filters]");
const serviceCards = [...document.querySelectorAll("[data-category]")];
const resultStatus = document.querySelector("[data-results]");
if (filterBar && resultStatus) {
  filterBar.hidden = false;
  resultStatus.hidden = false;
  const setFilter = (filter) => {
    filterBar.querySelectorAll("[data-filter]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
    });
    let count = 0;
    serviceCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
      if (!card.hidden) count += 1;
    });
    resultStatus.textContent = `Showing ${count} ${count === 1 ? "service" : "services"}.`;
  };
  filterBar.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest("[data-filter]");
    if (button) setFilter(button.dataset.filter);
  });
  // A deep link must never leave its target hidden by an earlier filter.
  addEventListener("hashchange", () => {
    setFilter("all");
    const target = serviceCards.find((card) => `#${card.id}` === location.hash);
    if (target) target.scrollIntoView();
  });
}

const inquiryForm = document.querySelector("#inquiry-form");
if (inquiryForm instanceof HTMLFormElement) {
  inquiryForm.hidden = false;
  const subjectField = inquiryForm.elements.namedItem("interest");
  const requestedService = new URLSearchParams(location.search).get("service");
  if (subjectField instanceof HTMLSelectElement &&
      [...subjectField.options].some((option) => option.value === requestedService)) {
    subjectField.value = requestedService;
  }
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;
    const data = new FormData(inquiryForm);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const business = String(data.get("business")).trim();
    const interest = String(data.get("interest"));
    const message = String(data.get("message")).trim();
    const subject = `AI consultation: ${interest}`;
    const body = `Hi John,\n\nI'm interested in ${interest}.\n\nName: ${name}\nEmail: ${email}\nBusiness: ${business || "Not provided"}\n\nWhat I'd like help with:\n${message}\n\nLet's discuss the next step.`;
    const draftPanel = document.querySelector("#draft-panel");
    const draftText = document.querySelector("#draft-text");
    const emailButton = document.querySelector("#open-email");
    const draftStatus = document.querySelector("#draft-status");
    if (draftPanel && draftText && emailButton && draftStatus) {
      draftText.textContent = `To: john.dohoney@inland-empire-ai.com\nSubject: ${subject}\n\n${body}`;
      emailButton.setAttribute("href", `mailto:john.dohoney@inland-empire-ai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      draftStatus.textContent = "Draft ready. Nothing has been sent. Open your email app to review and send, or copy the draft.";
      draftPanel.hidden = false;
      draftPanel.focus();
    }
  });
  const copyButton = document.querySelector("#copy-draft");
  if (copyButton && navigator.clipboard && isSecureContext) {
    copyButton.hidden = false;
    copyButton.addEventListener("click", async () => {
      const draftText = document.querySelector("#draft-text");
      const status = document.querySelector("#draft-status");
      if (!draftText || !status) return;
      try {
        await navigator.clipboard.writeText(draftText.textContent);
        status.textContent = "Draft copied. Paste it into your email app and send it to John.";
      } catch (error) {
        console.error("Unable to copy the inquiry draft:", error);
        status.textContent = "Clipboard access was blocked. Select and copy the draft above, or use Open email app.";
      }
    });
  }
}
