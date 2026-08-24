(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || reduce) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add("in"); });
    document.dispatchEvent(new CustomEvent("reveal:all"));
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      document.dispatchEvent(new CustomEvent("reveal:show", { detail: e.target }));
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });

  Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
})();
