import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Table from './Table';
import TransactionModal from './TransactionModal';

export default function TransactionTable({items}) {
    const[data,setData]=useState([]);
    const[str,setStr]=useState(0);
    const[page,setPage]=useState(0);
    const[totalPage,setTotalPage]=useState(1);
    const [isButtonClicked, setIsButtonClicked] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
      setIsModalOpen(true);
    }
    const closeModal = () => {
      setIsModalOpen(false);
    }
    
    const increment=()=>{
        if(page<totalPage){
            setPage(page+1);
        }
        setIsButtonClicked(true);
    }
    const decrement=()=>{
        if(page>0){
            setPage(page-1);
        }
        setIsButtonClicked(true);
    }

    const handleCount= async(e)=>{
        try {
            const response= await axios.get(`http://localhost:8081/get31/${items.userId}`);
             setStr(response.data);
             setTotalPage(Math.ceil(response.data/3));
           
        } catch (error) {
            console.log(error);
        }
    }
   //console.log(str);
    useEffect(() => {
      if(isButtonClicked){
        axios.get(`http://localhost:8081/get3/${items.userId}/${page}/3`)
          .then((response) => {
            console.log(response.data);
            setData(response.data);
            handleCount();
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
          setIsButtonClicked(false);
        }
      }, [isButtonClicked]);
  return (
    <section class="container px-4 mx-auto">
    <div class="sm:flex sm:items-center sm:justify-between">
        <div>
            <div class="flex items-center gap-x-3">
                <h2 class="text-lg font-medium text-gray-800 dark:text-white">Transactions</h2>
                <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{str} Transactions</span>
            </div>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">These are the transaction you made</p>
        </div>
        <div class="flex items-center mt-4 gap-x-3" onClick={openModal}>
            <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <span>Make Transaction</span>
            </button>
        </div>
    </div>

    
    <TransactionModal isOpen={isModalOpen} closeModal={closeModal} handleCount={handleCount}/> 
    <div class="mt-6 md:flex md:items-center md:justify-between">
        <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <button class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
                View all
            </button>
        </div>
    </div>

    <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Transaction No
                        </th>
                        <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Type
                        </th>
                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Account No
                        </th>
                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Amount</th>

                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Transaction Date</th>
                    </tr>
                </thead>
                    {data?.map((item) => (<Table key={item.transaction_id} items={item}/>))}
                </table>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-6 sm:flex sm:items-center sm:justify-between ">
        <div class="text-sm text-gray-500 dark:text-gray-400">
            Page <span class="font-medium text-gray-700 dark:text-gray-100">{page+1} of {totalPage}</span> 
        </div>

        <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
            <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800" onClick={decrement}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>

                <span>
                    previous
                </span>
            </button>

            <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800" onClick={increment}>
                <span>
                    Next
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </button>
        </div>
    </div>
</section>
  )
}
