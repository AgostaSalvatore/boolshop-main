import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
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