export const reverseString = (arr: string[]) => {
  let newArr: string[] = arr;
  let start = 0;
  let end = newArr.length - 1;
  while (start < end) {
    const temp = newArr[start];
    newArr[start] = newArr[end];
    newArr[end] = temp;
    start++;
    end--;
  }
  return newArr;
};
