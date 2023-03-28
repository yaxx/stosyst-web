import React from 'react'
import { Outlet } from 'react-router-dom'
import { SettingsNavHeader } from '../../components/headers'

const  Layout = ()=> {
  return (
      <div className='container settings-container'>
          <SettingsNavHeader />
          <Outlet/>
      </div>
  )
}

export default Layout