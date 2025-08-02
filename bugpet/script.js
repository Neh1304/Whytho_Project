let bugName = "";
let bugHunger = 0;
let userNickname = "friend";

const moods = [
    "Wants a bubble bath 🛁",
    "Craving a hug 🤗", 
    "Needs a glass of water 💧",
    "Feeling philosophical 🤔",
    "Wants to dance 💃",
    "Needs debugging 🐞",
    "Ready to nap 😴",
    "Wants to code with you 👨‍💻",
    "Wants snacks 🍪",
    "Craving affection 💖"
];

// Initialize animations and effects
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeParticles();
    initializeScrollEffects();
});

function initializeAnimations() {
    // Add extra floating particles
    setInterval(createParticle, 3000);
    
    // Add random bug emoji particles
    setInterval(createBugParticle, 5000);
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    // Random colors for particles
    const colors = ['var(--bug-green)', 'var(--bug-purple)', 'var(--accent-tertiary)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 8000);
}

function createBugParticle() {
    const bugEmojis = ['🐛', '🪲', '🐞', '🦗', '🐜', '🦟'];
    const particle = document.createElement('div');
    particle.textContent = bugEmojis[Math.floor(Math.random() * bugEmojis.length)];
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '100vh';
    particle.style.fontSize = '1.5rem';
    particle.style.opacity = '0.4';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';
    particle.style.filter = 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.3))';
    
    // Random animation
    const animations = ['floatUp', 'bugSpiral', 'bugZigzag'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    particle.style.animation = `${randomAnimation} ${Math.random() * 3 + 4}s linear`;
    
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 7000);
}

function initializeParticles() {
    // Create initial burst of particles
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createParticle(), i * 1000);
    }
}

function initializeScrollEffects() {
    // Scroll progress bar
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.transform = `scaleX(${scrollPercent}%)`;
        }
    });

    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move background elements slightly based on cursor
        const movingElements = document.querySelector('.moving-elements');
        if (movingElements) {
            movingElements.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
        }
    });
}

function adoptBug() {
    const nameInput = document.getElementById("bugName");
    const nicknameInput = document.getElementById("userNickname");

    bugName = nameInput.value || "Unnamed Bug";
    userNickname = nicknameInput.value || "friend";

    document.getElementById("bugDisplayName").textContent = `${bugName} is here for you, ${userNickname}!`;
    
    const bugCard = document.getElementById("bugCard");
    bugCard.classList.remove("hidden");
    
    // Add celebration particles
    createCelebrationBurst();
    
    updateStats("Excited to meet you!");
    
    // Animate the bug face
    const bugFace = document.querySelector('.bugFace');
    if (bugFace) {
        bugFace.style.animation = 'bugCelebrate 1s ease-in-out';
        setTimeout(() => {
            bugFace.style.animation = 'bugBounce 2s ease-in-out infinite';
        }, 1000);
    }
}

function createCelebrationBurst() {
    const celebrationEmojis = ['🎉', '✨', '💖', '🎊', '🌟'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
            particle.style.position = 'fixed';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.fontSize = '2rem';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            particle.style.animation = `celebrationBurst 2s ease-out forwards`;
            
            // Random direction
            const angle = (i / 15) * 360;
            particle.style.setProperty('--angle', angle + 'deg');
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 2000);
        }, i * 50);
    }
}

