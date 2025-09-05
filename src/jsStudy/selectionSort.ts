// 选择排序
// 每次从剩余未排序元素中找到最小（大）值，放到已排序部分的末尾。
// 时间复杂度：O(n^2)
// 空间复杂度：O(1)

function selectionSort(arr: number[]): number[] {
  const array = [...arr];
  const len = array.length;
  
  for (let i = 0; i < len - 1; i++) {
    // 假设当前索引是最小值索引
    let minIndex = i;
    
    // 寻找剩余元素中的最小值索引
    for (let j = i + 1; j < len; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    
    // 交换最小值到当前位置
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  
  return array;
}

// 示例
console.log(selectionSort([3, 1, 4, 1, 5, 9, 2, 6])); // [1, 1, 2, 3, 4, 5, 6, 9]
