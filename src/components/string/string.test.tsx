import { reverseString } from '../../algorithms/reverse-string';

describe('Тестирование алгоритма разворота строки', () => {
  test('Разворот строки с чётным количеством символов', () => {
    const testArray = ['t', 'e', 's', 't'];
    expect(reverseString(testArray)).toStrictEqual(['t', 's', 'e', 't']);
  });
  test('Разворот строки с нечётным количеством символов', () => {
    const testArray = ['t', 'e', 's', 't', '1'];
    expect(reverseString(testArray)).toStrictEqual(['1', 't', 's', 'e', 't']);
  });
  test('Разворот строки с одним символом', () => {
    const testArray = ['t'];
    expect(reverseString(testArray)).toStrictEqual(['t']);
  });
  test('Разворот пустой строки', () => {
    const testArray = [''];
    expect(reverseString(testArray)).toStrictEqual(['']);
  });
});