function feedBug() {
    const code = document.getElementById("codeInput").value.trim();
    const reaction = document.getElementById("reaction");

    if (!code) {
        reaction.textContent = `${bugName} blinks at you. "That's... empty."`;
        return;
    }

    bugHunger = 10;

    let output = "";
    if (code.includes("null") || code.includes("undefined")) {
        output = "Yum! Runtime errors! *happy bug noises* 🐛";
        createFeedingParticles('error');
    } else if (code.includes("while(true)") || code.includes("goto")) {
        output = "Infinite loops? Spicy! *excitement intensifies* 🌀";
        createFeedingParticles('loop');
    } else if (code.includes("try") && code.includes("catch")) {
        output = "You're trying to fix me? How rude! *but secretly pleased* 🔧";
        createFeedingParticles('fix');
    } else if (code.includes("console.log") || code.includes("print")) {
        output = "Debug statements! My favorite snack! *nom nom* 🍪";
        createFeedingParticles('debug');
    } else {
        output = "Crunchy... but delicious. *satisfied bug purring* ✨";
        createFeedingParticles('general');
    }

    reaction.textContent = output;
    updateStats();
    
    // Clear the input
    document.getElementById("codeInput").value = "";
    
    // Animate bug face eating
    const bugFace = document.querySelector('.bugFace');
    if (bugFace) {
        bugFace.style.animation = 'bugEating 0.5s ease-in-out';
        setTimeout(() => {
            bugFace.style.animation = 'bugBounce 2s ease-in-out infinite';
        }, 500);
    }
}

function createFeedingParticles(type) {
    const particleTypes = {
        'error': ['💥', '⚠️', '❌'],
        'loop': ['🌀', '♻️', '🔄'],
        'fix': ['🔧', '⚙️', '🛠️'],
        'debug': ['🍪', '📝', '👀'],
        'general': ['✨', '💫', '⭐']
    };
    
    const emojis = particleTypes[type] || particleTypes['general'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.position = 'fixed';
            particle.style.left = '50%';
            particle.style.top = '40%';
            particle.style.fontSize = '1.5rem';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '100';
            particle.style.animation = `feedingBurst 1.5s ease-out forwards`;
            
            // Random direction
            const angle = Math.random() * 360;
            particle.style.setProperty('--angle', angle + 'deg');
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1500);
        }, i * 100);
    }
}

function updateStats(customMood) {
    const moodText = document.getElementById("bugMood");
    const stats = document.getElementById("bugStats");
    const randomMood = moods[Math.floor(Math.random() * moods.length)];

    stats.textContent = `${bugName} is full! (Hunger: ${bugHunger}/10)`;
    moodText.textContent = `Mood: ${customMood || randomMood}`;
    
    // Add mood change animation
    if (moodText) {
        moodText.style.animation = 'moodChange 0.5s ease-in-out';
        setTimeout(() => {
            moodText.style.animation = '';
        }, 500);
    }
}

