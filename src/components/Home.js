import React from 'react';
import Logo from '../assets/Final.jpg';
import './Login.css';
import { useState,useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import AccoutDetails from './AccoutDetails';
import Profile from './Profile';
import TransactionTable from './TransactionTable';
import Dashboard from './Dashboard';



export default function Home() {
  const [items, setItems] = useState([]);
  const[dashboard,SetDashboard]=useState(true);
  const[account,SetAccount]=useState(false);
  const[transaction,SetTransaction]=useState(false);
  const[profile,SetProfile]=useState(false);

 useEffect(() => {
   const items = JSON.parse(localStorage.getItem('state'));
   if(items) {
     setItems(items);
   }
  }, []);
  console.log(items);
  const navigate= useNavigate();
  const handleLogout = (e) => {
    items.isLoggeIn=false;
     if(!items.isLoggeIn){
      navigate("/",{replace:true});
     } 
   }
  return (
    <div className="bg-white dark:bg-gray-900">
      <aside className='compact-nav group fixed overflow-hidden left-0 top-0 z-10 h-screen w-[calc(3.73rem)] border-r border-gray-300/40 bg-white dark:bg-gray-900 dark:border-gray-700 hover:w-56 hover:shadow-2xl'>
        <div className='h-full flex flex-col justify-between'>
         <div>
          <div className='h-16 flex items-center'>
           <a href='' className='block w-[160px] h-[46px] px-2.5'><img src={Logo} alt=''/></a>
          </div>
          <div className='mt-11 flex items-center'>
           <ul className=' px-1 -ml-px font-medium tracking-wide'>
            <li className='w-max space-y-4 group-hover:w-full'>
            <div className={dashboard ? ('block w-[52px] rounded-full bg-sky-500 py-3 group-hover:w-full hover:cursor-pointer'):""} 
            onMouseOver={() =>{
             SetDashboard(true);
             SetAccount(false);
             SetProfile(false);
             SetTransaction(false);
               }}>
             <div className='w-max flex items-center px-3 gap-4'>
             <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 448 512" className='h-7 w-7'><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
             <span className='ml-2'>Dashboard</span>
             </div>
             </div>
             </li>
             <li className='w-max space-y-4 group-hover:w-full mt-10'>
             <div className={account ? ('block w-[52px] rounded-full bg-sky-500 py-3 group-hover:w-full hover:cursor-pointer'):""} 
             onMouseOver={() =>{
              SetDashboard(false);
              SetAccount(true);
              SetProfile(false);
              SetTransaction(false);
                }}>
               <div className='w-max flex items-center gap-4 px-3'>
               <svg xmlns="http://www.w3.org/2000/svg" className='h-7 w-7' viewBox="0 0 576 512"><path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm48 160H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zM96 336c0-8.8 7.2-16 16-16H464c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16zM376 160h80c13.3 0 24 10.7 24 24v48c0 13.3-10.7 24-24 24H376c-13.3 0-24-10.7-24-24V184c0-13.3 10.7-24 24-24z"/></svg>
                <span className='text-gray-600 dark:text-gray-300'>Accounts</span>
               </div>              
             </div>
            </li>
             <li className='w-max space-y-4 group-hover:w-full mt-10'>
              <div className={transaction ? ('block w-[52px] rounded-full bg-sky-500 py-3 group-hover:w-full hover:cursor-pointer'):""} 
              onMouseOver={() =>{
               SetDashboard(false);
               SetAccount(false);
               SetProfile(false);
               SetTransaction(true);
                 }}>
                <div className='w-max flex items-center gap-4 px-3'>
                <svg xmlns="http://www.w3.org/2000/svg" className='h-7 w-7' viewBox="0 0 384 512"><path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
                 <span className='text-gray-600 dark:text-gray-300'>Transactions</span>
                </div>              
              </div>
             </li>
            
           </ul>
          </div>
         </div>
          <div className={profile ? ('block w-[52px] rounded-full bg-sky-500  group-hover:w-full hover:cursor-pointer px-2 py-3 mb-3 ml-1'):('px-2 py-4')}  onMouseOver={() =>{
            SetDashboard(false);
            SetAccount(false);
            SetProfile(true);
            SetTransaction(false);
              }}>
            <div className='w-max flex items-center gap-4'>
            <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-10' viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
             <span>
                <h6 className='text-gray-600 font-medium dark:text-gray-200'>{items.userName}</h6>
                <span className='-mt-0.5 text-xs text-gray-500 dark:text-gray-100'>NRS User</span>
             </span>
            </div>
           </div>
        </div>
      </aside>
      <main className='w-[calc(100%-3.73rem)] ml-auto'>
       <div className='2xl:contianer mx-auto space-y-6'>
        <div className='h-16 border-b border-gray-300/40 dark:border-gray-700 flex justify-end items-center'>
        {items.isLoggeIn ? (<div className='w-max flex items-center gap-2 mr-10 hover:bg-black hover:text-white hover:cursor-pointer hover:fill-white h-10 p-2 rounded-2xl' onClick={handleLogout}>
            <span>LogOut</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" className="hover:fill-white" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
          </div>):(<div className='w-max flex items-center gap-2 mr-10 hover:bg-black hover:text-white hover:cursor-pointer hover:fill-white h-10 p-2 rounded-2xl' onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" className="hover:fill-white" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
          <span>Login</span>
        </div>)}
        </div>
        <div className='w-[calc(100%-4rem)] ml-4'>
           {dashboard ? (<Dashboard items={items}/>):""}
           {account? (<AccoutDetails items={items}/>):""}
           {transaction? (<TransactionTable items={items}/>):""}
           {profile? (<Profile items={items}/>):""}
        </div>
        <div className='px-6 lg:px-12'> 
        </div>
       </div>
      </main>
    </div>
  )
}
