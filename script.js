// script.js

// XPath to select the specific element
let xpath_name = '//div[@id="board-layout-player-top"]//div[@class="user-tagline-component"]//a';
let xpath_rank = '//div[@id="board-layout-player-top"]//div[@class="user-tagline-component"]//span';
let xpath_others = '//div[@id="board-layout-player-top"]//div[@class="user-tagline-component"]/*[not(self::a or self::span or (@class="connection-component connection-excellent"))]';
let xpath_avatar = '//div[@class="player-component player-top"]//div[@class="player-avatar-component player-avatar"]//img'
let xpath_welcome_chat = '//div[@class="game-start-message-component"]';
let xpath_op_chat = '//div[@class="resizable-chat-area-content"]//a[@class="user-username-component user-username-current user-username-link user-tagline-chat-member"]';
let xpath_wants_chat = '//div[@class="chat-request-component"]//div//strong';


// Function to change the content and color
function changeTextContent() {
    // Use document.evaluate to find the element using the XPath expression
    let result_name = document.evaluate(xpath_name, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let result_rank = document.evaluate(xpath_rank, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let result_others = document.evaluate(xpath_others, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let result_avatar = document.evaluate(xpath_avatar, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let result_welcome_chat = document.evaluate(xpath_welcome_chat, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let result_op_chat = document.evaluate(xpath_op_chat, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    let result_wants_chat = document.evaluate(xpath_wants_chat, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    // Get the first matched element
    let element_name = result_name.singleNodeValue;
    let element_rank = result_rank.singleNodeValue;
    let element_others = result_others.singleNodeValue;
    let element_avatar = result_avatar.singleNodeValue;
    let element_welcome_chat = result_welcome_chat.singleNodeValue;
    let element_op_chat = result_op_chat.iterateNext();
    let element_wants_chat = result_wants_chat.singleNodeValue;

    // If the element exists, change its text content and color
    if (element_name) {
        element_name.textContent = "Opponent";  // Change text content to "Opponent"
    } else {
        console.log("Element not found1");
    }
    
    if (element_rank) {
        element_rank.textContent = "(???)";  // Change text content to "Opponent"
    } else {
        console.log("Element not found2");
    }

    if (element_others) {
        element_others.style.display = "none";
    } else {
        console.log("Element not found3");
    }
    
    if (element_avatar) {
        element_avatar.style.content = "url('https://images.chesscomfiles.com/uploads/v1/user/415366349.87e6b429.50x50o.6f8d0f992a64.png')";
    } else {
        console.log("Element not found4");
    }

    if (element_welcome_chat) {
        element_welcome_chat.style.display = "none";
    } else {
        console.log("Element not found5");
    }
    
    if (!element_op_chat) {
        console.log("Elements not found6");
    } else {
        while (element_op_chat) {
            element_op_chat.textContent = "Opponent:"; // Change text content to "Opponent"
            element_op_chat = result_op_chat.iterateNext(); // Move to the next matching element
        }
    }

    if (element_wants_chat) {
        element_wants_chat.textContent = "Opponent";  // Change text content to "Opponent"
    } else {
        console.log("Element not found7");
    }
}

// Create a MutationObserver to monitor changes in the DOM
const observer = new MutationObserver(function() {
    // Call the changeTextContent function when the DOM changes
    changeTextContent();
});

// Configure the observer to watch for changes in child elements or subtree
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial call to apply changes
changeTextContent();
