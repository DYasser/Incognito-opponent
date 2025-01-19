# Incognito Opponent (Chess.com Opponent Name Hider Extension)

## Overview

This Chrome extension enhances the chess experience for high-ranking players by hiding the opponent's name during games on Chess.com. By eliminating the potential stress or intimidation of knowing who you're playing against, this extension allows you to focus on your strategy and enjoy the game. After the match ends, the opponent's name is revealed, providing a pleasant surprise and insight into who you faced.

## Key Features

- **Opponent Name Hider**: Hides the opponent's name across all possible locations on Chess.com during the game. 
- **Seamless Chat Integration**: Ensures the opponent's name remains hidden even when they initiate or participate in the chat.
- **Chess.com-Specific Activation**: The extension is designed to work only on Chess.com pages and does not interfere with other websites.

## Screenshots

### 1. **Start of the Game**
The opponent's name is hidden from the player upon the start of the game, ensuring anonymity throughout the match.

<img src="https://github.com/user-attachments/assets/dbfe2e48-6ee0-4f28-965f-b6e18aef6837" alt="Start of the Game" style="width:50%;">

---

### 2. **When Opponent Initiates Chat**
If the opponent sends a chat message, their name remains hidden in the chat interface.

![Chat Initiated by Opponent](https://github.com/user-attachments/assets/40fb737d-547e-4b63-b5de-e7fd7aea40d8)

---

### 3. **During Active Chat**
When chatting back and forth with your opponent, their name stays obscured, keeping the gameplay focused and unbiased.

![Active Chat](https://github.com/user-attachments/assets/80562011-9770-466f-95bd-5076b9863db5)

---

## How It Works

1. **Real-Time Name Hiding**: The extension uses javascript DOM manipulation to hide opponent names on all game-related interfaces.
2. **Dynamic Updates**: It handles various dynamic elements on Chess.com, ensuring the opponent's name remains hidden in real-time across different scenarios.
3. **Post-Game Reveal**: Once the match concludes, the opponent's name is revealed to the player.

## Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/yourusername/chess-name-hider.git
   ```
- Open Chrome and go to chrome://extensions.
- Enable "Developer mode" in the top-right corner.
- Click "Load unpacked" and select the folder containing the extension files.
- The extension will now be active and automatically enabled for Chess.com pages.
 
## Limitations
Visual Customization: Currently, the extension hides names using a predefined style. Future updates may allow customizable visuals.

## Feedback and Contributions
If you have ideas for improvements, encounter any issues, or want to contribute, feel free to open an issue or submit a pull request. Your feedback is highly appreciated!

