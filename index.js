"use strict";
//Making a bill
// class Bill {
//   constructor() {
//     this.products = [];
//     this.shop = [];
//     this.billCode = "";
//     this.billDate = "";
//   }
//   //Setting the bill values
//   getTotal() {
//     //   let value = this.product.productCode.map(item => item.productCode === code);
//     //   console.log(value);
//   }
// }
// const bill1 = new Bill();
// //bill1.getTotal();

//Create a virtual shop.
class Shop {
  constructor(shopName, shopAddress, email, tel) {
    this.shopName = "Asian Corner";
    this.shopAddress = "Hamburger 123, Hamburg";
    this.email = "asianMarkt@gmail.com";
    this.tel = 123456789;
  }
}

//Setting the products
class Products {
  constructor(productName, productCode, price, unit) {
    this.productCode = productCode;
    this.productName = productName;
    this.price = price;
    this.unit = unit;
  }

  getReduce(num) {
    //get % reduce for some products
    this.price = this.price - (this.price / 100) * num;
  }
}
const rice = new Products("Rice", 123, 23.75, "23kg Package");
const noodle = new Products("Instance Noodle", 3657, 13.55, "25 Packs Box");
rice.getReduce(10);

//Setting Products Manager
class Billing extends Shop {
  constructor(shopName, shopAddress, email, tel) {
    super(shopName, shopAddress, email, tel);
    this.products = [];
    this.bill = {};
  }
  //Adding product
  addProduct(...products) {
    this.products.push(...products);
  }

  //Delete product
  deleteProduct(product) {
    const idx = this.products.findIndex(
      item => item.productCode === product.productCode
    );
    this.products.splice(idx, 1);
  }

  //List all the products in Shop
  list() {
    console.log(this.products);
  }

  //Setting the bill
  makeBill(product, quantity) {
    let total = 0;

    //Get the product out of products list to get the price
    let result = this.products.filter(
      item => item.productCode === product.productCode
    );
    total = result[0].price;

    //the total amount is depends on the quantity of items.
    if (quantity >= 2) total = total * quantity;

    //sending the bill the shopping items
    this.bill[product.productName] = total;
  }
  //Text the shopping list
  shoppingToText() {
    let textShoppingItems = "";
    for (let [item, price] of Object.entries(this.bill)) {
      textShoppingItems += `${item}: ${price}€
                        `;
    }
    return textShoppingItems;
  }
  //Working on the Bill
  getChange(num, cbChange) {
    //Count the total amount of all items.
    let sumOfBill = Object.values(this.bill).reduce(
      (sum, price) => sum + price,
      0
    );
    //Checking if the given amount is less than the bill
    if (num < sumOfBill) console.log("Your paid is not enough!");
    //Checking if just right paying amount.
    else if (num === sumOfBill) console.log("You've given right amount.");
    else {
      //Get the total change after receive money from customer
      let change = num - sumOfBill;

      //Print out the BILL---------------------
      console.log(`
        ------------------THE BILL------------------

        Shop : ${this.shopName}.
        Shopping items: ${this.shoppingToText()}
        Total: ${sumOfBill}€
        Your paid: ${num}€
        Your change is ${cbChange(change)}
        `); //Make the change by calling a callback function.
    }
  }
}
const productMan1 = new Billing();
//adding products to Products list
productMan1.addProduct(rice);
productMan1.addProduct(noodle);

//productMan1.deleteProduct(rice);
//productMan1.list();
productMan1.makeBill(rice, 2); //buying product - adding to bill
productMan1.makeBill(noodle, 1); //buying product - adding to bill

//getChange function get paid from customer and using callback function to count the change
productMan1.getChange(100, countChange);

//Setting a callback function to make a Change.
function countChange(sum) {
  const round = [
    //array of full Euro notes and coins
    ["oneHundredNote", 100, 20],
    ["fiftyNote", 50, 100],
    ["twentyNote", 20, 100],
    ["tenNote", 10, 100],
    ["fiveNote", 5, 100],
    ["twoEuroCoin", 2, 100],
    ["oneEuroCoin", 1, 100],
  ];
  const coins = [
    //array of all Euro cents
    ["fiftyCoin", 50, 100],
    ["twentyCoin", 20, 100],
    ["tenCoin", 10, 100],
    ["fiveCentCoin", 5, 100],
    ["twoCentCoin", 2, 100],
    ["oneCentCoin", 1, 100],
  ];
  //get the cents out of amount of bill
  const cents = Number((sum - Math.floor(sum)).toFixed(2) * 100);

  //get the round sum of amount of bill
  const roundSum = Math.floor(sum);

  let roundChange = []; //array of round change
  let coinsChange = []; //array of  coins change

  let getRoundChange = {}; //counting the round change
  let getCoinsChange = {}; //counting the coins change

  let toText = "";
  //get array of full Euro values to give back the change
  if (roundSum > 0) {
    const roundArr = round.reduce((arr, cur) => arr.concat(cur[1]), []);
    roundChange = amountToChange(roundSum, roundArr);
    roundChange.forEach(
      val => (getRoundChange[val] = (getRoundChange[val] || 0) + 1)
    );
  } else if (roundSum === 0) roundChange = roundSum;

  //array of all coins of cents values to give back the change
  if (cents > 0) {
    const coinsArr = coins.reduce((arr, cur) => arr.concat(cur[1]), []);
    coinsChange = amountToChange(cents, coinsArr);
    coinsChange.forEach(
      val => (getCoinsChange[val] = (getCoinsChange[val] || 0) + 1)
    );
  } else if (cents === 0) coinsChange = cents;
  for (let [note, amount] of Object.entries(getRoundChange)) {
    toText += `${amount} of ${note}€, `;
  }
  for (let [coin, amount] of Object.entries(getCoinsChange)) {
    toText += `${amount} of ${coin} cent, `;
  }
  return toText;
}

//Created a function use to execute the change.
function amountToChange(num, arr) {
  let temp = 0;
  if (num === 0) return [];
  else {
    if (num >= arr[0]) {
      temp = num - arr[0];
      return [arr[0]].concat(amountToChange(temp, arr));
    } else {
      arr.shift();
      return amountToChange(num, arr);
    }
  }
}
