import React, { useState, useContext, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import AppStateContext from '../../../utils/AppStateContext';
import { serverURL } from '../../../service/config';
import axios from 'axios';


const DeleteUser = () => {
    const { deleteUser, userProfileData, updateState, refresh } = useContext(AppStateContext);
    const [open, setOpen] = useState(true);
    const [data, setData] = useState('');

    useEffect(() => {
        setData(userProfileData);
    }, [userProfileData]);

    const close = () => {
        updateState('deleteUser', false);
        updateState('userProfileData', null);
    };

    const removeUser = () => {
        axios.post(`${serverURL}/agent/remove`, { user_id: userProfileData.user_id })
            .then(res => {
                console.log(res.data)
                console.log('res')
                if (res.data.code === 200) {
                    close()
                    updateState('refresh', !refresh)
                } else {

                }
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }

    return (
        <Transition show={deleteUser}>
            <Dialog className="relative z-10" onClose={() => close()}>
                <Transition.Child enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0" >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-xl flex flex-col gap-10 bg-white py-5 px-10 mx-14 w-auto text-left shadow-xl transition-all sm:my-8 sm:w-full">
                                <div className='flex flex-col gap-6 w-auto'>
                                    <div className='relative justify-end'>
                                        <div className=' absolute -right-7 -top-2'>
                                            <XMarkIcon onClick={() => close()} className='w-5 text-[#000000] cursor-pointer' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-lg text-[#1F2937] font-poppins font-medium '>Are you sure you want to delete <span className=' text-primary'>{userProfileData?.first_name} {userProfileData?.last_name}</span>?</p>
                                        <p className='text-sm text-[#6B7280] font-poppins '>Once you delete the agent, this action cannot be undone</p>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-6">
                                    <button type="button" className="inline-flex w-fit justify-center rounded-md outline-none border border-[#D1D5DB] px-10 py-2 text-sm font-medium text-[#374151] shadow-sm" onClick={() => close()} >
                                        Cancel
                                    </button>
                                    <button type="button" className="inline-flex w-fit justify-center rounded-md outline-none bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-sm" onClick={() => removeUser()} >
                                        Please do it!
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

export default DeleteUser;
