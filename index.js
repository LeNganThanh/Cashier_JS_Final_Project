"use strict";

//Create a virtual shop.
class Shop {
  constructor(shopName, shopAddress, email, tel) {
    this.shopName = "Asian Corner";
    this.shopAddress = "Hamburger 123, Hamburg";
    this.email = "asianMarkt@gmail.com";
    this.tel = 123456789;
  }
}

//-------------Products------------------//
//All products are sorted by kind of products with the name - code - price - unit detail and valid date for fresh food.

//Store of Vegan Products
class Vegan {
  constructor(productName, productCode, price, unit, validDate) {
    this.productCode = productCode;
    this.productName = productName;
    this.price = price;
    this.unit = unit;
    this.validDate = validDate; //in case of fresh food
  }
  getReduce(num) {
    //get % reduce for some products
    this.price = (this.price - (this.price / 100) * num).toFixed(2);
  }
}
const tofu = new Vegan("Tofu", 7123, 1.89, "500g Package", "20/08/2022");
const vegaBeef = new Vegan(
  "Vegan Beef",
  7564,
  5.67,
  "500g Package",
  "30/07/2022"
);
const vegaFish = new Vegan(
  "Vegan Fish Ball",
  7566,
  3,
  45,
  "750g Package",
  "15/09/2022"
);

//Store of fresh Products
class FreshProducts {
  constructor(productName, productCode, price, unit, validDate) {
    this.productCode = productCode;
    this.productName = productName;
    this.price = price;
    this.unit = unit;
    this.validDate = validDate; //in case of fresh food
  }
  getReduce(num) {
    //get % reduce for some products
    this.price = (this.price - (this.price / 100) * num).toFixed(2);
  }
}
//setting some fresh products to shop
const fish = new FreshProducts(
  "Basa",
  9876,
  3.45,
  "1kg Basa fish",
  "20/07/2022"
);
const chicken = new FreshProducts(
  "A chicken",
  7896,
  9.55,
  "1kg chicken",
  "15/07/2022"
);
const pork = new FreshProducts(
  "Pork Leg",
  4573,
  8.55,
  "1.5kg Package",
  "17/07/2022"
);

//Store of drinking Products
class DrinkProducts {
  constructor(productName, productCode, price, unit) {
    this.productCode = productCode;
    this.productName = productName;
    this.price = price;
    this.unit = unit;
  }
  getReduce(num) {
    //get % reduce for some products
    this.price = (this.price - (this.price / 100) * num).toFixed(2);
  }
}

//getting drinking stuff for shop
const coconut = new DrinkProducts("Coconut", 2549, 1.75, "1l Bottle");
const pomelo = new DrinkProducts("Pomelo Juice", 2550, 1.53, "750ml Bottle");
const pineapple = new DrinkProducts(
  "Pineapple Juice",
  2548,
  1.21,
  "500ml Bottle"
);

//Store of Dry products
class DryProducts {
  constructor(productName, productCode, price, unit) {
    this.productCode = productCode;
    this.productName = productName;
    this.price = price;
    this.unit = unit;
  }

  getReduce(num) {
    //get % reduce for some products
    this.price = (this.price - (this.price / 100) * num).toFixed(2);
  }
}
//get product to DryProducts list
const rice = new DryProducts("Rice", 123, 23.75, "23kg Package");
const noodle = new DryProducts("Instance Noodle", 3657, 13.55, "25 Packs Box");
const vermicelli = new DryProducts("Glass Noodle", 555, 2.45, "1kg Package");
rice.getReduce(10); //set the reduce for product

//Store of all products
//In this store we can add all sort of products and delete some - can list all products in shop and search products.
class ShopProducts {
  constructor() {
    this.products = []; //array to store all products in shop
  }
  addProducts(...product) {
    //adding products to products array
    this.products.push(...product);
  }
  deleteProduct(product) {
    //find the index of product and using splice to get out of products list
    const idx = this.products.findIndex(
      item => item.productCode === product.productCode
    );
    this.products.splice(idx, 1);
  }
  listProducts() {
    //list all products in shop.
    console.log(this.products);
  }
  searchProducts(product) {
    const findItem = this.products.find(
      item => (item.productName = product.productName)
    );
    console.log(findItem);
  }
}
const shopProducts = new ShopProducts();
//adding all products to one list
shopProducts.addProducts(rice);
shopProducts.addProducts(noodle);
shopProducts.addProducts(vermicelli);
shopProducts.addProducts(coconut);
shopProducts.addProducts(pomelo);
shopProducts.addProducts(pineapple);
shopProducts.addProducts(fish);
shopProducts.addProducts(chicken);
shopProducts.addProducts(pork);
shopProducts.addProducts(tofu);
shopProducts.addProducts(vegaBeef);
shopProducts.addProducts(vegaFish);
//shopProducts.deleteProduct(vermicelli);
//shopProducts.listProducts();
//shopProducts.searchProducts(rice);

