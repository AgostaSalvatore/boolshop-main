import React from 'react'
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
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