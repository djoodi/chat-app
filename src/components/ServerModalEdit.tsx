import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { IChannel } from '../models';
import { useAppSelector } from '../store/store';
import EditChannel from './EditChannel';

interface Props {
    closeEdit: () => void;
    showEditModal: boolean;
    editChannelsReq: (channels: IChannel[])=>void;
}

const ServerModalEdit: React.FC<Props> = ({closeEdit, showEditModal, editChannelsReq}) => {

    const channels = useAppSelector((state)=>state.channels.channels);
    const [channelsCopy, setChannelsCopy] = useState<IChannel[]>([...channels]);

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
                <Button variant="primary" onClick={() => { editChannelsReq(channelsCopy); closeEdit() }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ServerModalEdit