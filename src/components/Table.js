import React from 'react';

export default function Table({items}) {
    console.log(items);
    const number=items.account_id;
    const num=number.toString().padStart(16,'0').replace(/(\d{4})/g, `$1${' '}`);
    const str = items.transaction_type;
    
  return (
                        <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900" key={items.transaction_id}>
                            <tr>
                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                    <div>
                                        <h2 class="font-medium text-gray-800 dark:text-white" >{items.transaction_id}</h2>
                                    </div>
                                </td>
                                <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                    <div className={(str!="deposit" || str!="Deposit") ? ("inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800"):("inline px-3 py-1 text-sm font-normal rounded-full gap-x-2 text-gray-500 bg-gray-100 dark:text-gray-400  dark:bg-gray-800 ")}>
                                    {items.transaction_type}
                                    </div>
                                </td>
                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                    <div>
                                       <h2 class="font-medium text-gray-800 dark:text-white ">{num}</h2>
                                    </div>
                                </td>
                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                  <div>
                                    <h2 class="font-medium text-gray-800 dark:text-white ">{items.amount}</h2>
                                  </div>
                                </td>

                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                   <div>
                                      <h2 class="font-medium text-gray-800 dark:text-white ">{items.transaction_date}</h2>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
  )
}
