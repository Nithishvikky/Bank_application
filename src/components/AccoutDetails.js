import React from 'react';
import { useState,useEffect } from 'react';
import AccountCard from './AccountCard';
import axios from 'axios';
import CustomModal from './CustomModal';

export default function AccoutDetails({items}) {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
      setIsModalOpen(true);
    }
    const closeModal = () => {
      setIsModalOpen(false);
    }
    console.log(items.userId);
    useEffect(() => {
      axios.get(`http://localhost:8081/getA/${items.userId}`)
        .then((response) => {
          setData(response.data);
          console.log(response.data.length);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  return (
    <div class="container px-4 mx-auto">
    <div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <div class="flex items-center gap-x-3">
            <h2 class="text-lg font-medium text-gray-800 dark:text-white">Accounts</h2>
        </div>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">These are the accounts you have</p>
    </div>
    <div class="flex items-center mt-4 gap-x-3" onClick={openModal}>
        <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            <span>Create Account</span>
        </button>
    </div>
</div>
<CustomModal isOpen={isModalOpen} closeModal={closeModal} items={items}/> 
   <div className='flex flex-wrap gap-10 mt-7' >
    {data.map((item) => (<AccountCard key={item.account_id} item={item}/>))}
   </div>   
  </div>  
  )
}
