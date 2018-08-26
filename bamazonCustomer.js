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
        message: "Welcome To Bamazon, 007. This is Q.\nEverything you'll need for your next Operation is here.\nPlease, select any item you'd like to take with you on the field\n\n",
        choices: itemsArray
      },
      {
        name: "secondQuestion",
        type: "input",
        message: "\nWonderful selection, it won't fail you.\n\nNow, how many would you be interested in?\n",
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

          //grabbing quantity from DB and updating it to reflect the amount after purchase
          connection.query("UPDATE products SET stock_quantity = " + quantityLeft + " WHERE item_id = " + selectedItem.item_id, function() {

              console.log("\nYour order for " + parsedSecondAnswer + " " +  selectedItem.product_name + " have been received!\n");
              console.log("You'll find your item(s) at an undisclosed location near the closest safehouse\n\n");

              //variable to grab total costs of item(s) purchased
              var totalBill = parsedSecondAnswer * parseFloat(selectedItem.price);

              console.log("\n\nTotal price of your order: $" + totalBill + "\nIt was a pleasure doing business with you, 007.\nPlease do try to bring your items back in one piece.\n\n");

              //Loop through the function again
              start();

            }
          ); //connection query close

        } // if statement close

        else {

          //not enough in stock, so notify customer of this
          console.log("\nApologies, seems like other agents have taken a liking to that item, as we're out of stock.\n\nI Implore you to try again\n\n");


          //Loop through the function again
          start();
        }

      });

  }); // connection query close

} //function "start" close