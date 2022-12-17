import { AutoComplete } from 'primereact/autocomplete';
import React, { useCallback, useEffect, useState } from 'react'
import API from '../../utils/axios';

type Props = { target: string, callback: Function }

const Dropdown = ({ target, callback }: Props) => {
    const [filteredShop, setFilteredShop] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [items, setItems] = useState([]);

    const getitems = useCallback(() => {
        API.get(target)
            .then((response) => setItems(response.data))
            .catch(error => console.log(error))
    }, [target])

    useEffect(() => {
        target && getitems()
    }, [target, getitems])
    const handler = (e: { value: any }) => {
        setSelectedShop(e.value);
        (callback && e.value?._id) && callback(e.value)
    }

    const searchCountry = (event: any) => {
        setTimeout(() => {
            let _filteredCountries;
            if (!event.query.trim().length) {
                _filteredCountries = [...items];
            }
            else {
                _filteredCountries = items.filter((country: { name: string }) => {
                    return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilteredShop(_filteredCountries);
        }, 100);
    }
    return (
        <AutoComplete placeholder='Enter Client Name'
            value={selectedShop} suggestions={filteredShop} dropdown
            completeMethod={searchCountry} field="name" onChange={handler} />

    )
}

export default Dropdown