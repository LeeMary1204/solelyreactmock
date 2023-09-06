import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../imgs/icon.svg'
export default function Home () {
  return (
    <>
      <div className='homeNav'>
        <div className='logo'>
          <img src={logo} alt="" style={{ width: '30px', height: '30px' }} />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/user">USER</Link>
            </li>
          </ul>
        </nav>

      </div>
      <div className='homeContent'>
        <Outlet />
      </div>
    </>
  )
}
