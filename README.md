## 1️⃣ What is the difference between var, let, and const?

| var | let | const |
|-----|-------|-----|
| Function-scoped | Block-scoped | Block-scoped |
| Can be redeclared | Can not be redeclared in the same scope | Can not be redeclared |
| Can be reassigned | Can be reassigned | Can not be reassigned |
| Hoisted and initialized with undefined | Hoisted but not initialized | Must be initialized at declaration | 

## 2️⃣ What is the spread operator (...)?

The spread operator (`...`) allows us to expand arrays or objects into individual elements. We can use spread operator to copy, merge, or pass elements without modifying the original data.

## 3️⃣ What is the difference between map(), filter(), and forEach()?

| map() | filter() | forEach() |
|-------|----------|-----------|
| Transforms each element in an array | Returns elements that match a condition | Executes a function for each element |
| Returns a new array | Returns a new array | Returns undefined |
| Does not modify the original array | Does not modify the original array | Can modify the original array if changed inside the callback |

## 4️⃣ What is an arrow function?

Arrow function is a shorter way to write functions using `=>`. We can use arrow function in our code to short expressions and callbacks.

## 5️⃣ What are template literals?

Template literals is a way to create strings enclosed in backticks that allow embedded expressions `${expression}` and multi-line text. We can also call functions inside `${}`