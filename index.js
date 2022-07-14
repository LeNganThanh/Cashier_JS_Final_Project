"use strict";
/**
 * Create a virtual shop.
 *
 * @param {string} shopName - the name of shop
 * @param {string} shopAddress - the address of shop
 * @param {string} email - the email of shop
 * @param {number} tel - the telephone number of shop
 *
 */
class Shop {
  constructor(shopName, shopAddress, email, tel) {
    this.shopName = "Asian Corner";
    this.shopAddress = "Hamburger 123, Hamburg";
    this.email = "asianMarkt@gmail.com";
    this.tel = 123456789;
  }
}

/**
 *
 *-------------------------Products-----------------------------
 *
 *  this.productCode - the code of product
 *  this.productName - the name of product (full details name)
 *  this.price - the price of product (update the new price after reducing)
 *  this.unit - the details description of product with measurement (kg, l ....)
 *  this.validDate - the valid date of product
 *
 */

class Products {
  constructor(productName, productCode, price, unit, validDate) {
    this.productCode = productCode;
    this.productName = productName;
    this.price = price;
    this.unit = unit;
    this.validDate = validDate;
  }
  /**
   *
   * @param {num} num - % reduce for some products
   * @returns - the new price after reducing
   *
   */
  getReduce(num) {
    this.price = (this.price - (this.price / 100) * num).toFixed(2);
  }
}
/**
 * setting Products
 */
const rice = new Products("Rice", 123, 23.75, "23kg Package", "20/07/2023");
const noodle = new Products(
  "Instance Noodle",
  3657,
  13.55,
  "25 Packs Box",
  "30/01/2024"
);
const vermicelli = new Products(
  "Glass Noodle",
  555,
  2.45,
  "1kg Package",
  "12/12/2023"
);
const coconut = new Products("Coconut", 2549, 1.75, "1l Bottle", "25/12/2023");
const pomelo = new Products(
  "Pomelo Juice",
  2550,
  1.53,
  "750ml Bottle",
  "01/01/2024"
);
const pineapple = new Products(
  "Pineapple Juice",
  2548,
  1.21,
  "500ml Bottle",
  "15/07/2024"
);
const tofu = new Products("Tofu", 7123, 1.89, "500g Package", "20/08/2022");
const vegaBeef = new Products(
  "Vegan Beef",
  7564,
  5.67,
  "500g Package",
  "30/07/2022"
);
const vegaFish = new Products(
  "Vegan Fish Ball",
  7566,
  3.45,
  "750g Package",
  "15/09/2022"
);
const fish = new Products("Basa", 9876, 3.45, "1kg Basa fish", "20/07/2022");
const chicken = new Products(
  "A chicken",
  7896,
  9.55,
  "1kg chicken",
  "15/07/2022"
);
const pork = new Products(
  "Pork Leg",
  4573,
  8.55,
  "1.5kg Package",
  "17/07/2022"
);

/**
 * reducing price
 * @param {number} - % reduce for some products
 */
rice.getReduce(10);

/**
 * Store of all products---------
 * in store we can add all sort of products and delete some - can list all products in shop and search products.
 *
 * this.products - array to store all products in shop
 * this.veganProducts - array to store all vegan products
 * this.drinkProducts - array to store all drinking products
 * this.freshProducts - array to store all fresh products
 * this.dryProducts - array to store all dry products
 *
 */
//
class ShopProducts {
  constructor() {
    this.products = [];
    this.veganProducts = [];
    this.drinkProducts = [];
    this.freshProducts = [];
    this.dryProducts = [];
  }
  /**
   *
   * @param  {object} product  - adding product to products array and kinds of products array
   *
   */
  addDryProduct(...product) {
    this.products.push(...product);
    this.dryProducts.push(...product);
  }
  addVeganProduct(...product) {
    this.products.push(...product);
    this.veganProducts.push(...product);
  }
  addDrinkProduct(...product) {
    this.products.push(...product);
    this.drinkProducts.push(...product);
  }
  addFreshProduct(...product) {
    this.products.push(...product);
    this.freshProducts.push(...product);
  }

