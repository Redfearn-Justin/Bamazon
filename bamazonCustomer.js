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


// function which prompts the user for what action they should take
function start() {

  connection.query("SELECT item_id, product_name, price FROM products", function(err, results) {
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
        message: "Welcome To Bamazon!\nHere are the items we have in stock\nWhich one would you like to purchase?",
        choices: itemsArray
      },
      {
        name: "secondQuestion",
        type: "input",
        message: "\nGreat choice!\n\nHow many would you like to purchase today?",
        // validate: function(value) {
        //   if (isNaN(value) === false) {
        //     return true;
        //   }
        //   return false;
        // }
      }
      ]).then(function(answer) {

        var selectedItem;

        //matching selected item's id with that of id in DB

        var components = answer.firstQuestion.trim().split(":");

        //verified that 'components' is split correctly
        console.log(components);

        for (var j = 0; j < results.length; j++) {

          if(results[j].item_id === parseInt(components[0])) {

            selectedItem = results[j];
          }
        }

        //verified that the 'selectedItem' variable is grabbing the chosen item
        console.log(selectedItem);

        //ERROR: IF statement will not run but Else statement will (something wrong with variables in the If statement: conjecture)

        if(selectedItem.stock_quantity < parseInt(answer.secondQuestion)) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: answer.secondQuestion
              }
              // {
              //   item_id: selectedItem.item_id
              // }
            ],
            function(error) {
              if(error) throw error;

              console.log("Your order for " + answer.firstQuestion + " has been successfully received! :)");

              var totalBill = parseInt(answer.secondQuestion) * parseFloat(selectedItem.price);

              console.log("\n\nTotal price of your order: $" + totalBill);

              //start the app all over again
              start();
            }
          ); //connection query close
        } // if statement close
        else {
          //not enough in stock, so notify customer of this
          console.log("We're sorry, it looks like your ambitious order was too much for our stockpile :(\nTry again please!");
          start();
        }
      });
  }); // connection query close

} //function "start" close