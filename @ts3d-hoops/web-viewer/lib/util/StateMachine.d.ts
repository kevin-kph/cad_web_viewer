/**
 * @interface StateMachineAction common interface for action with and without payload.
 */
export interface StateMachineAction<ActionName, Payload = void> {
    name: ActionName;
    payload: Payload;
}
/**
 * @type {StateReducer<State, ActionNames>} The signature of the
 * function that will handle actions.
 *
 * It takes the current state and the action and returns the
 * next state.
 *
 * @param state the current state of the state machine
 * @param action the action that triggered the reducer
 *
 * @returns {State} the next state of the state machine
 */
export type StateReducer<State, ActionNames> = (state: State, action: StateMachineAction<ActionNames, any>) => State;
/**
 * @class StateMachine<State, ActionNames> is a minimalist state machine
 *
 * @typeParam {State} State The type of the state
 * @typeParam {ActionNames} ActionNames a string union of the action names
 */
export declare class StateMachine<State, ActionNames> {
    /**
     * @property {State} _state the current state of the StateMachine
     */
    private _state;
    /**
     * @property {StateReducer<State, ActionNames>} _reducer the reducer of the StateMachine
     */
    private _reducer;
    constructor(state: State, reducer: StateReducer<State, ActionNames>);
    /**
     * Handle an action and update the state
     *
     * @param evt The action to handle
     * @param payload The payload if any
     */
    handle(evt: ActionNames, payload?: any): void;
}
