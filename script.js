// --- Helper Function (for CSS injection) ---
function injectCSS(rule) {
    const styleId = 'chess-anon-styles';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        styleTag.type = 'text/css';
        document.head.appendChild(styleTag);
    }
    styleTag.appendChild(document.createTextNode(rule));
}

// --- Main Hiding Logic ---

function applyOpponentHiding() {
    // console.log("Applying highly targeted opponent hiding logic..."); // Uncomment for detailed debugging

    // 1. Target and modify the opponent's username (main player info)
    const usernameElement = document.querySelector('.player-component.player-top [data-test-element="user-tagline-username"]');
    if (usernameElement && usernameElement.textContent.trim() !== 'Opponent') { // Use .trim() for robustness
        usernameElement.textContent = 'Opponent';
        if (usernameElement.dataset.username) {
            usernameElement.removeAttribute('data-username');
        }
        if (usernameElement.dataset.testElement) {
            usernameElement.removeAttribute('data-test-element');
        }
        // console.log("Changed main opponent username to 'Opponent'.");
    }

    // 2. Hide specific elements via CSS injection (only inject once)
    if (!window.chessAnonStylesInjected) {
        // console.log("Injecting persistent CSS rules for hiding.");

        // Opponent's Flag: <div class="country-flags-component country-ma country-flags-small">
        injectCSS(`
            .player-component.player-top .country-flags-component {
                display: none !important;
            }
        `);

        // Opponent's Flair: <img class="flair-rpc-component flair-rpc-small" ...>
        injectCSS(`
            .player-component.player-top .flair-rpc-component {
                display: none !important;
            }
        `);

        // Opponent's Rating (Ranking): <div class="cc-text-medium cc-user-rating-white">
        injectCSS(`
            .player-component.player-top .cc-user-rating-white {
                display: none !important;
            }
        `);

        // Opponent's Avatar (common guesses)
        injectCSS(`
            .player-component.player-top .user-avatar,
            .player-component.player-top .player-avatar {
                display: none !important;
            }
        `);

        window.chessAnonStylesInjected = true;
    }

    // 3. Handle the Game Start Message in Chat
    const gameStartMessage = document.querySelectorAll('.game-start-message-component');
    const desiredGameStartMessage = '<strong>Opponent Incognito Activated, enjoy your game!</strong>';

    gameStartMessage.forEach(startmsg => {
        if (startmsg && startmsg.innerHTML !== desiredGameStartMessage) {
            startmsg.innerHTML = desiredGameStartMessage;
            // console.log("Modified game start message in chat.");
        }
    });
    // 4. Target and modify ALL opponent names in chat messages
    // This targets <a class="user-username-component ... user-tagline-chat-member">
    const chatUsernameElements = document.querySelectorAll('.user-username-component.user-username-current.user-username-link.user-tagline-chat-member');

    chatUsernameElements.forEach(chatUsername => {
        // We ensure we only modify if the text isn't already 'Opponent:'
        // AND it's a link to a member profile (to avoid modifying non-username elements if classes overlap)
        if (chatUsername.textContent && chatUsername.textContent.trim() !== 'Opponent:') {

            chatUsername.textContent = 'Opponent:';
        }
    });

    // 5. Hide the User Popover (new logic using JavaScript direct style manipulation)
    const userPopover = document.querySelector('.user-popover-about');
    if (userPopover && userPopover.style.display !== 'none') {
        userPopover.style.display = 'none';
        // console.log("Hidden user popover.");
    }

    // 6. Hide the "Follow" button using JavaScript (same approach)
    // Common selectors for the follow button. Choose the most accurate one or add both.
    const followButton = document.querySelector('.player-component.player-top .follow-button, .player-component.player-top .follow-button-component');
    if (followButton && followButton.style.display !== 'none') {
        followButton.style.display = 'none';
        // console.log("Hidden follow button.");
    }

    // 7. Replace the opponent's outer avatar image
    // <img class="cc-avatar-img" ...>
    const existingAvatarImage = document.querySelector('.cc-avatar-img');
    const newAvatarURL = 'https://drive.google.com/file/d/1-rkxF95-JLBZt-jpbOsZUffCY19A_hqi/view?usp=sharing';

    if (existingAvatarImage) {
        // Check if the avatar is already our custom one to avoid redundant replacements
        existingAvatarImage.style.display = 'none'; // Hide the existing avatar
    } 

    // 8. Modify the opponent's outer avatar Anchor element
    const avatarAnchor = document.querySelector('.cc-avatar-component.cc-avatar-size-64.cc-avatar-playing.user-popover-avatar');
    if (avatarAnchor) {
        // Only modify if it's not already empty or "Opponent" to avoid redundant changes
        if (avatarAnchor.href !== '') {
            avatarAnchor.href = ''; // remove link to profile
            // console.log("Removed avatar anchor href.");
        }
        if (avatarAnchor.title !== 'Opponent') {
            avatarAnchor.title = 'Opponent'; // change title to "Opponent"
            // console.log("Changed avatar anchor title.");
        }
    }
}

// --- MutationObserver Setup ---
let observer = null;

function startObserver() {
    if (observer) {
        observer.disconnect();
        // console.log("Previous observer disconnected.");
    }

    const targetNode = document.querySelector('.board-layout-main, .main-board-layout');

    if (targetNode) {
        // console.log("Starting MutationObserver on game area:", targetNode);

        observer = new MutationObserver((mutationsList) => {
            let relevantChange = false;
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Watch for relevant nodes being added (player info, game messages, chat messages)
                            if (node.matches('.player-component, [data-test-element="user-tagline-username"], .game-start-message-component, .user-tagline-chat-member') ||
                                node.querySelector('.player-component, [data-test-element="user-tagline-username"], .game-start-message-component, .user-tagline-chat-member')) {
                                relevantChange = true;
                                break;
                            }
                        }
                    }
                } else if (mutation.type === 'attributes' && mutation.target.nodeType === Node.ELEMENT_NODE) {
                     // Watch for attribute changes on existing relevant elements
                     if (mutation.target.matches('[data-test-element="user-tagline-username"], .game-start-message-component, .user-tagline-chat-member')) {
                         relevantChange = true;
                     }
                }
                if (relevantChange) break;
            }

            if (relevantChange) {
                // console.log("Observer detected relevant change. Re-applying modifications.");
                requestAnimationFrame(applyOpponentHiding);
            }
        });

        observer.observe(targetNode, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-test-element', 'data-username', 'class', 'innerHTML', 'href']
        });
    } else {
        // console.log("Target node for observer not found. Retrying observer setup...");
        setTimeout(startObserver, 500);
    }
}

// --- Initialization ---

function initializeExtension() {
    applyOpponentHiding();
    startObserver();
    setInterval(applyOpponentHiding, 1); // Aggressive fallback for persistence
}

setTimeout(initializeExtension, 300); // Initial delay, then the 1ms interval takes over