import React, { useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';

export const StackPage: React.FC = () => {
  interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peek: () => T | null;
  }

  class Stack<T> implements IStack<T> {
    private items: T[];
    constructor() {
      this.items = [];
    }
    push(item: T): void {
      this.items.push(item);
    }
    pop(): void {
      this.items.pop();
    }
    peek(): T | null {
      if (this.items.length === 0) {
        return null;
      }
      return this.items[this.items.length - 1];
    }
    getElements() {
      return this.items;
    }
    clear() {
      this.items = [];
    }
  }

  const stack = useMemo(() => new Stack<number>(), []);

  const [stackItems, setStackItems] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isChanging, setIsChanging] = useState(false);

  const pushElement = async () => {
    setIsChanging(true);
    stack.push(+inputValue);
    setStackItems([...stack.getElements()]);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsChanging(false);
        setStackItems([...stack.getElements()]);
        resolve();
      }, 500);
    });
    setInputValue('');
  };

  const popElement = async () => {
    stack.pop();
    setIsChanging(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsChanging(false);
        setStackItems([...stack.getElements()]);
        resolve();
      }, 500);
    });
  };

  const clearStack = () => {
    stack.clear();
    setStackItems([...stack.getElements()]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <Input
          extraClass={styles.input}
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          maxLength={4}
          isLimitText={true}
        />
        <div className={styles.buttonsWrapper}>
          <Button disabled={inputValue === ''} onClick={pushElement} text={'Добавить'} />
          <Button onClick={popElement} disabled={stackItems.length === 0} text={'Удалить'} />
        </div>
        <Button onClick={clearStack} type={'reset'} disabled={stackItems.length === 0} text={'Очистить'} />
      </div>
      <div className={styles.circles}>
        {stackItems.map((el, index) => {
          let state: ElementStates | null;
          if (isChanging && stackItems.length - 1 === index) {
            state = ElementStates.Changing;
          } else {
            state = ElementStates.Default;
          }
          return (
            <Circle
              head={stackItems.length - 1 === index ? 'top' : null}
              letter={el.toString()}
              key={index}
              index={index}
              state={state}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
