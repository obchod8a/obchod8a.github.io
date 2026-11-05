(function () {
  const floorDefault = {
    park: "park",
    5: "mackafe",
    4: "potraviny",
    3: "oblecenie",
    2: "fitko",
    1: "bar",
    0: "toitoi",
  };

  const bands = Array.from(document.querySelectorAll(".band[data-floor]"));
  const tabs = Array.from(document.querySelectorAll(".cell[data-room]"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  if (!tabs.length) return;

  function showRoom(id) {
    const active = tabs.find((tab) => tab.dataset.room === id);
    const floor = active ? active.dataset.floor : null;

    tabs.forEach((tab) => {
      const on = tab.dataset.room === id;
      const sameFloor = floor != null && tab.dataset.floor === floor;
      tab.classList.toggle("is-on", on);
      tab.classList.toggle("floor-on", !on && sameFloor);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });

    bands.forEach((band) => {
      band.classList.toggle("is-on", floor != null && band.dataset.floor === floor);
    });

    panels.forEach((panel) => {
      const on = panel.id === `panel-${id}`;
      panel.classList.toggle("is-on", on);
      panel.hidden = !on;
    });
  }

  function showFloor(floor) {
    const room = floorDefault[floor];
    if (room) showRoom(room);
  }

  bands.forEach((band) => {
    band.addEventListener("click", () => showFloor(band.dataset.floor));
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showRoom(tab.dataset.room));

    tab.addEventListener("keydown", (event) => {
      let next = null;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        next = tabs[(index + 1) % tabs.length];
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        next = tabs[(index - 1 + tabs.length) % tabs.length];
      } else if (event.key === "Home") {
        next = tabs[0];
      } else if (event.key === "End") {
        next = tabs[tabs.length - 1];
      }
      if (!next) return;
      event.preventDefault();
      next.focus();
      showRoom(next.dataset.room);
    });
  });

  showRoom("oblecenie");
})();
