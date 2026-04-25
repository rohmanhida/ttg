def findTergetSum(nums: list[int], target: int) -> int:
    def recursive(i, total):
        if i == len(nums):
            return total == target
        return (
            recursive(i + 1, total + nums[i])
            + recursive(i + 1, total - nums[i])
            + recursive(i + 1, total * nums[i])
        )

    return recursive(0, 0)


a = findTergetSum([2,3,5,10], 25)
print(a)
