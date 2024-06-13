import React, { useContext, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// import { users } from '../../utils/dummy';
import AppStateContext from '../../utils/AppStateContext';
import Avatar from '../../utils/Avatar';
import _ from 'underscore';
import { InputField } from '../component/custom';
import axios from 'axios'
import { serverURL } from '../../service/config';

// const isOdd = users.length % 2 !== 0;

const User = () => {
    const { userSearch, updateState, refresh } = useContext(AppStateContext);
    const [users, setUsers] = useState([]);

    const handleUserSearch = (e) => {
        updateState('userSearch', e.target.value);
    };

    const handleAddUserOne = () => {
        updateState('addUserOne', true);
    };

    const handleAddUserMul = () => {
        updateState('addUserMul', true);
    };

    const handleViewUser = (user) => {
        updateState('viewUser', true);
        updateState('userProfileData', user);
    };

    const handleEditUser = (user) => {
        updateState('editUser', true);
        updateState('userProfileData', user);
    };

    const handleDeleteUser = (user) => {
        updateState('deleteUser', true);
        updateState('userProfileData', user);
    };

    useEffect(() => {

        // axios.post(`${serverURL}/agent/list`, { org_id: '6056f629-19c4-4f65-b1f6-53b9575b62c5' })
        //     .then((response) => {
        //         setUsers(response.data.users);
        //         console.log(response.data.users)
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }, []);

    return (
        <div className='flex flex-col h-full pt-4 px-10 justify-between'>
            <div className='h-full'>
                <div className="flex justify-end">

                    <div className='flex gap-5'>
                        <div onClick={handleAddUserOne} className='py-2.5 px-4 w-max bg-primary font-poppins flex gap-2 rounded-lg  font-normal items-center  cursor-pointer'>
                            <img src="/img/icon/plus.svg" alt="" />
                            <p className='text-white text-nowrap text-sm'>Add User</p>
                        </div>
                    </div>
                </div>
                <div className={`${users.length < 1 ? 'mt-8 lg:items-center xl:h-[92%]' : 'mt-8'} flex flex-wrap justify-center max-h-[440px] lg:max-h-[480px] overflow-auto xl:max-h-max`}>
                    {users.filter((fil) => {
                        if (_.isEmpty(userSearch)) {
                            return fil;
                        } else if (fil.first_name.toLocaleLowerCase().includes(userSearch.toLowerCase())) {
                            return fil;
                        }
                        else if (fil.last_name.toLocaleLowerCase().includes(userSearch.toLowerCase())) {
                            return fil;
                        }
                    }).map((e, index) => (
                        <div key={index} className={`bg-white shadow-md rounded-xl w-[480px] mx-5 h-[80px] flex justify-between px-6 mb-4`}>
                            <div className='flex gap-3'>
                                <div className='flex items-center'>
                                    {e.profile ? (
                                        <img src="/img/icon/live_feed_user_profile_1.png" className='w-[42px] h-[42px]' alt="" />
                                    ) : (
                                        <Avatar name={`${e.first_name} ${e.last_name}`} size={42} textSize={34} />
                                    )}
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <p className='text-[#111827] text-base capitalize font-poppins'>
                                        {e.first_name} {e.last_name}
                                    </p>
                                    <p className='text-[#868686] text-sm font-poppins'>
                                        Email ID: {e.email_id}
                                    </p>
                                </div>
                            </div>
                            <div className='flex gap-7'>
                                <img onClick={() => handleViewUser(e)} src="/img/icon/eye.svg" className='w-[22px] cursor-pointer' alt="" />
                                <img onClick={() => handleEditUser(e)} src="/img/icon/edit.svg" className='w-[22px] cursor-pointer' alt="" />
                                <img onClick={() => handleDeleteUser(e)} src="/img/icon/delete.svg" className='w-[22px] cursor-pointer' alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default User;
