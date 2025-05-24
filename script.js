// --- Global State ---
let isHidingActive = true; // Default: Hiding is ON
let chessAnonStyleSheet = null; // Reference to our <style> tag for CSS rules

// --- Helper: Get or Create Stylesheet ---
function getChessAnonStyleSheet() {
    const styleId = 'chess-anon-styles';
    if (!chessAnonStyleSheet) {
        chessAnonStyleSheet = document.getElementById(styleId);
        if (!chessAnonStyleSheet) {
            chessAnonStyleSheet = document.createElement('style');
            chessAnonStyleSheet.id = styleId;
            chessAnonStyleSheet.type = 'text/css';
            document.head.appendChild(chessAnonStyleSheet);
        }
    }
    return chessAnonStyleSheet;
}

// --- CSS Management ---
function updateInjectedCSS() {
    const styleSheet = getChessAnonStyleSheet();
    let rules = '';

    if (isHidingActive) {
        rules = `
            /* Opponent's Flag, Flair, Rating, Avatar (CSS part) */
            .player-component.player-top .country-flags-component,
            .player-component.player-top .flair-rpc-component,
            .player-component.player-top .cc-user-rating-white,
            .player-component.player-top .user-avatar,
            .player-component.player-top .player-avatar {
                display: none !important;
            }
            /* Additional rule to hide flag, flair, and username for game board animation player */
            .game-board-animation-player-country-flag,
            .game-board-animation-player-flair {
                display: none !important;
            }

            /* --- SOLUTION for Animation Player Avatar --- */
            .game-board-animation-player-component .player-avatar-component img,
            /* Also include the specific avatar class from other parts of the site if it helps catch other instances */
            .cc-avatar-img
            {
                display: none !important;
            }

            /* Hide all takeover-overlay elements (from previous request) */
            .takeover-overlay {
                display: none !important;
            }

            /* Add any other global CSS hide rules here */
        `;
    }
    // Apply rules or clear them
    if (styleSheet.innerHTML !== rules) {
        styleSheet.innerHTML = rules;
    }
}

function manageElementVisibilityAndText() {
    // Helper to set or restore text, storing original in dataset
    function toggleText(element, newText, originalDataKey) {
        if (!element) return;
        if (isHidingActive) {
            if (!element.dataset[originalDataKey]) {
                element.dataset[originalDataKey] = element.textContent;
            }
            if (element.textContent !== newText) {
                element.textContent = newText;
            }
        } else {
            if (element.dataset[originalDataKey] && element.textContent !== element.dataset[originalDataKey]) {
                element.textContent = element.dataset[originalDataKey];
            }
        }
    }

    // Helper to set or restore innerHTML, storing original in dataset
    function toggleInnerHTML(element, newHTML, originalDataKey) {
        if (!element) return;
        if (isHidingActive) {
            if (!element.dataset[originalDataKey]) {
                element.dataset[originalDataKey] = element.innerHTML;
            }
            if (element.innerHTML !== newHTML) {
                element.innerHTML = newHTML;
            }
        } else {
            if (element.dataset[originalDataKey] && element.innerHTML !== element.dataset[originalDataKey]) {
                element.innerHTML = element.dataset[originalDataKey];
            }
        }
    }

    // Helper to toggle element display style
    function toggleDisplay(selector, displayValue = 'none') {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = isHidingActive ? displayValue : ''; // Empty string reverts to CSS default
        }
    }

    // 1. Target and modify the opponent's username (main player info)
    const usernameElement = document.querySelector('.player-component.player-top [data-test-element="user-tagline-username"]');
    toggleText(usernameElement, 'Opponent', 'originalUsername');
    // Attributes like data-username, data-test-element are harder to "restore" perfectly
    // without knowing if they should exist or what their value was if absent.
    // For simplicity, we'll focus on visible text and styles.
    // If hiding, we could still remove them:
    if (usernameElement && isHidingActive) {
        if (usernameElement.dataset.username) usernameElement.removeAttribute('data-username');
        if (usernameElement.dataset.testElement) usernameElement.removeAttribute('data-test-element');
    }

    // NEW: Target the specific username element you identified
    const otherUsernameElement = document.querySelector('.cc-text-medium-bold.cc-user-username-component.cc-user-username-white');
    toggleText(otherUsernameElement, 'Opponent', 'originalOtherUsername');


    // 3. Handle the Game Start Message in Chat
    const gameStartMessages = document.querySelectorAll('.game-start-message-component');
    const desiredGameStartMessage = '<strong>Opponent Incognito Activated, enjoy your game!</strong>'; //
    gameStartMessages.forEach(startmsg => {
        toggleInnerHTML(startmsg, desiredGameStartMessage, 'originalGameStartMessage');
    });

    // 4. Target and modify ALL opponent names in chat messages
    const chatUsernameElements = document.querySelectorAll('.user-username-component.user-username-current.user-username-link.user-tagline-chat-member');
    chatUsernameElements.forEach(chatUsername => {
        toggleText(chatUsername, 'Opponent:', 'originalChatUsername');
    });

    // 5. Hide the User Popover
    toggleDisplay('.user-popover-about');

    // 6. Hide the "Follow" button
    toggleDisplay('.player-component.player-top .follow-button, .player-component.player-top .follow-button-component');

    // 7. Replace the opponent's outer avatar image (hiding it)
    toggleDisplay('.cc-avatar-img');

    // 8. Modify the opponent's outer avatar Anchor element
    const avatarAnchor = document.querySelector('.cc-avatar-component.cc-avatar-size-64.cc-avatar-playing.user-popover-avatar');
    if (avatarAnchor) {
        if (isHidingActive) {
            if (!avatarAnchor.dataset.originalHref) avatarAnchor.dataset.originalHref = avatarAnchor.href;
            if (!avatarAnchor.dataset.originalTitle) avatarAnchor.dataset.originalTitle = avatarAnchor.title;
            avatarAnchor.href = ''; //
            avatarAnchor.title = 'Opponent'; //
        } else {
            if (avatarAnchor.dataset.originalHref) avatarAnchor.href = avatarAnchor.dataset.originalHref;
            if (avatarAnchor.dataset.originalTitle) avatarAnchor.title = avatarAnchor.dataset.originalTitle;
        }
    }

    // 9. Hide the game board animation player username
    const gameAnimationUsername = document.querySelector('.game-board-animation-player-username');
    toggleText(gameAnimationUsername, 'Opponent', 'originalAnimationUsername');
}

