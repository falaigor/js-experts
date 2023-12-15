const assert = require("assert");

// Set na maioria das vezes usados para listas de items unicos.

const arr1 = ["0", "1", "2"];
const arr2 = ["1", "2", "3"];
const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), ["0", "1", "1", "2", "2", "3"]);

const set = new Set();
arr1.map((item) => set.add(item));
arr2.map((item) => set.add(item));

assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"]);
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
    "0",
    "1",
    "2",
    "3",
]);

// no Array comum, para saber se um item existe
// [].indexOf('1') !== -1 or [0].includes(0)
assert.ok(set.has("3"));

// mesma teoria do Map, mas voce sempre trabalha com a lista toda
// nao tem get, entao voce pode saber se o item esta ou nao no array e é isso.

// tem nas duas listas
const users1 = new Set(["igor", "jessy", "nina"]);

const users2 = new Set(["igor", "skye", "malley"]);

const intersection = new Set([...users1].filter((user) => users2.has(user)));
assert.deepStrictEqual(Array.from(intersection), ["igor"]);

const difference = new Set([...users1].filter((user) => !users2.has(user)));
assert.deepStrictEqual(Array.from(difference), ["jessy", "nina"]);