// Add floating particles
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
  particle.style.animationDelay = Math.random() * 2 + 's';
  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 8000);
}

// Create particles periodically
setInterval(createParticle, 3000);

// File input change handler
document.getElementById('appamInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const appamImage = document.getElementById('appamImage');
      const placeholder = document.getElementById('previewPlaceholder');
      
      appamImage.src = e.target.result;
      appamImage.style.display = 'block';
      placeholder.style.display = 'none';
      
      showStatusMessage("Image uploaded successfully! Ready to scan.", 'success');
    };
    reader.readAsDataURL(file);
  }
});

function showStatusMessage(message, type) {
  const statusDiv = document.getElementById('statusMessage');
  statusDiv.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
  
  setTimeout(() => {
    statusDiv.innerHTML = '';
  }, 5000);
}

function animateCount(target, duration = 1500) {
  const element = document.getElementById('resultCount');
  const start = 0;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Main scan function - your original logic with enhanced UI
function scanHoles() {
  const fileInput = document.getElementById("appamInput");
  const result = document.getElementById("result");
  const image = document.getElementById("appamImage");
  const loading = document.getElementById('loading');
  const scanBtn = document.getElementById('scanBtn');
  const imagePreview = document.getElementById('imagePreview');

  if (!fileInput.files[0]) {
    showStatusMessage("Please upload an appam image first!", 'error');
    return;
  }

  // Show loading state
  loading.style.display = 'block';
  scanBtn.disabled = true;
  scanBtn.textContent = 'Scanning...';
  imagePreview.classList.add('scanning');
  result.style.display = 'none';

  const reader = new FileReader();
  reader.onload = function (e) {
    image.src = e.target.result;
    
    // Simulate processing time for dramatic effect
    setTimeout(() => {
      const holes = Math.floor(Math.random() * 30) + 1;
      const msg = holes > 15 ? "Holy appam! 🍩" : "Needs more holes 🕳️";
      
      // Hide loading
      loading.style.display = 'none';
      scanBtn.disabled = false;
      scanBtn.textContent = 'Scan for Kuzhis 🔍';
      imagePreview.classList.remove('scanning');

      // Show results with animation
      result.style.display = 'block';
      animateCount(holes);
      
      // Update result message with more variety
      const messages = [
        holes > 20 ? "Incredible! Your appam has achieved legendary hole status! 🏆" : 
        holes > 15 ? "Holy appam! This is hole perfection! 🍩" :
        holes > 10 ? "Great hole distribution! Your appam skills are improving! 👏" :
        holes > 5 ? "Decent holes, but we believe in your appam potential! 💪" :
        "Needs more holes! Practice makes perfect appams! 🕳️",
        
        "The sacred geometry of your appam has been decoded!",
        "Your appam's hole pattern reveals ancient cooking wisdom!",
        "The AI has analyzed your appam's structural integrity!",
        "Congratulations! Your appam has been scientifically validated!"
      ];
      
      document.getElementById('resultMessage').textContent = 
        holes > 15 ? messages[0] : messages[Math.floor(Math.random() * messages.length)];
      
      showStatusMessage(`Scan complete! Found ${holes} magnificent kuzhis in your appam.`, 'success');
    }, 2500); // Increased delay for more dramatic effect
  };
  
  reader.readAsDataURL(fileInput.files[0]);
}

// Initialize with a welcome message
setTimeout(() => {
  showStatusMessage("Welcome to KuzhiScan™! Upload your appam image to begin the magical analysis.", 'success');
}, 1000);

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
  // Add hover sound effect simulation (visual feedback)
  const buttons = document.querySelectorAll('.scan-button, .file-upload-label');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = this.classList.contains('file-upload-label') ? 
        'scale(1.02)' : 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      if (!this.disabled) {
        this.style.transform = '';
      }
    });
  });

  // Add some easter egg messages for fun
  let clickCount = 0;
  document.getElementById('scanBtn').addEventListener('click', function() {
    clickCount++;
    if (clickCount === 10) {
      showStatusMessage("Wow! You really love scanning appams! 🤩", 'success');
    } else if (clickCount === 20) {
      showStatusMessage("You're officially an Appam Scanning Expert! 👨‍🔬", 'success');
    }
  });
});