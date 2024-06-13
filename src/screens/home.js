import React, { useContext, useState } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import AppStateContext from '../utils/AppStateContext';
import AddUserOne from './users/module/addNewUserOne';
import ViewUser from './users/module/viewUser';
import EditUser from './users/module/editUser';
import DeleteUser from './users/module/deleteUser';
import Table from './users/module/table'

const Home = () => {
    const { activeSidebarMenu, viewUser, editUser, deleteUser, updateState } = useContext(AppStateContext);

    const [activeScreen, setActiveScreen] = useState('users');
    const sidebarMenu = ['apps', 'users', 'wallet'];

    const handleActiveScreen = (e) => {
        setActiveScreen(e);
        updateState('activeSidebarMenu', e);
    };

    const handleSettings = () => {
        setActiveScreen('settings');
        updateState('activeSidebarMenu', 'settings');
    };

    return (
        <div className='w-full h-screen flex'>
            <AddUserOne />
            {viewUser && <ViewUser />}
            {editUser && <EditUser />}
            {deleteUser && <DeleteUser />}
            <div className='w-20 bg-primary h-screen justify-between flex flex-col py-8'>
                <div>
                    <div className='w-full flex justify-center'>
                        <img className='w-10' src="/img/icon/telecmi_logo.svg" alt="TeleCMI" />
                    </div>
                    <div className='flex flex-col h-700:gap-7 h-900:gap-10 pt-[68px] w-full justify-center items-center'>
                        {sidebarMenu.map((e, i) => (
                            <div key={i} onClick={() => handleActiveScreen(e)} className={`${e === activeScreen ? 'bg-[#2DA1A1] p-1.5' : 'p-1'} rounded-xl w-11 h-11 flex justify-center items-center hover:cursor-pointer`} >
                                <img className='w-6' src={`/img/icon/${e}.svg`} alt={e} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-8 w-full justify-center items-center'>
                    <div className={`${activeScreen === 'settings' ? 'bg-[#2DA1A1] p-1.5' : 'p-1'} rounded-xl w-11 h-11 flex justify-center items-center hover:cursor-pointer`}>
                        <Cog6ToothIcon onClick={handleSettings} className='text-white w-[25px] cursor-pointer' />
                    </div>
                    <img className='w-6 cursor-pointer' src="/img/icon/logout.svg" alt="Logout" />
                </div>
            </div>
            <div className='w-full h-screen overflow-hidden flex flex-col'>
                <div className='flex justify-between bg-[#EDEDED] w-full h-[50px] py-8 border-b border-[#DBDBDB] px-3 xl:px-10'>
                    <div className='flex items-center h-full'>
                        <p className='text-[#707070] font-medium text-sm font-poppins'>
                            Hello
                        </p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <img className='w-5 cursor-pointer' src='/img/icon/apps.png' alt="Apps" />
                    </div>
                </div>
                <div className='bg-[#EDEDED] w-full h-full'>
                    {activeSidebarMenu === 'apps' && <div>Apps</div>}
                    {/* {activeSidebarMenu === 'users' && <Users />} */}
                    {activeSidebarMenu === 'users' && <Table />}
                    {activeSidebarMenu === 'wallet' && <div>Wallet</div>}
                    {activeSidebarMenu === 'settings' && <div>Settings</div>}
                </div>
            </div>
        </div>
    );
};

export default Home;