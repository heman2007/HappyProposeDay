var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];
var planets = [];


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < stars; i++) {
  var x = Math.random() * canvas.offsetWidth;
  var y = Math.random() * canvas.offsetHeight;
  var radius = Math.random() * 1.2;
  var hue = colorrange[getRandom(0, colorrange.length - 1)];
  var sat = getRandom(50, 100);
  var opacity = Math.random(); // Initialize with random opacity
  starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(
  0,
  0,
  window.innerWidth,
  window.innerHeight
);

function drawStars() {
  for (var i = 0; i < stars; i++) {
    var star = starArray[i];

    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, 360);
    context.fillStyle =
      "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
    context.fill();
  }
}

function createPlanets() {
  const count = 5;

  for (let i = 0; i < count; i++) {
    planets.push({
      orbit: 120 + i * 60,      // distance from center
      size: 6 + Math.random() * 6,
      speed: 0.005 + Math.random() * 0.01,
      angle: Math.random() * Math.PI * 2,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    });
  }
}

createPlanets();
function drawPlanets() {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  planets.forEach(p => {
    p.angle += p.speed;

    const x = cx + Math.cos(p.angle) * p.orbit;
    const y = cy + Math.sin(p.angle) * p.orbit;

    // orbit ring (optional aesthetic)
    context.beginPath();
    context.arc(cx, cy, p.orbit, 0, Math.PI * 2);
    context.strokeStyle = "rgba(255,255,255,0.05)";
    context.stroke();

    // planet
    context.beginPath();
    context.arc(x, y, p.size, 0, Math.PI * 2);
    context.fillStyle = p.color;
    context.fill();
  });
}


function updateStars() {
  for (var i = 0; i < stars; i++) {
    if (Math.random() > 0.99) {
      starArray[i].opacity = Math.random();
    }
  }
}

const yesBtn = document.getElementById("yesButton");
const noBtn = document.getElementById("noButton");
const music = document.getElementById("bgMusic");
const popup = document.getElementById("celebrationPopup");


// play music on first interaction
document.addEventListener("click", () => {
  music.play();
}, { once: true });


// YES click
yesBtn.addEventListener("click", () => {
  yesBtn.textContent = "Yayyy ❤️";

  popup.style.display = "flex";

  startConfetti();
});


// NO runs away
noBtn.addEventListener("mouseenter", () => {
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;

  const randX = Math.random() * maxX;
  const randY = Math.random() * maxY;

  noBtn.style.left = randX + "px";
  noBtn.style.top = randY + "px";
});


function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * (fontSize + lineHeight));
  });
}

