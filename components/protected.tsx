import React, { PropsWithChildren, useCallback, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { ProgressSpinner } from 'primereact/progressspinner';
import { AppContext } from './Layout';
const Protected = ({ children }: PropsWithChildren): JSX.Element => {
    const { status, data } = useSession();
    const { toastMessage } = React.useContext(AppContext)
    const route = useRouter()
    const redirect = useCallback(() => {
        toastMessage("error", "UnAuthorized", "You are Unauthorized");
        route.replace("/");
    }, [toastMessage, route])
    useEffect(() => {
        status === "unauthenticated" ? redirect : null;
    }, [status, redirect])

    {
        if (status === "authenticated") {
            return <>
                {children}
            </>
        }
    }
    return <div className=' h-screen flex items-center justify-center'>
        <div className=' text-white '>
            <ProgressSpinner />
        </div>
    </div>

}

export default Protected