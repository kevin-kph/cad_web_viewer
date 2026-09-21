import { InfoType as i } from "@ts3d-hoops/web-viewer";
class s extends EventTarget {
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
  constructor(e) {
    super(), this.serviceName = "LogService", this._webViewer = e, this._callbackMap = s.getDefaultCallbackMap(this), this._webViewer && this.bind();
  }
  /**
   * Gets the current web viewer instance.
   *
   * @returns The web viewer instance, or undefined if not set
   */
  get webViewer() {
    return this._webViewer;
  }
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
  set webViewer(e) {
    this._webViewer !== e && (this._webViewer && this.unbind(), this._webViewer = e, this.dispatchEvent(
      new CustomEvent("hoops-log-service-reset", { bubbles: !0, composed: !0 })
    ), this._webViewer && this.bind());
  }
  /**
   * Gets the current callback map registered on the web viewer.
   *
   * @returns A read-only reference to the active callback map
   */
  get callbackMap() {
    return this._callbackMap;
  }
  /**
   * Replaces the callback map used to intercept web viewer events.
   *
   * Unbinds the previous map and binds the new one if a web viewer is set.
   *
   * @param callbackMap - The new callback map to register
   */
  set callbackMap(e) {
    this._callbackMap !== e && (this._webViewer && this.unbind(), this._callbackMap = e, this._webViewer && this.bind());
  }
  /**
   * Registers the callback map on the web viewer.
   *
   * @internal
   * @throws Error if web viewer is not set
   */
  bind() {
    if (!this._webViewer)
      throw new Error("Web viewer not set");
    this._webViewer.setCallbacks(this._callbackMap);
  }
  /**
   * Unregisters the callback map from the web viewer.
   *
   * @internal
   * @throws Error if web viewer is not set
   */
  unbind() {
    if (!this._webViewer)
      throw new Error("Web viewer not set");
    this._webViewer.unsetCallbacks(this._callbackMap);
  }
  /**
   * Emits a log entry event with an automatically generated timestamp.
   *
   * @param entry - Log entry without the timestamp field
   *
   * @fires hoops-log-service-entry - Dispatched with the complete {@link LogEntry} as detail
   */
  log(e) {
    const t = {
      ...e,
      timestamp: /* @__PURE__ */ new Date()
    };
    this.dispatchEvent(
      new CustomEvent("hoops-log-service-entry", {
        detail: t,
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * Emits a debug-level log entry.
   *
   * @param message - Human-readable debug message
   * @param context - Optional structured context for additional metadata
   */
  debug(e, t) {
    this.log({
      level: "debug",
      message: e,
      context: t
    });
  }
  /**
   * Emits an info-level log entry.
   *
   * @param message - Human-readable informational message
   * @param context - Optional structured context for additional metadata
   */
  info(e, t) {
    this.log({
      level: "info",
      message: e,
      context: t
    });
  }
  /**
   * Emits a warn-level log entry.
   *
   * @param message - Human-readable warning message
   * @param context - Optional structured context for additional metadata
   */
  warn(e, t) {
    this.log({
      level: "warn",
      message: e,
      context: t
    });
  }
  /**
   * Emits an error-level log entry.
   *
   * @param message - Human-readable error message
   * @param context - Optional structured context for additional metadata
   */
  error(e, t) {
    this.log({
      level: "error",
      message: e,
      context: t
    });
  }
  /**
   * Creates the default callback map that translates web viewer events into log entries.
   *
   * Handles: `info`, `missingModel`, `modelLoadFailure`, `timeout`,
   * `timeoutWarning`, `webGlContextLost`, `websocketConnectionClosed`, and `XHRonerror`.
   *
   * @param logger - The LogService instance used to emit log entries
   * @returns A CallbackMap suitable for registration on a web viewer
   */
  static getDefaultCallbackMap(e) {
    return {
      info: (t, r) => {
        switch (t) {
          case i.Info:
            e.info(r);
            return;
          case i.Warning:
            e.warn(r);
            return;
          case i.Error:
            e.error(r);
            return;
        }
      },
      missingModel: (t) => {
        e.error(`Missing model: ${t}`);
      },
      modelLoadFailure: (t, r, n) => {
        e.error(`Model load failure for model ${t}: ${r}`, { error: n });
      },
      timeout: () => {
        e.warn("Viewer timeout");
      },
      timeoutWarning: (t) => {
        e.warn(`Viewer timeout warning: ${t} minutes remaining`);
      },
      webGlContextLost: () => {
        e.error("WebGL context lost");
      },
      websocketConnectionClosed: () => {
        e.warn("WebSocket connection closed");
      },
      XHRonerror: (t) => {
        e.error("XHR error", { error: t.error });
      }
    };
  }
}
export {
  s as default
};
