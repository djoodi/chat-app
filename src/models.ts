export interface IAuth {
    username: string;
    password: string;
}

export interface IServer {
    id: string;
    title: string;
}

export interface IChannel {
    id: string;
    title: string;
}

export interface IEditChannelAction {
    type: string;
    payload: {id: string, title?: string}
}

export interface IMember {
    id: string;
    username: string;
    online: boolean;
}