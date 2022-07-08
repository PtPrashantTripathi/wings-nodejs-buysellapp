const mongoose = require("mongoose");

//write your code for sellBuySchema collection here - model

const sellBuySchema = new mongoose.Schema({
    productName:{
        type:String,
        required: true,
    },
    costPrice:{
        type: Number,
        require:true
    },
    soldPrice:{
        type: Number
    }
})

const SellBuy = mongoose.model("SellBuy",sellBuySchema);
module.exports = SellBuy
