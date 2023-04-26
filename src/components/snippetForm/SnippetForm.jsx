import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {set, ref, push} from "firebase/database"
import {database, auth} from '../../firebase/firebaseDB';
import {signInWithEmailAndPassword , signOut, getAuth } from "firebase/auth";
import "./snippetForm.css";
export default function SnippetForm({formModalHandler}) {
  const [name, setName] = useState("");
  const [filename, setFilename] = useState("");
  const [codeSnippet, setcodeSnippet] = useState("");
  const [lang , setLang] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    if(!name || !filename || !codeSnippet || !lang){
        toast.error("Please Enter Code details!");
    }else{
        let id = (Math.floor(Math.random() * 9000000000) + 1000000000).toString(); 
        let authUser = auth.currentUser;
        const postListRef = ref(database, `snippets/${authUser.uid}`);
        const newPostRef = push(postListRef);
        set(newPostRef, {
          id : id,
          name : name,
          filename : filename,
          lang : lang,
          snippet : codeSnippet,
          createdAt : (new Date()).toString()
        }).then(()=>{
            toast.success("Successfully Added");
        }).catch((error)=>{
            alert(error);
        })

        setName("");
        setFilename("");
        setLang("");
        setcodeSnippet(""); 
    }
  }

  //close modal button handler...
  const onClickHandler = ()=>{
    let [formModal, setFormModal] = formModalHandler;
    if(formModal){
      signOut(auth).then(() => {
        setFormModal(!formModal);
        setLoggedIn(false);
      }).catch((error) => {
        toast.error("Opps! Something wrong.");
        console.log(error);
      });
    }     
  }

  // login to add snippets
  const loginHandler = ()=>{
    let auth = getAuth();
    if(password){
      signInWithEmailAndPassword(auth, 'shekharprashant789@gmail.com', password)
      .then((userCredential) => {
        toast.success("You are logged In."); 
        setLoggedIn(true);
      })
      .catch((error) => {
          toast.error("Something went wrong!");
          console.log(error.message);
          setPassword("");
      });
    }
  }

  // form reset..
  const resetFormHandler = ()=>{
    setName("");
    setFilename("");
    setLang("");
    setcodeSnippet("");
  }

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{"fontSize":"14px"}}
      />
    <div className={loggedIn ? 'snippet-form-main-container': `snippet-form-main-container reduse-size`}>
        <ion-icon name="close-outline" className="form-modal-close-button" onClick={onClickHandler}></ion-icon>
        {loggedIn ? <div className="snippet-form-container">
            <h2 className="snippet-form-heading">
              Add Code Snippet
            </h2>
            <form onSubmit={onSubmitHandler}  className="snippet-form">
              <div className='snippet-form-input-wrapper'>
                  <div className="snippet-form-input-container">
                      <input onChange={(e)=>{setName(e.target.value)}} type="text" className="snippet-form-input" placeholder='Name' value={name}/>
                  </div>
                  <div className="snippet-form-input-container">
                      <input onChange={(e)=>{setFilename(e.target.value)}} type="text" className="snippet-form-input" placeholder='Filename' value={filename}/>
                  </div>
                  <div className="snippet-form-input-container">
                      <input onChange={(e)=>{setLang(e.target.value)}} type="text" className="snippet-form-input" placeholder='Language' value={lang}/>
                  </div> 
                  <div className="snippet-form-button-container">
                    <button type='submit' className='snippet-form-button'>Submit</button>
                    <button type='reset' onClick={resetFormHandler} className='snippet-form-button'>Reset</button>
                  </div> 
              </div>
              <div className="snippet-form-textarea-container">
                  <textarea onChange={(e)=>{setcodeSnippet(e.target.value)}} className='snippet-form-textarea' value={codeSnippet} placeholder='Paste Code Snippet Here...'></textarea>
              </div>
            </form>
        </div>
        : <div className='form-password-validation-container'>
          <input type="password" placeholder='Password' className='snippet-form-input-password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          <button type='button' className='snippet-form-button' onClick={loginHandler}>Login</button>
        </div>}
    </div>
    </>
  )
}