  /**
   *
   * @param {object} product - find the index of product and using splice to get out of products list
   *
   */
  deleteProduct(product) {
    const idx = this.products.findIndex(
      item => item.productCode === product.productCode
    );
    this.products.splice(idx, 1);

    /**
     * delDryProductIdx - find the index of product in specific sort of product to splice out
     */
    let delDryProductIdx = 0;
    this.dryProducts.map(item => {
      if (item.productCode === product.productCode)
        return (delDryProductIdx = this.dryProducts.indexOf(item));
    });
    if (delDryProductIdx !== 0) this.dryProducts.splice(delDryProductIdx, 1);

    /**
     * delFreshProductIdx - find the index of product in specific sort of product to splice out
     */
    let delFreshProductIdx = 0;
    this.dryProducts.map(item => {
      if (item.productCode === product.productCode)
        return (delFreshProductIdx = this.dryProducts.indexOf(item));
    });
    if (delFreshProductIdx !== 0)
      this.dryProducts.splice(delFreshProductIdx, 1);

    /**
     * delVeganProductIdx - find the index of product in specific sort of product to splice out
     */
    let delVeganProductIdx = 0;
    this.dryProducts.map(item => {
      if (item.productCode === product.productCode)
        return (delVeganProductIdx = this.dryProducts.indexOf(item));
    });
    if (delVeganProductIdx !== 0)
      this.dryProducts.splice(delVeganProductIdx, 1);

    /**
     * delDrinkProductIdx - find the index of product in specific sort of product to splice out
     */
    let delDrinkProductIdx = 0;
    this.dryProducts.map(item => {
      if (item.productCode === product.productCode)
        return (delDrinkProductIdx = this.dryProducts.indexOf(item));
    });
    if (delDrinkProductIdx !== 0)
      this.dryProducts.splice(delDrinkProductIdx, 1);
  }

  /**
   * list all products in shop.
   * list kinds of products
   */
  listProducts() {
    console.log(this.products);
  }
  listVeganProducts() {
    console.log(this.veganProducts);
  }
  listDrinkProducts() {
    console.log(this.drinkProducts);
  }
  listFreshProducts() {
    console.log(this.freshProducts);
  }
  listDryProducts() {
    console.log(this.dryProducts);
  }
  /**
   * search for a specific product
   * @param {object} product -  object contains the product to search
   *
   */
  searchProducts(product) {
    const findItem = this.products.find(
      item => (item.productName = product.productName)
    );
    console.log(findItem);
  }
}

const shopProducts = new ShopProducts();
/**
 * adding all products to shop products list
 */
shopProducts.addDryProduct(rice);
shopProducts.addDryProduct(noodle);
shopProducts.addDryProduct(vermicelli);
shopProducts.addDrinkProduct(coconut);
shopProducts.addDrinkProduct(pomelo);
shopProducts.addDrinkProduct(pineapple);
shopProducts.addFreshProduct(fish);
shopProducts.addFreshProduct(chicken);
shopProducts.addFreshProduct(pork);
shopProducts.addVeganProduct(tofu);
shopProducts.addVeganProduct(vegaBeef);
shopProducts.addVeganProduct(vegaFish);
//shopProducts.deleteProduct(vermicelli);
//shopProducts.listProducts();
//shopProducts.listVeganProducts();
//shopProducts.listDrinkProducts();
//shopProducts.listDryProducts();
//shopProducts.listFreshProducts();
//shopProducts.searchProducts(rice);

/////////////////////////////////////////////////////////

/**
 * -----------------------BILL------------------------
 * Bill gets extend from Shop to get all shop information and get printout on the Bill.
 *
 * All parameter are getting from Shop class
 * @param {string} shopName - the name of shop
 * @param {string} shopAddress - the address of shop
 * @param {string} email - the email of shop
 * @param {number} tel - the telephone number of shop
 *
 * products - array of shopping products
 * bill - object contains the shopping products and price
 * billDate - getting the date for the bill
 * billNumber - getting the bill number
 *
 */

class Billing extends Shop {
  constructor(shopName, shopAddress, email, tel) {
    super(shopName, shopAddress, email, tel);
    this.products = [];
    this.bill = {};
    this.billDate = "";
    this.billNumber = "";
  }
  /**
   * @param  {object} products - Adding product to shopping cart
   */
  addProductToCart(...products) {
    this.products.push(...products);
  }

  /**
   *
   * Delete unneeded product
   * @param {object} product - product doesn't need to buy
   *
   * find the index of product and using splice to get out of list
   *
   */
  deleteProduct(product) {
    const idx = this.products.findIndex(
      item => item.productCode === product.productCode
    );
    this.products.splice(idx, 1);
  }

