/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
// Spencer Lyles @02875842
// Recursively prints all words in the grid
function findWordsUtil(grid, dictionary, marked, y, x, string, solutions, hash) {
//     if (string.length > 30) {
//       // base case
//       return 0;
//     }
//     string = string + grid[i][j];
//     if (hash[string] != undefined) {

//       marked[i][j] = true;
//       if (wordCheck(string, hash)) {

//         solutions.push(string);
//       }
//       for (var row = i - 1; row <= i + 1 && row < grid.length; row++) {
//         for (var col = j - 1; col <= j + 1 && col < grid[i].length; col++) {
//           if (row >= 0 && col >= 0 && !marked[row][col]) {
//             findWordsUtil(grid, dictionary, marked, row, col, string, solutions, hash);
//           }
//         }
//       }  
//     } 
//     string = "" + string[string.length - 1];
//     marked[i][j] = false;
  }
findWords = function(string, y, x, grid, marked, hash, solutionSet){
       let adjMatrix = [[-1, -1],
                     [-1, 0],
                     [-1, 1],
                     [0, 1],
                     [1, 1],
                     [1, 0],
                     [1,-1],
                     [0, -1]];
 
    if (y < 0 || x < 0 || y >= grid.length || x >= grid.length || marked[y][x] == true)
           return;

    string += grid[y][x];

  
    if(prefixCheck(string, hash)) {
           marked[y][x] = true;
     
           if(wordCheck(string, hash)) {

               if(string.length >= 3)
                    solutionSet.add(string);
//                     solutions.push(string); // does not work with 5x5
           }

           for(let i = 0; i < 8; i++){
                findWords(string, y + adjMatrix[i][0], x + adjMatrix[i][1], grid, marked, hash, solutionSet);
            }
    }
    marked[y][x] = false;
}

//   Checks dictionary for a match
wordCheck = function (string, /*dictionary*/hash) { 
  if (hash[string] == 1) {
    return true;
  }
}
prefixCheck = function(word, hash) {
     return hash[word] != undefined;
  }

function makeLowerCase(grid, dictionary) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }

  var dictionary = dictionary.map((word) => word.toLowerCase());
  return dictionary;
}

createHashMap = function(dictionary) {
  var dict = {};
  for (let i = 0; i < dictionary.length; i++) {
    dict[dictionary[i]] = 1;
    let wordlength = dictionary[i].length;
    var str = dictionary[i];
    for (let j = wordlength; wordlength > 1; wordlength--) {
      str = str.substr(0,wordlength-1);
      if (str in dict) {
        if (str == 1) {
          dict[str] = 1;
        }
      }
      else {
        dict[str] = 0;
      }
    } 
  }
  return dict;
}


isGridValid = function (grid) {
  regex = /(st|qu)|[a-prt-z]/;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!grid[i][j].match(regex)) {
        console.log("Invalid characters in boggle. E.g. s or q");
        return false;
      }
    }
  }
  return true;
};

isSquare = function (grid, solutions) {
  for (i = 0; i < grid.length; i++) {
    if (grid.length != grid[i].length) {
      console.log(
        "rowLen is " + grid.length + " grid[i].length is " + grid[i].length
      );
      console.log("Boogle is not a square.");
      return solutions;
    }
  }
  return true;
};

isDictionaryValid = function (dictionary, solutions) {
  if (dictionary.length == 0) {
    console.log("Dictionary is empty");
    return solutions;
  }
  return true;
};

exports.findAllSolutions = function (grid, dictionary) {
  let solutions = [];

  makeLowerCase(grid, dictionary);
  isSquare(grid, solutions);
  if(!isGridValid(grid)) {
    return solutions;
  }
  
  isDictionaryValid(dictionary, solutions);
  let solutionSet = new Set();
  var hash = createHashMap(dictionary);
  
  let N = grid.length;
  for(let i=0; i<N; i++) {
    if(grid[i].length != N) {
      return solutions;
    }
  }
  for(let i = 0; i < N; i++){
    for(let j = 0; j < N; j++) {
         let string = "";

         let marked = new Array(N).fill(false).map(() => new Array(N).fill(false));

         findWords(string, i, j, grid, marked, hash, solutionSet);
    }
  }
//   dictionaryWords(grid, dictionary, solutions, hash);
  solutions = Array.from(solutionSet);
  return solutions;
};

var grid = [
  ["T", "W", "Y", "R"],
  ["E", "N", "P", "H"],
  ["G", "Z", "Qu", "R"],
  ["O", "N", "T", "A"],
];
var dictionary = [
  "art",
  "ego",
  "gent",
  "get",
  "net",
  "new",
  "newt",
  "prat",
  "pry",
  "qua",
  "quart",
  "quartz",
  "rat",
  "tar",
  "tarp",
  "ten",
  "went",
  "wet",
  "arty",// not found
  "egg", // not found
  "not", // not found
  "quar",
];

// var grid = [["A", "B"],["C", "D"]];
// var dictionary = ["AB", "ABD", "DCA", "XY"];

console.log(exports.findAllSolutions(grid, dictionary)); // first call
