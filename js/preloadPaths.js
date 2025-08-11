export const preloadedPaths = [
  'begin',
  'piano',
  ...generateImagesPaths('start1', 17),
  ...generateImagesPaths('start2', 19),
  ...generateImagesPaths('start3', 27),
  ...generateImagesPaths('explosion', 13),
  ...generateImagesPaths('police', 24),
  ...generateImagesPaths('slow', 14),
];

function generateImagesPaths(folder, quantity) {
  return Array.from({ length: quantity }, (_, i) => `${folder}/${i + 1}`);
}