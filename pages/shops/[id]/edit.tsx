import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import API from '../../../utils/axios'
import AddShop from './../add'
type Props = {}

const Edit = (props: Props) => {
    const [shop, setShop] = useState({})
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        id && API.get(`/shops/list?_id=${id}`).then(res => {
            setShop({ ...res.data.at(0) })
        })
    }, [id])
    return (
        <div>
            <AddShop shop={shop} id={id} />
        </div>
    )
}

export default Edit