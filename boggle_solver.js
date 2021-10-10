/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
// Spencer Lyles @02875842

// Prints all words present in dictionary.
function dictionaryWords(grid, dictionary, rowLen, colLen, solutions) {
  var marked = Array.from(Array(rowLen), () => new Array(colLen).fill(0));
  var string = "";

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      findWordsUtil(grid, dictionary, marked, i, j, string, solutions);
    }
  }
}

// Recursively prints all words in the grid
function findWordsUtil(grid, dictionary, marked, i, j, string, solutions) {
  if (string.length > 30) {
    // base case
    return 0;
  }

  marked[i][j] = true;
  string = string + grid[i][j];

  if (wordCheck(string, dictionary, solutions)) {
    solutions.push(string);
  }
  for (var row = i - 1; row <= i + 1 && row < grid.length; row++) {
    for (var col = j - 1; col <= j + 1 && col < grid[i].length; col++) {
      if (row >= 0 && col >= 0 && !marked[row][col]) {
        findWordsUtil(grid, dictionary, marked, row, col, string, solutions);
      }
    }
  }

  string = "" + string[string.length - 1];
  marked[i][j] = false;
}

//   Checks dictionary for a match
function wordCheck(string, dictionary) {
  for (var i = 0; i < dictionary.length; i++)
    if (string == dictionary[i]) return true;
  return false;
}

function makeLowerCase(grid, dictionary, rowLen, colLen) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }

  var dictionary = dictionary.map((word) => word.toLowerCase());
  return dictionary;
}

isGridValid = function (grid, rowLen, colLen) {
  regex = /(st|qu)|[a-prt-z]/;
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (!grid[i][j].match(regex)) {
        console.log("Invalid characters in boggle. E.g. s or q");
        return false;
      }
    }
  }
  return true;
};

isSquare = function (grid, rowLen, colLen) {
  for (let i = 0; i < rowLen; i++) {
    if (rowLen != grid[i].length) {
      console.log(
        "rowLen is " + rowLen + " grid[i].length is " + grid[i].length
      );
      console.log("Boogle is not a square.");
      return false;
    }
  }
  return true;
};

isDictionaryValid = function (dictionary) {
  if (dictionary.length == 0) {
    console.log("Dictionary is empty");
    return false;
  }
  return true;
};

exports.findAllSolutions = function (grid, dictionary) {
  let solutions = [];
  var rowLen = grid.length;
  var colLen = grid[0].length;
  var n = dictionary.length;

  makeLowerCase(grid, dictionary);
  isSquare(grid);
  isGridValid(grid);
  isDictionaryValid(dictionary);

  dictionaryWords(grid, dictionary, rowLen, colLen, solutions);
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
  "arty",
  "egg",
  "not",
  "quar",
];

console.log(exports.findAllSolutions(grid, dictionary)); // first call