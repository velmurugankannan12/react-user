import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { ChevronDownIcon, EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import AppStateContext from '../../../utils/AppStateContext';
import axios from 'axios'
import { serverURL } from '../../../service/config';


const EditUser = () => {
    const { editUser, userProfileData, updateState, editUserData, refresh } = useContext(AppStateContext);
    const [open, setOpen] = useState(true);
    const [data, setData] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        confirm_password: '',
    });
    const [originalData, setOriginalData] = useState({});
    const [userId, setUserId] = useState();
    const [passwordShow, setPasswordShow] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [countryOpen, setCountryOpen] = useState(false);
    const [countryDefault, setCountryDefault] = useState('global');
    const [countrySearch, setCountrySearch] = useState('');
    const [countryDialCode, setCountryDialCode] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('');
    const [menu, setMenu] = useState([
        { id: 1, option: 'Admin', set: false },
        { id: 2, option: 'User', set: false },
        { id: 3, option: 'Superviser', set: false },
    ]);
    const [error, setError] = useState({
        name: false,
        email: false,
        role: false,
        password: false,
        confirm_password: false,
    });

    useEffect(() => {
        if (userProfileData) {
            setData(userProfileData);
            setOriginalData(userProfileData);
            setUserId(userProfileData.user);
        }
    }, [userProfileData]);

    useEffect(() => {
        const hasChanges = Object.keys(data).some(key => data[key] !== originalData[key]);
        setIsFormChanged(hasChanges);
    }, [data, originalData]);

    const handleSetOpen = () => {
        updateState('editUser', false);
        updateState('userProfileData', null);
    };

    const handleDataUpdate = (e) => {
        const { name, value } = e.target;

        setData(prevData => ({
            ...prevData,
            [name]: String(value)
        }));
        setError(prevError => ({
            ...prevError,
            [name]: false
        }));
    };

    const handleMenuSelect = (e) => {
        const updatedMenu = menu.map(item =>
            item.id === e.id ? { ...item, set: !item.set } : { ...item, set: false }
        );
        setData(prevData => ({
            ...prevData,
            role: e.option
        }));
        setMenu(updatedMenu);
        setMenuOpen(false);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return regex.test(email);
    };

    const validateForm = () => {
        const newError = {
            name: !data.name && 'Type your name',
            email: !data.email ? 'Type your email' : !validateEmail(data.email) && 'Invalid email',
            role: !data.role && 'Select your role',
            password: data.password && data.password.length < 8 && 'Password must be at least 8 characters',
            confirm_password: data.confirm_password && data.password !== data.confirm_password && 'Password and confirm password mismatch',
        };

        setError(newError);

        return !Object.values(newError).some(err => err);
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        const updatedFields = Object.keys(data).reduce((acc, key) => {
            if (data[key] !== originalData[key]) {
                acc[key] = data[key];
            }
            return acc;
        }, {});

        editUserData(updatedFields)

        // Send updatedFields to the server
        // axios.post(`${serverURL}/agent/edit`, updatedFields)
        //     .then(res => {
        //         if (res.data.code === 200) {
        //             handleSetOpen();
        //             updateState('refresh', !refresh)
        //         } else {

        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error updating user:', error);
        //     });
    };

    return (
        <Transition show={editUser}>
            <Dialog className="relative z-10" onClose={handleSetOpen}>
                <Transition.Child enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0" >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child enter="ease-out duration-300" className=" w-96" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-xl flex flex-col gap-5 bg-white py-5 px-10 w-auto text-left shadow-xl transition-all sm:my-8 sm:w-full">
                                <div className='flex flex-col gap-6 w-auto'>
                                    <div className='relative justify-end'>
                                        <div className=' absolute -right-7 -top-2'>
                                            <XMarkIcon onClick={handleSetOpen} className='w-5 text-[#000000] cursor-pointer' />
                                        </div>
                                    </div>
                                    <div>
                                        <p className='text-[#374151] font-medium font-poppins'>
                                            Edit Information
                                        </p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <input value={data.name} onChange={handleDataUpdate} className={`outline-none border ${error.name ? 'border-red-500' : 'border-[#E5E7EB]'} text-[#111827] placeholder:text-[#6B7280] focus:border-[#008080] py-2.5 px-3 rounded-md w-full capitalize`} type="text" name="name" placeholder='Name*' />
                                        {error.name && (
                                            <div className='text-sm text-red-500 mt-1'>{error.name}</div>
                                        )}
                                    </div>
                                    <div className='flex flex-col'>
                                        <input value={data.email} onChange={handleDataUpdate} className={`outline-none border ${error.email ? 'border-red-500' : 'border-[#E5E7EB]'} text-[#111827] placeholder:text-[#6B7280] focus:border-[#008080] py-2.5 px-3 rounded-md w-full`} type="text" name="email " placeholder='Email Address*' />
                                        {error.email && (
                                            <div className='text-sm text-red-500 mt-1'>{error.email}</div>
                                        )}
                                    </div>
                                    <div onClick={() => { setMenuOpen(true) }} className='relative flex flex-col'>
                                        <input value={data.role} onChange={handleDataUpdate} className={`outline-none border ${error.role ? 'border-red-500' : 'border-[#E5E7EB]'} text-[#111827] cursor-pointer placeholder:text-[#6B7280] focus:border-[#008080] py-2.5 px-3 rounded-md w-full`} type="text" name="role" placeholder='Role*' />
                                        <div className=' absolute top-3 right-3'>
                                            <ChevronDownIcon className='w-5 text-[#9CA3AF]' />
                                        </div>
                                        {menuOpen && (
                                            <div className='relative' onClick={(e) => e.stopPropagation()}>
                                                <div className='absolute bottom-0 z-10 bg-white shadow rounded-lg border border-[#E5E7EB] flex flex-col gap-2 w-full'>
                                                    {menu.map((item, index) => (
                                                        <div key={index} onClick={() => { handleMenuSelect(item) }} className='flex w-full items-center justify-between cursor-pointer hover:bg-[#00808016] px-4 py-2'>
                                                            <p className="text-[#111827] text-base">{item.option}</p>
                                                            {item.set && (
                                                                <div className='pr-3'>
                                                                    <img className='w-auto h-2.5' src="/img/icon/check.png" alt="" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {error.role && (
                                            <div className='text-sm text-red-500 mt-1'>{error.role}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button type="button" className={`inline-flex w-fit justify-center rounded-md outline-none ${isFormChanged ? 'bg-primary' : 'bg-gray-400 cursor-default'} px-10 py-2.5 text-sm font-medium text-white shadow-sm`} onClick={handleSubmit} disabled={!isFormChanged}>
                                        Update
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditUser;