  /**
   * list all the products in Cart
   */
  listProductToBuy() {
    console.log(this.products);
  }

  /**
   *
   * setting the bill object with information of products and total payment
   * making bill needs the product and the quantity of product.
   * @param {object} product - that contains all information about product
   * @param {number} quantity - the number of product to buy
   *
   * getting roduct out of products list to get the price by using "filter"
   * the total amount is depends on the quantity of items.
   *
   */
  makeBill(product, quantity) {
    let total = 0; //Create a variable to store total amount to pay

    let result = this.products.filter(
      item => item.productCode === product.productCode
    );
    total = result[0].price;
    if (quantity >= 2) total = total * quantity;

    this.bill[product.productName] = total;
  }

  /**
   * Text to printout---------------------------------
   *
   * @returns {string} - Text to printout on the Bill
   * getting products name and amount from bill object
   * using padEnd or padStart to get align the text.
   * using parseFloat and toFixed to get decimal to 2 digits.
   *
   */
  shoppingToText() {
    let textShoppingItems = "";
    for (let [item, price] of Object.entries(this.bill)) {
      textShoppingItems += `
        ${item.padEnd(15, " ")}: ${parseFloat(price)
        .toFixed(2)
        .toString()
        .padStart(7, " ")}€`;
    }
    return textShoppingItems;
  }
  /**
   * setting the bill date
   *
   * @returns {string} - a string of date dd/mm/yyyy
   * monthArr - use to printout month in word.
   * today - getting today Date
   * todayMonth - get number of month to convert to text by using monthArr
   *
   * using padStart in the case of 1 digit then it should show 2 digits with 0 in front.
   *
   */
  getDate() {
    //
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
    let today = new Date();
    let todayMonth = today.getMonth();
    return (this.billDate = ` ${today
      .getDate()
      .toString()
      .padStart(2, "0")} - ${monthArr[todayMonth]} - ${today.getFullYear()}`);
  }

  /**
   *setting the bill number
   *
   * @returns {string} -  //Bill number includes today date + hour + minute.
   * today - get today Date for the bill number
   * using padStart in the case of 1 digit then it should show 2 digits with 0 in front.
   *
   */
  getBillNr() {
    let today = new Date();

    this.billNumber =
      today.getDate().toString() +
      (today.getMonth() + 1).toString().padStart(2, "0") +
      today.getFullYear().toString() +
      "-" +
      today.getHours().toString().padStart(2, "0") +
      today.getMinutes().toString().padStart(2, "0");
    return this.billNumber;
  }

