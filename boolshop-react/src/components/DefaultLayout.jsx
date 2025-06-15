import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <main className='Container'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default DefaultLayout