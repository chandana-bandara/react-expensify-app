// Object Destructuring

// const person = {
//     name : "CB",
//     age : 37,
//     location : {
//         city : "Colombo",
//         temp : 88
//     }
// }

// const {name = "Anonymous", age } = person;
// console.log (`${firstName} is ${age}.`);

// const { city, temp:temperature } = person.location;

// if (city && temperature){
//     console.log (`It's ${temperature} in ${city}`);
// }

// const book = {
//     title : "Ego is the Enemy",
//     author : "Ryan Holiday",
//     publisher : {
//         name : "Penguin"    
//     }
// }

// const {name:publisherName = "Self Published"} = book.publisher;

// console.log (publisherName);


// Array Destructuring
// const address = ['1299 S Juniper Street','Philadelphia','Pennsylvania','19147'];
// const [ , city, state = "NW" ] = address;
// console.log (`You are in ${city} ${state}.`);


const item = [ 'Iced Coffee', '$3.00','$3.50','$3.75'];
const [name, , mediumPrice] = item;
console.log (`A medium ${name} costs ${mediumPrice}`);

