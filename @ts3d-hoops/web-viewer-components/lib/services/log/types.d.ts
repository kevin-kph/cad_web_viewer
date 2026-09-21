import { IService } from '../types';
/**
 * Built-in log level names. These are the standard levels recognized by the log service, but the service also accepts
 * arbitrary string values for custom levels.
 */
export declare const LogLevelNames: readonly ["debug", "info", "warn", "error"];
/**
 * Union of built-in log level names.
 */
export type LogLevelName = (typeof LogLevelNames)[number];
/**
 * Log level identifier. Accepts the built-in levels (`debug`, `info`, `warn`, `error`)
 * as well as arbitrary string values for custom levels.
 */
export type LogLevel = LogLevelName | (string & {});
/**
 * Represents a single log entry emitted by the log service.
 */
export type LogEntry = {
    /** Timestamp at which the log entry was created. */
    timestamp: Date;
    /** Severity level of the log entry. */
    level: LogLevel;
    /** Human-readable log message. */
    message: string;
    /** Optional structured context attached to the log entry. */
    context?: Record<string, unknown>;
};
/**
 * Stateless service interface for log propagation.
 *
 * Acts as a bridge between the web viewer and consumer code. Each call emits a
 * `hoops-log-service-entry` event containing an  {@link LogEntry}. The service
 * does not store entries — consumers are responsible for persistence, display, or forwarding.
 *
 * @example
 * ```typescript
 * const logService = getService<ILogService>('LogService');
 * logService.addEventListener('hoops-log-service-entry', (e) => {
 *   console.log(e.detail);
 * });
 * logService.warn('Connection unstable', { latency: 350 });
 * ```
 */
export interface ILogService extends IService {
    /**
     * Emits a log entry with the given level, message, and optional context.
     *
     * @param entry - Log entry without the timestamp (added automatically)
     */
    log(entry: Omit<LogEntry, 'timestamp'>): void;
    /**
     * Emits a debug-level log entry.
     *
     * @param message - Human-readable debug message
     * @param context - Optional structured context
     */
    debug(message: string, context?: Record<string, unknown>): void;
    /**
     * Emits an info-level log entry.
     *
     * @param message - Human-readable informational message
     * @param context - Optional structured context
     */
    info(message: string, context?: Record<string, unknown>): void;
    /**
     * Emits a warn-level log entry.
     *
     * @param message - Human-readable warning message
     * @param context - Optional structured context
     */
    warn(message: string, context?: Record<string, unknown>): void;
    /**
     * Emits an error-level log entry.
     *
     * @param message - Human-readable error message
     * @param context - Optional structured context
     */
    error(message: string, context?: Record<string, unknown>): void;
}
