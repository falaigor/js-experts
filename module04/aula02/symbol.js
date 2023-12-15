const assert = require("assert");

const uniqueKey = Symbol("userName");
const user = {};

user["userName"] === "value for normal Objects";
user[uniqueKey] = "value for symbol";

// console.log(user.userName);
// // sempre unico em nivel de endereço de memoria
// console.log(user[Symbol("userName")]);
// console.log(user[uniqueKey]);

assert.deepStrictEqual(user.userName, "value for normal Objects");

// // sempre unico em nivel de endereço de memoria
assert.deepStrictEqual(user[Symbol("userName")], undefined);
assert.deepStrictEqual(user[uniqueKey], "value for symbol");

// É dificil de pegar, mas nao é um dado secreto!
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);