import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-1">
                            <div className="d-flex align-items-center">
                                <img className=' logo img-fluid mx-4' src="/img/boolshop-logo-3.png" alt="" />
                                <form className='d-flex' role="search">
                                    <input className="form-control me-2 h-25" type="search" placeholder="Search..." aria-label="Search" />
                                    <button className="btn h-25" type="submit">Search</button>
                                </form>
                            </div>
                            <div className="links">

                            </div>
                        </div>
                    </div>

                </div>
            </header>
        </>
    )
}

export default Header