import React from 'react'
import Member from './Member';
import './styles.css';

const MemberList = () => {
  return (
    <div className='border-start border-3 d-flex flex-column' id='memberList'>
      <h6 className='text-muted border-bottom border-3 p-2 m-0'>Members</h6>
      <div className='d-flex flex-column flex-grow-1' id='memberContainer'>
        {}
      </div>
    </div>
  )
}

export default MemberList