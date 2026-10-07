/* ==========================================================================
   Mi Wallet Limited — shared site behaviour
   Load order on every page: bootstrap.bundle.min.js, config.js, site.js
   ========================================================================== */
(function () {
  "use strict";

  var CONFIG = window.SITE_CONFIG || {};

  function lookup(path) {
    return String(path).split(".").reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, CONFIG);
  }

  function format(value, kind) {
    if (kind === "mwk" && typeof value === "number") {
      return "MWK " + value.toLocaleString("en-US");
    }
    return value;
  }

  function toHref(value, scheme) {
    var v = String(value);
    if (scheme === "mailto") return "mailto:" + v;
    if (scheme === "tel") return "tel:" + v.replace(/[^\d+]/g, "");
    if (scheme === "wa") return "https://wa.me/" + v.replace(/\D/g, "");
    return v;
  }

  // Fill text from config
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var value = lookup(el.getAttribute("data-cfg"));
    if (value !== undefined && value !== null) {
      el.textContent = format(value, el.getAttribute("data-cfg-format"));
    }
  });

  // Fill links from config
  document.querySelectorAll("[data-cfg-href]").forEach(function (el) {
    var value = lookup(el.getAttribute("data-cfg-href"));
    if (value !== undefined && value !== null && value !== "") {
      el.setAttribute("href", toHref(value, el.getAttribute("data-cfg-scheme")));
    }
  });

  // Hide blocks whose config value is empty (e.g. an unset payment number)
  document.querySelectorAll("[data-cfg-show-if]").forEach(function (el) {
    var value = lookup(el.getAttribute("data-cfg-show-if"));
    el.hidden = !value;
  });

  // Current year in the footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mark the current page in the navigation
  var page = document.body.getAttribute("data-page");
  if (page) {
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      var pages = link.getAttribute("data-nav").split(" ");
      if (pages.indexOf(page) !== -1) {
        link.classList.add("active");
        if (!link.classList.contains("dropdown-toggle")) {
          link.setAttribute("aria-current", "page");
        }
      }
    });
  }

  // Navigation: add a shadow once the page is scrolled
  var nav = document.querySelector(".site-nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Contact form: opens the visitor's email app with the message filled in
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var name = form.elements["name"].value.trim();
      var email = form.elements["email"].value.trim();
      var phone = form.elements["phone"].value.trim();
      var topic = form.elements["topic"].value;
      var message = form.elements["message"].value.trim();

      var body = message + "\n\n" + name + "\n" + email + (phone ? "\n" + phone : "");
      var to = lookup("email.info");
      window.location.href = "mailto:" + to +
        "?subject=" + encodeURIComponent(topic + " — enquiry from " + name) +
        "&body=" + encodeURIComponent(body);

      var note = document.getElementById("contact-form-note");
      if (note) {
        note.textContent = "Your email app should now open with your message ready to send. If it does not, write to " + to + ".";
      }
    });
  }
})();
