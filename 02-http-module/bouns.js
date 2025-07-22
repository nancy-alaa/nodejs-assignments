/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    const freqs = nums.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    }, {});
    console.log(freqs);
    for (let key in freqs) {
        if (freqs[key] > nums.length / 2) {
            return parseInt(key);
        }
    }
};
