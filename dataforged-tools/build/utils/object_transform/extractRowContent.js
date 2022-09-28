/**
 * Extracts the content of a Row array. In other words, it excludes the Floor and Ceiling numbers.s
 */
export function extractRowContent (row) {
  let output
  if (typeof row[0] === 'number' && typeof row[1] === 'number') {
    output = row.slice(2)
  } else {
    output = row
  }
  return output
}
// # sourceMappingURL=extractRowContent.js.map
