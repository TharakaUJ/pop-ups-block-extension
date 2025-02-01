function addCloseButton(popup) {
    if (popup.querySelector(".injected-close-btn")) return; // Avoid duplicates

    const closeButton = document.createElement("button");
    closeButton.textContent = "✖";
    closeButton.style.cssText = `
        position: absolute; 
        top: 10px; 
        right: 10px; 
        background: red; 
        color: white; 
        border: none; 
        font-size: 16px;
        cursor: pointer; 
        padding: 5px;
        z-index: 9999;
    `;
    closeButton.classList.add("injected-close-btn");
    closeButton.addEventListener("click", () => popup.remove());

    popup.style.position = "relative"; // Ensure it can contain absolute elements
    popup.appendChild(closeButton);
}

// Observe DOM for popups
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
                const popupSelectors = [".modal", ".popup", ".overlay", "[role='dialog']"];
                if (popupSelectors.some(selector => node.matches(selector) || node.querySelector(selector))) {
                    addCloseButton(node);
                }
            }
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true });

alert("Popup Closer Extension Installed");