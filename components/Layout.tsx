import React, { PropsWithChildren } from 'react'
import Navbar from './Navbar'
import { Card } from 'primereact/card';
import Sidebar from './Sidebar';
import { Toast } from 'primereact/toast'
import Protected from "./protected";
interface RefObject<T> {
    readonly current: T | null
}
let toast: RefObject<Toast>;
const toastMessage = (type: any, heading: string, message: string,) => {
    if (toast.current !== null) {
        toast.current.show({ life: 10000, severity: type || "", summary: heading, detail: message })
    }
}
const contextObject = { toastMessage }
export const AppContext = React.createContext(contextObject);
const Layout = ({ children }: PropsWithChildren) => {
    toast = React.createRef<Toast>()

    const sideBar = React.useRef<HTMLDivElement | null>(null);

    return (
        <AppContext.Provider value={contextObject}>
            <Protected>
                <Toast ref={toast} />
                <Navbar action={sideBar} />
                <div className='flex p-4 overflow-x-hidden space-x-5 '>
                    <div className='flex-[0_0_250px] active-side-bar transition-all side-bar' ref={sideBar}>
                        <Card className='h-100 overflow-y-auto'>
                            <Sidebar />
                        </Card>
                    </div>
                    <div className='flex-1 transition-all '>
                        <Card className='h-full content-wrapper'>
                            {children}
                        </Card>
                    </div>
                </div>
            </Protected>
        </AppContext.Provider>
    )
}

export default Layout