//-----------------------BILL-------------------------//

//Setting Bill
//Bill gets extend from Shop to get all shop information and get printout on the Bill.
class Billing extends Shop {
  constructor(shopName, shopAddress, email, tel) {
    super(shopName, shopAddress, email, tel);
    this.products = []; //Array of shopping products
    this.bill = {}; //Object to contain the shopping products and price
    this.billDate = ""; //Getting the date for the bill
    this.billNumber = ""; //Getting the bill number
  }
  //Adding product to shopping cart
  addProductToCart(...products) {
    this.products.push(...products);
  }

  //Delete unneeded product
  deleteProduct(product) {
    //find the index of product and using splice to get out of list
    const idx = this.products.findIndex(
      item => item.productCode === product.productCode
    );
    this.products.splice(idx, 1);
  }

  //List all the products in Cart
  listProductToBuy() {
    console.log(this.products);
  }

  //Setting the bill
  //Making bill needs the product and the quantity of product.
  makeBill(product, quantity) {
    let total = 0; //Create a variable to store total amount to pay
    //Get the product out of products list to get the price
    let result = this.products.filter(
      item => item.productCode === product.productCode
    );
    total = result[0].price;

    //the total amount is depends on the quantity of items.
    if (quantity >= 2) total = total * quantity;

    //setting the bill object with information of products and total payment
    this.bill[product.productName] = total;
  }

  //Text to printout---------------------------------
  //setting the Text to print out on the bill
  //Getting products name and amount from bill object
  shoppingToText() {
    let textShoppingItems = "";
    for (let [item, price] of Object.entries(this.bill)) {
      //using padEnd or padStart to get align the text.
      //using parseFloat and toFixed to get decimal to 2 digits.
      textShoppingItems += `
        ${item.padEnd(15, " ")}: ${parseFloat(price)
        .toFixed(2)
        .toString()
        .padStart(7, " ")}€`;
    }
    return textShoppingItems;
  }
  //Setting the bill date
  getDate() {
    //using month array to printout month in word.
    let monthArr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let today = new Date(); //getting today Date
    let todayMonth = today.getMonth(); //get Month to convert to text by using monthArr
    return (this.billDate = ` ${today
      .getDate()
      .toString()
      .padStart(2, "0")} - ${monthArr[todayMonth]} - ${today.getFullYear()}`);
    //using padStart in the case of 1 digit then it should show 2 digits with 0 in front.
  }

  //Setting the bill number
  getBillNr() {
    let today = new Date(); //Get today Date for the bill number

    //Bill number includes today date + hour and minute.
    //using padStart in the case of 1 digit then it should show 2 digits with 0 in front.
    this.billNumber =
      today.getDate().toString() +
      (today.getMonth() + 1).toString().padStart(2, "0") +
      today.getFullYear().toString() +
      "-" +
      today.getHours().toString().padStart(2, "0") +
      today.getMinutes().toString().padStart(2, "0");
    return this.billNumber;
  }

  //Execute the change------------------------------------
  //To complete the bill - we need the Change to give back the rest amount of payment to customer.
  //getChange method get the "num" is the total cash from customer
  //cbChange is a callback function to execute the change  - it is called in the BILL printout
  //callback function will receive the change as the pay back amount and num as the total payment from customer.
  getChange(num, cbChange) {
    //Checking if customer pay by Credit Card
    if (num === "card") return "You paid by Card.";

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
      //Counting the change after receive money from customer
      let change = parseFloat(num - sumOfBill).toFixed(2);

      //Print out the BILL---------------------
      //Bill has bill number and bill date on the top
      //In the middle is the shopping product - the total payment - the cash from customer . the change to give back and the amount of currency sort of change.
      //Bottom has all information of shop
      console.log(`
        ------------------THE BILL------------------

        Bill Nr. ${this.getBillNr().padStart(13, " ")}
        Bill Date.${this.getDate()}

        --------------------------------------------

        Shopping items ${this.shoppingToText()}
        Total : ${parseFloat(sumOfBill)
          .toFixed(2)
          .toString()
          .padStart(16, " ")}€
        Your paid : ${num.toString().padStart(10, " ")}€
        You get back : ${change.toString().padStart(9, " ")}€
        Your change :  ${cbChange(change, num)}

        --------------------------------------------

        Shop : ${this.shopName.padStart(15, " ")}
        Address : ${this.shopAddress}
        Tel : ${this.tel.toString().padStart(13, " ")}
        Email : ${this.email.padStart(22, " ")}
        `);
    }
  }
}
/* Output.

        ------------------THE BILL------------------

        Bill Nr. 13072022-1636
        Bill Date. 13 - Jul - 2022

        --------------------------------------------

        Shopping items 
        Rice           : 42.75€
        Instance Noodle: 13.55€
        Total :          56.3€
        Your paid :      100€
        You get back :   43.69€
        Your change :    1 x 1€ coin
                         1 x 2€ coin
                         2 x 20€ note
                         1 x 20 cent
                         1 x 50 cent
                       

        --------------------------------------------

        Shop :    Asian Corner
        Address : Hamburger 123, Hamburg
        Tel :     123456789
        Email :   asianMarkt@gmail.com
*/

