import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from '../fibonacci-page/fibonacci-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [circles, setCircles] = useState<number[]>([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const onClickHandler = async () => {
    setIsButtonClicked(true);
    const array = [0, 1];
    let step = 0;
    while (step <= +inputValue) {
      array.shift();
      setCircles([...array]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      array.unshift(0);
      array.push(array[step] + array[step + 1]);
      step++;
    }
    setIsButtonClicked(false);
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
          data-testid="button"
          isLoader={isButtonClicked}
          onClick={onClickHandler}
          disabled={+inputValue > 19 || isButtonClicked || inputValue === ''}
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
