import React from 'react'

const CheckOut = () => {

    function sendMail() {
        let parms = {
            name: document.getElementById('nome').value,
            cognome: document.getElementById('cognome').value,
            email: document.getElementById('email').value,
            indirizzo: document.getElementById('indirizzo').value,
            citta: document.getElementById('citta').value,
            cap: document.getElementById('cap').value,
            provincia: document.getElementById('provincia').value,
        }

        emailjs.send('service_81lthpc', 'template_ypez885', parms).then(alert('Email inviata con successo!!!'));
    }

    return (
        <>
            <h1>Check-out</h1>
            <div className="conatiner d-flex justify-content-center">
                <form className='chekout-form mb-3'>
                    <div className="row">
                        <div className="col-12">
                            <h4>Inserisci i tuoi dati per completare l'ordine</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <label for="Dati-personali" className="form-label">Dati personali</label>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">Nome e Cognome</span>
                                <input type="text" aria-label="nome" id="nome" className="form-control w-25"></input>
                                <input type="text" aria-label="cognome" id="cognome" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">Email</span>
                                <input type="text" aria-label="email" id="email" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">Telefono</span>
                                <input type="text" aria-label="telefono" id="telefono" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <label for="indirizzo-di-spedizione" className="form-label">Indirizzo di spedizione</label>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">Indirizzo</span>
                                <input type="text" aria-label="indirizzo" id="indirizzo" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className=" mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">Città</span>
                                <input type="text" aria-label="città" id="citta" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">CAP</span>
                                <input type="text" aria-label="cap" id="cap" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">Provincia</span>
                                <input type="text" aria-label="provincia" id="provincia" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">Regione</span>
                                <input type="text" aria-label="regione" id="regione" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <button type="button" onClick={sendMail} className="btn btn-primary checkout-button">Ordina ora</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CheckOut