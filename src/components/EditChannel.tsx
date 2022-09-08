import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { IChannel, IEditChannelAction } from '../models';

interface Props {
    channelID: string;
    title: string;
    actions: IEditChannelAction[];
    setActions: React.Dispatch<React.SetStateAction<IEditChannelAction[]>>;
    copies: IChannel[];
    setCopies: React.Dispatch<React.SetStateAction<IChannel[]>>;
}



const EditChannel: React.FC<Props> = ({ channelID, title, actions, setActions, copies, setCopies }) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [channelTitle, setChannelTitle] = useState<string>(title);
    

    const inputRef = useRef<HTMLInputElement>(null);

    const queueEditAction = (e: React.FormEvent, action:IEditChannelAction) => {
        e.preventDefault();
        console.log(action);
        // checks if action already exists in queue
        const match = actions.findIndex(x => x.payload.id === action.payload.id);
        if (match !== -1) {
            setActions(actions.map((x, i) => {
                if (i === match) return {...x, payload: {...x.payload, title: action.payload.title}};
                else return x;
            }));
        } else {
            setActions([...actions, action]);
        }

        setIsEditing(false);

    }

    const queueDeleteAction = (action:IEditChannelAction) => {
        // checks if channel has an edit action queued. if so, remove
        const match = actions.findIndex(x => x.payload.id === action.payload.id);
        if (match !== -1) {
            setActions(actions.map((x , i) => {
                if (i === match) return action;
                else return x;
            }));
        } else {
            setActions([...actions, action]);
        }
        setCopies(copies.filter(channel => channel.id !== action.payload.id));
    }

    const displayTitle = () => {
        return channelTitle? channelTitle.replace(' ', '-') : '';
    }

    useEffect(() => {
        inputRef.current?.focus();
      }, [isEditing]);

    return (
        <div className='d-flex justify-content-between align-items-center'>
            {isEditing? 
                <Form onSubmit={(e)=>{queueEditAction(e, {type: 'EDIT', payload: {id: channelID, title: channelTitle}})}} className='w-50'>
                    <InputGroup >
                        <InputGroup.Text>#</InputGroup.Text>
                        <Form.Control
                            type='text'
                            ref={inputRef}
                            value={channelTitle.slice(1, channelTitle.length)}
                            onChange={e=>setChannelTitle('#'+e.target.value)} />
                    </InputGroup>
                </Form>
                
                :
                
                <p className='my-2'>{displayTitle()}</p>
            }
            
            <div>
                <Button variant='outline-primary' className='py-1 px-2' onClick={() => {setIsEditing(true)}}>Edit</Button>
                <Button variant='outline-danger' className='py-1 px-2 ms-2' onClick={() => {queueDeleteAction({type:'DELETE', payload:{id: channelID}})}}>Delete</Button>
            </div>
        </div>
    )
}

export default EditChannel