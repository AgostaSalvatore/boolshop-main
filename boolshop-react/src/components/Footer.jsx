import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 mb-3 mb-md-0 text-center text-md-start">
              <img className='logo img-fluid' src="/img/boolshop-logo-5.png" alt="BoolShop Logo" />
            </div>
            <div className="col-md-9">
              <div className="d-flex justify-content-between align-items-center text-white">
                <ul className="list-unstyled mb-0 me-3">
                  <li className="mb-2">
                    <a href="#" className="text-white text-decoration-none">Condizioni di vendita</a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white text-decoration-none">Informativa sulla privacy</a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white text-decoration-none">Programma Affiliazione</a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none">Contatti</a>
                  </li>
                </ul>

                <div className="ms-3 d-flex align-items-center">
                  <a href="#" className="text-decoration-none mx-2">
                    <FontAwesomeIcon icon={faDiscord} style={{ color: "#5865F2", fontSize: "1.5rem" }} />
                  </a>
                  <a href="#" className="text-decoration-none mx-2">
                    <FontAwesomeIcon icon={faTwitter} style={{ color: "#1DA1F2", fontSize: "1.5rem" }} />
                  </a>
                  <a href="#" className="text-decoration-none mx-2">
                    <FontAwesomeIcon icon={faInstagram} style={{ color: "#E1306C", fontSize: "1.5rem" }} />
                  </a>
                  <a href="#" className="text-decoration-none mx-2">
                    <FontAwesomeIcon icon={faFacebook} style={{ color: "#1877F2", fontSize: "1.5rem" }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
