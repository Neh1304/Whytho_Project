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

// Detect drink type from filename
function detectType(filename) {
  filename = filename.toLowerCase();
  if (filename.includes("chai")) return "chai";
  if (filename.includes("juice")) return "juice";
  if (filename.includes("boba")) return "boba";
  if (filename.includes("smoothie")) return "smoothie";
  return "default";
}

// When user selects a file
document.getElementById("imageInput").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const imagePreview = document.getElementById("drinkImage");
  const placeholder = document.getElementById("previewPlaceholder");
  const drinkName = document.getElementById("drinkName");

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
      placeholder.style.display = "none";

      // Set drink name (basic way: use filename without extension)
      const name = file.name.split(".")[0].replace(/[-_]/g, " ");
      drinkName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    };
    reader.readAsDataURL(file);
  }
});

function scanMood() {
  const input = document.getElementById('imageInput');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const moodDiv = document.getElementById('mood');
  const msgDiv = document.getElementById('message');
  const emojiDiv = document.getElementById('emojiFace');
  const moodInfo = document.getElementById('moodInfo');
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
  moodInfo.style.display = "block";

  // Apply dynamic mood styling
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
  document.getElementById("tweetContent").textContent = tweet;
  document.getElementById("tweetBox").style.display = "block";
}

function copyTweet() {
  const tweet = document.getElementById("tweetContent").textContent;
  navigator.clipboard.writeText(tweet).then(() => {
    alert("Tweet copied to clipboard!");
  });
}
  