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

//Getting products
class Products {
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
//get product to Products list
const rice = new Products("Rice", 123, 23.75, "23kg Package");
const noodle = new Products("Instance Noodle", 3657, 13.55, "25 Packs Box");
const vermicelli = new Products("Glass Noodle", 555, 2.44, "1kg Package");
rice.getReduce(10); //set the reduce for product

//-----------------------BILL-------------------------//

//Setting Bill
class Billing extends Shop {
  constructor(shopName, shopAddress, email, tel) {
    super(shopName, shopAddress, email, tel);
    this.products = [];
    this.bill = {};
    this.billDate = "";
    this.billNumber = "";
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
      textShoppingItems += `
        ${item.padEnd(15, " ")}: ${price.toString()}€`;
    }
    return textShoppingItems;
  }
  //Setting the bill date
  getDate() {
    //using month array to printout month in letter.
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

  //Setting the bill number
  getBillNr() {
    let today = new Date();
    this.billNumber =
      today.getDate().toString() +
      (today.getMonth() + 1).toString().padStart(2, "0") +
      today.getFullYear().toString() +
      "-";
    //Bill number includes today date + hour and minute.
    this.billNumber +=
      today.getHours().toString().padStart(2, "0") +
      today.getMinutes().toString().padStart(2, "0");
    return this.billNumber;
  }
  //Working on the Bill
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
      //Get the total change after receive money from customer
      let change = (num - sumOfBill).toFixed(2);

      //Print out the BILL---------------------
      console.log(`
        ------------------THE BILL------------------

        Bill Nr. ${this.getBillNr().padStart(13, " ")}
        Bill Date.${this.getDate()}

        --------------------------------------------

        Shopping items ${this.shoppingToText()}
        Total : ${sumOfBill.toString().padStart(14, " ")}€
        Your paid : ${num.toString().padStart(8, " ")}€
        You get back : ${change.toString().padStart(7, " ")}€
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

        Bill Nr.   12072022-1
        Bill Date. 12 - Jul - 2022

        --------------------------------------------

        Shopping items 
        Rice           : 42.75€
        Instance Noodle: 13.55€
        Total :          56.3€
        Your paid :      100€
        You get back :   43.7€
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

const bill1 = new Billing();
//adding products to Products list
bill1.addProduct(rice);
bill1.addProduct(noodle);
bill1.addProduct(vermicelli);
//bill1.deleteProduct(vermicelli); //delete product out of list
//bill1.list(); //Show all products
bill1.makeBill(rice, 2); //buying product - adding to bill
bill1.makeBill(noodle, 1); //buying product - adding to bill

//getChange function get paid from customer and using callback function to count the change
bill1.getChange(100, countChange);
//console.log(bill1.getChange("card"));

// const bill2 = new Billing();
// bill2.addProduct(vermicelli);
// //bill2.list();
// bill2.makeBill(vermicelli, 2);
// bill2.getChange(20, countChange);

//Setting a callback function to make the Change.
function countChange(sum, givenSum) {
  const round = [
    //array of full Euro notes and coins
    ["oneHundredNote", 100, 0],
    ["fiftyNote", 50, 50],
    ["twentyNote", 20, 100],
    ["tenNote", 10, 100],
    ["fiveNote", 5, 100],
    ["twoEuroCoin", 2, 200],
    ["oneEuroCoin", 1, 200],
  ];
  const coins = [
    //array of all Euro cents
    ["fiftyCoin", 50, 200],
    ["twentyCoin", 20, 200],
    ["tenCoin", 10, 200],
    ["fiveCentCoin", 5, 200],
    ["twoCentCoin", 2, 500],
    ["oneCentCoin", 1, 500],
  ];

  //adding the paid amount to Cashier
  let giveNote = {};
  //get the value of note and amount of note
  const roundArr = round.reduce((arr, cur) => arr.concat(cur[1]), []);
  let roundNote = amountToChange(givenSum, roundArr);
  roundNote.forEach(val => (giveNote[val] = (giveNote[val] || 0) + 1));

  //loop through the round array to add the amount of note has given.
  for (let [note, amount] of Object.entries(giveNote)) {
    for (let i = 0; i < round.length; i++) {
      if (round[i][1] === Number(note)) round[i][2] += amount;
    }
  }
  //console.log(round);

  //get the cents out of amount of bill
  const cents = Number((sum - Math.floor(sum)).toFixed(2) * 100);

  //get the round sum of amount of bill
  const roundSum = Math.floor(sum);

  let roundChange = []; //array of round change
  let coinsChange = []; //array of  coins change

  let getRoundChange = {}; //counting the round change
  let getCoinsChange = {}; //counting the coins change

  let toText = ""; //Get details of change

  //get array of full Euro values to give back the change
  if (roundSum > 0) {
    let roundCopyArr = round; //Get a copy to splice in case of no values notes
    //loop through to check if any cash is 0
    for (let i = 0; i < round.length; i++) {
      if (round[i][2] === 0) {
        let idxOfNoCash = 0;
        round.forEach(val => {
          if (val[2] === 0) {
            idxOfNoCash = round.indexOf(val);
            //if all the round currency not 1€ coin has 0 value then splice out of array
            if (idxOfNoCash !== round.length - 1)
              roundCopyArr.splice(idxOfNoCash, 1);
            //keeping 1€ always in the list even has 0 value
            else if (idxOfNoCash === round.length - 1)
              roundCopyArr.splice(idxOfNoCash, 0);
          }
        });
      }
    }
    ///
    const roundArr = roundCopyArr.reduce((arr, cur) => arr.concat(cur[1]), []);
    roundChange = amountToChange(roundSum, roundArr);
    roundChange.forEach(
      val => (getRoundChange[val] = (getRoundChange[val] || 0) + 1)
    );
  } else if (roundSum === 0) roundChange = roundSum;

  //array of all coins of cents values to give back the change
  if (cents > 0) {
    let coinsCopyArr = coins; //Get a copy to splice in case of no values coins
    //loop to check if it is enough coins
    for (let i = 0; i < coins.length; i++) {
      if (coins[i][2] === 0) {
        let idxOfNoCoin = 0;
        coins.forEach(val => {
          if (val[2] === 0) {
            idxOfNoCoin = coins.indexOf(val);

            //if all the cent not 1 cent has 0 value then splice out of array
            if (idxOfNoCoin !== coins.length - 1)
              coinsCopyArr.splice(idxOfNoCoin, 1);
            //keeping 1cent coins always in the list even has 0 value
            else if (idxOfNoCoin === coins.length - 1)
              coinsCopyArr.splice(idxOfNoCoin, 0);
          }
        });
      }
    }
    ///

    const coinsArr = coinsCopyArr.reduce((arr, cur) => arr.concat(cur[1]), []);
    coinsChange = amountToChange(cents, coinsArr);
    coinsChange.forEach(
      val => (getCoinsChange[val] = (getCoinsChange[val] || 0) + 1)
    );
  } else if (cents === 0) coinsChange = cents;

  //get printout the change
  for (let [note, amount] of Object.entries(getRoundChange)) {
    //minus the note amount
    for (let i = 0; i < round.length; i++) {
      if (round[i][1] === Number(note)) {
        round[i][2] -= Number(amount);
      }
    }

    //get printout the note change (1€ and 2€ are only coins)
    if (note === "1" || note === "2")
      toText += `  ${amount} x ${note}€ coin
                       `;
    else
      toText += `  ${amount} x ${note}€ note
                       `;
  }
  for (let [coin, amount] of Object.entries(getCoinsChange)) {
    //minus the coins amount
    for (let i = 0; i < coins.length; i++) {
      if (coins[i][1] === Number(coin)) {
        coins[i][2] -= Number(amount);
      }
    }

    //get printout the coins change
    toText += `  ${amount} x ${coin} cent
                       `;
  }
  //console.log(round, coins);
  return toText; //Return the change details to the Bill
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
