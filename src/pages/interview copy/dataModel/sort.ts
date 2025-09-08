const sort = {
    title: '排序算法',
    key: 'sort',
    children: [
        {
            title: '冒泡排序',
            key: 'bubbleSort',
            content:[{
            describe: '冒泡排序是一种简单的排序算法，它重复地遍历要排序的列表，一次比较两个元素，如果它们的顺序错误就把它们交换过来。遍历列表的工作是重复地进行直到没有再需要交换的元素为止。',
            code: `
// 冒泡排序实现
    // 冒泡排序是一种简单的排序算法。它重复地遍历要排序的数组，一次比较两个元素，如果它们的顺序错误就把它们交换过来。
    // 遍历数组的工作是重复地进行直到没有再需要交换的元素，也就是说该数组已经排序完成。
    // 冒泡排序的时间复杂度是 O(n^2)，空间复杂度是 O(1)。
    function bubbleSort(arr) {
    // 双重循环，外层控制遍历次数，内层进行元素比较和交换
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
                `
            }]
            
        },
        {
            title: '快速排序',
            key: 'quickSort',
            content:[{
            describe: '快速排序是一种分治的排序算法，它通过选择一个基准元素，将列表分成两个子列表，一个子列表中的元素都小于基准元素，另一个子列表中的元素都大于基准元素。然后递归地对这两个子列表进行排序。',
            code: `
// 快速排序实现
    // 快速排序是一种分治的排序算法。它通过选择一个基准元素，将列表分成两个子列表，一个子列表中的元素都小于基准元素，另一个子列表中的元素都大于基准元素。
    // 然后递归地对这两个子列表进行排序。
    // 快速排序的时间复杂度是 O(nlogn)，空间复杂度是 O(logn)。
    function quickSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        let pivot = arr[0];
        let left = [];
        let right = [];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return [...quickSort(left), pivot, ...quickSort(right)];
    }
                `
            }]
        },
        {
            title: '插入排序',
            key: 'insertSort',
            content:[{
            describe: '插入排序是一种简单的排序算法，它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。',
            code: `
// 插入排序实现
    // 插入排序是一种简单的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
    // 插入排序的时间复杂度是 O(n^2)，空间复杂度是 O(1)。
    function insertSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            let temp = arr[i];
            let j = i;
            while (j > 0 && arr[j - 1] > temp) {
                arr[j] = arr[j - 1];
                j--;
            }
            arr[j] = temp;
        }
        return arr;
    }
                `
                }]
        },
        {
            title: '选择排序',
            key: 'selectSort',
            content:[{
            describe: '选择排序是一种简单的排序算法，它的工作原理是每次从待排序的元素中选择最小（或最大）的一个元素，存放在序列的起始位置，直到全部待排序的元素排完。',
            code: `
// 选择排序实现
    // 选择排序是一种简单的排序算法。它的工作原理是每次从待排序的元素中选择最小（或最大）的一个元素，存放在序列的起始位置，直到全部待排序的元素排完。
    // 选择排序的时间复杂度是 O(n^2)，空间复杂度是 O(1)。
    function selectSort(arr) {
        for (let i = 0; i < arr.length; i++) {
            let min = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[min]) {
                    min = j;
                }
            }
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
        return arr;
    }
                `
            }]
        },
    ]
}

export default sort;