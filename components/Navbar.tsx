import React from 'react'
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { signOut } from 'next-auth/react'
let items = [
    { label: 'Profile', icon: 'pi pi-fw pi-plus' },
    { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => signOut() }
];
type Props = { action: HTMLDivElement | any }

const Navbar = (props: Props) => {
    const menu: any = React.useRef<HTMLButtonElement>(null);
    return (
        <header className='flex items-center p-4 shadow-md'>
            <div className="flex-1 flex  gap-4 items-center">
                <h1 className="text-5xl">JK</h1>
                <Button icon="pi pi-bars" className=' p-icon-button p-button-sm  p-button-text'
                    onClick={(e) => props.action.current.classList.toggle('active-side-bar')} />
            </div>
            <div>
                <Menu model={items} popup ref={menu} id="popup_menu" className='bg-theme mt-2 shadow-md' />
                <Button label="Admin" icon="pi pi-user" onClick={(event) => menu.current.toggle(event)}
                    aria-controls="popup_menu" aria-haspopup />
            </div>
        </header>
    )
}

export default Navbar