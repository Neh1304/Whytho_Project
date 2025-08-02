const moodSets = {
  chai: [
    { mood: "Sad Chai", message: "Even spices cry sometimes.", emoji: "🥺", color: "#cba687" },
    { mood: "Hopeful Chai", message: "Steam rises, just like you will.", emoji: "🌤️", color: "#deb887" },
    { mood: "Confused Chai", message: "Was I meant to be tea or therapy?", emoji: "🤨", color: "#d2b48c" }
  ],
  juice: [
    { mood: "Joyous Juice", message: "You're doing amazing, sweet pulp!", emoji: "😁", color: "#ff9900" },
    { mood: "Mellow Mango", message: "Let things blend at their own pace.", emoji: "😌", color: "#f7c948" },
    { mood: "Tangy Trouble", message: "Zestier than expected.", emoji: "😬", color: "#ffc107" }
  ],
  boba: [
    { mood: "Overwhelmed Boba", message: "Too many balls to juggle, huh?", emoji: "😵", color: "#fddde6" },
    { mood: "Sassy Boba", message: "I’m chewy, cute, and unbothered.", emoji: "😎", color: "#dca0d6" },
    { mood: "Lonely Boba", message: "Floating alone in this milky void.", emoji: "😢", color: "#c4b0e2" }
  ],
  smoothie: [
    { mood: "Cool Smoothie", message: "Chill. Blend. Breathe.", emoji: "🧊", color: "#90e0ef" },
    { mood: "Confused Smoothie", message: "What even am I? Fruit soup?", emoji: "🤯", color: "#cdb4db" }
  ],
  default: [
    { mood: "Mysterious Drink", message: "I hold secrets in my sip.", emoji: "🧐", color: "#999999" }
  ]
};

let currentMood = null;

function detectType(filename) {
  filename = filename.toLowerCase();
  if (filename.includes("chai")) return "chai";
  if (filename.includes("juice")) return "juice";
  if (filename.includes("boba")) return "boba";
  if (filename.includes("smoothie")) return "smoothie";
  return "default";
}

function scanMood() {
  const input = document.getElementById('imageInput');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const moodDiv = document.getElementById('mood');
  const msgDiv = document.getElementById('message');
  const emojiDiv = document.getElementById('emojiFace');
  const tweetBox = document.getElementById('tweetBox');
  tweetBox.style.display = "none";

  if (!input.files.length) {
    alert("Please upload your drink first!");
    return;
  }

  const file = input.files[0];
  const fileType = detectType(file.name);

  if (!currentMood || currentMood.type !== fileType) {
    const moodList = moodSets[fileType] || moodSets.default;
    const mood = moodList[Math.floor(Math.random() * moodList.length)];
    currentMood = { ...mood, type: fileType };
  }

  moodDiv.textContent = `☕ Mood: ${currentMood.mood}`;
  msgDiv.textContent = currentMood.message;
  emojiDiv.textContent = currentMood.emoji;

  // Apply dynamic color and font
  document.body.style.backgroundColor = currentMood.color;
  document.body.style.color = "#000";
  document.body.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
}

function playCry() {
  const audio = document.getElementById('violin');
  audio.currentTime = 0;
  audio.play();
}

function generateTweet() {
  if (!currentMood) {
    alert("Analyze your juice's mood first!");
    return;
  }
  const tweet = `"${currentMood.mood}" just told me: ‘${currentMood.message}’ 🧃💬 #MoodJuice #WhyTho`;
  document.getElementById("tweetBox").textContent = tweet;
  document.getElementById("tweetBox").style.display = "block";
}
