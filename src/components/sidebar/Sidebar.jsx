import React, { useState, useEffect } from 'react'
import {format} from "timeago.js";
import "./sidebar.css"

export default function Sidebar(props) {
  const [index, setIndex] = useState(null);
  const [snippetsData, setSnippetsData] = useState([]);


  // sorting...
  const sortingByDateAndTime = (data)=>{
    let dataTemp = data;
    if(dataTemp){
      dataTemp.sort((data1, data2)=>{
        return (new Date(data2.createdAt)) - (new Date(data1.createdAt));
      });
    }
    return dataTemp;
  }

  // firebase api call fetching data...
  useEffect(()=>{
      fetch("https://snippet-cheatsheet-default-rtdb.firebaseio.com/snippets.json", {
        method:"GET",
      })
      .then((res)=>{
        return res.json();
      })
      .then((res)=>{
        const data = Object.values(res);
        setSnippetsData(sortingByDateAndTime(Object.values(data[0])));
      })
      .catch(er=>{
        console.log(er);
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
