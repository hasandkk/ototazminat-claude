/* Teminat Group - shared scripts */
(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    const openBtn = document.querySelector("[data-menu-open]");
    const overlay = document.querySelector("[data-menu-overlay]");
    if (!openBtn || !overlay) return;
    const closeEls = overlay.querySelectorAll("[data-menu-close]");
    const panel = overlay.querySelector("[data-menu-panel]");

    function open() {
      overlay.classList.remove("invisible", "opacity-0", "pointer-events-none");
      if (panel) panel.classList.remove("-translate-x-full");
    }
    function close() {
      overlay.classList.add("opacity-0");
      if (panel) panel.classList.add("-translate-x-full");
      setTimeout(() => overlay.classList.add("invisible", "pointer-events-none"), 250);
    }
    openBtn.addEventListener("click", open);
    closeEls.forEach((el) => el.addEventListener("click", close));
    overlay.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    document.querySelectorAll(".faq-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const panel = btn.nextElementSibling;
        const icon = btn.querySelector("svg");
        const isOpen = panel.style.maxHeight && panel.style.maxHeight !== "0px";
        document.querySelectorAll(".faq-toggle").forEach((other) => {
          if (other !== btn) {
            other.nextElementSibling.style.maxHeight = "0px";
            const oi = other.querySelector("svg");
            if (oi) oi.style.transform = "";
          }
        });
        if (isOpen) {
          panel.style.maxHeight = "0px";
          if (icon) icon.style.transform = "";
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          if (icon) icon.style.transform = "rotate(180deg)";
        }
      });
    });
  }

  /* ---------- Car data ---------- */
  const CAR_DATA = {
    Audi: ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
    BMW: ["1 Serisi", "2 Serisi", "3 Serisi", "4 Serisi", "5 Serisi", "X1", "X3", "X5"],
    Citroen: ["C3", "C4", "C-Elysee", "Berlingo"],
    Dacia: ["Sandero", "Duster", "Logan", "Jogger"],
    Fiat: ["Egea", "Egea Cross", "Panda", "500", "Doblo"],
    Ford: ["Fiesta", "Focus", "Kuga", "Puma", "Transit"],
    Honda: ["Civic", "City", "CR-V", "Jazz", "HR-V"],
    Hyundai: ["i10", "i20", "Bayon", "Tucson", "Kona"],
    Kia: ["Picanto", "Rio", "Ceed", "Sportage", "Stonic"],
    "Mercedes-Benz": ["A Serisi", "C Serisi", "E Serisi", "GLA", "GLC", "Vito"],
    Nissan: ["Micra", "Juke", "Qashqai", "X-Trail"],
    Opel: ["Corsa", "Astra", "Grandland", "Crossland", "Mokka"],
    Peugeot: ["208", "301", "308", "2008", "3008", "5008"],
    Renault: ["Clio", "Megane", "Taliant", "Captur", "Austral"],
    Seat: ["Ibiza", "Leon", "Arona", "Ateca"],
    Skoda: ["Fabia", "Octavia", "Scala", "Kamiq", "Karoq"],
    Tesla: ["Model 3", "Model Y", "Model S", "Model X"],
    TOGG: ["T10X", "T10F"],
    Toyota: ["Corolla", "Yaris", "C-HR", "RAV4", "Corolla Cross"],
    Volkswagen: ["Polo", "Golf", "Passat", "T-Roc", "Tiguan", "Taigo"],
    Volvo: ["XC40", "XC60", "S60", "V60"],
  };

  function fillSelect(sel, items, placeholder) {
    if (!sel) return;
    sel.innerHTML = "";
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = placeholder;
    sel.appendChild(opt);
    items.forEach((it) => {
      const o = document.createElement("option");
      o.value = it;
      o.textContent = it;
      sel.appendChild(o);
    });
  }

  function fillYears(sel) {
    if (!sel) return;
    const now = new Date().getFullYear();
    const years = [];
    for (let y = now + 1; y >= 2000; y--) years.push(String(y));
    fillSelect(sel, years, "Yıl seçin");
  }

  function fillBrands(sel) {
    fillSelect(sel, Object.keys(CAR_DATA), "Marka seçin");
  }

  /* ---------- Hero quick form ---------- */
  function initHeroForm() {
    const form = document.querySelector("[data-hero-form]");
    if (!form) return;
    const year = form.querySelector("[data-f-year]");
    const brand = form.querySelector("[data-f-brand]");
    const model = form.querySelector("[data-f-model]");
    const notFound = form.querySelector("[data-f-notfound]");

    fillYears(year);
    fillBrands(brand);

    brand.addEventListener("change", () => {
      if (brand.value && CAR_DATA[brand.value]) {
        fillSelect(model, CAR_DATA[brand.value], "Model seçin");
        model.disabled = false;
      } else {
        fillSelect(model, [], "Model seçin");
        model.disabled = true;
      }
    });

    if (notFound) {
      notFound.addEventListener("change", () => {
        const dis = notFound.checked;
        [year, brand, model].forEach((el) => {
          el.disabled = dis || (el === model && !brand.value);
        });
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (year.value) params.set("yil", year.value);
      if (brand.value) params.set("marka", brand.value);
      if (model.value) params.set("model", model.value);
      if (notFound && notFound.checked) params.set("notfound", "1");
      window.location.href = "deger-kaybi-hesaplayici.html?" + params.toString();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initFaq();
    initHeroForm();
  });

  window.TEMINAT = { CAR_DATA, fillSelect, fillYears, fillBrands };
})();
