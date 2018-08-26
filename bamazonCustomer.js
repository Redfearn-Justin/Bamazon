//variables

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "bamazonDB" 
});

// connect to the mysql server and sql database
connection.connect(function(err) {

  if (err) throw err;

  // run the start function after the connection is made to prompt the user
  start();
});


//functions


function start() {

  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
    if (err) throw err;

    //array variable for items in stock
    var itemsArray = [];

    for (var j = 0; j < results.length; j++) {
      itemsArray.push(results[j].item_id + ": " + results[j].product_name + "  " + results[j].price);
    }

    inquirer.prompt([
      {
        name: "firstQuestion",
        type: "list",
        message: "Welcome To Bamazon!\nHere are the items we have in stock\nWhich one would you like to purchase?\n",
        choices: itemsArray
      },
      {
        name: "secondQuestion",
        type: "input",
        message: "\nGreat choice!\n\nHow many would you like to purchase today?\n",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
      ]).then(function(answer) {

        var selectedItem;

        var parsedSecondAnswer = parseInt(answer.secondQuestion);

        //matching selected item's id with that of id in DB

        var components = answer.firstQuestion.trim().split(":");


        for (var j = 0; j < results.length; j++) {

          if(results[j].item_id === parseInt(components[0])) {

            selectedItem = results[j];

          }
        }

        // IF-ELSE statement checking if there's enough in stock to match the quantity ordered 

        if(selectedItem.stock_quantity >= parsedSecondAnswer) {

          var quantityLeft = selectedItem.stock_quantity -= parseInt(answer.secondQuestion);

          connection.query("UPDATE products SET stock_quantity = " + quantityLeft + " WHERE item_id = " + selectedItem.item_id, function() {

              console.log("\nYour order for " + selectedItem.product_name + " has been successfully received! :)\n");

              var totalBill = parsedSecondAnswer * parseFloat(selectedItem.price);

              console.log("\n\nTotal price of your order: $" + totalBill + "\n\n");

              //start the app all over again
              start();

            }
          ); //connection query close

        } // if statement close

        else {

          //not enough in stock, so notify customer of this

          console.log("\nWe're sorry, it looks like your ambitious order was too much for our stockpile :(\n\nTry again please!\n\n");

          start();
        }

      });

  }); // connection query close

} //function "start" close