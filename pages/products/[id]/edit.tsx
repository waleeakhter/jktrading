import React from 'react'
import { getCategories } from '../../../helper/dataFetch'
import AddProduct from './../add'
type Props = {
    categories: Object[]
}

const Edit = (props: Props) => {

    return (
        <div>
            <AddProduct categories={props.categories} />
        </div>
    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    const categories = await getCategories()
    // Pass data to the page via props
    return { props: { categories } }


}

export default Edit