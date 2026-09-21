import { Projection as WebViewerProjection, OrbitFallbackMode as WebViewerOrbitFallbackMode } from '@ts3d-hoops/web-viewer';
import { Projection as ServiceProjection, OrbitFallbackMode as ServiceOrbitFallbackMode } from './types';
export declare function toServiceProjectionMode(projection: WebViewerProjection): ServiceProjection;
export declare function toWebViewerProjectionMode(projection: ServiceProjection): WebViewerProjection;
export declare function toServiceOrbitFallbackMode(mode: WebViewerOrbitFallbackMode): ServiceOrbitFallbackMode;
export declare function toWebViewerOrbitFallbackMode(mode: ServiceOrbitFallbackMode): WebViewerOrbitFallbackMode;
