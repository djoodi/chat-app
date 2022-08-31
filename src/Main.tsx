import React, { useEffect } from 'react'
import Axios from 'axios';

const Main = () => {

  const isLoggedIn = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/app'
    }).then((res) => {
      console.log(res);
      if (res.data === false) {
        window.location.href='/';
      }
    })
  }

  useEffect(() => {
    isLoggedIn();
  
    return () => {

    }
  }, [])
  

  return (
    <div>This is the app!</div>
  )
}

export default Main