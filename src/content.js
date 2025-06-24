const KEYWORDS = ["AI", "Artificial Intelligence", "Machine Learning", "LLM"];

function highlightPosts() {
  const posts = document.querySelectorAll(
    "div.feed-shared-update-v2, div.update-components-container, div.feed-shared-update-v2__control-menu-container"
  );


posts.forEach(post => {

if (post.getAttribute("data-ai-highlighted")) return;

    const textContent = post.innerText || "";

     if (KEYWORDS.some(keyword => new RegExp(`\\b${keyword}\\b`, "i").test(textContent))) {
     const wrapper = document.createElement("div");
      wrapper.style.position = "relative";

      post.parentNode.insertBefore(wrapper, post);
      wrapper.appendChild(post);

      // Blur the post
      post.style.filter = "blur(4px) grayscale(100%)";
      post.style.pointerEvents = "none"; // prevent interaction while blurred

      // Create overlay
      const overlay = document.createElement("div");
      overlay.innerHTML = "🥱<br><strong style='font-size: 18px;'>AI blaa blaa blaa</strong>";
      overlay.style.position = "absolute";
      overlay.style.top = "50%";
      overlay.style.left = "50%";
      overlay.style.transform = "translate(-50%, -50%)";
      overlay.style.background = "rgba(255, 0, 0, 0.8)";
      overlay.style.color = "#fff";
      overlay.style.padding = "20px 30px";
      overlay.style.borderRadius = "12px";
      overlay.style.zIndex = "1000";
      overlay.style.fontSize = "48px";
      overlay.style.textAlign = "center";
      overlay.style.pointerEvents = "none";
      overlay.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";

      wrapper.appendChild(overlay);
    }

    post.setAttribute("data-ai-highlighted", "true");
  });
}

function startHighlighting() {
  highlightPosts();

  const observer = new MutationObserver(() => {
    highlightPosts();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Wait until DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startHighlighting);
} else {
  startHighlighting();
}
