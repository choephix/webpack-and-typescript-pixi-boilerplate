import { Assets } from '@pixi/assets';
import type { AssetInitOptions } from '@pixi/assets';

export async function loadAssets() {
  const initOptions: AssetInitOptions = {
    basePath: './assets',
    texturePreference: {
      resolution: [1],
      format: ['avif', 'webp', 'png', 'jpg', 'jpeg'],
    },
    manifest: {
      bundles: [
        {
          name: 'load-screen',
          assets: [
            {
              name: 'eye',
              srcs: 'eye.{svg,webp}',
            },
          ],
        },
        {
          name: 'game-screen',
          assets: [],
        },
      ],
    },
  };

  await Assets.init(initOptions);

  const loadScreenAssets = await Assets.loadBundle('load-screen');
  const gameScreenAssets = await Assets.loadBundle('game-screen');

  return Assets.cache as any;
}
