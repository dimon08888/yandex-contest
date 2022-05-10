// algorithmic section for the interview

function numbers(nums) {
  const sortedNums = nums.slice().sort((a, b) => a - b)

  const ranges = [] // [[0, 1, 2, 3, 4, 5], [8, 9], [11]]
  let tempArr = [] // [11]

  for (let i = 0; i < sortedNums.length; i++) {
    if (tempArr.length === 0 || sortedNums[i] - tempArr[tempArr.length - 1] === 1) {
      tempArr.push(sortedNums[i])
    } else {
      ranges.push(tempArr)
      tempArr = [sortedNums[i]]
    }
  }

  ranges.push(tempArr)

  return ranges
    .map(range =>
      range.length > 1 ? `${range[0]}-${range[range.length - 1]}` : range[0]
    )
    .join(',')
}
