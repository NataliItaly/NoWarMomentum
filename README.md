# NoWar

This page is live at:

https://nataliitaly.github.io/NoWarMomentum/

# Synchronized Background Animation with Music

This is a creative web project that synchronizes background image animations with an audio track. The background visuals change in rhythm with the music, using timed sequences and smooth transitions.

## Features

- Audio playback with synchronized background visuals
- Preloaded background images for smooth animation
- Dynamic date, time, and days counter
- Random inspirational quotes
- Modular structure for better code organization

## How It Works

- The background changes are defined in a `sequence` with timestamps and animation details.
- Each sequence defines when to start, how many frames to display, and how long each frame lasts.
- Transitions and looping are handled automatically based on the audio's current time.
- Quotes and date/time elements are dynamically updated.

## File Structure

/assets
/bg-images → Background images in .webp format
/sounds → Audio file for playback

/scripts
preloadPaths.js → Generates and exports paths to preload images
setTime.js → Manages time, date, and war day counter
sequenceData.js → Contains the animation sequence data
animation.js → Controls the animation logic (start/stop loop)
player.js → Handles audio playback and syncing
quote.js → Displays random quotes
variables.js → Centralized DOM references
main.js → Entry point and event handling


## Getting Started

1. Clone the repository
2. Open `index.html` in a browser
3. Press "Listen" to start the experience

## Requirements

No build tools required. This is a static front-end project and runs entirely in the browser.

## Notes

- The audio file should be placed in `/assets/sounds/audio.mp3`
- Make sure all background images are inside `/assets/bg-images/` with correct folder/filename structure

## Technologies

- HTML5
- CSS3
- JavaScript (ES Modules)

## License

This project is for personal or educational use. Feel free to fork or adapt it.

All the pictures was taken from open sourses.
