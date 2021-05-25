import { ConfigAction } from './config';
import { NoteAction } from './note';

export * from './config';
export * from './note';

export type Action = ConfigAction | NoteAction;
