import React from 'react'

const CheckOut = () => {
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
                                <input type="text" aria-label="nome" className="form-control w-25"></input>
                                <input type="text" aria-label="cognome" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">Email</span>
                                <input type="text" aria-label="email" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">Telefono</span>
                                <input type="text" aria-label="telefono" className="form-control w-25"></input>
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
                                <input type="text" aria-label="indirizzo" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className=" mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">Città</span>
                                <input type="text" aria-label="città" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">CAP</span>
                                <input type="text" aria-label="cap" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">Provincia</span>
                                <input type="text" aria-label="provincia" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="input-group w-50">
                                <span className="input-group-text w-25">Regione</span>
                                <input type="text" aria-label="regione" className="form-control w-25"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-center">
                            <button type="button" className="btn btn-primary checkout-button">Ordina ora</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CheckOut