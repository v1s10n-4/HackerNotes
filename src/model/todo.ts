export interface Todo {
	id: string;
	text: string;
	completed: boolean;
}

export enum TodoActions {
	ADD_TODO = 'ADD_TODO',
	DELETE_TODO = 'DELETE_TODO',
	COMPLETE_TODO = 'COMPLETE_TODO',
	UNCOMPLETE_TODO = 'UNCOMPLETE_TODO',
}

interface TodoActionType<T, P> {
	type: T;
	payload: P;
}

export type TodoAction =
	| TodoActionType<typeof TodoActions.ADD_TODO, Todo>
	| TodoActionType<typeof TodoActions.COMPLETE_TODO, string>
	| TodoActionType<typeof TodoActions.UNCOMPLETE_TODO, string>
	| TodoActionType<typeof TodoActions.DELETE_TODO, string>;
