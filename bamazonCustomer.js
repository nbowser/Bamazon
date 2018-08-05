var inquirer = require("inquirer");

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});
// Connect to mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;    
    //console.log('connected as id ' + connection.threadId + "\n");
    showStore();
});


// Display the Storefront
function showStore() {
    // Make a variable for query for easy use
    var query = "SELECT * FROM products";
    // Connection to mysql database to read and display table and columns data
    connection.query(query, function(err, res) {
        if (err) throw err;
        // Header for storefront
        console.log("\n Welcome to Bamazon \n");
        console.log("Your One Stop Shop \n");
        console.log("Have a look around and fill up your cart");
        console.log("---------------------------------------------------------------------------------------------------------------------------------------");
        // Loop through table and columns to display data
        for (var i = 0; i < res.length; i++) {            
            console.log("Item ID: " + res[i].item_id + " || Item: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Number in stock: " + res[i].stock_quantity);
            //console.log("\n");
        }
        console.log("--------------------------------------------------------------------------------------------------------------------------------------- \n");
        buyPrompt();
    });
       
} // END OF showStore FUNCTION


// Prompt the user to buy item, and ask how many of that item they want to buy
function buyPrompt() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
    
        inquirer.prompt([
            {
            name: "item",
            type: "input",
            message: "Enter the id # of the item you would like to buy."
            },
            {
            name: "quantity",
            type: "input",
            message: "How many you would you like to purchase?"   
            }])
            .then(function(answer) {
              var chosenItem;

              for (var i = 0; i < res.length; i++) {
                  if (parseInt(res[i].item_id) === parseInt(answer.item)) {
                      chosenItem = res[i];
                  }
              }
              if (chosenItem === undefined) {
                  console.log("\n Item not found, please try again! \n");
                  buyPrompt();
              }
              else if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
                  console.log("\n Insufficient quantity of " + chosenItem.product_name + "(s) \n");
                  buyPrompt();
              }
              else {
                  var quantityUpdate = chosenItem.stock_quantity - parseInt(answer.quantity);

                  connection.query(
                      "UPDATE products SET ? WHERE ?",
                      [
                          {
                              stock_quantity: quantityUpdate
                          },
                          {
                              item_id: chosenItem.item_id
                          }
                      ],
                      function (err) {
                          if (err) throw err;
                          console.log("\n Your total today is: $" + (chosenItem.price * parseInt(answer.quantity)));                          
                          console.log("\n We have " + quantityUpdate + " of this item remaining.");
                          console.log("\n Thank you for your purchase(s)! Please shop again!");
                          connection.end();
                      }
                  )
                }
            });
    });
} // END OF buyPrompt FUNCTION