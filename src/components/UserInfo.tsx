import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { BsGear } from 'react-icons/bs';

interface Props {
  logout: ()=>void;
  username: string;
}

const UserInfo: React.FC<Props> = ({logout, username}) => {
  return (
    <div id='userInfo' className='border-top border-3 m-0 d-flex justify-content-between'>
      <h6 className='text-muted p-2'>{username}</h6>
      <div>
        <Dropdown align='end'>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-user">
            <IconContext.Provider value={{ className: "react-icons mb-1" }}>
              <BsGear />
            </IconContext.Provider>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {}}>Change Profile Image</Dropdown.Item>
            <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export default UserInfo