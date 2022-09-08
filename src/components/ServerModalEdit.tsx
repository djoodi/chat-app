import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { IChannel, IEditChannelAction } from '../models';
import { useAppSelector } from '../store/store';
import EditChannel from './EditChannel';

interface Props {
    closeEdit: () => void;
    showEditModal: boolean;
    editChannelsReq: (channels: IChannel[]) => void;
}

const ServerModalEdit: React.FC<Props> = ({ closeEdit, showEditModal, editChannelsReq }) => {

    const channels = useAppSelector((state) => state.channels.channels);
    const [copies, setCopies] = useState<IChannel[]>([]);
    const [actions, setActions] = useState<IEditChannelAction[]>([]);

    const handleClose = () => {
        closeEdit();
        setCopies(channels.slice()); // reset copy
        setActions([]);
    }

    const pushChanges = () => {
        editChannelsReq([]);
        handleClose();
    }

    useEffect(() => {
        setCopies(channels.slice())
        return () => {
        }
    }, [channels])

    return (
        <Modal centered show={showEditModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Channels</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    copies.map((channel) => {
                        return (
                            <EditChannel key={channel.id} channelID={channel.id} title={channel.title} actions={actions} setActions={setActions} copies={copies} setCopies={setCopies}/>
                        )
                    })
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={pushChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ServerModalEdit