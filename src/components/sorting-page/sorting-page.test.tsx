import { selectionSort, bubbleSort } from '../../algorithms/algorithms';
describe('Тестирование алгоритмов сортировки выбором и пузырьком', () => {
  test('Тестирование алгоритма сортировки выбором с пустым массивом', () => {
    const testArray: number[] = [];
    expect(selectionSort(testArray)).toStrictEqual([]);
  });
  test('Тестирование алгоритма сортировки выбором с одним элементом в массиве', () => {
    const testArray: number[] = [1];
    expect(selectionSort(testArray)).toStrictEqual([1]);
  });
  test('Тестирование алгоритма сортировки выбором с массивом из нескольких элементов', () => {
    const testArray: number[] = [5, 2, 9, 1, 8, 3, 7, 4, 6];
    expect(selectionSort(testArray)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  test('Тестирование алгоритма сортировки пузырьком с пустым массивом', () => {
    const testArray: number[] = [];
    expect(bubbleSort(testArray)).toStrictEqual([]);
  });
  test('Тестирование алгоритма сортировки пузырьком с одним элементом в массиве', () => {
    const testArray: number[] = [1];
    expect(bubbleSort(testArray)).toStrictEqual([1]);
  });
  test('Тестирование алгоритма сортировки пузырьком с массивом из нескольких элементов', () => {
    const testArray: number[] = [5, 2, 9, 1, 8, 3, 7, 4, 6];
    expect(bubbleSort(testArray)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
