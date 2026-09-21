# @ts3d-hoops/streamcache

Low-level streaming and rendering client used by the HOOPS Visualize Web Viewer. It connects the WebAssembly engine to the browser, manages the rendering canvas, and exposes a typed API for loading models, controlling view state, and handling selections.

Most applications should use `@ts3d-hoops/web-viewer`. Install `@ts3d-hoops/streamcache` if you need direct control over the engine lifecycle or are building your own viewer.

- Typed TypeScript API (classes and enums for camera, lights, selections, etc.)
- ESM-first, tree‑shakable
- Works with modern bundlers (Vite, Webpack, Rollup, esbuild)

## Installation

```bash
npm install @ts3d-hoops/streamcache
```

This package uses the HOOPS engine from `@ts3d-hoops/sc-engine` (installed as a dependency). You must serve the engine WebAssembly file and tell Streamcache where to find it.

## When to use @ts3d-hoops/web-viewer

`@ts3d-hoops/web-viewer` provides higher-level viewer features (UI, operators, services) built on top of Streamcache. Prefer it unless you specifically need low-level control.

## License

Commercial license. For evaluation or production licensing, contact Tech Soft 3D.
