# HOOPS Visualize Web Demo

A new web application with a modern stack to demonstrate the web viewer with the UI kits using React.

> This demo and its sources are in a beta state. Everything is subject to change.

## Requirements

A recent version of [Node.js](https://nodejs.org) (18 or higher) is required.

You also need [Yarn](https://yarnpkg.com/) to work with the sources.

## Ready to use version

A built version of the demo is available in the `web_viewer/demo-app` folder.

Navigate to the folder and run:

```
npx http-server -c-1 . -o "/?viewer=scs&model=models/scs/microengine.scs"
```

If prompted, install `http-server`. The command will automatically open your browser to the demo page.

Models are located in the `web_viewer/demo-app/models/scs` folder. You can add new SCS models to this folder and reference them using URL parameters (see Configuration section below).

## Sources to Explore

The source code for the demo is available in the `web_viewer/@ts3d-hoops/demo-app-src` folder.

This is a React application that uses [Vite](https://vite.dev/) for building and bundling.

You can copy SCS models into the `public` folder and configure the viewer using URL parameters (see Configuration section below).

### Setup

Run the following command to install dependencies:

```
yarn install
```

> **Note:** Due to a known bug in npm and the use of local npm packages for our web viewer and UI kits in sibling folders, you must use Yarn.
>
> See: [https://github.com/npm/cli/issues/3318](https://github.com/npm/cli/issues/3318)

### Run the Development Server

To start the development server, run:

```
yarn run dev
```

### Build the Application

To build the application, run:

```
yarn run build
```

### Preview the Build

To preview the build, run:

```
yarn run preview
```

## Configuration

The demo viewer can be configured through URL parameters:

### URL Parameters

- **viewer**: Viewer mode
  - `scs` - Local SCS file mode (default)
  - `csr` - Client-side rendering streaming mode
  - `ssr` - Server-side rendering streaming mode
- **model**: Model to load, empty by default
  - For `scs` mode: Path to SCS file (e.g., `models/scs/microengine.scs`)
  - For `csr`/`ssr` modes: Model name (e.g., `microengine`)
- **scHost** (only for streaming modes): StreamCache server hostname, use URL hostname by default
- **scPort** (only for streaming modes): StreamCache server port, use URL port by default
- **streamingMode** (only for CSR mode): Determines how items are streamed from server to client
  - `interactive` - Items are streamed interactively, given the camera position (default)
  - `all` - All items are streamed as soon as possible
  - `ondemand` - Items are streamed on demand, when they are explicitly requested by the viewer
  - `default` - Default interactive streaming mode

### Examples

**SCS Mode** (local file):

```
http://localhost:4200?viewer=scs&model=microengine.scs
```

**Client-Side Rendering Streaming Mode**:

```
http://localhost:4200?viewer=csr&scHost=localhost&scPort=9999&model=microengine
```

**Client-Side Rendering with Custom Streaming Mode**:

```
http://localhost:4200?viewer=csr&scHost=localhost&scPort=9999&model=microengine&streamingMode=ondemand
```

**Server-Side Rendering Streaming Mode**:

```
http://localhost:4200?viewer=ssr&scHost=localhost&scPort=9999&model=microengine
```
