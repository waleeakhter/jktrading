import React, { useState } from 'react'
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { signOut } from 'next-auth/react'
import SellingModal from './Modal/SellingModal';
import Modal from './Client/Modal';
let items = [
    { label: 'Profile', icon: 'pi pi-fw pi-plus' },
    { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => signOut() }
];
type Props = { action: HTMLDivElement | any }

const Navbar = (props: Props) => {
    const menu: any = React.useRef<HTMLButtonElement>(null);
    const [sellingModal, setSellingModal] = useState(false);
    const [visible, setVisibility] = useState(false)
    const navItems = [
        {
            label: 'Client Detail',
            icon: 'pi pi-shop',
            command: () => setVisibility(true)
        },
        {
            label: 'Order',
            icon: 'pi pi-cart',
            command: () => setSellingModal(true)
        },

    ];
    return (
        <>
            <header className='flex items-center justify-between p-4 shadow-md'>
                <div className="flex-1 flex  gap-4 items-center">
                    <h1 className="text-5xl">JK</h1>
                    <Button icon="pi pi-bars" className=' p-icon-button p-button-sm  p-button-text'
                        onClick={(e) => props.action.current.classList.toggle('active-side-bar')} />
                </div>
                <div className='flex-1 flex gap-8'>
                    {navItems.map(nav => (
                        <span className=' cursor-pointer text-xl' onClick={nav.command} key={nav.label}>
                            {nav.label}
                            <i className={nav.icon}></i>
                        </span>
                    ))}
                </div>
                <div className=''>
                    <Menu model={items} popup ref={menu} id="popup_menu" className='bg-theme mt-2 shadow-md' />
                    <Button label="Admin" icon="pi pi-user" onClick={(event) => menu.current.toggle(event)}
                        aria-controls="popup_menu" aria-haspopup />
                </div>
            </header>
            <SellingModal modalVisible={{
                sellingModal, setSellingModal
            }} />
            <Modal clientModal={{
                visible,
                setVisibility
            }} />

        </>
    )
}

export default Navbar