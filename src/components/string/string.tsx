import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import styles from './string.module.css';
import { ElementStates } from '../../types/element-states';

export const StringComponent: React.FC = () => {
  const [circles, setCircles] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(10);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isEndedAnimation, setIsEndedAnimation] = useState(false);

  const onClickHandler = async () => {
    setIsEndedAnimation(false);
    setIsButtonClicked(true);
    const arr = inputValue.split('');
    let start = 0;
    let end = arr.length - 1;
    while (start < end) {
      setStartIndex(start);
      setEndIndex(end);
      setCircles([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
      start++;
      end--;
    }
    setIsEndedAnimation(true);
    setCircles([...arr]);
    setIsButtonClicked(false);
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
        <Button
          isLoader={isButtonClicked}
          disabled={isButtonClicked}
          onClick={onClickHandler}
          extraClass="ml-6"
          text="Развернуть"
        />
      </form>
      <div className={styles.wrapper}>
        {circles.map((letter, index) => {
          let state: ElementStates | undefined;
          if ((index === startIndex || index === endIndex) && !isEndedAnimation) {
            state = ElementStates.Changing;
          } else if (index < startIndex || index > endIndex || isEndedAnimation) {
            state = ElementStates.Modified;
          }
          return <Circle extraClass="ml-8" key={index} letter={letter} state={state} />;
        })}
      </div>
    </SolutionLayout>
  );
};
