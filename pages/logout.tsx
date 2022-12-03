import React from 'react'
import { signOut } from 'next-auth/react'
type Props = {}

const Logout = (props: Props) => {
    React.useEffect(() => {
        signOut().then(res => {
            console.log('Logged out', res)
        })
    }, [])
    return (
        <div>Logout</div>
    )
}

export default Logout