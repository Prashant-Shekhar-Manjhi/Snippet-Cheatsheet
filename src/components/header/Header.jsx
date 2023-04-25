import React from 'react'
import logo from "../../logo/logo.png"
import "./header.css";

export default function Header({snippetFrom}) {
  const onClickHandler = ()=>{
     let [formModal,setFormModal] = snippetFrom;
     if(!formModal)
        setFormModal(!formModal);
  }
  return (
    <header className='header-container'>
        <div>
          <a href="/">
              <img className="header-logo" alt="logo" src={logo} />
          </a>
        </div>
        <div className="header-menu-item-wrapper">
          <ion-icon name="add-outline"></ion-icon>
          <p className="header-menu-item" onClick={onClickHandler}>New Code Snippet</p>
        </div>
    </header>
  )
}
