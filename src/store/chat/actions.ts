export enum ChatActionTypes {
        SEND_MESSAGE = "sendMessage",
        RECEIVE_MESSAGE = "receiveMessage",
        SELECT_USERNAME = "selectUsername",
        UPDATE_PENDING_USERNAME = "updatePendingUsername",
}

export interface SendMessageAction {
        type: typeof ChatActionTypes.SEND_MESSAGE;
        payload: { message: string };
}

export interface ReceiveMessageAction {
        type: typeof ChatActionTypes.RECEIVE_MESSAGE;
        payload: { message: string; username: string };
}

export interface SelectUsernameAction {
        type: typeof ChatActionTypes.SELECT_USERNAME;
        payload: { username: string };
}

export interface UpdatePendingUsernameAction {
        type: typeof ChatActionTypes.UPDATE_PENDING_USERNAME;
        payload: { username: string };
}

export type ChatActionType = SendMessageAction | ReceiveMessageAction | SelectUsernameAction | UpdatePendingUsernameAction;
