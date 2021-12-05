const boggle_solver = require('/home/codio/workspace/Boggle_Testing/boggle_solver.js');

/** Lowercases a string array in-place. (Used for case-insensitive string array
 *  matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
	for (let i = 0; i < stringArray.length; i++)
		stringArray[i] = stringArray[i].toLowerCase();
}

describe("Boggle Solver tests suite:", () => {
	describe("Normal Input", () => {
		test("Diagonal word test", () => {
      
			let grid = [["A", "E", "C", "D"],
				["C", "M", "O", "H"],
				["I", "A", "T", "F"],
				["D", "N", "B", "P"]];
			let dictionary = ["cab", "foe", "mint", "bad", "dab", "tan", "bat", "nat"];
			let expected = ["cab", "foe", "mint", "bad", "dab", "tan", "bat", "nat"];
			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			// Lowercasing for case-insensitive string array matching.
			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});
	});

  
	describe("Problem contraints", () => {
		test("1 to 2 letter words", () => {

			let grid = [["A", "E", "C", "D"],
				["C", "M", "O", "H"],
				["I", "A", "T", "F"],
				["D", "N", "B", "P"]];
			let dictionary = ["cab", "foe", "mint", "bad", "dab", "tan", "bat", "nat", "at", "a", "me", "to"];
			let expected = ["cab", "foe", "mint", "bad", "dab", "tan", "bat", "nat"];
			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			// Lowercasing for case-insensitive string array matching.
			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});
	});

  
	describe("Input edge cases", () => {

		// Example Test using Jess
		test("Dictionary is empty", () => {
			// (Edge case) Since there are no possible solution, it should return an
			// empty list.
			let grid = [["A", "B", "C", "D"],
				["E", "F", "G", "H"],
				["I", "J", "K", "L"],
				["M", "N", "O", "P"]];
			//       let grid = [['A', 'B'],
			//                     ['E', 'F']];
			let dictionary = [];
			let expected = [];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			// Lowercasing for case-insensitive string array matching.
			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});
	});
});

