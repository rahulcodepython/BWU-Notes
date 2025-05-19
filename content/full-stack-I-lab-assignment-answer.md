---
title: Full Stack - I - Lab Assignment Answer
description: This is lab assignment answer of Full Stack - I.
slug: full-stack-I-lab-assignment-answer
author: Rahul Das
---

Assignment 1: Demonstrating Variables, Functions, Conditionals, Loops, Objects, Arrays, and Async Code

```js
// assignment1.js

// Variables
let name = "Rahul";
const age = 21;

// Function
function greet(user) {
  return `Hello, ${user}!`;
}

// Conditionals
if (age > 18) {
  console.log(greet(name));
} else {
  console.log("You are underage.");
}

// Loops
for (let i = 0; i < 3; i++) {
  console.log(`Counting: ${i}`);
}

// Object
const student = {
  name: "Rahul",
  course: "Node.js",
  details() {
    return `${this.name} is learning ${this.course}`;
  }
};
console.log(student.details());

// Array
const numbers = [1, 2, 3];
numbers.forEach(n => console.log(n * 2));

// Async
setTimeout(() => {
  console.log("This is asynchronous code!");
}, 1000);
```

---

Assignment 2: User Input and System Variables

```js
// assignment2.js
const readline = require("readline");
const os = require("os");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What's your name? ", answer => {
  console.log(`Hello ${answer}, your system username is ${os.userInfo().username}`);
  rl.close();
});
```

---

Assignment 3: Command-Line Arguments & REPL

```js
// assignment3.js
const args = process.argv.slice(2);
console.log("Command line args:", args);

// Start REPL manually with: node
// Then test: let x = 5; x * 2;
```

---

Assignment 4: REPL Script with Functions, Arrays, Async

```js
// assignment4.js
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

const numbers = [];

function addNumber(num) {
  numbers.push(Number(num));
  console.log("Array:", numbers);
}

function delayMessage() {
  setTimeout(() => console.log("Async Message after 2 seconds"), 2000);
}

readline.question("Enter a number: ", n => {
  addNumber(n);
  delayMessage();
  readline.close();
});
```

---

Assignment 5: Calculate Execution Time

```js
// assignment5.js
console.time("Execution Time");

function sum() {
  let total = 0;
  for (let i = 0; i < 1e6; i++) total += i;
  return total;
}

console.log("Sum:", sum());
console.timeEnd("Execution Time");
```

---

Assignment 6: Sync vs Async Functions

```js
// assignment6.js

// Synchronous
function syncFunc() {
  console.log("1. Sync start");
  console.log("2. Sync end");
}

// Asynchronous
function asyncFunc() {
  console.log("1. Async start");
  setTimeout(() => console.log("2. Async complete"), 1000);
  console.log("3. Async end");
}

syncFunc();
asyncFunc();
```

---

Assignment 7: Core Path and FS Modules

```js
// assignment7.js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "example.txt");
fs.writeFileSync(filePath, "Hello from Node.js");

const content = fs.readFileSync(filePath, "utf-8");
console.log("File Content:", content);
```

---

Assignment 8: Buffers in Node.js

```js
// assignment8.js
const buf = Buffer.from("Rahul");
console.log("Buffer:", buf);
console.log("String from Buffer:", buf.toString());
console.log("Length:", buf.length);
```

---

Assignment 9: Local Modules

Create localModule.js:

```js
// localModule.js
function welcome(name) {
  return `Welcome, ${name}`;
}
module.exports = welcome;
```

Then use in main file:

```js
// assignment9.js
const welcome = require("./localModule");
console.log(welcome("Rahul"));
```

---

Assignment 10: Create package.json and Use dotenv

Create package.json:

```bash
npm init -y
npm install dotenv
```

.env:

```env
USERNAME=Rahul
```

main.js:

```js
require("dotenv").config();
console.log("User:", process.env.USERNAME);
```

---

Assignment 11: HTTP Core Module with Routing

```js
// assignment11.js
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.end("Home Page");
  } else if (req.method === "POST" && req.url === "/data") {
    res.end("Data received");
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(3000, () => console.log("Server running at http://localhost:3000"));
```

---

Assignment 12: CRUD with FS Module

```js
// assignment12.js
const fs = require("fs");

const file = "data.txt";
fs.writeFileSync(file, "Hello");
console.log("Read:", fs.readFileSync(file, "utf-8"));
fs.appendFileSync(file, " World");
console.log("Updated:", fs.readFileSync(file, "utf-8"));
fs.unlinkSync(file);
console.log("File deleted");
```

---

Assignment 13: Calculator with Multiple Routes

```js
// assignment13.js
const http = require("http");
const url = require("url");

http.createServer((req, res) => {
  const q = url.parse(req.url, true).query;
  const a = parseFloat(q.a);
  const b = parseFloat(q.b);

  if (req.url.includes("/add")) res.end(`Result: ${a + b}`);
  else if (req.url.includes("/sub")) res.end(`Result: ${a - b}`);
  else if (req.url.includes("/mul")) res.end(`Result: ${a * b}`);
  else if (req.url.includes("/div")) res.end(`Result: ${a / b}`);
  else res.end("Invalid Route");
}).listen(3000);
```

Try visiting:

- [http://localhost:3000/add?a=5&b=3](http://localhost:3000/add?a=5&b=3)
    
- [http://localhost:3000/mul?a=2&b=10](http://localhost:3000/mul?a=2&b=10)
    

---

Assignment 14: Express Project for HTML and JSON

```bash
npm install express
```

app.js:

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Express Server</h1>");
});

app.get("/json", (req, res) => {
  res.json({ message: "This is JSON response" });
});

app.listen(3000, () => console.log("Express server running on http://localhost:3000"));
```

---

Assignment 15: Extend the Express Project

```js
const {MongoClient} = require("mongodb");
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'DATA1';
async function dbconnect(){
	await client.connect();
	console.log('Connected successfully to server');
	const db = client.db(dbName);
	const collection = db.collection('PERSONS');
	const response = await collection.find().toArray();
	const resinsert = await collection.insertOne({
		 "name": "Rahul Das",
		 "age": 30
	})
}
dbconnect();
```
