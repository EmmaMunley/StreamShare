import { Message } from "../../interfaces/Message";
import { ChatActionType, ChatActionTypes } from "./actions";

export interface ChatState {
        username?: string;
        pendingUsername: string;
        messages: Message[];
        pendingMessage: string;
}

function initialState(): ChatState {
        return {
                username: undefined,
                pendingUsername: "",
                messages: [],
                pendingMessage: "",
        };
}

export function chatReducer(state: ChatState = initialState(), action: ChatActionType): ChatState {
        switch (action.type) {
                case ChatActionTypes.SEND_MESSAGE: {
                        // if (state.username) {
                        const message: Message = { message: action.payload.message, username: state.username || "delete_me_later" };
                        const messages = [...state.messages, message];
                        return { ...state, messages };
                        // }
                        // return state;
                }
                case ChatActionTypes.RECEIVE_MESSAGE: {
                        const messages = [...state.messages, action.payload];
                        return { ...state, messages };
                }
                case ChatActionTypes.UPDATE_PENDING_USERNAME: {
                        return { ...state, pendingUsername: action.payload.username };
                }
                case ChatActionTypes.SELECT_USERNAME: {
                        return { ...state, username: action.payload.username };
                }
        }
        return state;
}
