// let myObj: Record<string, string[]> = { name: ["oladayo"] };

// if (!myObj.foo) {
//   myObj.foo = [];
// }

// myObj.foo.push("bar");

// console.log(myObj);

// type obj = {
//   id: string;
//   name: string;
//   age: number;
//   size: string;
// };

// type StringKeys = {
//   [K in keyof obj]: obj[K] extends string ? K : never;
// }[keyof obj];

// type Example = ExtractStringKeys<obj>;
// // ^?type Example = "name" | "id" | "size"

// /*
//  * Object.values on the type level
//  */

// type ValueOf<T> = T[keyof T];

// // Gets all the keys where the values are string

// type ExtractStringKeys<Tobj> = ExtractKeysWhereValuesAreOfType<obj, string>;

// type ExtractKeysWhereValuesAreOfType<Tobj, Tcondition> = ValueOf<{
//   [i in keyof Tobj]: Tobj[i] extends Tcondition ? i : never;
// }>;

// // immediately indexed mapped type

// // GENERICS

// function Identity(arg: number): number {
//   return arg;
// }

// console.log(Identity(5));

function okay(a) {
  return a;
}

console.log(okay(1));
