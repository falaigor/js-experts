const assert = require("assert");

const myMap = new Map();

// o SET recebe 'chave' e 'valor', podendo ser ele qualquer elemento.
myMap
    .set(1, "one")
    .set("Igor", { text: "hello" })
    .set(true, () => "hey dude");

// outra forma de usar o Map
const myMapWithConstructor = new Map([
    ["1", "str1"],
    [1, "num1"],
    [true, "bool1"],
]);

assert.deepStrictEqual(myMap.get(1), "one");
assert.deepStrictEqual(myMap.get("Igor"), { text: "hello" });
assert.deepStrictEqual(myMap.get(true)(), "hey dude");

// Em Objects a chave so pode ser string ou symbol (number é coergiado a string)
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: "Igor Santos" });

assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: "Igor Santos" });

// para saber se um item existe no Object
// item.key = se nao existe  = undefined
// if() = coerção  implicita para boolean e retorna fontVariantAlternates:
// O jeito certo em Object é ({name:'igor'}).hasOwnProperty('name')

const object = {
    firstName: "igor",
    lastName: "Santos",
};

// console.log(object.hasOwnProperty("firstName"));
assert.deepStrictEqual(object.hasOwnProperty("firstName"), true);

// no Map pode ser feito utilizando o '.has'
assert.ok(myMap.has(onlyReferenceWorks));

// Para remover uma item do object
// delete item.id
// imperformatico para o Javascript
// com map podemos usar o .delete que é bem mais performatico
assert.ok(myMap.delete(onlyReferenceWorks));

// nao da pra iterar em Objects diretamente
// Tem que transformar com Objects.entries(item)
assert.deepStrictEqual(
    JSON.stringify([...myMap]),
    JSON.stringify([
        [1, "one"],
        ["Igor", { text: "hello" }],
        [true, null],
    ])
);

// o Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrao
// ({}).toString() === '[object Object]'
// ({toString:() => 'Hey'}).toString() === 'Hey'
// qualqer coisa pode colidir com as propriedades do Object
// constructor, toString, valueOf, etc

const actor = {
    name: "Zezinho",
    toString: "Lanchao",
};

myMap.set(actor);

assert.ok(myMap.has(actor), null);
assert.throws(() => myMap.get(actor).toString, TypeError);

// nao da pra limpar o Object sem reassina-lo
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// Na patrica podemos utilizar a estrutura Map ao invés do Object em casos que:
// // 1 - Precise adicionar chaves com frequencia
// // 2 - Precise validar se a chave existe de forma semantica
// // 3 - Quando precisamos que ao Object functione como uma bando de dados
// // 4 - Em casos que precise limpar a referencia apos o uso