// 动态工业音效
function playIndustrialSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
}

// 侧边栏交互增强
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        playIndustrialSound();
        item.style.animation = 'link-glow 1s infinite alternate';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.animation = '';
    });
});

// 移动端适配
let touchStartX = 0;
document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    if (Math.abs(touchEndX - touchStartX) > 50) {
        document.querySelector('.soviet-nav').classList.toggle('active');
    }
});