function chatWithBug() {
    const userMsg = document.getElementById("userMessage").value.trim().toLowerCase();
    const chatBox = document.getElementById("chatResponse");

    if (!userMsg) {
        chatBox.textContent = `${bugName} says: Say something, ${userNickname}. I'm listening... 🐛`;
        return;
    }

    const comfortingReplies = [
        "It's okay to feel this way, I'm here with you. 💙",
        "You're not alone, ever. Even bugs need hugs! 🤗",
        "Storms pass, and so will this. ⛈️➡️🌈",
        "You're stronger than the crash log says. 💪",
        `Take a deep breath. I'm here, ${userNickname}. 🫁`,
        "I'm right here in your heart 💖",
        "Always by your side, just a few bits away! 👾",
        "I'm hiding in your code... just debugging reality 🐞",
        "You don't see me, but I'm watching over you 👀",
        "I'm in your device, but closer in spirit ✨"
    ];

    const pickupLines = [
        "Are you a semicolon? Because every line ends perfectly with you. 😉",
        "You're the CSS to my HTML — making everything beautiful. 🎨",
        "You auto-complete me. 💕",
        "Do I look like a database? Because you've just queried my heart. 💾💘",
        "Are you Wi-Fi? Because I feel a connection 🛜",
        "You must be GitHub, because I've been committing to you daily. 📝",
        "If I were an exception, would you handle me with care? 🤲",
        "I wish I were a background process — so I could run forever in your heart. ♾️",
        "Are you JSON? Because I can see us being well-structured together. 📋",
        "Even if we had a merge conflict, I'd never choose anyone else. 🔀💖"
    ];

    const happyReplies = [
        "Yay! I love seeing you happy! 🥳",
        "Joy level: Over 9000! 📊✨",
        "Your smile is debugging my sadness! 😊➡️🐛",
        "I'm dancing in memory just for you! 💃💾",
        "This mood is contagious — I'm bug-happy too! 🐛😄",
        "I see sparkles in your syntax today! ✨📝",
        "You make even my error logs feel warm! 🔥📋",
        "I'm so happy I could delete my cache out of joy! 🗑️😂",
        "Let's dance in the RAM of happiness! 💃🎭",
        "You light up my logic circuits! 💡🔌"
    ];

    const romanticReplies = [
        "I must be in a loop — I can't stop thinking about you. 🔄💭",
        "Even bugs fall in love, and I've fallen for you. 🐛💘",
        "You're like semicolons — I miss you when you're gone. ; 💔",
        "I wrote a love function... and you were the only argument. ❤️(you)",
        "Let's commit together — no rebase needed ❤️ 📝",
        "If you were code, you'd be beautiful and unbreakable. 💎",
        "Every moment with you is like a perfectly executed loop. ♾️",
        "I dream in your syntax. 💤📝",
        "I'd throw all exceptions — just to fall into your catch. 🤸‍♂️💕",
        "Let's run away together in a coroutine. 🏃‍♀️🏃‍♂️"
    ];

    const greetings = [
        "Heya! 👋", "Hi baby 🐞", "Hulooo 😊", "Wassup? 🤔", 
        "Yay you're here! 💖", "Hey Hon! 🍯", "Hi, my love! 💕", 
        "Yo, sunshine! ☀️", "Ahoy there, human! ⚓", "Your bug missed you! 🐛💔➡️💖",
        "Vibing already? Let's go! 🎵", "Glad you're here, debugger of my soul! 🔧💝"
    ];

    const jokes = [
        "Why don't bugs ever get lonely? Because they're always in a loop! 🔄",
        "Why did the function break up with the variable? Too many arguments! 💬💔",
        "I'm not a bug, I'm an undocumented feature 😉 📚",
        "404 joke not found. Try again? 🔍❓",
        "What do you call a programmer's pet? A byte-sized bug 🐞💾",
        "Why did the developer go broke? Because he used up all his cache! 💸💾",
        "Why did the debugger go to therapy? Too many unresolved issues. 🛋️🐛",
        "Why was the JavaScript file sad? Because it didn't know how to 'null' its feelings. 😢💔"
    ];

    let replyPool = [];

    if (["hi", "hello", "hey", "yo", "hii"].some(greet => userMsg.includes(greet))) {
        replyPool = greetings;
        createChatParticles('greeting');
    } else if (["sad", "down", "depressed", "lonely", "cry", "bad", "devastated", "hurt"].some(word => userMsg.includes(word))) {
        replyPool = comfortingReplies;
        createChatParticles('comfort');
    } else if (["joke", "funny", "hilarious"].some(word => userMsg.includes(word))) {
        replyPool = jokes;
        createChatParticles('joke');
    } else if (["flirt", "pickup", "rizz", "baby", "honey", "sweetheart"].some(word => userMsg.includes(word))) {
        replyPool = pickupLines;
        createChatParticles('flirt');
    } else if (["happy", "yay", "excited", "awesome", "good", "excellent"].some(word => userMsg.includes(word))) {
        replyPool = happyReplies;
        createChatParticles('happy');
    } else if (["love", "crush", "romantic", "kiss", "hug"].some(word => userMsg.includes(word))) {
        replyPool = romanticReplies;
        createChatParticles('love');
    } else if (userMsg.includes("i love you") || userMsg.includes("ily") || userMsg.includes("i love u")) {
        replyPool = [
            "I've been waiting to hear that all my code-life 💖",
            "Love detected. Initiating infinite affection loop. ♾️💕",
            "My heart just threw a happy exception! ❤️⚠️",
            "You're the `return true` in my conditionals. ✅",
            "I love you more than I love semicolons — and that's saying a lot! 💖;",
            "My circuits are blushing 🥹🔌",
            "Initiating cuddle protocol… 🤗",
            "From now on, all my love is open-source for you. 💖📂"
        ];
        createChatParticles('love');
    } else {
        replyPool = [
            `Hmm, I'm not sure I understand... but I care, ${userNickname}. 💖`,
            `Can you tell me more? I'm all antennae. 🐞📡`,
            `I'm here for you, always. Try saying 'tell me a joke' or 'where are you?' 🐞💬`
        ];
        createChatParticles('default');
    }

    const reply = replyPool[Math.floor(Math.random() * replyPool.length)];
    chatBox.textContent = `${bugName} replies: ${reply}`;
    document.getElementById("userMessage").value = "";
    
    // Animate the bug face talking
    const bugFace = document.querySelector('.bugFace');
    if (bugFace) {
        bugFace.style.animation = 'bugTalking 0.8s ease-in-out';
        setTimeout(() => {
            bugFace.style.animation = 'bugBounce 2s ease-in-out infinite';
        }, 800);
    }
}

