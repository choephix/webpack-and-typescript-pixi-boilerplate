import { Texture } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { loadAssets } from './assets';
import { createContext } from './boot';

console.log(`Hey there`);

const context = createContext();

loadAssets().then(() => {
  const TEXTURE_URL = './eye.svg';
  const pikachu = new Sprite(Texture.from(TEXTURE_URL));
  context.app.stage.addChild(pikachu);
});

// const TEXTURE_URL =
//   'https://upload.wikimedia.org/wikipedia/en/a/a6/Pok%C3%A9mon_Pikachu_art.png';
// const pikachu = new Sprite(Texture.from(TEXTURE_URL));
// context.app.stage.addChild(pikachu);
