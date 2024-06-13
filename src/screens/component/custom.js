import React from 'react'

export const InputField = ({ name, type, placeholder, className, onChange, value, readonly }) => {
    return (
        <input name={name} type={type} placeholder={placeholder} value={value} className={`outline-none border text-[#111827] placeholder:text-[#6B7280] focus:border-[#008080] border-[#E5E7EB] py-2.5 px-3 rounded-md ${className}`} onChange={onChange} readOnly={readonly} />
    );
};

export const ButtonCustom = ({ type, className, data }) => {
    return (
        <button type={type} className='inline-flex w-fit justify-center rounded-md outline-none bg-primary px-10 py-2.5 text-sm font-medium text-white shadow-sm'>{data}</button>
    );
};
