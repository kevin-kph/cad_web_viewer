# @ts3d-hoops/web-viewer

Embeddable 2D/3D viewer for the web. This package exposes the HOOPS Visualize Web Viewer as a modern TypeScript/ESM library.

- Render large CAD models (as StreamCache files) locally or from a server
- Interact with camera, selection, markup, cutting planes, measurements, floorplan overlay, etc.
- First-class TypeScript typings included

## Installation

```bash
npm install @ts3d-hoops/web-viewer
```

The viewer requires a WebAssembly engine binary named `engine.esm.wasm` at runtime. If you use a bundler (Vite, Webpack, etc.), place this file where it can be served publicly and, if needed, set `enginePath` in the constructor options.

By default the file is provided by the engine package. A common approach is to copy it to your public folder:

- Copy from: `node_modules/@ts3d-hoops/sc-engine/dist/engine.esm.wasm`
- Serve at: `/engine.esm.wasm`
- Pass: `enginePath: '/engine.esm.wasm'`

This can be achieved by your bundler, here is an example using vite:

```typescript
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: '../@ts3d-hoops/sc-engine/engine.esm.wasm',
          dest: '/',
        },
      ],
    }),
  ],
});
```

> Tip: If you prefer not to manage `engine.esm.wasm`, use the monolith package `@ts3d-hoops/web-viewer-monolith` (see below).

## Quick start (ES Modules)

HTML

```html
<div id="viewerContainer" tabindex="0" style="width:100%;height:100vh"></div>
```

TypeScript/JavaScript

```ts
import WebViewer from '@ts3d-hoops/web-viewer';

const container = document.getElementById('viewerContainer');
if (!container) throw new Error('Missing #viewerContainer');

const viewer = new WebViewer({
  container, // or: containerId: 'viewerContainer'
  endpointUri: 'models/microengine.scs',
  enginePath: '/engine.esm.wasm', // omit when using the monolith package
});

viewer.setCallbacks({
  sceneReady: () => console.log('Scene ready'),
  firstModelLoaded: () => console.log('Model loaded'),
});

viewer.start();
window.addEventListener('resize', () => viewer.resizeCanvas());
```

### Loading from memory (no URL)

```ts
// ArrayBuffer or Uint8Array containing a .scs file
const buffer = await fetch('/models/microengine.scs').then((r) => r.arrayBuffer());

const viewer = new WebViewer({
  container: document.getElementById('viewerContainer')!,
  buffer: new Uint8Array(buffer),
  enginePath: '/engine.esm.wasm',
});

viewer.start();
```

## Using the Monolith (no wasm file to host)

If your setup struggles with serving `engine.esm.wasm`, install the monolith variant. It embeds the engine directly in the JS bundle.

```bash
npm install @ts3d-hoops/web-viewer-monolith
```

Add this import before constructing the viewer:

```ts
import '@ts3d-hoops/web-viewer-monolith';
```

You can then omit `enginePath` in the viewer options.

> Note: The monolith increases bundle size because it inlines the engine, but avoids extra network requests.

## IIFE/UMD usage

If you prefer script tags instead of ESM:

- IIFE: include `hoops-web-viewer.iife.js` and use `new Communicator.WebViewer({...})`
- UMD: include `hoops-web-viewer.umd.js` via a loader (e.g., RequireJS) and use `Communicator.WebViewer`

## TypeScript

Type definitions are bundled. Import types and namespaces directly:

```ts
import WebViewer, { core, Operators, Selection, Event } from '@ts3d-hoops/web-viewer';
```

## Common options

- `container` or `containerId`: Mount target for the canvas and UI elements
- `endpointUri`: URL of an `.scs` file to load
- `buffer`: SCS data as `Uint8Array`/`ArrayBuffer` (alternative to `endpointUri`)
- `enginePath`: Public path to `engine.esm.wasm` (not needed with monolith)
- Other settings such as renderer type, streaming mode, default camera, etc. are available via the viewer config.

## Basic interactions

```ts
// Select, measure, cutting planes, etc. are available via managers and operators
viewer.operatorManager; // interact with input operators
viewer.model; // access model tree and geometry queries
viewer.view; // camera, overlays (NavCube, AxisTriad), floorplan

// Listen to events
viewer.setCallbacks({
  selectionArray: (events) => console.log('Selection events:', events),
  modelSwitched: () => console.log('Model switched'),
});
```

## Serving the engine (wasm) correctly

Ensure your server serves `engine.esm.wasm` with MIME type `application/wasm`. Most frameworks handle this automatically when the file is in the public/static directory.

## Support

- Issues: please include browser, OS, and reproduction steps/code.
- For commercial support, contact Tech Soft 3D.
