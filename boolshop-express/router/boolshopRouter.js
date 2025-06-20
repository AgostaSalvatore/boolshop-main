// Importiamo il modulo express per creare il router
const express = require("express");
// Creiamo un nuovo router Express
const router = express.Router();
// Importiamo il controller che contiene le funzioni per gestire le richieste
const boolshopController = require("../controllers/boolshopController");

// Definiamo le rotte dell'API
// Rotta per ottenere tutti i videogiochi
router.get("/", boolshopController.index);
// Rotta per ottenere i videogiochi ordinati per prezzo decrescente
router.get("/price-desc", boolshopController.orderByPriceDesc);
// Rotta per ottenere i videogiochi ordinati per prezzo crescente
router.get("/price-asc", boolshopController.orderByPriceAsc);
// Rotta per ottenere i dettagli di un singolo videogioco tramite il suo ID
router.get("/:id", boolshopController.show);
// Rotta per decurtare la quantià una volta aggiunto il prodotto al carrello
router.patch("/:id", boolshopController.update);

router.get("/:id/related", boolshopController.relatedProducts)

// Export
module.exports = router;
