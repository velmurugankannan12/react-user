import React, { Fragment, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react'
import _ from 'underscore'
import { CheckIcon } from '@heroicons/react/24/outline';

const country_list = [
    {
        country: 'BLR - India',
        country_full: 'BLR - India',
        code: 'blr_in'
    },
    {
        country: 'Noida - India',
        country_full: 'Noida - India',
        code: 'noida_in'
    },
    {
        country: 'Dallas - US',
        country_full: 'Dallas - US',
        code: 'us'
    },
    {
        country: 'UK',
        country_full: 'United Kingdom',
        code: 'uk'
    },
    {
        country: 'Australia',
        country_full: 'Australia',
        code: 'au'
    },
    {
        country: 'Singapore',
        country_full: 'Singapore',
        code: 'sg'
    },
    {
        country: 'UK',
        country_full: 'United Kingdom',
        code: 'uk'
    },
    {
        country: 'Australia',
        country_full: 'Australia',
        code: 'au'
    },
    {
        country: 'Singapore',
        country_full: 'Singapore',
        code: 'sg'
    },
    {
        country: 'UK',
        country_full: 'United Kingdom',
        code: 'uk'
    },
    {
        country: 'Australia',
        country_full: 'Australia',
        code: 'au'
    },
    {
        country: 'Singapore',
        country_full: 'Singapore',
        code: 'sg'
    },
    {
        country: 'UK',
        country_full: 'United Kingdom',
        code: 'uk'
    },
    {
        country: 'Australia',
        country_full: 'Australia',
        code: 'au'
    },
    {
        country: 'Singapore',
        country_full: 'Singapore',
        code: 'sg'
    },
    {
        country: 'UK',
        country_full: 'United Kingdom',
        code: 'uk'
    },
    {
        country: 'Australia',
        country_full: 'Australia',
        code: 'au'
    },
    {
        country: 'Singapore',
        country_full: 'Singapore',
        code: 'sg'
    },
    {
        country: 'UK',
        country_full: 'United Kingdom',
        code: 'uk'
    },
    {
        country: 'Australia',
        country_full: 'Australia',
        code: 'au'
    },
    {
        country: 'Singapore',
        country_full: 'Singapore',
        code: 'sg'
    },
]
const country = 'BLR - India'
const code = 'blr_in'
const search_region = ''

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function countryMenu({ menu, onClick }) {

    console.log(menu)



    const selectRegion = () => {
        onClick()
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            {/* <div>
                <label className="block mb-2">
                    <span className="font-primary after:ml-0.5 text-[#374151] text-sm w-max after:text-red-500 block font-semibold ">
                        Region
                    </span>
                </label>
                <Menu.Button className="inline-flex justify-between w-48 h-h42 items-center font-normal rounded-md bg-[#FAFAFA] px-3  text-sm text-[#6B7280] shadow-sm border border-[#D1D5DB]  focus:border-[#008080] focus:border-spacing-4 ">
                    <div className='flex items-center'>
                        <img src={`images/login/${code}.png`} className='mr-3 h-6 w-8 shadow-md' alt='coutry flag' />
                        <p className='font-primary text-base font-normal text-[#111827]'>{country}</p>
                    </div>
                    <div>
                        <img src='images/login/drop.png' width="10px" alt='dropdown' />
                    </div>
                </Menu.Button>
            </div> */}
            <Transition show={menu} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95" >
                <Menu.Items className="absolute -top-[120px] -left-[80px] overflow-auto max-h-[350px] z-10 mt-2 w-56 origin-bottom-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 ">
                    <div className="">
                        {country_list.filter((index) => {
                            if (_.isEmpty(search_region)) {
                                return index
                            }
                            else if (index.country_full.toLowerCase().includes(search_region.toLowerCase())) {
                                return index
                            }
                            else {
                                return false
                            }
                        }).map((e, index) => (
                            <Menu.Item key={index} onClick={() => selectRegion(e.country, e.code)}>
                                {({ active }) => (
                                    <div className={classNames(active ? 'bg-[#008080] text-white' : 'text-[#111827]', code === e.code ? 'text-[#111827] text-base font-semibold' : '', ' px-4 py-2 flex justify-between text-base h-10 my-2 cursor-pointer ease-in duration-200')} >
                                        <div className='flex'>
                                            <img src={`images/login/${e.code}.png`} width="30px" className='mr-3 shadow-md' alt='country' />
                                            <p className='font-primary'>{e.country_full}</p>
                                        </div>
                                        <CheckIcon className={classNames(code === e.code ? 'w-5 text-[#008080] ' : 'w-0', active ? 'text-white' : '',)} />
                                    </div>
                                )}
                            </Menu.Item>
                        ))
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu >
    )
}
