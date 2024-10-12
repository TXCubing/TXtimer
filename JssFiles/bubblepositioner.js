document.querySelectorAll('bubble').forEach(bubble => {
    // Generate random positions for top and left
    const randomX = Math.random(); // Random value between 0 and 1
    const randomY = Math.random(); // Random value between 0 and 1
    // Apply random positions to CSS variables
    bubble.style.setProperty('--randomX', randomX);
    bubble.style.setProperty('--randomY', randomY);
});
