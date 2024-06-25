window.addEventListener("DOMContentLoaded", (event) => {
  init();
});

const init = function () {
  const btn = document.querySelector(".btn");
  const counter = document.querySelector(".counter");
  let count = 0;

  btn.addEventListener("click", function () {
    count++;
  });

  setInterval(function () {
    counter.textContent = `Respects given: ${count}`;
  }, 5000);
};
