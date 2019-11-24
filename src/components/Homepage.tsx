import React, { ReactElement } from "react";
import { VideoPlayer } from "./VideoPlayer";
import Chat from "./Chat";

export class HomePage extends React.Component {
        render(): ReactElement {
                return (
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <VideoPlayer />
                                <Chat />
                        </div>
                );
        }
}
