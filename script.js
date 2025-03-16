window.onload = function() {
    document.getElementById("myAudio").play().catch(error => {
        console.log("مرورگر اجازه پخش خودکار نمیدهد، روی دکمه کلیک کنید.");
    });
};

function playMusic() {
    document.getElementById("myAudio").play();
}
