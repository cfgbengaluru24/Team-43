import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'
const LandingPage = () => {
  return (
    <div>

    <div className='LandingPage-title'>
        CareerX

        <p className='LandingPage-desc'>
            Select a career of your interest
        </p>
        
    </div>

    <div className='LandingPage-buttons'>
        <Link to ="/fullstack" className='lp-buttons'>Fullstack</Link>
        <Link to ="/cyber" className='lp-buttons'>Cyber Security</Link>
        <Link to ="/backend" className='lp-buttons'>Backend</Link>
        <Link to = "/frontend" className='lp-buttons'>Frontend</Link>
        <Link to = "/doctor" className='lp-buttons'>Doctor</Link>
        <Link to = "/engineer" className='lp-buttons'>Engineer</Link>
        <Link to = "/ca" className='lp-buttons'>Chartered Accountant</Link>
    </div>

    </div>
  )
}

export default LandingPage