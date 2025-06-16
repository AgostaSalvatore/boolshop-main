import React from 'react'

const ProductDescription = ({ description }) => {
  return (
    <>
        <div className="container-fluid py-5">
            <div className="row">
                <div className="col-lg-8">
                    <h3 className="mb-4">Descrizione del Prodotto</h3>
                    
                    <p className="lead">
                        {description}
                    </p>

                    <h4>"Anno dopo anno, la Pittrice ci cancella".</h4>
                    <p>
                        Una volta all'anno, la Pittrice si risveglia e inizia a dipingere sul suo Monolito. 
                        Dipinge il numero maledetto. E tutti coloro che hanno quell'età si tramutano in fumo 
                        e svaniscono. Anno dopo anno il numero cambia, e altre persone vengono cancellate. 
                        Domani la Pittrice si svegliera e dipingera il numero '33'. E domani noi partiremo 
                        per la missione finale: distruggere la Pittrice, in modo che non possa più dipingere 
                        la morte.
                    </p>
                    <p>
                        Noi siamo la <strong>Spedizione 33</strong>.
                    </p>
                    <p>
                        Con un solo anno da vivere, Gustave, Maelle e gli altri esploratori partono in una 
                        missione disperata per interrompere il ciclo di morte della Pittrice. Segui le tracce 
                        delle spedizioni precedenti e scopri il loro destino. Fai la conoscenza dei membri 
                        della Spedizione 33, che dovranno imparare a collaborare per sconfiggere avversari 
                        apparentemente insormontabili.
                    </p>

                    <h4>Combattimento a turni reattivo</h4>
                    <p>
                        In questa evoluzione del JRPG, le azioni in tempo reale intensificano il combattimento 
                        a turni. Crea esploratori adatti al tuo stile di gioco, modificando equipaggiamenti, 
                        statistiche, abilità e sinergie tra i personaggi. Apri una dimensione attiva in 
                        combattimento: schiva, para e contrattacca in tempo reale, crea combo padroneggiando 
                        i ritmi d'attacco e colpisci i punti deboli dei nemici usando un sistema di mira libera.
                    </p>

                    <h4>"C'è sempre domani"</h4>
                    <p>
                        Con un solo anno da vivere, Gustave, Maelle e gli altri esploratori partono in una 
                        missione disperata per interrompere il ciclo di morte della Pittrice. Segui le tracce 
                        delle spedizioni precedenti e scopri il loro destino. Fai la conoscenza dei membri 
                        della Spedizione 33, che dovranno imparare a collaborare per sconfiggere avversari 
                        apparentemente insormontabili.
                    </p>

                    <h4>Un mondo splendido e inquietante</h4>
                    <p>
                        Esplora un mondo incantato, popolato da aversari surreali. Aggirati in ambienti 
                        mozzafiato, dall'Isola di Visage al Campo di battaglia dimenticato, scoprendo segreti 
                        e missioni nascoste. Trova improbabili alleati in creature leggendarie e recluta 
                        compagni speciali, accedi a nuovi mezzi di trasporto e svela aree segrete nella 
                        mappa del mondo.
                    </p>
                </div>
            </div>
        </div>
    </>
  );
}

export default ProductDescription
