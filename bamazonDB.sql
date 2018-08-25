CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quantity INTEGER default 10,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price)
VALUES ('Playstation 4 Pro', 'Video Games Consoles', 329.99), ('Playstation 4 (Standard)', 'Video Game Consoles', 299.99), ('Persona 5', 'Video Games', 49.99), ('Shadow Of The Tomb Raider', 'Video Games', 59.99), ('Superior Spiderman Vol 1 (Complete Edition)', 'Comic Books', 28.99), ('Red Hood and The Outlaws Vol 1', 'Comic Books', 12.99), ('The Boy and The Beast', 'Animated Movies', 19.99), ('Your Name', 'Animated Movies', 19.99), ('"False Idol" - Veil Of Maya', 'Albums', 9.99), ('"All Our Gods Have Abandoned Us" - Architects', 'Albums', 9.99)