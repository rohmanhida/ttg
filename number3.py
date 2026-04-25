def findMissingElement(arr: list[int]):
    result = []
    for i in range(len(arr)):
        # print('current number', arr[i], ' ', arr[i]+1, ' in arr? ', arr[i]+1 in arr, ' ', arr[i]-1, ' in arr? ', arr[i]-1 in arr)
        if arr[i]+1 not in arr and arr[i]+1 not in result:
            result.append(arr[i]+1)
        if arr[i]-1 not in arr and arr[i]-1 not in result:
            result.append(arr[i]-1)
        if len(result) == 3:
            break
    result.sort()
    return result[1]


a = findMissingElement([3106, 3102, 3104, 3105, 3107, 3103, 3109])
print('result', a)
