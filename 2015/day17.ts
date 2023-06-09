const TOTAL_LITERS = 150
type SetPartitionFunction = (arr: number[], current: number, target: number) => number

// this is O(n!) -- T(n) = n*T(n-1) = n! -- The problem is enumerating all partitions of a set.
function countCombinationsFrom(arr: number[], current: number, target: number) {
  if (target === 0) return 1
  if (current === arr.length || target < 0) return 0

  let count = 0
  for(let i=current+1; i<arr.length; ++i) {
    count += countCombinationsFrom(arr, i, target - arr[i])
  }

  return count
}

function minCombinationFrom(arr: number[], current: number, target: number) {
  if (target === 0) return 0
  if (current === arr.length || target < 0) return Number.MAX_SAFE_INTEGER


  let minDepth = Number.MAX_SAFE_INTEGER
  for(let i=current+1; i<arr.length; ++i) {
    const depth = 1 + minCombinationFrom(arr, i, target - arr[i])
    minDepth = Math.min(depth, minDepth)
  }

  return minDepth
}

function countCombinationsWithMaxDepthFrom(arr: number[], current: number, target: number, maxDepth: number, depth=0) {
  if (depth > maxDepth) return 0
  if (target === 0) return 1
  if (current === arr.length || target < 0) return 0

  let count = 0
  for(let i=current+1; i<arr.length; ++i) {
    count += countCombinationsWithMaxDepthFrom(arr, i, target - arr[i], maxDepth, depth+1)
  }

  return count
}

function countMinCombinationsFrom(arr: number[], current: number, target: number) {
  const minCombination = minCombinationFrom(arr, current, target)
  return countCombinationsWithMaxDepthFrom(arr, current, target, minCombination)
}

function solverOptimized(input: string, counter: SetPartitionFunction) {
  let containers: number[] = []
  for (const line of input.split('\n')) {
    containers.push( Number(line) )
  }

  return counter(containers, -1, TOTAL_LITERS)
}


import {computeSubsetsWithSum} from './utils'

function solver1(input: string) {
  let containers: number[] = []
  for (const line of input.split('\n')) {
    containers.push( Number(line) )
  }

  const combinations = computeSubsetsWithSum(containers, TOTAL_LITERS)
  return combinations.length
}

function solver2(input: string) {
  let containers: number[] = []
  for (const line of input.split('\n')) {
    containers.push( Number(line) )
  }

  const combinations = computeSubsetsWithSum(containers, TOTAL_LITERS)
  let minContainers = Number.MAX_SAFE_INTEGER
  for(const comb of combinations)
    minContainers = Math.min(minContainers, comb.length)

  return combinations.filter(comb => comb.length === minContainers).length
}


import execute from './handler'
execute((input) => solverOptimized(input, countMinCombinationsFrom), 'day17.txt')