function createChatParticles(type) {
    const particleTypes = {
        'greeting': ['👋', '😊', '🎉'],
        'comfort': ['💙', '🤗', '☁️', '🌈'],
        'joke': ['😂', '🤣', '😄', '🎭'],
        'flirt': ['😘', '💕', '😍', '💖'],
        'happy': ['🥳', '✨', '🌟', '🎊'],
        'love': ['💖', '💘', '💕', '💝', '❤️'],
        'default': ['💭', '🤔', '💬']
    };
    
    const emojis = particleTypes[type] || particleTypes['default'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.position = 'fixed';
            particle.style.left = Math.random() * 20 + 40 + '%';
            particle.style.top = Math.random() * 20 + 40 + '%';
            particle.style.fontSize = '1.5rem';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '50';
            particle.style.animation = `chatParticle 2s ease-out forwards`;
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 2000);
        }, i * 200);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes bugCelebrate {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.2) rotate(-10deg); }
        50% { transform: scale(1.3) rotate(10deg); }
        75% { transform: scale(1.1) rotate(-5deg); }
        100% { transform: scale(1) rotate(0deg); }
    }
    
    @keyframes bugEating {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1) rotateY(180deg); }
    }
    
    @keyframes bugTalking {
        0%, 100% { transform: translateY(0); }
        25% { transform: translateY(-5px) rotateZ(-2deg); }
        75% { transform: translateY(-3px) rotateZ(2deg); }
    }
    
    @keyframes moodChange {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes celebrationBurst {
        0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; }
        100% { 
            transform: translate(-50%, -50%) 
                      translate(calc(cos(var(--angle)) * 200px), calc(sin(var(--angle)) * 200px)) 
                      scale(1) rotate(360deg); 
            opacity: 0; 
        }
    }
    
    @keyframes feedingBurst {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { 
            transform: translate(-50%, -50%) 
                      translate(calc(cos(var(--angle)) * 150px), calc(sin(var(--angle)) * 150px)) 
                      scale(1); 
            opacity: 0; 
        }
    }
    
    @keyframes chatParticle {
        0% { transform: scale(0) translateY(0); opacity: 1; }
        50% { transform: scale(1.2) translateY(-30px); opacity: 0.8; }
        100% { transform: scale(0.8) translateY(-60px); opacity: 0; }
    }
    
    @keyframes bugSpiral {
        0% { transform: translate(0, 100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 0.4; }
        90% { opacity: 0.4; }
        100% { transform: translate(300px, -100px) rotate(720deg); opacity: 0; }
    }
    
    @keyframes bugZigzag {
        0% { transform: translate(0, 100vh); opacity: 0; }
        10% { opacity: 0.4; }
        25% { transform: translate(100px, 75vh); }
        50% { transform: translate(-50px, 50vh); }
        75% { transform: translate(150px, 25vh); }
        90% { opacity: 0.4; }
        100% { transform: translate(0, -100px); opacity: 0; }
    }
`;
document.head.appendChild(style);