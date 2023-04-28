import React, { useState, useEffect } from 'react'
import {format} from "timeago.js";
import {getSnippets} from "./../../firebase/firebaseController";
import "./sidebar.css"

export default function Sidebar(props) {
  const [index, setIndex] = useState(null);
  const [snippetsData, setSnippetsData] = useState([]);

  // firebase api call fetching data...
  useEffect(()=>{
    getSnippets()
    .then((data)=>{
      setSnippetsData(data);
    })
    .catch((err)=>{
      console.log(err);
    })

  },[])
  return snippetsData && (
    <div className='sidebar-container'>
        <div className="sidebar-heading-container">
          <p className="sidebar-heading">Recently shared Snippets</p>
        </div>
        <ul className="sidebar-list">
            {
              Object.values(snippetsData).map((snippet)=>{return <li 
              key={snippet.id} 
              className={index === Object.values(snippetsData).indexOf(snippet) ?`sidebar-list-item selected-list-item`: `sidebar-list-item`}
              onClick={()=>{
                setIndex(Object.values(snippetsData).indexOf(snippet));
                props.snippetHandler(snippet)}}>
            {snippet.name}
            <p className='sidebar-list-item-time'>{format(snippet?.createdAt, 'en_US')}</p>
            </li>})}
        </ul>
    </div>
  )
}
