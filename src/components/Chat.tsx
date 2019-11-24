import React, { ReactNode } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import Redux from "redux";
import { ChatActionTypes, UpdatePendingUsernameAction, ChatActionType, SendMessageAction, ReceiveMessageAction } from "../store/chat/actions";
import { ChatState } from "../store/chat/reducer";
import io from "socket.io-client";
import { Message } from "../interfaces/Message";

// check url and port
const client = io('http://192.168.1.11:4040"');

interface DispatchProps {
        updateUsername: (username: string) => void;
        sendMessage: (message: string) => void;
        receiveMessage: (message: Message) => void;
}

// todo: define state type
const mapState = (state: RootState): ChatState => state.chat;

const mapDispatch = (dispatch: Redux.Dispatch<ChatActionType>): DispatchProps => ({
        updateUsername(username: string): void {
                // todo: break out into action creator file(s)
                const action: UpdatePendingUsernameAction = {
                        type: ChatActionTypes.UPDATE_PENDING_USERNAME,
                        payload: { username },
                };
                dispatch(action);
        },
        sendMessage(message: string): void {
                // todo: break out into action creator file(s)
                const action: SendMessageAction = {
                        type: ChatActionTypes.SEND_MESSAGE,
                        payload: { message },
                };
                dispatch(action);
                client.emit("message", { message });
        },
        receiveMessage(payload: Message): void {
                // todo: break out into action creator file(s)
                const action: ReceiveMessageAction = {
                        type: ChatActionTypes.RECEIVE_MESSAGE,
                        payload,
                };
                dispatch(action);
        },
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

interface State {
        message: string;
}

class Chat extends React.Component<Props, State> {
        state: State = {
                message: "",
        };

        constructor(props: Props) {
                super(props);
                this.updateMessage = this.updateMessage.bind(this);
        }

        componentDidMount(): void {
                client.connect();
                client.on("message", this.props.receiveMessage);
        }

        updateMessage(message: string): void {
                this.setState({ message });
        }

        render(): ReactNode {
                const message = this.state.message;
                return (
                        <div>
                                {this.props.messages.map(({ message, username }) => (
                                        <div>
                                                {username}: {message}
                                        </div>
                                ))}
                                <input type="text" value={message} onChange={(e): void => this.updateMessage(e.target.value)} />
                                <button onClick={(): void => this.props.sendMessage(message)}>Send message</button>
                        </div>
                );
        }
}

export default connector(Chat);
