import React from 'react'
import "./sidebar.css"
import snippets from '../../resources/snippets';

export default function Sidebar(props) {
  return (
    <div className='sidebar-container'>
        <h2 className="sidebar-heading">Snippets Cheatsheet</h2>
        <ul className="sidebar-list">
            {snippets.map((snippet)=>{return <li key={snippet.id} className="sidebar-list-item"onClick={()=>{props.snippetHandler(snippet)}}>{snippet.name}</li>})}
        </ul>
    </div>
  )
}
