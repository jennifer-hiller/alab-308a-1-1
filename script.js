// Part 1
let counter = 0;
try {
  //increment();
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
  function _flatten(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        return () => _flatten(arr[i]);
      } else {
        newArray.push(arr[i]);
      }
    }
  }
  _flatten(array);
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
