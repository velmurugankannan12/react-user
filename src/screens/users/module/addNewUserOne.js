import React, { useState, useContext, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ChevronDownIcon, EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import AppStateContext from '../../../utils/AppStateContext';
import _ from 'underscore';
import { InputField, ButtonCustom } from '../../component/custom';

const AddUserOne = () => {
    const formRef = useRef(null);
    const { addUserOne, addUser, updateState, refresh } = useContext(AppStateContext);

    const [open, setOpen] = useState(true);
    const [menu, setMenu] = useState([
        { id: 1, option: 'Admin', set: false },
        { id: 2, option: 'User', set: false },
        { id: 3, option: 'Superviser', set: false },
    ]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);
    const [error, setError] = useState({
        name: false,
        email: false,
        password: false,
        cpassword: false,
        role: false,
    });

    const handleSetOpen = (value) => {
        setOpen(value);
        updateState('addUserOne', false);
    };

    const handleMenuSelect = (e) => {
        const updatedMenu = menu.map(item =>
            item.id === e.id ? { ...item, set: !item.set } : { ...item, set: false }
        );
        setSelectedMenu(e.option);
        setMenu(updatedMenu);
        setError(prevError => ({ ...prevError, role: false }));
        setMenuOpen(false);
    };

    const handleInputChange = (field) => (e) => {
        if (e.target.value) {
            setError(prevError => ({ ...prevError, [field]: false }));
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return regex.test(email);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const name = formData.get('name');
        const email = formData.get('email');
        const role = selectedMenu;
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        const newError = {
            name: !name && 'Type your name',
            email: !email ? 'Type your email' : !validateEmail(email) && 'Invalid email',
            password: !password ? 'Type your password' : password.length < 8 && 'Password must be at least 8 characters',
            cpassword: !confirmPassword ? 'Type your confirm password' : password !== confirmPassword && 'Password and confirm password mismatch',
            role: !role && 'Select your role',
        };

        setError(newError);

        if (Object.values(newError).some(err => err)) {
            // Prevent form submission if there are errors
            return;
        }

        const addData = {
            "name": name,
            "email": email,
            "role": role,
            "password": password,
            "confirm_password": confirmPassword,
        }

        // axios.post(`${serverURL}/agent/add`, addData).then((e) => {
        //     console.log(e.data)
        //     handleSetOpen(false)
        //     updateState('refresh', !refresh)
        // }).catch((err) => console.log(err))
        addUser(addData)
        updateState('addUserOne', false);

        console.log('Form submitted with values:', { name, email, role, password, confirmPassword });
    };

    return (
        <Transition show={addUserOne}>
            <Dialog className="relative z-10" onClose={() => handleSetOpen(false)}>
                <Transition.Child enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child enter="ease-out duration-300" className="w-96"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <Dialog.Panel className="transform overflow-hidden rounded-xl bg-white py-5 px-10 w-auto text-left shadow-xl transition-all sm:my-8 sm:w-full">
                                <form ref={formRef} onSubmit={handleSubmit} className=' flex flex-col gap-5'>
                                    <div className=' flex flex-col w-auto'>
                                        <div className='relative justify-end'>
                                            <div className='absolute -right-7 -top-2'>
                                                <XMarkIcon onClick={() => handleSetOpen(false)} className='w-5 text-[#000000] cursor-pointer' />
                                            </div>
                                        </div>
                                        <div className='pb-3'>
                                            <p className='text-[#374151] font-medium font-poppins'>
                                                Add New User
                                            </p>
                                        </div>
                                        <div className={`flex flex-col ${error.name ? 'pb-2' : 'pb-6'}`}>
                                            <InputField name="name" type="text" placeholder='Name*' className={`${error.name ? 'border-red-500' : 'border-[#E5E7EB]'} outline-none border text-[#111827] placeholder:text-[#6B7280] focus:border-[#008080] py-2.5 px-3 rounded-md w-full`} onChange={handleInputChange('name')} />
                                            {error.name && (
                                                <div className={`pt-1`}>
                                                    <p className="text-sm text-red-600 font-poppins">
                                                        {error.name}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className={`flex flex-col ${error.email ? 'pb-2' : 'pb-6'}`}>
                                            <InputField name="email" type="text" placeholder='Email Address*' className={`${error.email ? 'border-red-500' : 'border-[#E5E7EB]'} outline-none border text-[#111827] placeholder:text-[#6B7280] focus:border-[#008080] py-2.5 px-3 rounded-md w-full`} onChange={handleInputChange('email')} />
                                            {error.email && (
                                                <div className={`pt-1`}>
                                                    <p className="text-sm text-red-600 font-poppins">
                                                        {error.email}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div onClick={() => { setMenuOpen(true) }} className={`relative ${error.role ? 'pb-2' : 'pb-6'}`}>
                                            <InputField name="role" type="text" placeholder='Role*' className={`${error.role ? 'border-red-500' : 'border-[#E5E7EB]'} w-full cursor-pointer outline-none border text-[#111827] placeholder:text-[#6B7280] focus:border-[#008080] py-2.5 px-3 rounded-md`} onChange={(e) => { }} value={selectedMenu} readonly={true} />
                                            <div className='absolute top-3 right-3'>
                                                <ChevronDownIcon className='w-5 text-[#9CA3AF]' />
                                            </div>
                                            {menuOpen && (
                                                <div className='relative' onClick={(e) => e.stopPropagation()}>
                                                    <div className='absolute z-10 bg-white shadow rounded-lg border border-[#E5E7EB] flex flex-col gap-2 w-full'>
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
                                                <div className={`py-1`}>
                                                    <p className="text-sm text-red-600 font-poppins">
                                                        {error.role}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className={`relative ${error.password ? 'pb-2' : 'pb-6'}`}>
                                            <InputField name="password" type={passwordShow ? 'text' : 'password'} placeholder='Password*' className={`${error.password ? 'border-red-500' : 'border-[#E5E7EB]'} w-full outline-none border text-[#111827] placeholder:text-[#6B7280] focus:border-[#008080] py-2.5 px-3 rounded-md`} onChange={handleInputChange('password')} />
                                            {passwordShow ? (
                                                <div className='absolute top-3 right-3'>
                                                    <EyeIcon onClick={() => setPasswordShow(false)} className='w-5 text-[#9CA3AF] cursor-pointer' />
                                                </div>
                                            ) : (
                                                <div className='absolute top-3 right-3'>
                                                    <EyeSlashIcon onClick={() => setPasswordShow(true)} className='w-5 text-[#9CA3AF] cursor-pointer' />
                                                </div>
                                            )}
                                            {error.password && (
                                                <div className={`py-1`}>
                                                    <p className="text-sm text-red-600 font-poppins">
                                                        {error.password}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className={`relative ${error.cpassword ? '' : 'pb-4'}`}>
                                            <InputField name="confirmPassword" type={passwordShow ? 'text' : 'password'} placeholder='Confirm Password*' className={`${error.cpassword ? 'border-red-500' : 'border-[#E5E7EB]'} w-full outline-none border text-[#111827] placeholder:text-[#6B7280] focus:border-[#008080] py-2.5 px-3 rounded-md`} onChange={handleInputChange('cpassword')} />
                                            {passwordShow ? (
                                                <div className='absolute top-3 right-3'>
                                                    <EyeIcon onClick={() => setPasswordShow(false)} className='w-5 text-[#9CA3AF] cursor-pointer' />
                                                </div>
                                            ) : (
                                                <div className='absolute top-3 right-3'>
                                                    <EyeSlashIcon onClick={() => setPasswordShow(true)} className='w-5 text-[#9CA3AF] cursor-pointer' />
                                                </div>
                                            )}
                                            {error.cpassword && (
                                                <div className={`py-1`}>
                                                    <p className="text-sm text-red-600 font-poppins">
                                                        {error.cpassword}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <ButtonCustom type="submit" data='Add User' />
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AddUserOne;

