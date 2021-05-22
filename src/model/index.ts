
    import { TodoAction } from './todo';
    import { ConfigAction } from './config';

export * from './config';
export * from './todo';


export type Action =
    | ConfigAction | TodoAction;
