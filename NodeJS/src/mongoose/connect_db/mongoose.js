const mongoose = require("mongoose");

// db connection
mongoose.connect("mongodb://127.0.0.1:27017/SellAndBuy", {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
