CREATE DATABASE webdev

USE webdev;

CREATE TABLE products(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    price DECIMAL(10,2),
    quantity INT,
    description TEXT
);

INSERT INTO products (name, description, quantity, price)
VALUES ('mouse', 'mouse gaming', 10, 100);
