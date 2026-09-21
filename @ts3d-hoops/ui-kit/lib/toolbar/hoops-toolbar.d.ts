import { LitElement } from 'lit';
/**
 * A basic vertical toolbar component for stacking buttons and other interactive elements.
 *
 * This component provides a flexible container with consistent spacing and alignment
 * for toolbar buttons. It automatically arranges child elements vertically with
 * proper gaps and centers them within a fixed-width container.
 *
 * @element hoops-toolbar
 *
 * @slot - Default slot for toolbar buttons and other interactive elements
 *
 * @cssprop --hoops-dropdown-gap - Gap spacing for dropdown elements within the toolbar (default: 0.8rem)
 *
 * @example
 * ```html
 * <hoops-toolbar>
 *   <button>Button 1</button>
 *   <button>Button 2</button>
 *   <button>Button 3</button>
 * </hoops-toolbar>
 *
 * <script>
 *   const toolbar = document.getElementsByTagName("hoops-toolbar")[0];
 *   // Toolbar will automatically arrange children vertically
 * </script>
 * ```
 *
 * @since 2025.7.0
 */
export declare class Toolbar extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /** @internal */
    protected render(): unknown;
}
export default Toolbar;
