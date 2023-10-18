import React from 'react';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { handleSignUp } from '../utilities';
import { handleSignIn } from '../utilities';
import {useNavigate} from "react-router-dom";
import state from '../store';

export default function Login() {
  const [items,setItems]=useState({});
    const [formData, setFormData] = useState({
		email: '',
		password: '',
	  });
    const[NotExists,setNotExists]=useState(false);
    const[passwordcheck,setpasswordcheck]=useState(false);
    const navigate =useNavigate();
	  const handleChange = (e) => {
		const { name, value } = e.target;
        //console.log(name);
        setNotExists(false);
        setpasswordcheck(false);
		    setFormData({
            ...formData,
            [name]: value,
		});
	  };

    const handleSubmit = async(e) => {
		 e.preventDefault();
       try {
        const isValid1=await handleSignUp(formData.email);//boolean
        const items=await handleSignIn(formData.email);//Object
        if(!isValid1){
          if(items){
            setItems(items);
          }
          if(items.password==formData.password){
            setNotExists(false);
            setpasswordcheck(false);
            const delay = 1000;
            const timeoutId = setTimeout(() => {
              navigate("Home",{replace:true});
            }, delay);
             return () => clearTimeout(timeoutId);
          }
          else{
             setpasswordcheck(true);
          }
        }
        else{
          setNotExists(true);
        }
        
       } catch (error) {
        console.log(error);
       }
    }
useEffect(() => {
   state.userId=items.user_id;
   state.userName=items.username;
   state.userEmail=items.email;
   state.isLoggeIn='true';
  localStorage.setItem('state', JSON.stringify(state));
  console.log(state);
}, [items]);
	  return (
		<div className='max-h-screen py-40 text-center' style={{backgroundImage:"linear-gradient(95.2deg, rgba(173,252,234,1) 26.8%, rgba(192,229,246,1) 64% )"}}>
     <div className='container mx-auto'>
      <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
       <div className='w-full lg:w-1/2 py-16 px-12'>
        <h2 className='text-3xl mb-4'>Login</h2>
        <p className='mb-4'>Check what you have in your account</p>
        <form onSubmit={handleSubmit}>
          <div className='mt-5'> 
            <input type='email' placeholder='Email' name="email" value={formData.email} onChange={handleChange} className='border border-gray-400 py-1 px-2 w-full'></input>
            {NotExists? (<div className='w-max flex items-center px-3 mt-2'><svg xmlns="http://www.w3.org/2000/svg" height="1rem" className='fill-red' viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg><span className='text-red-600 ml-1'>User Not Exists</span></div>):""}
          </div>
          <div className='mt-5'> 
            <input type='password' placeholder='Password' name="password" value={formData.password}	onChange={handleChange} className='border border-gray-400 py-1 px-2 w-full'></input>
            {passwordcheck? (<div className='w-max flex items-center px-3 mt-2'><svg xmlns="http://www.w3.org/2000/svg" height="1rem" className='fill-red' viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg><span className='text-red-600 ml-1'>Wrong Password</span></div>):""}
          </div>
          <div className='mt-5'> 
            <button className=' py-3 text-center text-black text-xl font-bold w-full' style={{backgroundImage:"linear-gradient(95.2deg, rgba(173,252,234,1) 26.8%, rgba(192,229,246,1) 64% )"}}>Login</button>
          </div>
          <div className='mt-5'> 
            <span>Don't have an account? <Link to='/Register' className='text-blue-600 underline'>Register</Link></span>
          </div>
        </form>
       </div>
       <div className='w-full lg:w-1/2 flex flex-col item-center justify-center p-12 bg-no-repeat bg-cover bg-center dx'>
        <h2 className='text-white text-3xl text-center mb-2'>Welcome</h2>
        <div>
          <p className='text-white'>Hello everyone this is first project of mine about banking application</p>
        </div>
       </div>
      </div>
     </div>
    </div>
	  );
}
