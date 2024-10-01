// Part 1
let counter = 0;
try {
  increment();
} catch (e) {
  console.error(e);
}
function increment() {
  counter++;
  console.log(counter);
  increment();
}

// Part 2
function flattenArray(array) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      return () => newArray.push(flattenArray(array[i]));
    } else {
      newArray.push(array[i]);
    }
  }
  return newArray;
}
const trampoline = (f, ...args) => {
  let result = f(...args);
  while (typeof result === "function") {
    result = result();
  }
  return result;
};
// creating an array that will crush flattenArray. I asked ChatGPT to make this for me.
const deepArray = [];
let current = deepArray;
for (let i = 0; i < 100000; i++) {
  current.push([]);
  current = current[0];
}

const flatArray = trampoline(flattenArray(deepArray));
console.log(flatArray);
