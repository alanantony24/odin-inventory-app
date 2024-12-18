const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  description VARCHAR(255),
  createdBy VARCHAR(255),
  createdOn DATE
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  categoryName VARCHAR(255),
  categoryId INTEGER,
  name VARCHAR(255),
  description VARCHAR(255),
  createdBy VARCHAR(255),
  createdOn DATE,
  price FLOAT,
  stock INT,
  CONSTRAINT fk_category
  FOREIGN KEY (categoryId)
  REFERENCES categories(id)
  ON DELETE CASCADE
);
  
INSERT INTO categories (name, description, createdBy, createdOn)
VALUES ('Clothing', 'Contains clothing items that people enjoy wearing', 'Alan.A', '2024-12-15');

INSERT INTO categories (name, description, createdBy, createdOn)
VALUES ('Food', 'Fresh food harvested and prepared by our talented chefs', 'Alan.A', '2024-12-15');

INSERT INTO categories (name, description, createdBy, createdOn)
VALUES ('Electronics', 'Best quality electronics with 1 year warranty', 'Alan.A', '2024-12-15');

INSERT INTO items (categoryName, categoryId, name, description, createdBy, createdOn, price, stock)
VALUES ('Clothing', 1, 'Polo Ralph Lauren Polo Tee', 'The iconic RL Polo-Tee', 'Alan.A', '2024-12-15', 149.99, 50);

INSERT INTO items (categoryName, categoryId, name, description, createdBy, createdOn, price, stock)
VALUES ('Clothing', 1, 'UniQlo Airism Tee (Blue)', 'The best quality quick dry material', 'Alan.A', '2024-12-16', 14.25, 10);

INSERT INTO items (categoryName, categoryId, name, description, createdBy, createdOn, price, stock)
VALUES ('Food', 2, 'Brioche Bread', 'Soft and Buttery', 'Lewis.H', '2024-11-24', 3.99, 50);

INSERT INTO items (categoryName, categoryId, name, description, createdBy, createdOn, price, stock)
VALUES ('Electronics', 3, 'PS5', 'PlayStation 5 Console with 1X Controller', 'Jaimie.J', '2024-12-15', 599.99, 50);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done!");
}

main();
