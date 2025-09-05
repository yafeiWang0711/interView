// 两数之和


/**
* 两数之和
* 题目描述：
* 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，
* 并返回它们的数组下标。
*
* 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
*
* 示例：
* 输入：nums = [2, 7, 11, 15], target = 9
* 输出：[0, 1]
* 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
*
* @param nums 整数数组
* @param target 目标值
* @returns 返回两个整数的数组下标，顺序与输入数组中的顺序一致
*/

// 解题思路：
// 1. 遍历数组 nums，对于每个元素 nums[i]，计算目标值 target 与 nums[i] 的差值 complement。
// 2. 使用 Map 数据结构来存储已经遍历过的元素及其索引。
// 3. 检查 Map 中是否存在 complement，如果存在，则返回 complement 的索引和当前元素的索引。
// 4. 如果不存在 complement，则将当前元素 nums[i] 及其索引 i 存储到 Map 中。
// 5. 如果遍历完成后仍未找到符合条件的元素对，则返回空数组 []。
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

// 测试
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // 输出: [0, 1]