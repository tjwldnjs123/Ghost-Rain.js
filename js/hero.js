document.addEventListener("keydown", function (e) {
  const heroElement = document.getElementById("hero");
  const bg = document.getElementById("bg");

  // heroElement.style.left 값은 직접적으로 가지고올수 없음 css 에서 가져와야됨
  // console.log(getComputedStyle(heroElement).left);

  const heroLeft = Number(getComputedStyle(heroElement).left.split("px")[0]);
  // console.log(heroLeft);
  if (e.keyCode === 37 && heroLeft >= 0) {
    heroElement.style.left = heroLeft - 10 + "px";
    heroElement.className = "left";
  } else if (e.keyCode === 39 && heroLeft <= BG_WIDTH - HERO_WIDTH) {
    heroElement.style.left = heroLeft + 10 + "px";
    heroElement.className = "right";
  }
});

document.addEventListener("keyup", function () {
  heroElement.className = "stop";
});
