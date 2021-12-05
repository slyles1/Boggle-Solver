/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
exports.findAllSolutions = function (grid, dictionary) {
	let solutions = [];

	// 1. Check inputs Params are valid (return [] if incorrect)

	// 1a. Check if any empty input
	if (grid == null || dictionary == null) return solutions;

	// 1b. Check if NXN

	let N = grid.length;
	for (let i = 0; i < N; i++) {
		if (grid[i].length != N) {
			return solutions;
		}
	}

	// Convert input data into the same case

	convertCaseToLower(grid, dictionary);

	// Check if Grid is valid

	if (!isGridValid(grid)) {
		return solutions;
	}

	// Setup all data structures (i.e. Visited, solutions, dictionary (Trie | Hash | List | Set |)

	let solutionSet = new Set();

	let hash = createHashMap(dictionary);

	// Iterate over the NxN grid - find all words that begin with grid[y][x]

	for (let y = 0; y < N; y++) {
		for (let x = 0; x < N; x++) {
			let word = "";

			let visited = new Array(N)
				.fill(false)
				.map(() => new Array(N).fill(false));

			findWords(word, y, x, grid, visited, hash, solutionSet);
		}
	}

	solutions = Array.from(solutionSet);

	return solutions;
};

findWords = function (word, y, x, grid, visited, hash, solutionSet) {
	let adjMatrix = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, 1],
		[1, 1],
		[1, 0],
		[1, -1],
		[0, -1],
	];

	// Base Case:
	// b1:  y and x are out of bounds
	// b2:  already visited y and x
	//  -->    then return immediately

	if (
		y < 0 ||
    x < 0 ||
    y >= grid.length ||
    x >= grid.length ||
    visited[y][x] == true
	)
		return;

	// Append grid[y][x] to the word

	word += grid[y][x];

	// 1. Is that new word a prefix for any word in the trie/hash

	if (isPrefixOrWord(word, hash)) {
		// 1a. Is that prefix an actual word in the dictionary (trie), mark as visited
		visited[y][x] = true;

		if (isWord(word, hash)) {
			// 1b.  If true AND word size > 3--> add word to solutionSet
			if (word.length >= 3) solutionSet.add(word);
		}

		// 2.  keep searching using the adjacent tiles --> Call findWord()

		for (let i = 0; i < 8; i++) {
			findWords(
				word,
				y + adjMatrix[i][0],
				x + adjMatrix[i][1],
				grid,
				visited,
				hash,
				solutionSet
			);
		}
	}

	// 3. If not a prefix then unmark location y, x as visited
	visited[y][x] = false;
};

isPrefixOrWord = function (word, hash) {
	return hash[word] != undefined;
};

isWord = function (word, hash) {
	return hash[word] == 1;
};

createHashMap = function (dictionary) {
	var dict = {};
	for (let i = 0; i < dictionary.length; i++) {
		dict[dictionary[i]] = 1;
		let wordlength = dictionary[i].length;
		var str = dictionary[i];
		for (let j = wordlength; j > 1; j--) {
			str = str.substr(0, j - 1);
			if (str in dict) {
				if (str == 1) {
					dict[str] = 1;
				}
			} else {
				dict[str] = 0;
			}
		}
	}
	return dict;
};

convertCaseToLower = function (grid, dict) {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			grid[i][j] = grid[i][j].toLowerCase();
		}
	}

	for (let i = 0; i < dict.length; i++) {
		dict[i] = dict[i].toLowerCase();
	}
};

isGridValid = function (grid) {
	regex = /(st|qu)|[a-prt-z]/;
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (!grid[i][j].match(regex)) {
				return false;
			}
		}
	}

	return true;
};

var grid = [
	["T", "W", "Y", "R"],
	["E", "N", "P", "H"],
	["G", "Z", "Qu", "R"],
	["St", "N", "T", "A"],
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

console.log(exports.findAllSolutions(grid, dictionary));