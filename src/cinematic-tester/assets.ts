import { Loader, LoaderResource } from "@pixi/loaders";

const assetsNamed = {
  eye: "./eye.svg"
}

const assetsUnnamed = [
]

export function loadAssets() {
  const loader = new Loader();

  for (const key in assetsNamed) {
    const path = assetsNamed[key];
    loader.add(key, path);
  }

  for (const path of assetsUnnamed) {
    loader.add(path);
  }

  const promise = new Promise<Record<string, LoaderResource>>(
    (resolve) => {
      loader.load(
        (loader, resource) => {
          resolve(resource);
        }
      )
    }
  )

  return promise;
}