function drawText() {
  var fontSize = Math.min(30, window.innerWidth / 25); // Adjust font size based on screen width
  var lineHeight = 8;

  context.font = fontSize + "px Comic Sans MS";
  context.textAlign = "center";

  if (frameNumber < 200) {
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    context.fillText(
      "everyday day I cannot believe how lucky I am",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity = opacity + 0.01;
  }
  //fades out the text by decreasing the opacity
  if (frameNumber >= 200 && frameNumber < 400) {
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    context.fillText(
      "everyday day I cannot believe how lucky I am",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity = opacity - 0.01;
  }

  //needs this if statement to reset the opacity before next statement on canvas
  if (frameNumber == 400) {
    opacity = 0;
  }
  if (frameNumber > 400 && frameNumber < 600) {
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(
        ["amongst trillions and trillions of stars,", "over billions of years"],
        canvas.width / 2,
        canvas.height / 2,
        fontSize,
        lineHeight
      );
    } else {
      context.fillText(
        "amongst trillions and trillions of stars, over billions of years",
        canvas.width / 2,
        canvas.height / 2
      );
    }

    opacity = opacity + 0.01;
  }
  if (frameNumber >= 600 && frameNumber < 800) {
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(
        ["amongst trillions and trillions of stars,", "over billions of years"],
        canvas.width / 2,
        canvas.height / 2,
        fontSize,
        lineHeight
      );
    } else {
      context.fillText(
        "amongst trillions and trillions of stars, over billions of years",
        canvas.width / 2,
        canvas.height / 2
      );
    }

    opacity = opacity - 0.01;
  }

  if (frameNumber == 800) {
    opacity = 0;
  }
  if (frameNumber > 800 && frameNumber < 1000) {
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    context.fillText(
      "to be alive together, and to get to spend this life with you",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity = opacity + 0.01;
  }
  if (frameNumber >= 1000 && frameNumber < 1200) {
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    context.fillText(
      "to be alive together, and to get to spend this life with you",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity = opacity - 0.01;
  }

  if (frameNumber == 1200) {
    opacity = 0;
  }
  if (frameNumber > 1200 && frameNumber < 1400) {
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    context.fillText(
      "is so incredibly, unfathomably unlikely",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity = opacity + 0.01;
  }
  if (frameNumber >= 1400 && frameNumber < 1600) {
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    context.fillText(
      "is so incredibly, unfathomably unlikely",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity = opacity - 0.01;
  }

  if (frameNumber == 1600) {
    opacity = 0;
  }
  if (frameNumber > 1600 && frameNumber < 1800) {
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(
        [
          "and yet here we are, to get the impossible",
          "chance to get to know each other",
        ],
        canvas.width / 2,
        canvas.height / 2,
        fontSize,
        lineHeight
      );
    } else {
      context.fillText(
        "and yet here we are, to get the impossible chance to get to know each other",
        canvas.width / 2,
        canvas.height / 2
      );
    }

    opacity = opacity + 0.01;
  }
  if (frameNumber >= 1800 && frameNumber < 2000) {
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(
        [
          "and yet here we are, to get the impossible",
          "chance to get to know each other",
        ],
        canvas.width / 2,
        canvas.height / 2,
        fontSize,
        lineHeight
      );
    } else {
      context.fillText(
        "and yet here we are, to get the impossible chance to get to know each other",
        canvas.width / 2,
        canvas.height / 2
      );
    }

    opacity = opacity - 0.01;
  }

  if (frameNumber == 2000) {
    opacity = 0;
  }
  if (frameNumber > 2000 && frameNumber < 99999) {
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(
        [
          "I am so much grateful for you. You are my home.",
          "I love you so much...",
        ],
        canvas.width / 2,
        canvas.height / 2,
        fontSize,
        lineHeight
      );
    } else {
      context.fillText(
        "I am so much grateful for you. You are my home. I love you so much...",
        canvas.width / 2,
        canvas.height / 2
      );
    }

    opacity = opacity + 0.01;
  }

  if (frameNumber >= 2200 && frameNumber < 99999) {
    context.fillStyle = `rgba(255, 255, 255, ${secondOpacity})`;

    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(
        [
          "and I can't wait to spend all the time in",
          "the world to share that love with you!",
        ],
        canvas.width / 2,
        canvas.height / 2 + 70,
        fontSize,
        lineHeight
      );
    } else {
      context.fillText(
        "and I can't wait to spend all the time in the world to share that love with you!",
        canvas.width / 2,
        canvas.height / 2 + 50
      );
    }

    secondOpacity = secondOpacity + 0.01;
  }

  if (frameNumber >= 2400 && frameNumber < 99999) {
    context.fillStyle = `rgba(255, 255, 255, ${thirdOpacity})`;
   context.fillText("Will you be mine forever, my love?", canvas.width/2, canvas.height/1.5);


    thirdOpacity = thirdOpacity + 0.01;

    yesBtn.style.display = "block";
noBtn.style.display = "block";

  }
}

function draw() {
  context.putImageData(baseFrame, 0, 0);

  drawStars();
  updateStars();
  drawPlanets();   // ⭐ add here
  drawText();

  if (frameNumber < 99999) {
    frameNumber++;
  }
  window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);

function startConfetti() {
  const confettiCount = 150;

  for (let i = 0; i < confettiCount; i++) {
    const conf = document.createElement("div");

    conf.style.position = "fixed";
    conf.style.width = "8px";
    conf.style.height = "8px";
    conf.style.background = `hsl(${Math.random() * 360},100%,50%)`;
    conf.style.top = "-10px";
    conf.style.left = Math.random() * 100 + "vw";
    conf.style.opacity = Math.random();
    conf.style.borderRadius = "50%";
    conf.style.zIndex = 10000;

    document.body.appendChild(conf);

    const fall = conf.animate(
      [
        { transform: "translateY(0) rotate(0deg)" },
        {
          transform: `translateY(110vh rotate(${Math.random() * 720}deg))`,
        },
      ],
      {
        duration: 3000 + Math.random() * 2000,
        easing: "ease-out",
      }
    );

    fall.onfinish = () => conf.remove();
  }
}
