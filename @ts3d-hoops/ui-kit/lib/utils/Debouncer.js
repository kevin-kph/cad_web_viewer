class o {
  /**
   * Creates a new Debouncer instance with the specified callback function.
   *
   * @param callback - The function to debounce. Can be synchronous or asynchronous.
   *
   * @example
   * ```typescript
   * const debouncer = new Debouncer((x: number, y: number) => x + y);
   * ```
   */
  constructor(e) {
    this.timeoutId = null, this.pendingPromise = null, this.callback = e;
  }
  /**
   * Schedules the callback to execute after the specified delay. If called again before
   * the delay elapses, the previous call is cancelled and a new delay period begins.
   *
   * @param delay - The number of milliseconds to wait before executing the callback
   * @param args - Arguments to pass to the callback function
   *
   * @returns A Promise that resolves with the callback's return value or rejects if:
   *   - The callback throws an error
   *   - The debounced call is cancelled via `clear()` or another `debounce()` call
   *
   * @example
   * ```typescript
   * const debouncer = new Debouncer((text: string) => text.toUpperCase());
   *
   * // Only the last call executes after 500ms
   * debouncer.debounce(500, 'first');  // Cancelled
   * debouncer.debounce(500, 'second'); // Cancelled
   * const result = await debouncer.debounce(500, 'third'); // Executes
   * console.log(result); // 'THIRD'
   * ```
   */
  debounce(e, ...n) {
    return this.clear(), new Promise((s, l) => {
      this.pendingPromise = { resolve: s, reject: l }, this.timeoutId = setTimeout(async () => {
        this.timeoutId = null;
        const t = this.pendingPromise;
        this.pendingPromise = null;
        try {
          const i = await this.callback(...n);
          t == null || t.resolve(i);
        } catch (i) {
          t == null || t.reject(i);
        }
      }, e);
    });
  }
  /**
   * Cancels any pending debounced execution. If a debounced callback is waiting to execute,
   * it will be cancelled and the associated Promise will reject with no error.
   *
   * This method is safe to call multiple times and can be called even when no execution
   * is pending.
   *
   * @example
   * ```typescript
   * const debouncer = new Debouncer(() => console.log('Execute'));
   *
   * const promise = debouncer.debounce(500);
   * debouncer.clear(); // Cancels the pending execution
   *
   * try {
   *   await promise;
   * } catch (error) {
   *   console.log('Execution was cancelled');
   * }
   * ```
   */
  clear() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.pendingPromise && (this.pendingPromise.reject(), this.pendingPromise = null);
  }
  /**
   * Indicates whether a debounced callback is currently waiting to execute.
   *
   * @returns `true` if a callback is scheduled to execute, `false` otherwise
   *
   * @example
   * ```typescript
   * const debouncer = new Debouncer(() => console.log('Execute'));
   *
   * console.log(debouncer.isPending); // false
   *
   * debouncer.debounce(500);
   * console.log(debouncer.isPending); // true
   *
   * await new Promise(resolve => setTimeout(resolve, 500));
   * console.log(debouncer.isPending); // false
   * ```
   */
  get isPending() {
    return this.timeoutId !== null;
  }
}
export {
  o as Debouncer
};
