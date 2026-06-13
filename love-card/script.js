const canvas = document.getElementById("scratchCard");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

// พื้นสีปิด
ctx.fillStyle = "pink";
ctx.fillRect(0, 0, 400, 400);

let isDone = false;

canvas.addEventListener("mousemove", (e) => {
    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, 25, 0, Math.PI * 2);
    ctx.fill();

    checkScratch();
});

// 🔥 ฟังก์ชันเช็คว่าขูดเกือบหมดหรือยัง
function checkScratch() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
    }

    const percent = (transparent / (canvas.width * canvas.height)) * 100;

    if (percent > 70 && !isDone) {
        isDone = true;

        setTimeout(() => {
            window.location.href = "password.html";
        }, 500);
    }
}