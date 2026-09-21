import { CadView } from '../node/CadView';
import { Pmi } from '../node/Pmi';
import { ProductOccurrence } from '../node/ProductOccurrence';
import { AnyTreeNode, AnyBody } from '../node/types';
import { IVisibilityVisitor, NodeVisibilityConfig, VisibilityConfig, VisibilityFormatter, VisibilityVisitorOptions, VisibilityVisitorResult, VisibilityVisitorState } from './types';
export declare class VisibilityVisitor implements IVisibilityVisitor {
    /**
     * The visibility formatter to update the model
     */
    private _visibilityFormatter?;
    /**
     * Whether or not to reset non affected nodes
     */
    private _resetNonAffectedToDefault;
    /**
     * Whether or not to reset non affected pmis.
     * If undefined Pmis follow _resetNonAffectedToDefault
     */
    private _resetNonAffectedPmiToDefault?;
    /**
     * The visibility configuration of the visitor.
     */
    private _configuration;
    /**
     * The current state of the visitor
     */
    private _state;
    constructor(options: VisibilityVisitorOptions);
    /**
     * Get the visibility formatter of the updater.
     */
    get visibilityFormatter(): VisibilityFormatter | undefined;
    /**
     * Set the visibility formatter of the updater.
     * @param func the formatter to use.
     */
    set visibilityFormatter(func: VisibilityFormatter | undefined);
    /**
     * The currently visited node
     */
    protected get currentNode(): AnyTreeNode | null;
    /**
     * Getter for the visitor's configuration
     */
    protected get configuration(): VisibilityConfig;
    /**
     * Getter for the current node's configuration
     */
    protected get nodeConfiguration(): NodeVisibilityConfig | null;
    /**
     * Getter for the output visibility for the current node
     */
    protected get appliedVisibility(): boolean | null;
    /**
     * Getter for the visitor's state
     */
    get state(): VisibilityVisitorState;
    /**
     * Getter for the visit result
     *
     * Mainly the bodies to update.
     */
    get result(): VisibilityVisitorResult;
    /**
     * Update the visitor state and set the node visibility
     * @param node the node to update
     */
    protected _updateNodeVisibility(node: AnyTreeNode): void;
    /**
     * Get the visibility config for the current node
     * it contains several fields:
     * explicitVisibility: the value of the node from the visibilityFormatter for the current
     * node, if any visible: whether or not the current node is visible initiallyShown: the node
     * initial visibility
     * initiallyOrConfigurationShown: if configuration.initially.shown is true it
     * returns initiallyShown, otherwise it return initiallyShown or true if the configuration
     * is on the same branch.
     * @returns The current node visibility config
     */
    protected _getVisibilityConfig(): NodeVisibilityConfig;
    /**
     * Get the visibility for a PmiBody node
     *
     * For PMI we allow to switch them to visible if you just set the visibility on the PMI
     * (not its body instance subnode), it's because we don't display the PMI body instance in
     * the tree anymore.
     * @returns true or null
     */
    protected _getPmiBodyVisibility(): true | null;
    /**
     * If a node is initially hidden and has no explicit visibility set then we keep it
     * hidden by returning null, except for a some exceptions like PmiBody nodes.
     * @returns Null for regular node a boolean otherwise.
     */
    protected _getInitiallyHiddenNodeVisibility(): boolean | null;
    /**
     * Get the inherited visibility value of the node
     * @returns The inherited visibility value of the node if it's different than its current visibility or null
     */
    protected _getInheritedVisibility(): boolean | null;
    /**
     * When a node is not affected by the traversal, it visibility status is reinitialized if
     * resetNonAffectedToDefault is set and if its not already set to the expected value.
     * When resetNonAffectedPmiToDefault is defined it will be applied on pmis in place of resetNonAffectedToDefault, if it's not defined pmis follow resetNonAffectedToDefault
     * @returns The new visibility status if it's different from the current, null otherwise
     */
    protected _handleNonAffectedNodeVisibility(): boolean | null;
    /**
     * Get the visibility status of the current node
     * @param preventFromResetting whether or not unaffected node will be reinitialized
     * @returns The new visibility status of the node if it's different from the current one, null otherwise
     */
    protected _getNodeVisibility(preventFromResetting: boolean): boolean | null;
    /**
     * Update the state of the visitor.
     * It set the given node as the current node, generates it visibility config, update the
     * hierarchy and compute the new visibility status.
     * @param node The current node to visit
     * @param preventFromResetting whether or not to reinitialize the node if its not affected.
     */
    protected _updateVisitorState(node: AnyTreeNode, preventFromResetting: boolean): void;
    /**
     * When the node is left it's popped out of the hierarchy
     */
    leaveNode(): void;
    /**
     * Check whether or not the current node is the configuration node and update the visibility.
     * If it is the configuration node it tags the config so the visitor knows the current
     * branch contains the configuration node.
     *
     * @param node the current node
     */
    enterProductOccurrence(node: ProductOccurrence): void;
    /**
     * Check whether or not the current node is the configuration node and update the visibility.
     * If it is the configuration node it removes the tag so the visitor knows the current
     * branch does not contains the configuration node anymore.
     * @param node
     */
    leaveProductOccurrence(node: ProductOccurrence): void;
    /**
     * Updates visibility for Pmi node
     * @param pmi the current Pmi Node
     */
    enterPmi(pmi: Pmi): void;
    /**
     * Pops Pmi from hierarchy
     * @param _ not used
     */
    leavePmi(_: Pmi): void;
    /**
     * Updates visibility for CadView node
     * @param cadView the current CadView Node
     */
    enterCadView(cadView: CadView): void;
    /**
     * Pops CadView from hierarchy
     * @param _ not used
     */
    leaveCadView(_: CadView): void;
    /**
     * Updates the visitor's state and apply the new visibility status if any. If the Visibility
     * changes the body is stored in the list of the bodies to hide or to show depending of it's
     * new status.
     * @param body the current AnyBody node
     */
    enterAnyBody(body: AnyBody): void;
    /**
     * Pops AnyBody from hierarchy
     * @param _ not used
     */
    leaveAnyBody(_: AnyBody): void;
}
