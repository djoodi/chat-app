import React from 'react'

interface Props {
  title: string;
}

const Channel: React.FC<Props> = ({title}) => {
  return (
    <div className='channel border-bottom border-1 p-2'>
        <p className='mb-0 text-muted'>{title}</p>
    </div>
  )
}

export default Channel