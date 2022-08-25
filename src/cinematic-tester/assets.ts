import { Assets } from '@pixi/assets';
import type { AssetInitOptions } from '@pixi/assets';

export async function loadAssets() {
  const initOptions: AssetInitOptions = {
    basePath: './assets',
    manifest: "./manifest.json",
  };

  await Assets.init(initOptions);

  const loadScreenAssets = await Assets.loadBundle('load-screen');
  const gameScreenAssets = await Assets.loadBundle('game-screen');

  console.log({
    loadScreenAssets,
    gameScreenAssets,
  })

  return Assets.cache as any;
}
