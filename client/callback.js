// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         var k = JSON.parse(body);
//       if (k.hasOwnProperty("code")) {
//             if(k.code == 1029){
//             console.log(gt + " friends list is blocked, have them unblock it, then run the check again. Potential security risk.");
//         } else {
//         console.log("error gamertag does not exist, please verify the spelling and search again");
//         }
//         }  else {
//             for (var key in k) {
//                 if (k.hasOwnProperty(key)) {
//                     // here you have access to
//                     arr.push(k[key].Gamertag);
//                 }
//             }
//             for (var i = 0; i < arr.length; i++) {
//                 if (arr[i].includes(substring)) {
//                     bl.push(arr[i]);
//                 }
//             }
//             if (arr.length != 0) {
//                 console.log("Security risk found: " + gt + " please consult Loyalty, Titan or Royalty");
//             } else {
//                 return "clear";
//             };

//         }
//     }
// }