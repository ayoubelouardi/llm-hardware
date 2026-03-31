// app.js — Initialization and global event listeners

// ===== INIT =====
window.switchMode = function(i) {
  document.querySelectorAll(".mode-btn").forEach((b, j) => b.classList.toggle("on", j===i));
  document.getElementById("hpanel").style.display = i===0 ? "block" : "none";
  document.getElementById("mpanel").style.display = i===1 ? "block" : "none";
  if (i===1 && !document.getElementById("mq")) renderModelShell();
  // Restore scroll position when going back to hardware mode
  if (i===0 && window._hwScrollY) {
    setTimeout(function() { window.scrollTo(0, window._hwScrollY); }, 50);
  }
}

renderHardware();

// ===== SOCIAL SHARING =====
window.shareOn = function(platform, modelName) {
  const url = window.location.href.split('?')[0].split('#')[0];
  const text = "Can your hardware run " + modelName + "? Find out instantly — full build specs, VRAM requirements, and performance estimates for 275+ AI models.";

  const urls = {
    x: "https://x.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url),
    linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url),
    hn: "https://news.ycombinator.com/submitlink?u=" + encodeURIComponent(url) + "&t=" + encodeURIComponent("LLM Hardware — Find out what hardware you need for any AI model"),
    reddit: "https://www.reddit.com/submit?url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent("Hardware requirements for 275+ local AI models"),
    email: "mailto:?subject=" + encodeURIComponent("Check this out — " + modelName + " hardware requirements") + "&body=" + encodeURIComponent(text + "\n\n" + url),
  };

  if (platform === "copy") {
    navigator.clipboard.writeText(url).then(function() {
      var btn = document.querySelector(".share-copy span");
      if (btn) { btn.textContent = "Copied!"; setTimeout(function() { btn.textContent = "Copy Link"; }, 2000); }
    });
    return;
  }

  if (urls[platform]) window.open(urls[platform], "_blank", "noopener,noreferrer");
}

// ===== ESCAPE KEY TO CLOSE MODAL =====
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") closeBuildModal();
});
