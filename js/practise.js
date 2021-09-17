// // let showName = (firstName) => {
// //   return firstName;
// // }

// // ;(() =>{
// //   console.log("motto");
// // })
// // console.log(showName("asadbek"));


// // function expression simple function


// // console.dir(find());


// // let params = [1,3,3,4,5,6]
// // function  find(params,call) {
// //   for(let i = 0; i < params.length; i++){
// //     console.log(call(params[i]))
// // //   };
// // }




// // TOP
// // Array.prototype.Myfind = function (callback) {
// //   for(let i of this){
// //     if(callback(i)){
// //       return i
// //     }
// //   }
// // }
// // let nums = [1,2,3,45,87]
// // let x = nums.Myfind(function (num) {
// //   return num > 86
// // })

// // console.log(x);



// // MAP

// // let sums = [1,23,4];

// //  var b = (adder) =>{

// //   for(let i = 0; i < sums.length; i++){
// //     sums[i] = sums[i] + adder;
// //   }
// //   return sums;
// // }

// // console.log(b(5));
// // ;(()=>{console.log('bu nomsiz funksiya')})();




// // FILTER

// // let arr = [1,2,2,3,4,5,6,7];

// // function g(inputarr, input) {
// //   let newArr = [];
// //   for(let i = 0; i < inputarr.length; i++){
// //     if(inputarr[i] == input){
// //       newArr.push(inputarr[i]);
// //     }
// //   }
// //   return newArr;
// // }


// // console.log(g(arr,2));

// // let nums = [1,2,3,4];

// // let s = nums.find((num) => num == 100 );

// // console.log(s);

// // if(s === "undefined"){
// //   console.log("motto");
// // }


// let jsmovies = movies.slice(0,10);
// console.log(jsmovies.length);
// for (const movie of jsmovies) {
//   console.log(movie.imdbId);
// }


// let g = jsmovies.find((movie) => movie.imdbId == "tt7026230");

// console.log(g);
// let deletedArr = jsmovies.filter((movie) => g.imdbId !== movie.imdbId);
// console.log(deletedArr);

// jsmovies = deletedArr;


// for (const movie of jsmovies) {
//   if (movie.imdbId.indexOf("tt7026230")) {

//     console.log(movie.imdbId.indexOf("tt7026230"));
//   }

// }


// let car = [{fname: "matiz", year:2005, price: "2000"},{fname: "nexia", year:2005, price: "2000"}];

// let str = JSON.stringify(car);
// console.log(str);
// let simple = JSON.parse(str) || [] ;
// console.log(simple);

// localStorage.setItem


