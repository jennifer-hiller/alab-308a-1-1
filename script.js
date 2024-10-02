// Part 1
let counter = 0;
try {
  //increment();
} catch (e) {
  console.error(e);
}
function increment() {
  counter++;
  // console.log(counter);
  increment();
}

// Part 2
// This is the function that breaks on a super nested array
// function flattenArray(array) {
//   const newArray = [];
//   for (let i = 0; i < array.length; i++) {
//     if (Array.isArray(array[i])) {
//       newArray.push(...flattenArray(array[i]));
//     } else {
//       newArray.push(array[i]);
//     }
//   }
//   return newArray;
// }

// this function works for the super nested array but not the shallower array
function flattenArray(array, newArray = [], index = 0) {
  if (index >= array.length) {
    return newArray;
  }
  if (Array.isArray(array[index])) {
    return () => {
      flattenArray(array[index], newArray);
      return () => flattenArray(array, newArray, index + 1);
    };
  } else {
    newArray.push(array[index]);
    return () => flattenArray(array, newArray, index + 1);
  }
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
deepArray.push(1);

const flatArray = trampoline(flattenArray(deepArray));
console.log(flatArray);
const notSoDeepArray = [1, 2, [3, 4], 5, [6, [7, 8, [9, 10]]]];
const flatArray2 = trampoline(flattenArray(notSoDeepArray));
console.log(flatArray2);

// Part 3
// get all prime numbers between 1 and n
function getPrimes(n) {
  const element = document.getElementById("element");
  for (let i = 2; i <= n; i++) {
    setTimeout(() => {
      let isPrime = true;
      for (let j = 2; j < i; j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        const li = document.createElement("li");
        li.textContent = i;
        element.appendChild(li);
      }
      if (i === n) {
        alert("Calculation is finished");
      }
    }, 0);
  }
}
getPrimes(10000);
