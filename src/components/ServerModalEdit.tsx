import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { ChannelInfo } from '../models';
import EditChannel from './EditChannel';

interface Props {
    showEditModal: boolean;
    closeEdit: () => void;
    editChannel: () => void;
    channelTitle: string;
    setChannelTitle: React.Dispatch<React.SetStateAction<string>>;
    channels: ChannelInfo[];
    setChannels: React.Dispatch<React.SetStateAction<ChannelInfo[]>>;
}



const ServerModalEdit: React.FC<Props> = ({
    showEditModal,
    closeEdit,
    editChannel,
    channelTitle,
    setChannelTitle,
    channels,
    setChannels
 }) => {

    const [channelsCopy, setChannelsCopy] = useState<ChannelInfo[]>(channels)

    return (
        <Modal centered show={showEditModal} onHide={closeEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Channels</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    channelsCopy.map((channel) => {
                        return (
                            <EditChannel key={channel.id} channelID={channel.id} title={channel.title} channelsCopy={channelsCopy} setChannelsCopy={setChannelsCopy}/>
                        )
                    })
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeEdit}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => { editChannel(); closeEdit() }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ServerModalEdit