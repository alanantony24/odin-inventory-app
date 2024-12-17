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
  name VARCHAR(255),
  description VARCHAR(255),
  createdBy VARCHAR(255),
  createdOn DATE,
  price FLOAT,
  stock INT
);
  
INSERT INTO categories (name, description, createdBy, createdOn)
VALUES ('Clothing', 'Contains clothing items that people enjoy wearing', 'Alan.A', '2024-12-15');

INSERT INTO items (categoryName, name, description, createdBy, createdOn, price, stock)
VALUES ('Clothing', 'Polo Ralph Lauren Polo Tee', 'The iconic RL Polo-Tee', 'Alan.A', '2024-12-15', 149.99, 50);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      "postgresql://postgres:12345678@localhost:5432/inventorydb",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done!");
}

main();


