export const imageCache = {};

export function preloadImages(paths, folder = 'assets/bg-images') {
  paths.forEach((path) => {
    const url = `${folder}/${path}.webp`;
    if (!imageCache[url]) {
      const img = new Image();
      img.src = url;
      imageCache[url] = true;
    }
  });
}
