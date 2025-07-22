/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */

var findKthPositive = function (arr, k) {
    nums = [];
    let j = 0;
    for (let i = 1; i <= arr.length + k; i++) {
        if (arr[j] == i) {
            j += 1;
        } else {
            nums.push(i);
        }
    }
    return nums[k - 1];
};
