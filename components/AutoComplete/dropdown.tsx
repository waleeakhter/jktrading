import { AutoComplete } from 'primereact/autocomplete';
import React, { useCallback, useEffect, useState } from 'react'
import API from '../../utils/axios';
import { Skeleton } from 'primereact/skeleton';

type Props = { target?: string, callback: Function, options?: Array<{ name: string }> | undefined, placeholder?: string, className?: string }

const Dropdown = ({ target, callback, options, placeholder, className }: Props) => {
    const [filteredItem, setFilteredItem] = useState([] as any);
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState(options ?? []);
    const [loading, setLoading] = useState(true)

    const getitems = useCallback(() => {
        API.get(target ?? "")
            .then((response) => { console.log(response.data); setLoading(false); setItems(response.data) })
            .catch(error => console.log(error))
    }, [target])

    useEffect(() => {
        target && getitems()
    }, [target, getitems])
    useEffect(() => {
        options && setLoading(false)
    }, [options])

    const handler = (e: { value: any }) => {
        setSelectedItem(e.value);
        (callback && e.value?._id) && callback(e.value)
    }

    const searchItem = (event: any) => {
        setTimeout(() => {
            let _filteredItems;
            if (!event.query.trim().length) {
                _filteredItems = [...items];
            }
            else {
                _filteredItems = items.filter((item: { name: string }) => {
                    return item.name.toLowerCase().includes(event.query.toLowerCase());
                });
            }

            setFilteredItem(_filteredItems);
        }, 100);
    }
    return (
        <>
            {!loading ?
                <AutoComplete placeholder={placeholder} className={className}
                    value={selectedItem} suggestions={filteredItem} dropdown
                    completeMethod={searchItem} field="name" onChange={handler} />
                :
                <div className='flex-[0_0_250px]'>
                    <Skeleton color='black' height='52px' className=' cursor-wait ' shape="rectangle" />
                </div>
            }

        </>
    )
}

export default Dropdown