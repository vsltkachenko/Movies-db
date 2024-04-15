import { Action } from "redux"

export interface ActionWithPayload<T> extends Action {
	payload: T
}

type ActionHandlers<S> = {
	[key: string]: (state: S, action: any) => S
}

export function createReducer<TState>(
	initialState: TState,
	handlers: ActionHandlers<TState>
) {
	return function (state: TState, action: Action) {
		state = state ?? initialState
		const handler = handlers[action.type]
		if (handler) {
			return handler(state, action)
		}
		return state
	}
}
