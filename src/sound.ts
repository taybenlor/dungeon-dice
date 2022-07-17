export const CLICK_SOUNDS = [
  "./sound/click_001.ogg",
  "./sound/click_002.ogg",
  "./sound/click_003.ogg",
  "./sound/click_004.ogg",
  "./sound/click_005.ogg",
];

export const OPEN_SOUNDS = ["./sound/doorOpen_1.ogg", "./sound/doorOpen_2.ogg"];

export const COIN_SOUNDS = [
  "./sound/handleCoins.ogg",
  "./sound/handleCoins2.ogg",
];

export const POWER_UP_SOUNDS = [
  "./sound/powerUp1.ogg",
  "./sound/powerUp2.ogg",
  "./sound/powerUp3.ogg",
  "./sound/powerUp4.ogg",
  "./sound/powerUp5.ogg",
  "./sound/powerUp6.ogg",
  "./sound/powerUp7.ogg",
  "./sound/powerUp8.ogg",
  "./sound/powerUp9.ogg",
  "./sound/powerUp10.ogg",
  "./sound/powerUp11.ogg",
  "./sound/powerUp12.ogg",
];

export const CLOSE_SOUNDS = [
  "./sound/close_001.ogg",
  "./sound/close_002.ogg",
  "./sound/close_003.ogg",
  "./sound/close_004.ogg",
];

export const GLITCH_SOUNDS = [
  "./sound/glitch_001.ogg",
  "./sound/glitch_002.ogg",
  "./sound/glitch_003.ogg",
  "./sound/glitch_004.ogg",
];

export function playSound(url: string) {
  new Audio(url).play();
}

export function playRandomSound(urls: string[]) {
  playSound(urls[Math.floor(Math.random() * urls.length)]);
}
