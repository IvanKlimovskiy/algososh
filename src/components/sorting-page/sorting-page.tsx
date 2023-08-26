import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import styles from './sorting-page.module.css';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { Column } from '../ui/column/column';
import { ElementStates } from '../../types/element-states';

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [modifiedIndexes, setModifiedIndexes] = useState<number[]>([]);
  const [changingIndexes, setChangingIndexes] = useState<number[]>([]);
  const [isChanging, setIsChanging] = useState(false);
  const [clickedButton, setClickedButton] = useState<Direction.Ascending | Direction.Descending | null>(null);
  const [radioInputChecked, setRadioInputChecked] = useState<string>('Выбор');

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

  const selectionSort = async (direction: 'ascending' | 'descending') => {
    setIsChanging(true);
    const newArray = [...array];
    const arrayLength = newArray.length - 1;

    for (let i = 0; i <= arrayLength; i++) {
      let minIndex = i;
      setIsChanging(true);
      setChangingIndexes([...changingIndexes, i]);
      setArray([...newArray]);

      for (let j = i + 1; j <= arrayLength + 1; j++) {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setChangingIndexes([...changingIndexes, i, j]);
            setArray([...newArray]);
            if (direction === 'ascending') {
              if (newArray[j] < newArray[minIndex]) {
                minIndex = j;
              }
            } else {
              if (newArray[j] > newArray[minIndex]) {
                minIndex = j;
              }
            }
            resolve();
          }, 500);
        });
      }

      if (minIndex !== i) {
        const temp = newArray[i];
        newArray[i] = newArray[minIndex];
        newArray[minIndex] = temp;
      }
      setIsChanging(false);
      setModifiedIndexes((prevState) => [...prevState, i]);
      setArray([...newArray]);
    }
    setIsChanging(false);
  };

  const bubbleSort = async (direction: 'ascending' | 'descending') => {
    setIsChanging(true);
    const newArray = [...array];
    const arrayLength = newArray.length - 1;

    for (let i = 0; i <= arrayLength; i++) {
      for (let j = 0; j < arrayLength - i; j++) {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setChangingIndexes([...changingIndexes, j, j + 1]);
            setArray([...newArray]);
            if (direction === 'ascending') {
              if (newArray[j] > newArray[j + 1]) {
                const temp = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = temp;
              }
            } else {
              if (newArray[j] < newArray[j + 1]) {
                const temp = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = temp;
              }
            }
            resolve();
          }, 500);
        });
      }
      setModifiedIndexes((prevState) => [...prevState, arrayLength - i]);
      setArray([...newArray]);
    }

    setIsChanging(false);
  };

  const handleClickButton = () => {
    setModifiedIndexes([]);
    setChangingIndexes([]);
    createNewArray();
  };

  const sortingArrayAscending = () => {
    setClickedButton(Direction.Ascending);
    radioInputChecked === 'Выбор' ? selectionSort('ascending').then() : bubbleSort('ascending').then();
  };
  const sortingArrayDescending = () => {
    setClickedButton(Direction.Descending);
    radioInputChecked === 'Выбор' ? selectionSort('descending').then() : bubbleSort('descending').then();
  };

  const radioInputCheckedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioInputChecked(event.target.value);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <RadioInput
          onChange={radioInputCheckedHandler}
          checked={radioInputChecked === 'Выбор'}
          value={'Выбор'}
          label={'Выбор'}
        />
        <RadioInput
          checked={radioInputChecked === 'Пузырёк'}
          onChange={radioInputCheckedHandler}
          label={'Пузырёк'}
          value={'Пузырёк'}
        />
        <div className={styles.buttonsWrapper}>
          <Button
            isLoader={isChanging && clickedButton === Direction.Ascending}
            disabled={isChanging}
            onClick={sortingArrayAscending}
            extraClass={styles.button}
            sorting={Direction.Ascending}
            text={'По возрастанию'}
          />
          <Button
            isLoader={isChanging && clickedButton === Direction.Descending}
            disabled={isChanging}
            onClick={sortingArrayDescending}
            extraClass={styles.button}
            sorting={Direction.Descending}
            text={'По убыванию'}
          />
        </div>
        <Button disabled={isChanging} onClick={handleClickButton} extraClass={styles.button} text={'Новый массив'} />
      </div>
      <div className={styles.columnsWrapper}>
        {array.map((el, index) => {
          let state: ElementStates | null;
          if (changingIndexes.some((el) => el === index) && isChanging) {
            state = ElementStates.Changing;
          } else if (modifiedIndexes.some((el) => el === index)) {
            state = ElementStates.Modified;
          } else {
            state = ElementStates.Default;
          }
          return <Column key={index} index={el} state={state} />;
        })}
      </div>
    </SolutionLayout>
  );
};
