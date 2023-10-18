import React, { useState,useEffect } from 'react';
import axios from 'axios';


const Profile = ({items }) =>{
    const [data,setData]=useState({});
    const[edit,Setedit]=useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
        setData({
        ...data,
        [name]: value,
    });
  };
  const handleSubmit = (e) =>{
    axios.put(`http://localhost:8081/putbyid/${items.userId}`,data)
    .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      Setedit(false);
  }
    useEffect(() => {
        axios.get(`http://localhost:8081/get11/${items.userId}`)
          .then((response) => {
            setData(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      },[items]);
  return (
    <div class="bg-white p-3 shadow-sm">
        <div class="flex items-center text-center space-x-2 font-bold leading-8">
        <h2 class="text-lg font-medium text-gray-800 dark:text-white">User Information</h2>
        </div>
        <div className='flex justify-between'>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">Update your profile</p>
        <span onClick={() => Setedit(true)} className='flex items-center justify-between gap-2 w-max  mr-10 bg-gray-200 text-white hover:bg-black hover:text-gray-400 hover:cursor-pointer hover:fill-white h-10 p-4 rounded-2xl'>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">Edit</p>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
        </span>
        </div>
        <div class="text-gray-500 mt-2">
            <div class="grid">
             <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">User name</div>
                    {edit ? (<input type='text' name="username" onChange={handleChange} className='w-[300px] border-0 outline-0 border-b-2 border-gray-400 py-1 px-2 font-bold' value={data.username}></input>):(<div class="px-4 py-2">{data.username}</div>)}
                </div>
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">First Name</div>
                    {edit ? (<input type='text' name="first_name" onChange={handleChange} className='w-[300px] border-0 outline-0 border-b-2 border-gray-400 py-1 px-2 font-bold' value={data.first_name}></input>):(<div class="px-4 py-2">{data.first_name}</div>)}
                </div>
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Last Name</div>
                    {edit ? (<input type='text' name="last_name" onChange={handleChange} className='w-[300px] border-0 outline-0 border-b-2 border-gray-400 py-1 px-2 font-bold' value={data.last_name}></input>):(<div class="px-4 py-2">{data.last_name}</div>)}
                </div>
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Gender</div>
                    {edit ? (<input type='text' name="gender" onChange={handleChange} className='w-[300px] border-0 outline-0 border-b-2 border-gray-400 py-1 px-2 font-bold' value={data.gender}></input>):(<div class="px-4 py-2">{data.gender}</div>)}
                </div>
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Contact No.</div>
                    {edit ? (<input type='text' name="phone_number" onChange={handleChange} className='w-[300px] border-0 outline-0 border-b-2 border-gray-400 py-1 px-2 font-bold hover:cursor-not-allowed' value={data.phone_number} disabled></input>):(<div class="px-4 py-2">{data.phone_number}</div>)}
                </div>
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Current Address</div>
                    {edit ? (<textarea type='text' name="address" onChange={handleChange} className='w-[300px] border-0 outline-0 border-b-2 border-gray-400 py-1 px-2 font-bold' value={data.address}></textarea>):(<div class="px-4 py-2">{data.address}</div>)}
                </div>
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Email</div>
                    {edit ? (<input type='text' name="email" onChange={handleChange} className='w-[300px] border-0 outline-0 border-b-2 border-gray-400 py-1 px-2 font-bold hover:cursor-not-allowed' value={data.email} disabled></input>):
                    (<div class="px-4 py-2">
                        <a class="text-blue-800" href={data.email}>{data.email}</a>
                    </div>)}
                </div>
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Birthday</div>
                    {edit ? (<input type='text' name="dateOfBirth" onChange={handleChange} className='w-[300px] border-0 outline-0 border-b-2 border-gray-400 py-1 px-2 font-bold' value={data.dateOfBirth}></input>):(<div class="px-4 py-2">{data.dateOfBirth}</div>)}
                </div>
                </div>
                <div className='flex justify-end mt-11 mr-20 -ml-20'>
                 {edit ?(<div className='w-max flex items-center gap-2 mr-10 bg-black text-white hover:bg-gray-200 hover:text-black hover:cursor-pointer hover:fill-white h-10 p-4 rounded-2xl' onClick={handleSubmit}>
                 <span>Submit</span>
                 </div>):""}
               </div>
        </div>
    </div>
  )
}
export default Profile;