// 排序算法 js

// 1. 冒泡排序
/**
 * 冒泡排序
 * 题目描述：
 * 冒泡排序是一种简单的排序算法。它重复地遍历要排序的数组，一次比较两个元素，如果它们的顺序错误就把它们交换过来。
 * 遍历数组的工作是重复地进行直到没有再需要交换的元素，也就是说该数组已经排序完成。
 *
 * 示例：
 * 输入：[2, 1, 3, 4, 5]
 * 输出：[1, 2, 3, 4, 5]
 *
 * @param arr 待排序的数组
 * @returns 排序后的数组
 */
function bubbleSort(arr: number[]): number[] {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

console.log(bubbleSort([2, 1, 3, 4, 5]));
// 输出：[1, 2, 3, 4, 5]



