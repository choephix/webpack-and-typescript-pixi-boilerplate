import { Application } from '@pixi/app';
import { Ticker } from '@pixi/ticker';

import { extensions } from '@pixi/extensions';

import { BatchRenderer } from '@pixi/core';
extensions.add(BatchRenderer);

import { InteractionManager } from '@pixi/interaction';
extensions.add(InteractionManager);

import { TilingSpriteRenderer } from '@pixi/sprite-tiling';
extensions.add(TilingSpriteRenderer);

import { BitmapFontLoader } from '@pixi/text-bitmap';
extensions.add(BitmapFontLoader);

export function createContext() {
  const app = new Application({
    backgroundColor: 0x101010,
    resolution: window.devicePixelRatio || 1,
    // resizeTo: parentElement,
    autoDensity: true,
    antialias: true,
    backgroundAlpha: 1,
  });
  document.body.appendChild(app.view);

  const ticker = new Ticker();
  ticker.add(() => app.render());
  ticker.start();

  const viewSize = {
    width: 0,
    height: 0,
  }; // Replace me with `new ViewSize()`

  ticker.add(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    viewSize.width = width;
    viewSize.height = height;
    app.renderer.resize(width, height);
  });

  return {
    app,
    ticker,
    viewSize,
  };
}
