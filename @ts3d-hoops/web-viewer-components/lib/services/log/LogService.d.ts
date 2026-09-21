import { CallbackMap, IWebViewer } from '@ts3d-hoops/web-viewer';
import { LogEntry, ILogService } from './types';
/**
 * Stateless log service that bridges the HOOPS Web Viewer with external log consumers.
 *
 * The service intercepts viewer callbacks (errors, warnings, timeouts, etc.) and
 * normalizes them into {@link LogEntry} objects dispatched as `hoops-log-service-entry`
 * custom events. It does not store log entries — consumers subscribe to events and
 * decide how to persist or display them.
 *
 * The service can also be used independently of the web viewer to emit application-level
 * log entries via the `log`, `debug`, `info`, `warn`, and `error` methods. Custom log
 * levels are supported through the `log` method by passing any string as the `level` field.
 *
 * The callback map can be replaced at runtime to customize which viewer events are
 * captured and how they are translated into log entries.
 *
 * @fires hoops-log-service-entry - Emitted for every log entry with an {@link LogEntry} detail payload
 * @fires hoops-log-service-reset - Emitted when the web viewer instance is changed
 *
 * @example
 * ```typescript
 * const logService = new LogService(webViewer);
 * logService.addEventListener('hoops-log-service-entry', (e) => {
 *   const entry = e.detail;
 *   showSnackbar(entry.level, entry.message);
 * });
 *
 * // Log application-level messages (no web viewer required)
 * logService.info('User opened settings panel');
 *
 * // Use a custom log level
 * logService.log({ level: 'trace', message: 'Entered rendering loop', context: { fps: 60 } });
 * ```
 */
export default class LogService extends EventTarget implements ILogService {
    /** The service identifier used for registry lookup. */
    readonly serviceName: "LogService";
    /** The underlying HOOPS Web Viewer instance. */
    private _webViewer?;
    /** Callback map registered on the web viewer to intercept events. */
    private _callbackMap;
    /**
     * Constructs a new LogService instance.
     *
     * @param webViewer - Optional web viewer instance to bind to immediately
     *
     * @example
     * ```typescript
     * // Create with immediate binding
     * const logService = new LogService(viewer);
     *
     * // Create without binding (can be set later)
     * const logService = new LogService();
     * logService.webViewer = viewer;
     * ```
     */
    constructor(webViewer?: IWebViewer);
    /**
     * Gets the current web viewer instance.
     *
     * @returns The web viewer instance, or undefined if not set
     */
    get webViewer(): IWebViewer | undefined;
    /**
     * Sets the web viewer instance.
     *
     * Unbinds from the previous viewer (if any), updates the reference, and binds
     * to the new viewer. Dispatches a `hoops-log-service-reset` event on change.
     *
     * @param webViewer - The new web viewer instance, or undefined to unbind
     *
     * @fires hoops-log-service-reset - When the web viewer reference changes
     */
    set webViewer(webViewer: IWebViewer | undefined);
    /**
     * Gets the current callback map registered on the web viewer.
     *
     * @returns A read-only reference to the active callback map
     */
    get callbackMap(): Readonly<CallbackMap>;
    /**
     * Replaces the callback map used to intercept web viewer events.
     *
     * Unbinds the previous map and binds the new one if a web viewer is set.
     *
     * @param callbackMap - The new callback map to register
     */
    set callbackMap(callbackMap: CallbackMap);
    /**
     * Registers the callback map on the web viewer.
     *
     * @internal
     * @throws Error if web viewer is not set
     */
    private bind;
    /**
     * Unregisters the callback map from the web viewer.
     *
     * @internal
     * @throws Error if web viewer is not set
     */
    private unbind;
    /**
     * Emits a log entry event with an automatically generated timestamp.
     *
     * @param entry - Log entry without the timestamp field
     *
     * @fires hoops-log-service-entry - Dispatched with the complete {@link LogEntry} as detail
     */
    log(entry: Omit<LogEntry, 'timestamp'>): void;
    /**
     * Emits a debug-level log entry.
     *
     * @param message - Human-readable debug message
     * @param context - Optional structured context for additional metadata
     */
    debug(message: string, context?: Record<string, unknown>): void;
    /**
     * Emits an info-level log entry.
     *
     * @param message - Human-readable informational message
     * @param context - Optional structured context for additional metadata
     */
    info(message: string, context?: Record<string, unknown>): void;
    /**
     * Emits a warn-level log entry.
     *
     * @param message - Human-readable warning message
     * @param context - Optional structured context for additional metadata
     */
    warn(message: string, context?: Record<string, unknown>): void;
    /**
     * Emits an error-level log entry.
     *
     * @param message - Human-readable error message
     * @param context - Optional structured context for additional metadata
     */
    error(message: string, context?: Record<string, unknown>): void;
    /**
     * Creates the default callback map that translates web viewer events into log entries.
     *
     * Handles: `info`, `missingModel`, `modelLoadFailure`, `timeout`,
     * `timeoutWarning`, `webGlContextLost`, `websocketConnectionClosed`, and `XHRonerror`.
     *
     * @param logger - The LogService instance used to emit log entries
     * @returns A CallbackMap suitable for registration on a web viewer
     */
    static getDefaultCallbackMap(logger: LogService): CallbackMap;
}
