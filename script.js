/* ==========================================================================
   HENDRA AGUS LORIKO — PORTFOLIO SCRIPT (Vanilla JS)
   Daftar isi:
   1. Data (projects, creative works) — tambah item baru di sini
   2. Loader
   3. Theme toggle (dark/light + localStorage)
   4. Navbar (scroll state, mobile burger, active link)
   5. Scroll reveal (IntersectionObserver)
   6. Render project cards
   7. Render + filter creative gallery
   8. Back to top
   9. Hero particle canvas (ringan)
   ========================================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     1. DATA — tambahkan proyek atau karya kreatif baru dengan menambah
        objek baru ke array berikut. Setiap item akan otomatis dirender.
  --------------------------------------------------------------------- */

  // Untuk menambah proyek baru, salin salah satu objek dan sesuaikan isinya.
  // image: null -> menampilkan placeholder ikon. Isi dengan path gambar
  // (mis. "assets/img/projects/attendance.jpg") jika sudah tersedia.
  var projects = [
    {
      number: "01",
      title: "Web-Based Employee Attendance System",
      org: "PTPN IV Regional VII Unit Bekri",
      description:
        "Sistem presensi karyawan berbasis web yang dikembangkan selama kegiatan Praktik Kerja Lapangan. Presensi memanfaatkan geolocation dan formula Haversine untuk memvalidasi lokasi check-in/check-out karyawan secara akurat.",
      tech: ["Laravel", "PHP", "MySQL", "Geolocation", "Haversine"],
      image: null,
      icon: "fa-solid fa-map-location-dot",
      codeUrl: "https://github.com/ikohunter"
    }
    // Tambahkan proyek berikutnya di sini, contoh:
    // {
    //   number: "02",
    //   title: "Nama Proyek",
    //   org: "Instansi / Klien",
    //   description: "Deskripsi singkat proyek.",
    //   tech: ["Tech1", "Tech2"],
    //   image: "assets/img/projects/nama-file.jpg",
    //   icon: "fa-solid fa-diagram-project",
    //   codeUrl: "https://github.com/ikohunter"
    // }
  ];

  // Karya kreatif. category harus salah satu: "photography", "videography", "design".
  // image: null -> placeholder. Ganti dengan path file di assets/img/creative/.
  var creativeWorks = [
    { title: "Dokumentasi Acara Kampus", category: "photography", image: null, size: "wide" },
    { title: "Potret & Human Interest", category: "photography", image: null, size: "tall" },
    { title: "Behind The Scenes Produksi", category: "videography", image: null, size: "normal" },
    { title: "Company Profile Video", category: "videography", image: null, size: "wide" },
    { title: "Poster Kompetisi Nasional", category: "design", image: null, size: "normal" },
    { title: "Identitas Visual Organisasi", category: "design", image: null, size: "normal" },
    { title: "Feed Konten Media Sosial", category: "design", image: null, size: "tall" },
    { title: "Liputan Kegiatan Lapangan", category: "photography", image: null, size: "normal" }
  ];

  var categoryIcons = {
    photography: "fa-solid fa-camera",
    videography: "fa-solid fa-video",
    design: "fa-solid fa-pen-nib"
  };
  var categoryLabels = {
    photography: "Photography",
    videography: "Videography",
    design: "Design"
  };

  /* ---------------------------------------------------------------------
     2. LOADER
  --------------------------------------------------------------------- */
  function initLoader() {
    var loader = document.getElementById("loader");
    if (!loader) return;
    var delay = prefersReducedMotion ? 0 : 1200;
    window.setTimeout(function () {
      loader.classList.add("is-hidden");
    }, delay);
  }

  /* ---------------------------------------------------------------------
     3. THEME TOGGLE
  --------------------------------------------------------------------- */
  function initTheme() {
    var body = document.body;
    var toggle = document.getElementById("themeToggle");
    var stored = null;
    try {
      stored = localStorage.getItem("hal-theme");
    } catch (e) {
      /* localStorage tidak tersedia, lanjut dengan default */
    }

    var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    var initial = stored || (prefersLight ? "light" : "dark");
    body.setAttribute("data-theme", initial);
    if (toggle) toggle.setAttribute("aria-pressed", initial === "light" ? "true" : "false");

    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var current = body.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      body.setAttribute("data-theme", next);
      toggle.setAttribute("aria-pressed", next === "light" ? "true" : "false");
      try {
        localStorage.setItem("hal-theme", next);
      } catch (e) {
        /* abaikan jika penyimpanan tidak diizinkan */
      }
    });
  }

  /* ---------------------------------------------------------------------
     4. NAVBAR
  --------------------------------------------------------------------- */
  function initNav() {
    var nav = document.getElementById("nav");
    var burger = document.getElementById("navBurger");
    var links = document.getElementById("navLinks");
    var navAnchors = links ? links.querySelectorAll(".nav__link") : [];

    function onScroll() {
      if (window.scrollY > 24) {
        nav.classList.add("is-scrolled");
      } else {
        nav.classList.remove("is-scrolled");
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (burger && links) {
      burger.addEventListener("click", function () {
        var isOpen = links.classList.toggle("is-open");
        burger.classList.toggle("is-open", isOpen);
        burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
        document.body.style.overflow = isOpen ? "hidden" : "";
      });

      navAnchors.forEach(function (a) {
        a.addEventListener("click", function () {
          links.classList.remove("is-open");
          burger.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }

    // Active link on scroll
    var sections = [];
    navAnchors.forEach(function (a) {
      var id = a.getAttribute("href");
      var target = id ? document.querySelector(id) : null;
      if (target) sections.push({ link: a, target: target });
    });

    function onScrollSpy() {
      var scrollPos = window.scrollY + 140;
      var current = null;
      sections.forEach(function (s) {
        if (s.target.offsetTop <= scrollPos) current = s;
      });
      sections.forEach(function (s) {
        s.link.classList.toggle("is-active", s === current);
      });
    }
    onScrollSpy();
    window.addEventListener("scroll", onScrollSpy, { passive: true });
  }

  /* ---------------------------------------------------------------------
     5. SCROLL REVEAL
  --------------------------------------------------------------------- */
  function initReveal() {
    var targets = document.querySelectorAll(
      "[data-reveal], .exp-card, .achieve-card, .pillar-card, .edu-card, .skill-group, .timeline__row, .project-card"
    );

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            window.setTimeout(function () {
              el.classList.add("is-visible");
            }, (i % 6) * 70);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Gallery items masuk belakangan (dirender via JS), diamati terpisah
  function observeGalleryItems() {
    var items = document.querySelectorAll(".gallery-item");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            window.setTimeout(function () {
              el.classList.add("is-visible");
            }, (i % 8) * 60);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     6. RENDER PROJECT CARDS
  --------------------------------------------------------------------- */
  function renderProjects() {
    var list = document.getElementById("projectList");
    if (!list) return;

    var html = projects
      .map(function (p) {
        var media = p.image
          ? '<img src="' + p.image + '" alt="Tangkapan layar ' + escapeHtml(p.title) + '" loading="lazy">'
          : '<i class="' + p.icon + ' project-card__placeholder-icon" aria-hidden="true"></i>';

        var badges = p.tech
          .map(function (t) {
            return "<span>" + escapeHtml(t) + "</span>";
          })
          .join("");

        return (
          '<article class="project-card">' +
          '<div class="project-card__media">' +
          '<span class="project-card__number">' + escapeHtml(p.number) + "</span>" +
          media +
          "</div>" +
          '<div class="project-card__body">' +
          '<h3 class="project-card__title">' + escapeHtml(p.title) + "</h3>" +
          '<p class="project-card__org">' + escapeHtml(p.org) + "</p>" +
          '<p class="project-card__desc">' + escapeHtml(p.description) + "</p>" +
          '<div class="project-card__badges">' + badges + "</div>" +
          '<div class="project-card__actions">' +
          '<a class="btn btn--ghost" href="' + p.codeUrl + '" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github" aria-hidden="true"></i> GitHub</a>' +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    list.innerHTML = html;
  }

  /* ---------------------------------------------------------------------
     7. RENDER + FILTER GALLERY
  --------------------------------------------------------------------- */
  function renderGallery() {
    var grid = document.getElementById("galleryGrid");
    if (!grid) return;

    var html = creativeWorks
      .map(function (item) {
        var sizeClass =
          item.size === "wide" ? " gallery-item--wide" : item.size === "tall" ? " gallery-item--tall" : "";
        var media = item.image
          ? '<img src="' + item.image + '" alt="' + escapeHtml(item.title) + '" loading="lazy">'
          : '<div class="gallery-item__placeholder"><i class="' +
            categoryIcons[item.category] +
            '" aria-hidden="true"></i><span>' +
            escapeHtml(item.title) +
            "</span></div>";

        return (
          '<figure class="gallery-item' +
          sizeClass +
          '" data-category="' +
          item.category +
          '">' +
          media +
          '<span class="gallery-item__cat">' +
          categoryLabels[item.category] +
          "</span>" +
          "</figure>"
        );
      })
      .join("");

    grid.innerHTML = html;
    observeGalleryItems();
  }

  function initGalleryFilter() {
    var buttons = document.querySelectorAll(".filter-btn");
    var grid = document.getElementById("galleryGrid");
    if (!buttons.length || !grid) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");

        var filter = btn.getAttribute("data-filter");
        var items = grid.querySelectorAll(".gallery-item");
        items.forEach(function (item) {
          var match = filter === "all" || item.getAttribute("data-category") === filter;
          item.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     8. BACK TO TOP
  --------------------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;

    function onScroll() {
      btn.classList.toggle("is-visible", window.scrollY > 480);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------------------------------------------------------------
     9. HERO PARTICLE CANVAS (ringan — hanya titik mengambang halus)
  --------------------------------------------------------------------- */
  function initParticles() {
    var canvas = document.getElementById("particleCanvas");
    if (!canvas || prefersReducedMotion) return;

    var ctx = canvas.getContext("2d");
    var width, height, particles;
    var particleCount = window.innerWidth < 768 ? 22 : 42;

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    }

    function createParticles() {
      particles = [];
      for (var i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.6 + 0.6,
          vy: Math.random() * 0.25 + 0.05,
          vx: (Math.random() - 0.5) * 0.15,
          o: Math.random() * 0.4 + 0.15
        });
      }
    }

    var accentColor = getComputedStyle(document.body).getPropertyValue("--accent").trim() || "#e3b873";

    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(function (p) {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = p.o;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener(
      "resize",
      debounce(function () {
        resize();
        createParticles();
      }, 200)
    );
  }

  /* ---------------------------------------------------------------------
     HELPERS
  --------------------------------------------------------------------- */
  function debounce(fn, wait) {
    var t;
    return function () {
      var args = arguments;
      clearTimeout(t);
      t = setTimeout(function () {
        fn.apply(null, args);
      }, wait);
    };
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------------------------------------------------------------------
     INIT
  --------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initLoader();
    initTheme();
    initNav();
    renderProjects();
    renderGallery();
    initGalleryFilter();
    initReveal();
    initBackToTop();
    initParticles();
  });
})();
