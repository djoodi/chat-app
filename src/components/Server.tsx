import React from 'react'

interface Props {
  server: any
}

const Server: React.FC<Props> = ({server}) => {
  return (
    <div key={server._id} className='serverIcon bg-warning mx-auto rounded flex-shrink-0'>
        <h2 className='text-center align-middle h-100 mt-1 mb-0'>{server.title.slice(0,2)}</h2>
    </div>
  )
}

export default Server