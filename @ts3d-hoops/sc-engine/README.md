# @ts3d-hoops/sc-engine

WebAssembly engine for the HOOPS Visualize Web Viewer. This package distributes the low-level rendering/streaming engine used by `@ts3d-hoops/web-viewer`.

- Ships `engine.esm.wasm` and its ESM loader `engine.esm.js`
- ES module exports for modern bundlers
- Typed entry module for programmatic loading

## Installation

```bash
npm install @ts3d-hoops/sc-engine
```

## Typical usage with @ts3d-hoops/web-viewer

`@ts3d-hoops/web-viewer` looks for `engine.esm.wasm` at runtime. A common setup is to copy the wasm to your public/static folder and point the viewer to it using `enginePath`.

Example with Vite:

- Copy from: `node_modules/@ts3d-hoops/sc-engine/dist/engine.esm.wasm` (or from this package root if provided)
- Serve at: `/engine.esm.wasm`
- Create the viewer:

```ts
import WebViewer from '@ts3d-hoops/web-viewer';

const viewer = new WebViewer({
  container: document.getElementById('viewerContainer')!,
  endpointUri: '/models/microengine.scs',
  enginePath: '/engine.esm.wasm',
});

viewer.start();
```

Ensure your server sends `Content-Type: application/wasm` for `.wasm` files.

## TypeScript

This package ships type declarations for the entry module. The raw Emscripten types for the engine are generic; you’ll typically interact through `@ts3d-hoops/web-viewer` types instead.

## License

Commercial license. For evaluation or production licensing, contact Tech Soft 3D.
