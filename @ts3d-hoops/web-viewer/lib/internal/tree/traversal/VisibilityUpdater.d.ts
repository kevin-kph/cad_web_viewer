import { SetVisibility } from '@ts3d-hoops/streamcache';
import { AttachContext } from '../context/AttachContext';
import { AnyTreeNode } from '../node/types';
import { IVisibilityVisitor, VisibilityConfig, VisibilityFormatter, VisibilityUpdaterOptions, VisibilityVisitorOptions } from './types';
export declare class VisibilityUpdater {
    private _assemblyTree;
    private _engine;
    private _callbackManager?;
    private _startNode;
    private _setVisibility?;
    private _initiallyHiddenStayHidden?;
    private _configurationNode?;
    private _configuration;
    constructor(options: VisibilityUpdaterOptions);
    /**
     * Get the visibility formatter for the given attach context
     * @param attachContext the attach context
     * @param setVisibility the visibility directive to apply
     * @returns the default formatter for attach context
     */
    static getAttachContextFormatter(attachContext: AttachContext, setVisibility: SetVisibility): VisibilityFormatter;
    /**
     * Get the updater configuration
     */
    get configuration(): VisibilityConfig | null;
    /**
     * Generates the configuration for the updater
     *
     * Determine if the configuration we're activating has initially visible nodes or not.
     *
     * It also checks whether the configuration node is an ancestor of the start node. In this
     * case it tags the configuration so it knows the current branch contains the configuration.
     *
     * In the case of older SCs (pre 2022 SP1) non-default configurations had all their nodes
     * set to initially hidden. Since then that has been changed so that the initial visibility states
     * of nodes under configurations reflects their visibility when the configuration is activated.
     * Thus, we need to know which of those cases we're dealing with, by checking for any nodes set to be
     * initially shown.
     *
     * If we're working with configurations we may need to show initially hidden nodes
     * regardless of assembly tree settings.
     * We want to reveal hidden nodes if the configuration has marked them as hidden.
     * See comment the comment above for more details.
     *
     * @returns a promise resolving with the configuration
     */
    private _generateConfig;
    /**
     * Update the visibility of the bodies in the graphic engine.
     *
     * Once the assembly tree has been updated we need to tell the engine that some instances
     * need to be updated so that it can refresh the view.
     *
     * @param bodies the lists of the bodies to show and to hide
     */
    private _applyVisibilities;
    /**
     * Traverse the assembly tree within a walker to to allow the given visitor to update it.
     * @param visitor The visitor that will update the assembly tree
     * @param {optional} startNode The root of the traversal, default: the updater startNode
     */
    private traverse;
    /**
     * Initialize the configuration and the attach context if needed
     */
    init(): Promise<void>;
    /**
     * Not effect.
     * To allow inheriting classes to cool down or check result after the update.
     */
    quit(): Promise<void>;
    /**
     * Update the assembly tree and the view using the given visitor.
     * @param visitor the Visitor that will update the assembly tree.
     */
    update<T extends IVisibilityVisitor>(visitorType: new (o: VisibilityVisitorOptions, ...a: any[]) => T, options: Omit<VisibilityVisitorOptions, 'configuration'>, ...args: any[]): Promise<T>;
    /**
     * Update the assembly tree separately with each node as start node
     * @param visitor the visitor used to update the assembly.
     * @param nodeVisibilities the node roots and their visible status.
     */
    updatePerNode<T extends IVisibilityVisitor>(visitorType: new (o: VisibilityVisitorOptions, ...a: any[]) => T, nodeVisibilities: Map<AnyTreeNode, boolean>, options: Omit<VisibilityVisitorOptions, 'configuration'>, ...args: any[]): Promise<T>;
}
