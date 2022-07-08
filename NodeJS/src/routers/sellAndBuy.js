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

sellAndBuyRouter.post("/sellProduct", (req, res) => {
    if (req.body.productName.length < 4) {
        res.status(400).json({ error: "product name should have minimum of four characters" });
    }
    else if (req.body.costPrice < 1) {
        res.status(400).json({ error: "cost price value cannot be zero or negative value" });
    }
    else {
        const data = new SellBuy(
            { productName: req.body.productName, costPrice: req.body.costPrice }
        )
        data.save().then((result) => { res.status(201).json({ message: "Product Added" }); })
            .catch((err) => { res.status(400).json({ err }); })
    }
})

sellAndBuyRouter.patch("/sellProduct/:id", (req, res) => {
    if (req.body.soldPrice < 1) {
        res.status(400).json({ error: "sold price value cannot be zero or negative value" });
    }
    else {
        SellBuy.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((data) => {
                res.status(200).json({ message: "Updated Successfully" });
            })
            .catch((err) => {
                res.status(400).json({ message: err.message });
            });
    }
});

sellAndBuyRouter.delete("/sellProduct/:id", (req, res) => {
    SellBuy.findOneAndDelete({ _id: req.params.id })
        .then((data) => {
            res.status(200).json({ message: "Deleted successfully" });
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
});
// exporting the router

module.exports = sellAndBuyRouter;