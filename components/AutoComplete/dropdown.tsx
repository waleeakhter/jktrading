import { AutoComplete } from 'primereact/autocomplete';
import React, { useCallback, useEffect, useState } from 'react'
import API from '../../utils/axios';

type Props = { target?: string, callback: Function, options?: Array<{ name: string }>, placeholder?: string, className?: string }

const Dropdown = ({ target, callback, options, placeholder, className }: Props) => {
    const [filteredItem, setFilteredItem] = useState([] as any);
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState(options ?? []);

    const getitems = useCallback(() => {
        API.get(target ?? "")
            .then((response) => { console.log(response.data); setItems(response.data) })
            .catch(error => console.log(error))
    }, [target, options])

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
        <AutoComplete placeholder={placeholder} className={className}
            value={selectedItem} suggestions={filteredItem} dropdown
            completeMethod={searchItem} field="name" onChange={handler} />

    )
}

export default Dropdown