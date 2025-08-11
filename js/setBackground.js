import {imageCache} from './preLoad.js'
import { BODY } from './variables.js';

export function setBackground(path) {
  const url = `assets/bg-images/${path}.webp`;
  if (imageCache[url]) {
    BODY.style.backgroundImage = `url('${url}')`;
  } else {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      imageCache[url] = true;
      BODY.style.backgroundImage = `url('${url}')`;
    };
  }
}
