DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2),
    stock_quantity INT DEFAULT 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products
(product_name, department_name, price, stock_quantity)

VALUES 
("drum set", "Musical Instruments", 999.99, 20),
("stereo", "Car Audio", 259.99, 50),
("picture frame", "Home Decor", 6.00, 77),
("coffee mug", "Home & Kitchen", 10.99, 23),
("55in smart television", "Electronics", 795.90, 200),
("19in computer monitor", "Computers & Accessories", 170.50, 33),
("backpack", "Luggage", 40.89, 400),
("hottest hot sauce", "Gourmet Foods", 9.99, 2000),
("pillow", "Bedding", 7.99, 900),
("task chair", "Office Supplies", 220.00, 25),
("Javascript Ninja paperback book", "Books", 35.55, 999),
("power strip", "Electrical", 6.79, 3000);

-- SELECT * FROM products;