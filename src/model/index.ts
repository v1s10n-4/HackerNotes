import { TodoAction } from './todo';
import { ConfigAction } from './config';
import { NoteAction } from './note';

export * from './config';
export * from './todo';
export * from './note';


export type Action =
    | ConfigAction | TodoAction | NoteAction;
