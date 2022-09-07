import React, { useState } from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { IconContext } from 'react-icons'
import { BsGear } from 'react-icons/bs'
import { ChannelInfo } from '../models';
import ServerModalEdit from './ServerModalEdit';
import ServerModalRename from './ServerModalRename';

interface Props {
    selectedServerTitle: string;
    deleteServer: () => void;
    serverTitle: string;
    setServerTitle: React.Dispatch<React.SetStateAction<string>>;
    renameServer: () => void;
    editChannel: () => void;
    channelTitle: string;
    setChannelTitle: React.Dispatch<React.SetStateAction<string>>;
    channels: ChannelInfo[];
    setChannels: React.Dispatch<React.SetStateAction<ChannelInfo[]>>
}

const ServerInfo: React.FC<Props> = ({
    selectedServerTitle,
    deleteServer,
    serverTitle,
    setServerTitle,
    renameServer,
    editChannel,
    channelTitle,
    setChannelTitle,
    channels,
    setChannels
}) => {

    const [showEditServerModal, setShowEditServerModal] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);

    const closeRename = () => setShowRenameModal(false);
    const showRename = () => setShowRenameModal(true);
    const closeEdit = () => setShowEditServerModal(false);
    const showEdit = () => setShowEditServerModal(true);

    return (
        <>
            <div id='serverInfo' className='d-flex justify-content-between border-bottom border-3'>
                <h6 className='text-muted p-2 m-0'>{selectedServerTitle}</h6>
                {selectedServerTitle ?
                    <div>
                        <Dropdown align='end'>
                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-server">
                                <IconContext.Provider value={{ className: "react-icons mb-1" }}>
                                    <BsGear />
                                </IconContext.Provider>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => { setServerTitle(selectedServerTitle); showRename() }}>Rename Server</Dropdown.Item>
                                <Dropdown.Item onClick={() => { showEdit() }}>Edit Channels</Dropdown.Item>
                                <Dropdown.Item className='text-danger' onClick={() => deleteServer()}>Delete Server</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    : null
                }
            </div >

            <ServerModalRename
                showRenameModal={showRenameModal}
                closeRename={closeRename}
                serverTitle={serverTitle}
                setServerTitle={setServerTitle}
                renameServer={renameServer}
            />

            <ServerModalEdit
                showEditModal={showEditServerModal}
                closeEdit={closeEdit}
                channelTitle={channelTitle}
                setChannelTitle={setChannelTitle}
                editChannel={editChannel}
                channels={channels}
                setChannels={setChannels}
            />

        </>
    )
}

export default ServerInfo