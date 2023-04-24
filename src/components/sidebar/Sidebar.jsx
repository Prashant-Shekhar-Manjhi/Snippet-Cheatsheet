import React, { useState } from 'react'
import "./sidebar.css"
import snippets from '../../resources/snippets';

export default function Sidebar(props) {
  const [index, setIndex] = useState(0);
  console.log(index)
  return (
    <div className='sidebar-container'>
        <h2 className="sidebar-heading">Snippets Cheatsheet</h2>
        <ul className="sidebar-list">
            {snippets.map((snippet)=>{return <li 
              key={snippet.id} 
              className={index===snippets.indexOf(snippet) ?`sidebar-list-item selected-list-item`: `sidebar-list-item`}
              onClick={()=>{
                setIndex(snippets.indexOf(snippet));
                props.snippetHandler(snippet)}}
          >{snippet.name}</li>})}
        </ul>
    </div>
  )
}
