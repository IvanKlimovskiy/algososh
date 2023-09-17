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

export const selectionSort = (array: number[]) => {
  const newArray = [...array];
  const arrayLength = newArray.length - 1;
  for (let i = 0; i <= arrayLength; i++) {
    let minIndex = i;
    for (let j = i + 1; j <= arrayLength + 1; j++) {
      if (newArray[j] < newArray[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const temp = newArray[i];
      newArray[i] = newArray[minIndex];
      newArray[minIndex] = temp;
    }
  }
  return newArray;
};

export const bubbleSort = (array: number[]) => {
  const newArray = [...array];
  const arrayLength = newArray.length - 1;
  for (let i = 0; i <= arrayLength; i++) {
    for (let j = 0; j < arrayLength - i; j++) {
      if (newArray[j] > newArray[j + 1]) {
        const temp = newArray[j];
        newArray[j] = newArray[j + 1];
        newArray[j + 1] = temp;
      }
    }
  }
  return newArray;
};
