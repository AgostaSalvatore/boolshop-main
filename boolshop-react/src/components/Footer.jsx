import React from 'react'

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <img className=' logo img-fluid mx-4' src="/img/boolshop-logo-5.png" alt="" />
            </div>
            <div className="col-8">
              <ul>
                <li><a>Contatti</a></li>
                <li><a>Chi siamo</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
