import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import styles from './string.module.css';
import { ElementStates } from '../../types/element-states';

export const StringComponent: React.FC = () => {
  const [array, setArray] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  function splitToArray(str: string) {
    return str.split('');
  }

  function reverseArray(arr: string[]) {
    let start = 0;
    let end = arr.length - 1;
    while (start < end) {
      console.log('df');
      start++;
    }
  }

  const onClickHandler = () => {
    const newArray = splitToArray(inputValue);
    setArray(newArray);
    reverseArray(array);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <Input
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          maxLength={11}
          isLimitText={true}
        />
        <Button onClick={onClickHandler} extraClass={'ml-6'} text={'Развернуть'} />
      </form>
      <div className={styles.wrapper}>{array}</div>
    </SolutionLayout>
  );
};