// --- Master Function to Apply All Visual Changes ---
function applyVisualState() {
    updateInjectedCSS();
    manageElementVisibilityAndText();
}

// --- Toggle Button Setup ---
function setupToggleButton() {
    const buttonId = 'toggle-chess-anon-button';
    let button = document.getElementById(buttonId);
    if (button) { // Button already exists, just update text
        updateButtonAppearance(button);
        return;
    }

    button = document.createElement('button');
    button.id = buttonId;
    // Basic styling (can be customized further via CSS injection if needed)
    Object.assign(button.style, {
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: '10000', // High z-index to be on top
        padding: '8px 12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f0f0f0',
        color: '#333',
        cursor: 'pointer',
        fontSize: '12px'
    });

    function updateButtonAppearance(btn) {
        if (isHidingActive) {
            btn.textContent = 'Show Opponent Info';
            btn.style.backgroundColor = '#ffdddd'; // Light red when hiding
            btn.style.color = '#a00';
        } else {
            btn.textContent = 'Hide Opponent Info';
            btn.style.backgroundColor = '#ddffdd'; // Light green when showing
            btn.style.color = '#0a0';
        }
    }

    button.addEventListener('click', () => {
        isHidingActive = !isHidingActive;
        updateButtonAppearance(button);
        applyVisualState(); // Re-apply all visual rules based on the new state
    });

    document.body.appendChild(button);
    updateButtonAppearance(button); // Set initial text and style
}


// --- MutationObserver Setup ---
let observer = null;
function startObserver() {
    if (observer) {
        observer.disconnect();
    }

    const targetNode = document.querySelector('.board-layout-main, .main-board-layout'); //

    if (targetNode) {
        observer = new MutationObserver((mutationsList) => {
            let relevantChange = false;
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check if the added node or its children match selectors we care about
                            if (node.matches('.player-component, [data-test-element="user-tagline-username"], .game-start-message-component, .user-tagline-chat-member, .game-board-animation-player-username, .user-popover-about, .follow-button, .follow-button-component, .cc-avatar-img, .cc-avatar-component') ||
                                node.querySelector('.player-component, [data-test-element="user-tagline-username"], .game-start-message-component, .user-tagline-chat-member, .game-board-animation-player-username, .user-popover-about, .follow-button, .follow-button-component, .cc-avatar-img, .cc-avatar-component')) {
                                relevantChange = true;
                                break;
                            }
                        }
                    }
                } else if (mutation.type === 'attributes' && mutation.target.nodeType === Node.ELEMENT_NODE) {
                     if (mutation.target.matches('[data-test-element="user-tagline-username"], .game-start-message-component, .user-tagline-chat-member, .game-board-animation-player-username, .cc-avatar-component')) { //
                         relevantChange = true;
                     }
                }
                if (relevantChange) break;
            }

            if (relevantChange) {
                requestAnimationFrame(applyVisualState);
            }
        });

        observer.observe(targetNode, {
            childList: true,
            subtree: true,
            attributes: true,
            // Watching specific attributes can be more performant if known, but broader is safer for dynamic sites
            attributeFilter: ['class', 'style', 'href', 'data-test-element', 'data-username'] // (expanded slightly)
        });
    } else {
        setTimeout(startObserver, 500); // Retry if target not found
    }
}

// --- Initialization ---
function initializeChessAnonymizer() {
    setupToggleButton(); // Create the toggle button
    applyVisualState();  // Apply the initial visual state based on `isHidingActive`
    startObserver();     // Start observing DOM changes

    // Fallback interval, less aggressive than the original 1ms.
    // This helps catch things the MutationObserver might miss or for elements outside its scope.
    setInterval(applyVisualState, 1); // Adjusted from 1ms
}

// Delay initialization slightly to give the page time to load initial elements
setTimeout(initializeChessAnonymizer, 300); // (using the original delay)