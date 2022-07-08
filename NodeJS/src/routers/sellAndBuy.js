const express = require("express");
const SellBuy = require("../mongoose/models/sellBuy")

// setting up the router

const sellAndBuyRouter = new express.Router();

// code goes here for routes

sellAndBuyRouter.get("/sellProduct", (req, res) => {
    let query = {};
    let sortBy = null;
    if (req.query.product) {
        query.productName = req.query.product;
    }
    if (req.query.sortBy) {
        switch (req.query.sortBy) {
            case "lowerCostPrice":
                sortBy = { costPrice: 1 }
                break;
            case "higherCostPrice":
                sortBy = { costPrice: -1 }
                break;
            case "lowerSoldPrice":
                sortBy = { soldPrice: 1 }
                break;
            case "higherSoldPrice":
                sortBy = { soldPrice: -1 }
                break;
            default:
                null;
        }
    }

    SellBuy.find(query).sort(sortBy)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
});

// exporting the router

module.exports = sellAndBuyRouter;