import React, { useState, useEffect } from 'react'
import {ref, get, getDatabase,child} from "firebase/database"
import {format} from "timeago.js";
import "./sidebar.css"
import { auth } from '../../firebase/firebaseDB';



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
    try {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `snippets`)).then((snapshot) => {
          if (snapshot.exists()) {
            //sort the fetched data by date and time..
            setSnippetsData(sortingByDateAndTime(Object.values(snapshot.val())));
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  },[])
  if(auth){}
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
