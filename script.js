const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');

const traits = {
  background: ['background1.png', 'background2.png', 'background3.png', 'background4.png', 'background5.png'],
  hat: ['hat1.png', 'hat2.png', 'hat3.png', 'hat4.png', 'hat5.png'],
  eyes: ['eyes1.png', 'eyes2.png', 'eyes3.png'],
  accessories: ['accessories1.png', 'accessories2.png', 'accessories3.png', 'accessories4.png', 'accessories5.png', 'accessories6.png', 'accessories7.png', 'accessories8.png', 'accessories9.png']
};

const layers = {
  background: new Image(),
  hat: null,
  eyes: null,
  accessories: null
};

const traitIndex = {
  background: 0,
  hat: 0,
  eyes: 0,
  accessories: 0
};

// Preload 'background1'
layers.background.onload = function() {
  drawCanvas();
};
layers.background.src = traits.background[0];

function changeTrait(trait, direction) {
  traitIndex[trait] = (traitIndex[trait] + direction + traits[trait].length) % traits[trait].length;
  const img = new Image();
  img.onload = function() {
    layers[trait] = img;
    drawCanvas();
  };
  img.src = traits[trait][traitIndex[trait]];
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (layers.background) ctx.drawImage(layers.background, 0, 0, canvas.width, canvas.height);
  if (layers.hat) ctx.drawImage(layers.hat, 0, 0, canvas.width, canvas.height);
  if (layers.eyes) ctx.drawImage(layers.eyes, 0, 0, canvas.width, canvas.height);
  if (layers.accessories) ctx.drawImage(layers.accessories, 0, 0, canvas.width, canvas.height);
}

function randomize() {
  for (const trait in traits) {
    traitIndex[trait] = Math.floor(Math.random() * traits[trait].length);
    const img = new Image();
    img.onload = function() {
      layers[trait] = img;
      drawCanvas();
    };
    img.src = traits[trait][traitIndex[trait]];
  }
}

function reset() {
  traitIndex.background = 0; // Reset to 'background1'
  layers.background.src = traits.background[0];
  layers.hat = null;
  layers.eyes = null;
  layers.accessories = null;
  drawCanvas();
}

function download() {
  const link = document.createElement('a');
  link.download = 'meme.png';
  link.href = canvas.toDataURL();
  link.click();
}

// Initialize the canvas with default traits
randomize();
