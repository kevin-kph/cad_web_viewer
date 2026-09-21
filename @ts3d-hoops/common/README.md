# @ts3d-hoops/common

Foundational math and utility types used across HOOPS web packages. This lightweight library provides vectors, matrices, colors, boxes, quaternions, planes, and related helpers—written in TypeScript with bundled type definitions.

- Zero-dependency runtime
- Tree‑shakable ES modules
- Fully typed API

## Installation

```bash
npm install @ts3d-hoops/common
```

## Quick start

```ts
import { Point3, Matrix, Color, Box, Quaternion, Plane } from '@ts3d-hoops/common';

const a = new Point3(1, 2, 3);
const b = new Point3(4, 5, 6);
const mid = Point3.scale(Point3.add(a, b), 0.5);

const rot = Quaternion.fromAxisAngle(new Point3(0, 1, 0), Math.PI / 2);
const m = Matrix.rotation(rot);
const transformed = Matrix.transformPoint(m, mid);

const red = new Color(255, 0, 0);
const box = new Box(a, b);
```

## What’s inside

- Math primitives: `Point2`, `Point3`, `Point4`, `Quaternion`, `Matrix`, `Plane`, `Ray`
- Geometry helpers: `Box`
- Rendering helpers: `Color`
- Utilities: `Unicode`
- Types: shared enums and type aliases

Import paths follow a flat structure. You can import from the package root for convenience:

```ts
import { Point2, Point3, Matrix } from '@ts3d-hoops/common';
```

## API highlights

- Immutable-style helpers alongside class methods (e.g., `Point3.add`, `Matrix.multiply`)
- Factory helpers (e.g., `Color.white()`, `Quaternion.identity()`)
- Copy/clone methods to avoid mutating inputs

## TypeScript

Type definitions are bundled. No extra configuration is required. The library targets modern TypeScript/ESM projects and works with common bundlers (Vite, Webpack, Rollup, esbuild).

## Versioning and compatibility

`@ts3d-hoops/common` is designed to be shared by `@ts3d-hoops/web-viewer` and related packages. Keep versions aligned across the HOOPS packages in your project when possible.

## License

Commercial license. For evaluation or production licensing, contact Tech Soft 3D.
