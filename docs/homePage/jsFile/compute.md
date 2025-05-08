---
title: 常见算法
description: 集合一些常规算法。
updated: 2025-4-1
---

# 常规算法
<UpdatedTime :updated="$frontmatter.updated" />


## 二分查找

> 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

示例 1:

> 输入: nums = [-1,0,3,5,9,12], target = 9
> 
> 输出: 4
> 
> 解释: 9 出现在 nums 中并且下标为 4

示例 2:

> 输入: nums = [-1,0,3,5,9,12], target = 2
>
> 输出: -1
> 
> 解释: 2 不存在 nums 中因此返回 -1

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while(left <= right){
        const mid = Math.floor((left + right) / 2); //中间指针
        if(nums[mid] === target){
            return mid; // 找到目标 返回索引
        }else if (nums[mid] < target){
            left = mid + 1 // 目标在右半边
        }else {
            right = mid -1 // 目标在左半边
        }
    } 
    return -1; // 未找到
};

```