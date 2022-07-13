let time = 10;

function randomNum(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function createGhost() {
  let enemyTop = 0;
  const ghostElement = document.createElement("div");

  ghostElement.style.position = "absolute";
  ghostElement.style.top = "0px";
  let randomLeft = randomNum(0, BG_WIDTH - GHOST_WIDTH);
  ghostElement.style.left = randomLeft + "px";

  ghostElement.style.width = GHOST_WIDTH + "px";
  ghostElement.style.height = GHOST_HEIGHT + "px";
  ghostElement.style.background = "url('./images/ghost.png')";

  bg.append(ghostElement);

  window.requestAnimationFrame(function () {
    move(enemyTop, ghostElement);
  });

  // setInterval(function () {
  //   const ghostTop = Number(ghostElement.style.top.split("px")[0]) + 10;

  //   if (ghostTop > BG_HEIGHT - HERO_HEIGHT) {
  //     ghostElement.remove();
  //     return;
  //   }
  //   ghostElement.style.top = ghostTop + "px";
  // }, 100);
}

function move(top, el) {
  top++;

  if (time < 0) {
    el.remove();
  }

  if (top > BG_HEIGHT - (HERO_HEIGHT + GHOST_HEIGHT)) {
    const ghostLeft = Number(el.style.left.split("px")[0]);
    const heroLeft = Number(heroElement.style.left.split("px")[0]);

    if (
      heroLeft < ghostLeft + GHOST_WIDTH &&
      ghostLeft < heroLeft + HERO_WIDTH
    ) {
      // ghost가 hero top지점과 만날때 hero기준으로 양쪽 확인
      // console.log("heroLeft", heroLeft);
      // console.log("ghostLeft", ghostLeft);
      die(el);
      return;
    }
    if (top > BG_HEIGHT - GHOST_HEIGHT) {
      remove(el);
    }
  }
  el.style.top = top + "px";

  window.requestAnimationFrame(function () {
    move(top, el);
  });
}

function remove(ghostElement) {
  ghostElement.remove();
}

function die(ghostElement) {
  ghostElement.style.backgroundPosition = "-45px";

  const soundEffect = new Audio("./audio/dying.wav");
  soundEffect.play();
  setTimeout(() => {
    ghostElement.remove();
  }, 1000);
}

let startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  let interval = setInterval(() => {
    createGhost();
  }, 3000);
  setInterval(() => {
    if (time >= 0) {
      const timer = document.getElementById("timer");
      const minutes = Math.floor(time / 60);
      const seconds = String(time % 60).padStart(2, "0");

      timer.innerText = minutes + ":" + seconds;
      time -= 1;
      console.log(time);
    } else if (time < 0) {
      document.getElementById("timer").innerText = "GAME OVER";
      clearInterval(interval);
    }
  }, 1000);
});
