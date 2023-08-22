import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from '../fibonacci-page/fibonacci-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [circles, setCircles] = useState<number[]>([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const onClickHandler = () => {
    setIsButtonClicked(true);
    const array = [0, 1];
    let step = 0;
    const animation = setInterval(() => {
      if (step >= +inputValue) {
        clearInterval(animation);
        setIsButtonClicked(false);
      }
      array.shift();
      setCircles([...array]);
      array.unshift(0);
      array.push(array[step] + array[step + 1]);
      step++;
    }, 500);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form}>
        <Input
          type="number"
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          max={19}
          isLimitText={true}
        />
        <Button
          isLoader={isButtonClicked}
          onClick={onClickHandler}
          disabled={+inputValue > 19 || isButtonClicked}
          extraClass="ml-6"
          text="Рассчитать"
        />
      </form>
      <div className={styles.wrapper}>
        {circles.map((el, index) => {
          return <Circle extraClass="ml-8" letter={el.toString()} key={index} index={index} />;
        })}
      </div>
    </SolutionLayout>
  );
};
