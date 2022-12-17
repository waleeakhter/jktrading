import { AutoComplete } from 'primereact/autocomplete';
import React, { useCallback, useEffect, useState } from 'react'
import API from '../../utils/axios';
import { ProgressBar } from 'primereact/progressbar';

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
                    return item.name.toLowerCase().startsWith(event.query.toLowerCase());
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
                <div className='flex justify-center items-center h-full'>
                    <ProgressBar color='black' className='h-2 w-24' mode="indeterminate" />
                </div>
            }

        </>
    )
}

export default Dropdown