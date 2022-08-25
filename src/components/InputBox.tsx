import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

interface Props {
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    handleChat: (e: React.FormEvent) => void;
}

const InputBox: React.FC<Props> = ({message, setMessage, handleChat}) => {

    return (
        <Form className='fixed-bottom' action='' onSubmit={(e)=>{
            handleChat(e);
        }}>
            <InputGroup >
                <Button id="emoji-addon" className='rounded-0'>
                    +
                </Button>
                <Form.Control 
                    autoComplete='off'
                    aria-label="Chat input box"
                    aria-describedby="submit-button"
                    value={message}
                    onChange={(e)=> {
                        setMessage(e.target.value);
                    }}
                    />
                <Button type="submit" id="submit-button" className='rounded-0'>
                    Send
                </Button>
            </InputGroup>
        </Form>
  )
}

export default InputBox