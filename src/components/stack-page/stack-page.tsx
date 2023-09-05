import React, { useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { ButtonType } from '../../types/button-type';

export const StackPage: React.FC = () => {
  interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peek: () => T | null;
    getElements: () => T[];
    clear: () => void;
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
  const [clickedButton, setClickedButton] = useState<ButtonType | null>(null);

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
          <Button
            isLoader={isChanging && clickedButton === ButtonType.Submit}
            disabled={inputValue === ''}
            onClick={() => {
              pushElement().then();
              setClickedButton(ButtonType.Submit);
            }}
            text={'Добавить'}
          />
          <Button
            isLoader={isChanging && clickedButton === ButtonType.Delete}
            onClick={() => {
              popElement().then();
              setClickedButton(ButtonType.Delete);
            }}
            disabled={stackItems.length === 0}
            text={'Удалить'}
          />
        </div>
        <Button
          isLoader={isChanging && clickedButton === ButtonType.Reset}
          onClick={() => {
            clearStack();
            setClickedButton(ButtonType.Reset);
          }}
          disabled={stackItems.length === 0}
          text={'Очистить'}
        />
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
