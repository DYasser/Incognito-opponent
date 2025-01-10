// script.js

// XPath to select the specific element
let xpath_name = '//div[@id="board-layout-player-top"]//div[@class="user-tagline-component"]//a';
let xpath_rank = '//div[@id="board-layout-player-top"]//div[@class="user-tagline-component"]//span';
let xpath_others = '//div[@id="board-layout-player-top"]//div[@class="user-tagline-component"]/*[not(self::a or self::span or (@class="connection-component connection-excellent"))]';
let xpath_avatar = '//div[@class="player-component player-top"]//div[@class="player-avatar-component player-avatar"]//img'
let xpath_welcome_chat = '//div[@class="game-start-message-component"]';
let xpath_op_chat = '//div[@class="resizable-chat-area-content"]//a[@class="user-username-component user-username-current user-username-link user-tagline-chat-member"]';
let xpath_wants_chat = '//div[@class="chat-request-component"]//div//strong';
let xpath_name_click = '//*[@id="user-popover-component"]/div/div/div[1]/div/div[1]/a'
let xpath_click_others = '//*[@id="user-popover-component"]/div/div/div[1]/div/div[1]/*[not(self::a)]';
let xpath_click_username = '//*[@id="user-popover-component"]/div/div/div[1]/div/div[2]';
let xpath_click_rank = '//*[@id="user-popover-component"]/div/div/div[1]/div/div[3]/span[1]/span[2]';
let xpath_click_avatar = '//*[@id="user-popover-component"]/div/div/div[1]/a/img';
let xpath_game_over = '//*[@id="board-layout-chessboard"]/div[4]/div/*';

let opponent_name = "";
let opponent_rank = "";

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
    let result_name_click = document.evaluate(xpath_name_click, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let result_click_username = document.evaluate(xpath_click_username, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let result_click_rank = document.evaluate(xpath_click_rank, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let result_click_avatar = document.evaluate(xpath_click_avatar, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let result_game_over = document.evaluate(xpath_game_over, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    // Get the first matched element
    let element_name = result_name.singleNodeValue;
    let element_rank = result_rank.singleNodeValue;
    let element_others = result_others.singleNodeValue;
    let element_avatar = result_avatar.singleNodeValue;
    let element_welcome_chat = result_welcome_chat.singleNodeValue;
    let element_op_chat = result_op_chat.iterateNext();
    let element_wants_chat = result_wants_chat.singleNodeValue;
    let element_name_click = result_name_click.singleNodeValue;
    let element_to_keep = document.evaluate(xpath_name_click, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    let elements_click_others = document.evaluate(xpath_click_others, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    let elements_click_username = result_click_username.singleNodeValue;
    let elements_click_rank = result_click_rank.singleNodeValue;
    let elements_click_avatar = result_click_avatar.singleNodeValue;
    let elements_game_over = result_game_over.singleNodeValue;

    // If the element exists, change its text content and color
    if(elements_game_over){
        console.log("Game_Over")
    }
    else{
        if (element_name) {
            if(opponent_name == "")
                opponent_name = element_name.textContent
            element_name.textContent = "Opponent";  // Change text content to "Opponent"
        } else {
            console.log("Element not found1");
            console.log("op name");
            console.log(opponent_name);
            console.log("op rank");
            console.log(opponent_rank);
        }
        
        if (element_rank) {
            if(opponent_rank == "")
                opponent_rank = element_rank.textContent
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
    
        if (elements_click_avatar) {
            elements_click_avatar.style.content = "url('https://images.chesscomfiles.com/uploads/v1/user/415366349.87e6b429.50x50o.6f8d0f992a64.png')";
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
        } 
        
        else {
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
    
        if (element_name_click) {
            element_name_click.textContent = "Opponent";  // Change text content to "Opponent"
        } else {
            console.log("Element not found8");
        }
        
        if (element_to_keep && elements_click_others.snapshotLength > 0) {
            for (let i = 0; i < elements_click_others.snapshotLength; i++) {
                elements_click_others.snapshotItem(i).style.display = "none";
            }
        } else {
            console.log("No elements found to hide or `<a>` element is missing.");
        }
    
        if (elements_click_username) {
            elements_click_username.style.display = "none";
        } else {
            console.log("Element not found10");
        }
    
        if (elements_click_rank) {
            elements_click_rank.textContent = "???";
        } else {
            console.log("Element not found11");
        }
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
