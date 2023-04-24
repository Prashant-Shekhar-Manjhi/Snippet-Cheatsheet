import React from 'react'
import logo from "../../logo/logo.png"
import "./header.css";

export default function Header() {
  return (
    <header className='header-container'>
        <div>
          <a href="/">
              <img className="header-logo" alt="logo" src={logo} />
          </a>
        </div>
        {/* <div className="header-menu"></div> */}
    </header>
  )
}
