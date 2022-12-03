import React from 'react'
import Link from 'next/link';
import { useRouter } from "next/router";

// interfaces
type Props = {}
type Links = { path: string, label: string, icon: string, child: Array<Object> }

const Sidebar = (props: Props) => {
    const router = useRouter();
    const dropDown = React.useRef<any>(null)
    const routes: Array<Object> = [
        {
            path: "/dashboard",
            label: "Dashboard",
            icon: "pi pi-th-large",
        },
        {
            path: "/products",
            label: "Products",
            icon: "pi pi-shopping-bag",
            child: [
                {
                    path: "/products/add",
                    label: "Add Products",
                    icon: "pi pi-plus",
                },
                {
                    path: "/products/lists",
                    label: "All Products",
                    icon: "pi pi-mobile",
                },
            ]
        },
        {
            path: "/shops",
            label: "Shops",
            icon: "pi pi-mobile",
            child: [
                {
                    path: "/shops/add",
                    label: "Add Shop",
                    icon: "pi pi-plus"
                },
                {
                    path: "/shops/list",
                    label: "Shops List",
                    icon: "pi pi-list"
                }
            ]
        },
        {
            path: "/orders",
            label: "Orders",
            icon: "pi pi-mobile",
        }
    ]

    const collapse: Function = (e: any) => {
        e.stopPropagation()
        e.target.parentElement.classList.toggle('active-dropdown')
        if (e.target.parentElement.classList.contains('active-dropdown')) {
            e.target.nextElementSibling.style.maxHeight = e.target.nextElementSibling.scrollHeight + "px"
            return
        }
        e.target.nextElementSibling.style.maxHeight = 0 + "px"
    }


    const links: Function = (links: Links) => {
        return (
            !links.child ?
                <li className={router.asPath == links.path ? "active" : ""} key={links.label}>
                    <Link href={links.path} >
                        <a><i className={links.icon}></i>{links.label}</a>
                    </Link>
                </li>
                :
                <li className={`nav-dropdown ${router.asPath.includes(links.path) ? "route-active-dropdown active-dropdown" : ""}`} key={links.label}>
                    <a ref={dropDown} className=" cursor-pointer" onClick={(e) => collapse(e)}><i className={links.icon}></i>{links.label} <i className='pi pi-chevron-right pointer-events-none'></i></a>
                    {links.child && dropdown(links.child)}
                </li>

        )
    }

    const dropdown: Function = (childerns: Object[]) => {
        return (
            <ul className='ml-3 child-dropdown'>
                {childerns.map((child: Object) => {
                    return links(child)
                })
                }
            </ul>
        )
    }
    return (
        <div>
            <ul className='space-y-4 sidebar-navigation '>
                {routes.map((route) => {
                    return links(route)
                }
                )}
            </ul>
        </div>
    )
}

export default Sidebar