import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { IChannel } from '../models';

interface Props {
    channelID: string;
    title: string;
    channelsCopy: IChannel[],
    setChannelsCopy: React.Dispatch<React.SetStateAction<IChannel[]>>;
    
}

interface EditAction {
    channelID: string,
    channelTitle?: string,
    action: string, // rename, delete
}

const EditChannel: React.FC<Props> = ({ channelID, title }) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editChannel, setEditChannel] = useState<string>(title);

    const [edits, setEdits] = useState<EditAction[]>([{channelID: '', action: ''}]);

    const handleEdit = (e: React.FormEvent, edit: EditAction) => {
        e.preventDefault();

        if (!edits.find(x => x.channelID === edit.channelID))
            setEdits([...edits, edit]);
        else {
            const keep = edits.filter(e => e.channelID !== edit.channelID
            );
            setEdits([...keep, edit]);
        }
        
        setIsEditing(false);
    };

    const handleDelete = () => {

    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
      }, [isEditing]);

    return (
        <div className='d-flex justify-content-between align-items-center'>
            {isEditing? 
                <Form onSubmit={e => {handleEdit(e, {channelID, channelTitle: editChannel, action:'edit'})}} className='w-50'>
                    <InputGroup >
                        <InputGroup.Text>#</InputGroup.Text>
                        <Form.Control
                            type='text'
                            ref={inputRef}
                            value={editChannel.slice(1, editChannel.length)}
                            onChange={e=>setEditChannel('#'+e.target.value)} />
                    </InputGroup>
                </Form>
                
                :
                
                <p className='my-2'>{editChannel}</p>
            }
            
            <div>
                <Button variant='outline-primary' className='py-1 px-2' onClick={() => {setIsEditing(true)}}>Edit</Button>
                <Button variant='outline-danger' className='py-1 px-2 ms-2' onClick={() => { }}>Delete</Button>
            </div>
        </div>
    )
}

export default EditChannel