import React, { useId } from 'react'


function inputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = "usd",
    amountDisabled = false,
    currrencyDisabled = false,
    className = "",
}) {

    const id = useId()
  return (
    <div className={`bg-white p-4 rounded-2xl shadow-md flex flex-col sm:flex-row gap-4 ${className}`}>
        <div className='w-full sm:w-1/2'>
            <label 
            htmlFor={id}  className='text-gray-500 mb-2 inline-block font-medium'>
                {label}
            </label>


            <input 
            id={id}
            type="number"
            className='w-full bg-gray-50 py-2 px-3 rounded-lg text-gray-800 outline-none focus:ring-2 focus:ring-blue-400 transition'
            placeholder='Amount'
            disabled={amountDisabled}
            value={amount}
            onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
             />

        </div>


        <div className='w-full sm:w-1/2 text-right'>
            <p className="text-gray-500 mb-2 font-medium text-left sm:text-right">Currency Type</p>
            <select 
            className='w-full sm:w-auto bg-gray-100 px-3 py-2 rounded-lg cursor-pointer outline-none focus:ring-2 focus:ring-blue-400 transition'
            value={selectedCurrency}
            onChange={(e) => { onCurrencyChange && onCurrencyChange(e.target.value)}}
            disabled={currrencyDisabled}
            >

            {currencyOptions.map((currency)=>(
                <option key={currency}
                value={currency}>
                    {currency}
                </option>
            ))}
        </select>
        </div>
    </div>
  )
}

export default inputBox;