//------------------Get shopping---------------------------//

//Setting the first bill
const bill1 = new Billing();

//adding products to shopping list
bill1.addProductToCart(rice);
bill1.addProductToCart(noodle);
bill1.addProductToCart(vermicelli);

//bill1.deleteProduct(vermicelli); //delete product out of list
//bill1.listProductToBuy(); //Show all products

bill1.makeBill(rice, 2); //buying product - adding to bill - 2 is quantity
bill1.makeBill(noodle, 1); //buying product - adding to bill

//countChange is a callback function to execute the change
//100 is the amount payment from customer
bill1.getChange(100, countChange);

//console.log(bill1.getChange("card"));//a situation if customer pay by card

//Setting the second bill
// const bill2 = new Billing();
// bill2.addProductToCart(vegaBeef);
// bill2.addProductToCart(coconut);
// //bill2.listProductToBuy();
// bill2.makeBill(coconut, 2);
// bill2.makeBill(vegaBeef, 1);
// bill2.getChange(20, countChange);

//-----------A Callback function-------------------//

//Setting a callback function to execute the Change.
//sum is the total bill
//givenSum is the money given by customer
function countChange(sum, givenSum) {
  const round = [
    //array of full Euro notes and coins
    //name of currency - value of currency - amount of current at Cashier
    ["oneHundredNote", 100, 20],
    ["fiftyNote", 50, 50],
    ["twentyNote", 20, 100],
    ["tenNote", 10, 100],
    ["fiveNote", 5, 100],
    ["twoEuroCoin", 2, 200],
    ["oneEuroCoin", 1, 200],
  ];
  const coins = [
    //array of all Euro cents
    //name of coin - value of coin - amount of coins at Cashier
    ["fiftyCoin", 50, 200],
    ["twentyCoin", 20, 200],
    ["tenCoin", 10, 200],
    ["fiveCentCoin", 5, 200],
    ["twoCentCoin", 2, 500],
    ["oneCentCoin", 1, 500],
  ];

  //giveNote object obtain the amount payment given by customer.
  let giveNote = {};

  //Calling amountToChange() to check how many kind of currency note and amount of note given by customer and add it to array of currency
  //roundArr get all the value of currency in cash to provide an array to check in amountToChange()
  const roundArr = round.reduce((arr, cur) => arr.concat(cur[1]), []);

  //roundNote get an array of values from the amountToChange()
  let roundNote = amountToChange(givenSum, roundArr);

  //giveNote object will receive the amount of each notes given by roundNote array
  roundNote.forEach(val => (giveNote[val] = (giveNote[val] || 0) + 1));

  //loop through the round array to add the amount of note has given by customer to the total of cash at Cashier
  for (let [note, amount] of Object.entries(giveNote)) {
    for (let i = 0; i < round.length; i++) {
      if (round[i][1] === Number(note)) round[i][2] += amount;
    }
  }

  //-----------------The Change---------------------
  //get the round currency sum of bill (50€, 2€....)
  const roundSum = Math.floor(sum);

  //get the cents of bill
  const cents = Number((sum - Math.floor(sum)) * 100).toFixed(2);

  let roundChange = []; //array of round currency of the change
  let coinsChange = []; //array of  coins of the change

  let getRoundChange = {}; //Object of total round currency of the change
  let getCoinsChange = {}; //Object of coins of the change

  let toText = ""; //Get details of the change to get printout on the Bill

  //get array of full Euro values to give back the change
  //If some note has amount of 0 then get out of array
  //Ex. the change is 80€ = 50€ + 20€ + 10€ - if the Cashier has no 50€ note then the array has no 50 value -->> 4 x 20€
  if (roundSum > 0) {
    let roundCopyArr = round; //Get a copy to splice in case of no values notes
    //loop through to check if any cash is 0
    for (let i = 0; i < round.length; i++) {
      if (round[i][2] === 0) {
        let idxOfNoCash = 0; //get index of the currency has the amount of 0 at Cashier
        round.forEach(val => {
          if (val[2] === 0) {
            idxOfNoCash = round.indexOf(val);

            //if all the round currency not 1€ coin has 0 amount then splice out of array
            if (idxOfNoCash !== round.length - 1)
              roundCopyArr.splice(idxOfNoCash, 1);
            //keeping 1€ always in the list even has 0 amount
            else if (idxOfNoCash === round.length - 1)
              roundCopyArr.splice(idxOfNoCash, 0);
          }
        });
      }
    }

    //calling amountToChange() to check how many kind of currency note and amount of note has to give back to customer and add it to array of currency notes
    //roundArr get all the value of currency in cash to provide an array to check in amountToChange()
    const roundArr = roundCopyArr.reduce((arr, cur) => arr.concat(cur[1]), []);

    //roundChange get an array of values from the amountToChange()
    roundChange = amountToChange(roundSum, roundArr);

    //getRoundChange object will receive the currency note and amount of note to give back
    roundChange.forEach(
      val => (getRoundChange[val] = (getRoundChange[val] || 0) + 1)
    );
  }
  //In case has not to give back any note then the amount of round currency is 0
  else if (roundSum === 0) roundChange = roundSum;

  //array of all coins of cents values to give back the change
  //if some kind of coins is missing then get delete out of array to use for execute amountToChange().
  //Ex. 30ct = 20ct + 10ct if 20ct is missing -->> 3 x 10ct
  if (cents > 0) {
    let coinsCopyArr = coins; //Get a copy to splice in case of no values coins
    //loop to check if it is enough coins
    for (let i = 0; i < coins.length; i++) {
      if (coins[i][2] === 0) {
        let idxOfNoCoin = 0; //get index of coins has 0 amount at Cashier
        coins.forEach(val => {
          if (val[2] === 0) {
            idxOfNoCoin = coins.indexOf(val);

            //if all the cent not 1 cent has 0 amount then splice out of array
            if (idxOfNoCoin !== coins.length - 1)
              coinsCopyArr.splice(idxOfNoCoin, 1);
            //keeping 1cent coins always in the list even has 0 amount
            else if (idxOfNoCoin === coins.length - 1)
              coinsCopyArr.splice(idxOfNoCoin, 0);
          }
        });
      }
    }

    //calling amountToChange() to check how many kind of coin and amount of coin has to give back to customer and add it to array of coins
    //coinsArr get all the value of coins to provide an array to check in amountToChange()

    const coinsArr = coinsCopyArr.reduce((arr, cur) => arr.concat(cur[1]), []);

    //coinsChange get an array of values from the amountToChange()
    coinsChange = amountToChange(cents, coinsArr);

    //getCoinsChange object will receive the coins value and amount of coins to give back
    coinsChange.forEach(
      val => (getCoinsChange[val] = (getCoinsChange[val] || 0) + 1)
    );
  }

  //In case has not to give back any coin then the amount of coins is 0
  else if (cents === 0) coinsChange = cents;

  //Decrement the amount of note after give back the change
  //getRoundChange object will give the amount of note has to give back
  for (let [note, amount] of Object.entries(getRoundChange)) {
    //minus the note amount
    for (let i = 0; i < round.length; i++) {
      if (round[i][1] === Number(note)) {
        round[i][2] -= Number(amount);
      }
    }
    //Text to printout------------------
    //setting the Text to printout the note change (1€ and 2€ are only coins) on the Bill
    if (note === "1" || note === "2")
      toText += `    ${amount} x ${note}€ coin
                       `;
    else
      toText += `    ${amount} x ${note}€ note
                       `;
  }

  //Decrement the amount of coins after give back
  //getCoinsChange object will give the amount of coins has to give back
  for (let [coin, amount] of Object.entries(getCoinsChange)) {
    //minus the coins amount
    for (let i = 0; i < coins.length; i++) {
      if (coins[i][1] === Number(coin)) {
        coins[i][2] -= Number(amount);
      }
    }

    //Text to printout--------------------
    //get printout the coins of change on the Bill
    toText += `    ${amount} x ${coin} cent
                       `;
  }
  //
  return toText; //Return the change details Text to the Bill
}

//------------------RECURSION-----------------
//A function use to execute the change.
//amountToChange get "num" as total amount and using array to check that how many kind of value should be.
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
