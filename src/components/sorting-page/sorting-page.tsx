import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import styles from './sorting-page.module.css';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { Column } from '../ui/column/column';

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);

  const createNewArray = () => {
    const elementCount = Math.floor(Math.random() * (17 - 3 + 1)) + 3;
    const tempArray: number[] = [];
    for (let i = 0; i < elementCount; i++) {
      const randomElement = Math.floor(Math.random() * (100 + 1));
      tempArray.push(randomElement);
    }
    const newArray = [...new Set(tempArray)];
    setArray(newArray);
  };

  const sortAscending = () => {
    const newArray = [...array];
    const sortedArray = [];
    const arrayLength = newArray.length - 1;

    for (let i = 0; i <= arrayLength; i++) {
      let minIndex = i;

      for (let j = i + 1; j <= arrayLength; j++) {
        if (newArray[minIndex] > newArray[j]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        const temp = newArray[i];
        newArray[i] = newArray[minIndex];
        newArray[minIndex] = temp;
      }

      sortedArray.push(newArray[i]);
    }

    setArray(sortedArray);
  };

  const handleClickButton = () => {
    createNewArray();
  };
  const sortingArray = () => {
    sortAscending();
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <RadioInput label={'Выбор'} />
        <RadioInput label={'Пузырёк'} />
        <div className={styles.buttonsWrapper}>
          <Button
            onClick={sortingArray}
            extraClass={styles.button}
            sorting={Direction.Ascending}
            text={'По возрастанию'}
          />
          <Button extraClass={styles.button} sorting={Direction.Descending} text={'По убыванию'} />
        </div>
        <Button onClick={handleClickButton} extraClass={styles.button} text={'Новый массив'} />
      </div>
      <div className={styles.columnsWrapper}>
        {array.map((el, index) => {
          return <Column key={index} index={el} />;
        })}
      </div>
    </SolutionLayout>
  );
};
