const SellBuy = require("../../src/mongoose/models/sellBuy");
const mongoose = require("mongoose");
require("../../src/mongoose/connect_db/mongoose");

const productData = [
  {
    _id: new mongoose.Types.ObjectId,
    productName: "Laptop",
    costPrice: 8000,
    soldPrice: 9400
  },
  {
    _id: new mongoose.Types.ObjectId,
    productName: "Mobile",
    costPrice: 4500,
    soldPrice: 4000
  },
  {
    _id: new mongoose.Types.ObjectId,
    productName: "Laptop",
    costPrice: 5000,
    soldPrice: 10000
  },
  {
    _id: new mongoose.Types.ObjectId,
    productName: "Table",
    costPrice: 3000,
  }
]


const setUpDatabase = async () => {
  await SellBuy.deleteMany();
  await new SellBuy(productData[0]).save();
  await new SellBuy(productData[1]).save();
  await new SellBuy(productData[2]).save();
  await new SellBuy(productData[3]).save();
}

module.exports = {
  setUpDatabase,
  productData,  
}
