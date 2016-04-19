var faker = require("faker");

var products = [];
var prices = [];

for (var i = 0; i < 10; i++){
    products.push(faker.commerce.productName());
    prices.push(faker.commerce.price());
}

console.log("===================\n" + "Welcome to my shop!\n" + "===================")
for (var i = 0; i < 10; i++){
    console.log(products[i] + " - $" + prices[i])
}