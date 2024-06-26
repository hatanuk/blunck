const socket = io();



window.addEventListener("DOMContentLoaded", (event) => {
  init();
});

const init = function () {
  const btn = document.querySelector(".btn");
  const counter = document.querySelector(".counter");
  let localCount = 0;

  btn.addEventListener("click", function () {
    localCount++;
    // updates counter locally
    counter.textContent = `Respects given: ${localCount}`;
    // updates the global counter
    socket.emit("increment");
  });

  socket.on('sync counter', (globalCount) => {
    // syncs local counter to global counter
    localCount = globalCount
    counter.textContent = `Respects given: ${localCount}`;
  })

};
