# Hoops Visualize Web Viewer

Hoops Visualize Web can be imported in different ways.

All of our libraries are formatted as npm packages in the `@ts3d-hoops` folder.

In an effort to modernize and improve our codebase, we've dedicated our best efforts to migrate it to use ES Modules and simplify integration for users of such systems.

As an alternative, the SDK is also available as IIFE and UMD.

## The ESM with npm (Recommended)

You can install the web-viewer package with npm and the install from a local path feature:

```bash
npm install path/to/@ts3d-hoops/web-viewer
```

We recommend placing the `@ts3d-hoops` folder under your web application project root folder due to an npm limitation. Alternatively, you can use Yarn. If not, sub-dependencies of `web-viewer` will not be linked in your `node_modules`.

The `engine.esm.wasm` file required by the web-viewer is located in the `@ts3d-hoops/sc-engine` folder. You may need to copy it to your public directory or use a framework-specific plugin to embed it in your application. Don't forget to update the `enginePath` attribute if needed.

Then, use our packages like any npm package in your code:

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
    <div id="viewerContainer" tabindex="0"></div>
    <!-- ... -->
    <script type="module" crossorigin src="main.js"></script>
  </body>
</html>
```

```js
import { WebViewer } from '@ts3d-hoops/hoops-web';

const container = document.getElementById('viewerContainer');
const hwv = new WebViewer({
  container,
  endpointUri: 'models/microengine.scs',
});
```

## The IIFE (Historical)

Historically, we have always provided the web viewer code as an IIFE (Immediately Invoked Function Expression), and we will continue to do so.

Required files:

```
engine.esm.wasm
hoops-web-viewer.iife.js
```

Your HTML should look like the following simple example:

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- ... -->
    <script type="text/javascript" src="./hoops-web-viewer.iife.js"></script>
  </head>
  <body>
    <!-- ... -->
    <div id="viewerContainer" tabindex="0"></div>
    <!-- ... -->
    <script type="text/javascript">
      const container = document.getElementById('viewerContainer');
      const hwv = new Communicator.WebViewer({
        container,
        endpointUri: 'models/microengine.scs',
      });

      /* ... */
    </script>
  </body>
</html>
```

You can see an example of using the IIFE in the samples as well.

## The UMD

Additionally, some users may use systems based on RequireJS and rely on AMD/UMD files.

In an attempt to provide the easiest to use SDK and facilitate integration in any environment

```
engine.esm.wasm
hoops-web-viewer.umd.js
```

The code should be very similar to what you're used to:

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- ... -->
    <script crossorigin src="./require.min.js"></script>
  </head>
  <body>
    <!-- ... -->
    <div id="viewerContainer" tabindex="0"></div>
    <!-- ... -->
    <script type="module">
      requirejs(['hoops-web-viewer.umd.js'], (Communicator) => {
        const hwv = new Communicator.WebViewer({
          container,
          endpointUri: 'models/microengine.scs',
        });

        /* ... */
      });
    </script>
  </body>
</html>
```

An example is available in the samples.

## Using TypeScript

Type declaration files are directly embedded in the npm packages.

ESM users can use `web_viewer/hoops-web-viewer.d.ts` and add it to their project either in their `tsconfig.json` or as a reference tag in their TypeScript files:

```typescript
/// <reference path="path/to/hoops-web-viewer.d.ts" />
```

We recommend our TypeScript users to consider using ESM in a TypeScript project.  
If you opt for IIFE or UMD, you can use `web_viewer/hoops-web-viewer.iife.d.ts` or `web_viewer/hoops-web-viewer.umd.d.ts`.

## Using the Monolith

It may be cumbersome to set the path to `engine.esm.wasm` in your project, and your bundler may complain about it, especially in development mode (bundlers generally do not like dynamic imports).  
To make your integration experience smoother, you can use one of the variants of our viewer code that corresponds to your import scheme (ESM, UMD, or IIFE) and contains the term "monolith" in its name (e.g., `hoops-web-viewer-monolith.js`, `hoops-web-viewer-monolith.umd.cjs`, or `hoops-web-viewer-monolith.iife.js`).

This allows you to completely avoid handling `engine.esm.wasm` in your configuration.

If you are using an npm-based approach, you can also benefit from the monolith feature.  
The first thing to do is to install the related package:

```bash
npm install path/to/@ts3d-hoops/web-viewer-monolith
```

Finally, you will need to add these lines in your product prior to calling the WebViewer constructor:

```ts
import '@ts3d-hoops/web-viewer-monolith';
```

Everything should work as expected.

> Using the monolith may result in a larger file size because the engine binary is stored directly in the code as a base64 string rather than as an external binary file.  
> On the other hand, the extra data is embedded within the code, so fewer files need to be queried via HTTP requests.
