const wheelCanvas = document.getElementById('wheelCanvas');
const confettiCanvas = document.getElementById('confettiCanvas');
const winnerModal = document.getElementById('winnerModal');
const winnerName = document.getElementById('winnerName');
const nameInput = document.getElementById('nameInput');

const size = 700;
const ctx = setupCanvas(wheelCanvas, size);
const confettiCtx = setupCanvas(confettiCanvas, window.innerWidth);
confettiCanvas.style.height = window.innerHeight + 'px';

const radius = size / 2;
const center = size / 2;

let names = ['Ali', 'Sara', 'Ahmad', 'Farid', 'Yasir'];
let spinning = false;
let currentAngle = 0;
let currentWinner = '';

function setupCanvas(canvas, size) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}





// رسم چرخ با نام‌ها
function drawWheel() {
  ctx.clearRect(0, 0, size, size);

  if (names.length === 0) {
    ctx.fillStyle = '#333';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('No names to spin!', center, center);
    return;
  }
}   










  const anglePerSlice = (2 * Math.PI) / names.length;

  names.forEach((name, index) => {
    const angle = anglePerSlice * index;
    
    // رسم بخش دایره
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, angle, angle + anglePerSlice);
    ctx.fillStyle = `hsl(${(index * 360) / names.length}, 85%, 65%)`;
    ctx.fill();

    // رسم نام‌ها
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(angle + anglePerSlice / 2);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(name, radius - 20, 0);
    ctx.restore();
  });
  

// شروع چرخش چرخ
function spinWheel() {
  if (spinning || names.length === 0) return;

  spinning = true;
  winnerModal.style.display = 'none';
  clearConfetti();

  // چرخش تصادفی به اندازه 6 دور کامل + زاویه رندوم
  const rotationDegrees = 360 * 6 + Math.floor(Math.random() * 360);
  const rotationRadians = (rotationDegrees * Math.PI) / 180;
  currentAngle += rotationRadians;

  // انیمیشن چرخش (ساده)
  wheelCanvas.style.transition = 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)';
  wheelCanvas.style.transform = `translate(-50%, -50%) rotate(${currentAngle}rad)`;

  // بعد از 5 ثانیه نتیجه اعلام می‌شود
  setTimeout(() => {
    const normalizedAngle = currentAngle % (2 * Math.PI);
    let index = Math.floor(names.length - (normalizedAngle / (2 * Math.PI)) * names.length);
    index = index >= 0 ? index : index + names.length;

    currentWinner = names[index];
    winnerName.textContent = currentWinner;
    winnerModal.style.display = 'block';
    showConfetti();

    spinning = false;

    // حذف transition برای چرخش بعدی
    wheelCanvas.style.transition = '';
  }, 5000);
}

// حذف برنده فعلی از لیست و بروزرسانی چرخ
function removeWinner() {
  names = names.filter(name => name !== currentWinner);
  drawWheel();
  closeWinnerBox();
}

// بستن پنجره اعلام برنده بدون حذف
function keepWinner() {
  closeWinnerBox();
}

function closeWinnerBox() {
  winnerModal.style.display = 'none';
}

// اضافه کردن نام جدید
function addName() {
  const newName = nameInput.value.trim();
  if (newName && !names.includes(newName)) {
    names.push(newName);
    nameInput.value = '';
    drawWheel();
  }
}

// انیمیشن کنفِتی
function showConfetti() {
  const pieces = 300;
  const confettis = [];

  for (let i = 0; i < pieces; i++) {
    confettis.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * -confettiCanvas.height,
      r: Math.random() * 6 + 4,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speed: Math.random() * 3 + 2,
    });
  }

  function animate() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettis.forEach(c => {
      c.y += c.speed;
      if (c.y > confettiCanvas.height) {
        c.y = 0;
        c.x = Math.random() * confettiCanvas.width;
      }
      confettiCtx.beginPath();
      confettiCtx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      confettiCtx.fillStyle = c.color;
      confettiCtx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// پاک کردن کنفِتی
function clearConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

// رسم چرخ در ابتدا
drawWheel();
        
