# @ts3d-hoops/web-viewer-monolith

A self-contained version of the HOOPS Visualize Web Viewer that embeds the WebAssembly engine directly in the JavaScript bundle. This eliminates the need to serve the `engine.esm.wasm` file separately, making deployment simpler at the cost of a larger bundle size.

## When to use this package

Use `@ts3d-hoops/web-viewer-monolith` instead of `@ts3d-hoops/web-viewer` if:

- Your hosting environment makes it difficult to serve static `.wasm` files
- You want to avoid managing the separate WebAssembly engine file
- You prefer a single-file deployment approach
- Bundle size is less of a concern than deployment simplicity

For most use cases, we recommend starting with `@ts3d-hoops/web-viewer` as it offers better performance through smaller initial bundle sizes and optimized loading.

## Installation

```bash
npm install @ts3d-hoops/web-viewer-monolith
```

## Quick Start

```typescript
import '@ts3d-hoops/web-viewer-monolith';
import { WebViewer } from '@ts3d-hoops/web-viewer-monolith';

// Create a viewer instance
const viewer = new WebViewer({
  containerId: 'viewer-container',
  // Note: No need to specify enginePath with the monolith package
});

// Start the viewer
viewer.start();
```

```html
<!doctype html>
<html>
  <head>
    <title>HOOPS Web Viewer</title>
  </head>
  <body>
    <div id="viewer-container" style="width: 800px; height: 600px;"></div>

    <script type="module">
      import '@ts3d-hoops/web-viewer-monolith';
      import { WebViewer } from '@ts3d-hoops/web-viewer-monolith';

      const viewer = new WebViewer({
        containerId: 'viewer-container',
      });

      viewer.start();
    </script>
  </body>
</html>
```

## Key Differences from @ts3d-hoops/web-viewer

| Feature          | @ts3d-hoops/web-viewer             | @ts3d-hoops/web-viewer-monolith |
| ---------------- | ---------------------------------- | ------------------------------- |
| Bundle size      | Smaller (engine loaded separately) | Larger (engine embedded)        |
| Deployment       | Requires serving `engine.esm.wasm` | Single JS file                  |
| Network requests | Engine loaded on demand            | No additional requests          |
| Configuration    | Must specify `enginePath`          | No `enginePath` needed          |

## Loading Models

Once the viewer is running, you can load StreamCache models:

```typescript
// Load a model from a URL
await viewer.model.loadSubtreeFromUrl({
  url: 'path/to/your/model.scs',
  modelRootIds: [],
});

// Load from server streaming
await viewer.model.loadSubtreeFromServer({
  modelName: 'your-model-name',
  modelRootIds: [],
});
```

## TypeScript Support

This package includes full TypeScript definitions. All types and interfaces from `@ts3d-hoops/web-viewer` are available:

```typescript
import { WebViewer, Point3, Camera, SelectionManager } from '@ts3d-hoops/web-viewer-monolith';
```

## API Reference

This package re-exports the complete API from `@ts3d-hoops/web-viewer`. For detailed documentation on:

- Viewer configuration options
- Model loading and management
- Camera controls and navigation
- Selection and highlighting
- Markup and annotations
- Cutting planes and measurements

Please refer to the [@ts3d-hoops/web-viewer documentation](../web-viewer/README.md).

## Browser Support

- Chrome 88+
- Firefox 89+
- Safari 15+
- Edge 88+

WebAssembly and ES modules support required.

## License

This package is part of the HOOPS Visualize Web SDK. Please refer to your HOOPS license agreement for terms and conditions.
