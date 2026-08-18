import { useState } from 'react'

import Newpost from "./newpost.jsx"
import Listpost from "./listpost.jsx"
import Settings from "./settings.jsx"
import UserList from "./usersList.jsx"
import { useParams } from 'react-router-dom'
import ErrorPage from './errorpage.jsx'

function Children() {
  const {page} = useParams();

  return(
    <>
      {page == 'users' ? (<UserList />) 
      : page == 'posts' ? (<Listpost />)
      : page == 'newpost' ? (<Newpost />)
      : page == 'settings' ? (<Settings />)
      : (<ErrorPage />)
      }
    </>
  )
}

export default Children