  /**
   *
   * setting up the bill printout --------------------------
   * to complete the bill - we need the Change to give back the rest amount of payment to customer.
   *
   * @param {number} num - the total cash from customer
   * @param {function} cbChange - a callback  to execute the change  - it is called in the BILL printout
   *  //callback function will receive the change as the pay back amount and num as the total payment from customer.
   * @returns {string}- the Bill printout
   *
   * sumOfBill - calculate the total amount of all products.
   *
   */
  getChange(num, cbChange) {
    let sumOfBill = Object.values(this.bill).reduce(
      (sum, price) => sum + price,
      0
    );
    /**
     * checking if customer pay by Credit Card
     */
    if (num === "card") return "You paid by Card.";
    /**
     * checking if the given amount is less than the Bill total
     */
    if (num < sumOfBill) console.log("Your paid is not enough!");
    /**
     * checking if just right paying amount.
     */ else if (num === sumOfBill) console.log("You've given right amount.");
    else {
      /**
       * calculate the change after receive money from customer
       */
      let change = parseFloat(num - sumOfBill).toFixed(2);

      /**
       *
       * Print out the BILL---------------------
       *
       * Bill has bill number and bill date on the top
       * in the middle is the shopping product - the total payment - the cash from customer . the change to give back and the amount of currency sort of change.
       * bottom has all information of shop
       *
       */

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

/////////////////////////////////////////////////////////////

/**
 * ------------------Get shopping---------------------------
 * setting the first bill - instance of Billing class
 */
const bill1 = new Billing();

/**
 * adding products to shopping list
 */
bill1.addProductToCart(rice);
bill1.addProductToCart(noodle);
bill1.addProductToCart(vermicelli);

//bill1.deleteProduct(vermicelli); //delete product out of list
//bill1.listProductToBuy(); //Show all products

bill1.makeBill(rice, 2); //buying product - adding to bill - 2 is quantity
bill1.makeBill(noodle, 1); //buying product - adding to bill

/**
 * 100 - amount payment from customer
 * countChange is a callback function to execute the change
 */
bill1.getChange(100, countChange);

//console.log(bill1.getChange("card"));//a situation if customer pay by card

/**
 * setting the second bill
 */
// const bill2 = new Billing();
// bill2.addProductToCart(vegaBeef);
// bill2.addProductToCart(coconut);
// //bill2.listProductToBuy();
// bill2.makeBill(coconut, 2);
// bill2.makeBill(vegaBeef, 1);
// bill2.getChange(20, countChange);

///////////////////////////////////////////////////////

/**
 * -----------A Callback function-------------------
 *
 * setting a callback function to execute the Change.
 * @param {number} sum - the sum of change that has to give back to customer
 * @param {number} givenSum - the total money has given by customer
 * @returns {string} - the text to printout on the Bill with the amount of value currency of the change
 *
 */

function countChange(sum, givenSum) {
  /**
   *
   * round - array of full Euro notes and coins (name of currency - value of currency - amount of current at Cashier)
   * coins - array of all Euro cents (name of coin - value of coin - amount of coins at Cashier)
   * giveNote - object obtain the amount payment given by customer.
   *
   */
  const round = [
    ["oneHundredNote", 100, 20],
    ["fiftyNote", 50, 50],
    ["twentyNote", 20, 100],
    ["tenNote", 10, 100],
    ["fiveNote", 5, 100],
    ["twoEuroCoin", 2, 200],
    ["oneEuroCoin", 1, 200],
  ];
  const coins = [
    ["fiftyCoin", 50, 200],
    ["twentyCoin", 20, 200],
    ["tenCoin", 10, 200],
    ["fiveCentCoin", 5, 200],
    ["twoCentCoin", 2, 500],
    ["oneCentCoin", 1, 500],
  ];

  let giveNote = {};

  /**
   *
   * calling amountToChange() to check how many kind of currency note and amount of note given by customer and add it to array of currency
   * roundArr get all the value of currency in cash to provide an array to check in amountToChange()
   * roundNote get an array of values from the amountToChange()
   * giveNote object will receive the amount of each notes given by roundNote array
   *
   */

  const roundArr = round.reduce((arr, cur) => arr.concat(cur[1]), []);
  let roundNote = amountToChange(givenSum, roundArr);
  roundNote.forEach(val => (giveNote[val] = (giveNote[val] || 0) + 1));

  /**
   * loop through the round array to add the amount of note has given by customer to the total of cash at Cashier
   */
  for (let [note, amount] of Object.entries(giveNote)) {
    for (let i = 0; i < round.length; i++) {
      if (round[i][1] === Number(note)) round[i][2] += amount;
    }
  }

  /**
   * -----------------The Change---------------------
   *
   * roundSum - get the round currency sum of bill (50€, 2€....)
   * cents - get the cents of bill
   * roundChange - array of round currency of the change
   * coinsChange - array of  coins of the change
   * getRoundChange - Object of total round currency of the change
   * getCoinsChange - Object of coins of the change
   * toText - Get details of the change to get printout on the Bill
   *
   */

  const roundSum = Math.floor(sum);
  const cents = Number((sum - Math.floor(sum)) * 100).toFixed(2);
  let roundChange = [];
  let coinsChange = [];
  let getRoundChange = {};
  let getCoinsChange = {};
  let toText = "";

  /**
   *
   * getting an array of full Euro values (50€, 20€...) to give back the change
   * if some note has amount of 0 then get out of array
   * Ex. the change is 80€ = 50€ + 20€ + 10€ - if the Cashier has no 50€ note then the array has no 50 value -->> 4 x 20€
   *
   * roundCopyArr - a copy of round currency array to splice in case of no values notes
   *
   */
  if (roundSum > 0) {
    let roundCopyArr = round;
    /**
     * loop thought to check if it is enough coins
     */
    for (let i = 0; i < round.length; i++) {
      if (round[i][2] === 0) {
        let idxOfNoCash = 0; //get index of the currency has the amount of 0 at Cashier
        round.forEach(val => {
          if (val[2] === 0) {
            idxOfNoCash = round.indexOf(val);
            /**
             * if all the round currency except 1€ coin has 0 amount then splice out of array
             */
            if (idxOfNoCash !== round.length - 1)
              roundCopyArr.splice(idxOfNoCash, 1);
            else if (idxOfNoCash === round.length - 1)
              roundCopyArr.splice(idxOfNoCash, 0);
          }
        });
      }
    }

    /**
     *
     * calling amountToChange() to check how many kind of currency note and amount of note has to give back to customer and add it to array of currency notes
     * roundArr get all the value of currency in cash to provide an array to check in amountToChange()
     * roundChange get an array of values from the amountToChange()
     * getRoundChange object will receive the currency note and amount of note to give back
     * in case has not to give back any note then the amount of round currency is 0
     *
     */
    const roundArr = roundCopyArr.reduce((arr, cur) => arr.concat(cur[1]), []);
    roundChange = amountToChange(roundSum, roundArr);
    roundChange.forEach(
      val => (getRoundChange[val] = (getRoundChange[val] || 0) + 1)
    );
  } else if (roundSum === 0) roundChange = roundSum;

  /**
   *
   * getting an array of all coins of cents values to give back the change
   * if some kind of coins is missing then get delete out of array to use to execute amountToChange().
   * Ex. 30ct = 20ct + 10ct if 20ct is missing -->> 3 x 10ct
   *
   * coinsCopyArr - a copy of coins array to splice in case of no values coins
   *
   */
  if (cents > 0) {
    let coinsCopyArr = coins;

    /**
     * loop thought to check if it is enough coins
     */
    for (let i = 0; i < coins.length; i++) {
      if (coins[i][2] === 0) {
        let idxOfNoCoin = 0; //get index of coins has 0 amount at Cashier
        coins.forEach(val => {
          if (val[2] === 0) {
            idxOfNoCoin = coins.indexOf(val);
            /**
             * if all the cent except 1 cent has 0 amount then splice out of array
             */
            if (idxOfNoCoin !== coins.length - 1)
              coinsCopyArr.splice(idxOfNoCoin, 1);
            else if (idxOfNoCoin === coins.length - 1)
              coinsCopyArr.splice(idxOfNoCoin, 0);
          }
        });
      }
    }

    /**
     *
     * calling amountToChange() to check how many kind of coin and amount of coin has to give back to customer and add it to array of coins
     *
     * coinsArr get all the value of coins to provide an array to check in amountToChange()
     * coinsChange get an array of values from the amountToChange()
     *
     * getCoinsChange object will receive the coins value and amount of coins to give back
     * in case has not to give back any coin then the amount of coins is 0
     *
     */
    const coinsArr = coinsCopyArr.reduce((arr, cur) => arr.concat(cur[1]), []);
    coinsChange = amountToChange(cents, coinsArr);
    coinsChange.forEach(
      val => (getCoinsChange[val] = (getCoinsChange[val] || 0) + 1)
    );
  } else if (cents === 0) coinsChange = cents;

  /**
   *
   * Text to printout--------------------
   * get printout the currency note of change on the Bill
   * decrement the amount of note after give back the change
   * getRoundChange object will give the amount of note has to give back
   *
   * sortNoteChange - get an array of object sort from big value to smaller value
   *
   * if the value is 1€ or 2€ that will be "coin"
   *
   */

  const sortNoteChange = Object.entries(getRoundChange).sort(
    (a, b) => b[0] - a[0]
  );
  for (let [note, amount] of sortNoteChange) {
    if (note === 1 || note === 2)
      toText += `    ${amount} x ${note}€ coin
    `;
    else
      toText += `    ${amount} x ${note}€ note
                       `;
  }

  /**
   *
   * Text to printout--------------------
   * get printout the coins of change on the Bill
   *
   * decrement the amount of coins after give back
   * getCoinsChange object will give the amount of coins has to give back
   *
   * sortCoinChange - get an array of sort coins object from big to small value coin
   *
   */

  const sortCoinChange = Object.entries(getCoinsChange).sort(
    (a, b) => b[0] - a[0]
  );
  for (let [coin, amount] of sortCoinChange) {
    toText += `    ${amount} x ${coin} cent
                       `;
  }

  /**
   * @returns(string) - Return the change details Text to the Bill
   */
  return toText;
}

/**
 * ------------------RECURSION-----------------
 *
 * execute the change.
 * @param {number} num -  total amount of the change (or given amount) from customer
 * @param {array} arr - array of currency values (notes - coins)
 * @returns {array.number} - array contains the value of currency of the change
 *
 */
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
