import React from 'react'

const CheckOut = () => {

    function sendMail(e) {
        e.preventDefault();

        // Get all required field values
        const nome = document.getElementById('nome').value.trim();
        const cognome = document.getElementById('cognome').value.trim();
        const email = document.getElementById('email').value.trim();
        const indirizzo = document.getElementById('indirizzo').value.trim();
        const citta = document.getElementById('citta').value.trim();
        const cap = document.getElementById('cap').value.trim();
        const provincia = document.getElementById('provincia').value.trim();

        // Check if any required field is empty
        if (!nome || !cognome || !email || !indirizzo || !citta || !cap || !provincia) {
            alert('Inserisci tutti i campi obbligatori');
            return; //fermo il processo
        }

        // If all fields are filled, proceed with sending email
        let parms = {
            name: nome,
            cognome: cognome,
            email: email,
            indirizzo: indirizzo,
            citta: citta,
            cap: cap,
            provincia: provincia,
        }

        emailjs.send('service_81lthpc', 'template_ypez885', parms)
            .then(() => {
                alert('Email inviata con successo!!!')
                document.querySelector('form').reset();
            })
            .catch(error => alert('Errore nell\'invio dell\'email: ' + error.message));
    }

    return (
        <>
            <h1>Check-out</h1>
            <div className="conatiner d-flex justify-content-center">
                <form className='chekout-form mb-3'>
                    <div className="row">
                        <div className="col-12">
                            <h4 className='text-white'>Inserisci i tuoi dati per completare l'ordine</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <label for="Dati-personali" className="form-label text-white">Dati personali</label>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-50">Nome*</span>
                                <input type="text" aria-label="nome" id="nome" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-50">Cognome*</span>
                                <input type="text" aria-label="cognome" id="cognome" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-50">Email*</span>
                                <input type="text" aria-label="email" id="email" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-50">Telefono*</span>
                                <input type="text" aria-label="telefono" id="telefono" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <label for="indirizzo-di-spedizione" className="form-label text-white">Indirizzo di spedizione</label>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-50">Indirizzo*</span>
                                <input type="text" aria-label="indirizzo" id="indirizzo" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className=" mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-50">Città*</span>
                                <input type="text" aria-label="città" id="citta" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-50">CAP*</span>
                                <input type="number" aria-label="cap" id="cap" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-50">Provincia*</span>
                                <input type="text" aria-label="provincia" id="provincia" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-50">Regione*</span>
                                <input type="text" aria-label="regione" id="regione" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" onClick={sendMail} className="btn btn-primary checkout-button">Ordina ora</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CheckOut