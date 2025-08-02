// EchoMystic - Enhanced JavaScript with animations and effects
let isEchoing = false;

function startEcho() {
    const input = document.getElementById("mysticInput").value.trim();
    const output = document.getElementById("outputBox");
    const button = document.querySelector("button");
    
    // Prevent multiple simultaneous echoes
    if (isEchoing) return;
    
    if (!input) {
        showMessage("🔮 The Echo requires your voice... try typing something!", "error");
        shakeElement(document.getElementById("mysticInput"));
        return;
    }
    
    isEchoing = true;
    button.disabled = true;
    button.style.opacity = "0.6";
    
    // Clear previous output
    output.innerHTML = "";
    
    // Phase 1: Listening animation
    showListeningAnimation(output);
    
    setTimeout(() => {
        // Phase 2: Processing animation
        showProcessingAnimation(output);
        
        setTimeout(() => {
            // Phase 3: Reveal the echo
            revealEcho(input, output);
            
            // Re-enable button
            isEchoing = false;
            button.disabled = false;
            button.style.opacity = "1";
            
            // Clear input field with animation
            clearInputWithAnimation();
            
        }, 2000); // Processing time
    }, 1500); // Listening time
}

function showListeningAnimation(output) {
    output.innerHTML = "🔮 Echo is listening";
    let dots = 0;
    
    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        output.innerHTML = `🔮 Echo is listening${".".repeat(dots)}`;
        
        // Add pulsing effect
        output.style.transform = `scale(${1 + Math.sin(Date.now() / 200) * 0.02})`;
        
    }, 400);
    
    // Store interval to clear it later
    output.dataset.interval = interval;
}

function showProcessingAnimation(output) {
    clearInterval(output.dataset.interval);
    
    const mysticalSymbols = ["🔮", "✨", "🌟", "💫", "⭐", "🌙"];
    let symbolIndex = 0;
    
    const interval = setInterval(() => {
        const symbol = mysticalSymbols[symbolIndex % mysticalSymbols.length];
        output.innerHTML = `${symbol} Processing mystical energy ${symbol}`;
        symbolIndex++;
        
        // Add rotating effect
        const rotation = (Date.now() / 20) % 360;
        output.style.transform = `rotate(${Math.sin(rotation * Math.PI / 180) * 2}deg)`;
        
    }, 300);
    
    // Store interval to clear it later
    output.dataset.interval = interval;
}

function revealEcho(input, output) {
    clearInterval(output.dataset.interval);
    
    // Reset transform
    output.style.transform = "";
    
    // Create dramatic reveal
    output.innerHTML = "✨ The Echo reveals... ✨";
    
    setTimeout(() => {
        // Apply mystical transformations to the input
        const mysticalEcho = applyMysticalTransform(input);
        output.innerHTML = `
            <div style="font-size: 1.2em; color: #6b46c1; margin: 10px 0;">
                "🌟 ${mysticalEcho} 🌟"
            </div>
            <div style="font-size: 0.9em; opacity: 0.8; font-style: italic;">
                ${generateMysticalMessage()}
            </div>
        `;
        
        // Add sparkle effect
        createSparkles(output);
        
    }, 800);
}

function applyMysticalTransform(text) {
    // Add some mystical flair to the echoed text
    const transformations = [
        (t) => t, // Original
        (t) => t.split('').reverse().join(''), // Reversed
        (t) => t.toUpperCase(), // Uppercase
        (t) => t.split('').map(char => Math.random() > 0.7 ? char.toUpperCase() : char).join(''), // Random caps
        (t) => `${t}... ${t}...`, // Echo effect
    ];
    
    const randomTransform = transformations[Math.floor(Math.random() * transformations.length)];
    return randomTransform(text);
}

function generateMysticalMessage() {
    const messages = [
        "The universe has spoken...",
        "Ancient wisdom echoes through time...",
        "The mystical forces are pleased...",
        "Your words resonate in the cosmic void...",
        "The echo transcends dimensions...",
        "Spiritual energy surrounds your message...",
        "The oracle has received your transmission...",
        "Mystical vibrations detected..."
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
}

function showMessage(message, type = "normal") {
    const output = document.getElementById("outputBox");
    
    output.innerHTML = message;
    output.style.color = type === "error" ? "#e74c3c" : "#6b46c1";
    
    if (type === "error") {
        output.style.borderColor = "#e74c3c";
        output.style.background = "rgba(231, 76, 60, 0.1)";
        
        setTimeout(() => {
            output.style.borderColor = "#6b46c1";
            output.style.background = "rgba(107, 70, 193, 0.1)";
            output.style.color = "#6b46c1";
        }, 2000);
    }
}

function shakeElement(element) {
    element.style.animation = "shake 0.5s ease-in-out";
    
    setTimeout(() => {
        element.style.animation = "";
    }, 500);
}

function clearInputWithAnimation() {
    const input = document.getElementById("mysticInput");
    const originalValue = input.value;
    let currentLength = originalValue.length;
    
    const clearInterval = setInterval(() => {
        if (currentLength > 0) {
            input.value = originalValue.substring(0, currentLength - 1);
            currentLength--;
        } else {
            clearInterval(clearInterval);
        }
    }, 50);
}

function createSparkles(container) {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = '0.8em';
            sparkle.style.opacity = '0';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.animation = 'sparkle 2s ease-out forwards';
            
            container.style.position = 'relative';
            container.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 200);
    }
}

// Add Enter key support
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById("mysticInput");
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !isEchoing) {
            startEcho();
        }
    });
    
    // Add initial welcome animation
    setTimeout(() => {
        const container = document.querySelector('.container');
        container.style.animation = 'welcomePulse 2s ease-in-out';
    }, 500);
});

// Add CSS animations dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes sparkle {
        0% { 
            opacity: 0; 
            transform: translateY(0) scale(0.5); 
        }
        50% { 
            opacity: 1; 
            transform: translateY(-20px) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translateY(-40px) scale(0.5); 
        }
    }
    
    @keyframes welcomePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(styleSheet);