import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { IconContext } from 'react-icons'
import { BsGear } from 'react-icons/bs'
import { IChannel, IEditChannelAction } from '../models';
import { useAppSelector } from '../store/store';
import ServerModalEdit from './ServerModalEdit';
import ServerModalRename from './ServerModalRename';

interface Props {
    deleteServerReq: (arg:string)=>void;
    renameServerReq: (title: string)=>void;
    editChannelsReq: (actions: IEditChannelAction[])=>void;
}

const ServerInfo: React.FC<Props> = ({deleteServerReq, renameServerReq, editChannelsReq }) => {

    const selectedServerTitle = useAppSelector((state)=>state.servers.selectedServer.title);
    const selectedServerID = useAppSelector((state)=>state.servers.selectedServer.id);

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
                                <Dropdown.Item onClick={() => { showRename() }}>Rename Server</Dropdown.Item>
                                <Dropdown.Item onClick={() => { showEdit() }}>Edit Channels</Dropdown.Item>
                                <Dropdown.Item className='text-danger' onClick={() => deleteServerReq(selectedServerID)}>Delete Server</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    : null
                }
            </div >

            <ServerModalRename closeRename={closeRename} renameServerReq={renameServerReq} showRenameModal={showRenameModal}/>

            <ServerModalEdit closeEdit={closeEdit} showEditModal={showEditServerModal} editChannelsReq={editChannelsReq}/>

        </>
    )
}

export default ServerInfo