CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(6,2) NOT NULL,
  stock_quantity INTEGER(2) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Aston Martin DB5 (w/Ejector Seat)', 'Specialist Vehicle', 1229.99, 5), ('1930 Bentley 4 1/2 Litre (w/SA Missiles)', 'Specialist Vehicle', 899.99, 5), ('Ballpoint Pen Bomb', 'Gadgets', 49.99, 10), ('Quantum Earpiece', 'Gadgets', 28.99, 10), ('Omega Seamaster Wristwatch', 'Gadgets', 99.99, 10), ('Walther PPK', 'Weapons', 199.99, 10), ('MAC-10', 'Weapons', 229.99, 10), ('M1911A1', 'Weapons', 199.99, 10), ('Operation Spectre Intelligence', 'Intelligence', 9.99, 10), ('Operation Golden Eye Intelligence', 'Intelligence', 9.99, 10)