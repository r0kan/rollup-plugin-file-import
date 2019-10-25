import imagePng from './image.png';
import imageSvg from './image.svg';

import('./chunk.js').then(d => {
  d.getImage();
});
