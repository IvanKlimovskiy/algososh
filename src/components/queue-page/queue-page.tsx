import React, { useEffect, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from '../stack-page/stack-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import { ButtonType } from '../../types/button-type';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { HEAD, TAIL } from '../../constants/element-captions';

export const QueuePage: React.FC = () => {
  interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    getElements: () => (T | null)[];
  }

  class Queue<T> implements IQueue<T> {
    private items: (T | null)[];
    private head = 0;
    private tail = 0;
    private index: number | null = null;
    private readonly size: number = 0;

    constructor(size: number) {
      this.size = size;
      this.items = Array(size).fill(null);
    }

    enqueue(item: T) {
      this.items[this.tail % this.size] = item;
      this.index = this.tail % this.size;
      this.tail++;
    }

    dequeue() {
      this.items[this.head % this.size] = null;
      this.index = this.head % this.size;
      this.head++;
    }

    getElements(): (T | null)[] {
      return this.items;
    }

    getIndex() {
      return this.index;
    }

    clear() {
      this.head = 0;
      this.tail = 0;
      this.index = null;
      this.items = Array(this.size).fill(null);
    }
  }

  const queue = useMemo(() => new Queue<number>(7), []);
  const [queueItems, setQueueItems] = useState<(number | null)[]>([]);
  const [isChanging, setIsChanging] = useState(false);
  const [head, setHead] = useState<number | null>(null);
  const [tail, setTail] = useState<number>(-1);
  const [clickedButton, setClickedButton] = useState<ButtonType | null>(null);

  useEffect(() => {
    return setQueueItems([...queue.getElements()]);
  }, []);

  const enqueueElement = async () => {
    setIsChanging(true);
    queue.enqueue(+inputValue);
    setQueueItems([...queue.getElements()]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setIsChanging(false);
    setTail((prevState) => prevState + 1);
    if (head === null) {
      setHead((prevState) => (prevState === null ? 0 : prevState + 1));
    }
    setQueueItems([...queue.getElements()]);
    setInputValue('');
  };

  const dequeueElement = async () => {
    setIsChanging(true);
    queue.dequeue();
    setQueueItems([...queue.getElements()]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setHead((prevState) => (prevState === null ? 0 : prevState + 1));
    if (head === 6) {
      setHead(6);
      setTail(-1);
    }
    setIsChanging(false);
    setQueueItems([...queue.getElements()]);
    setInputValue('');
  };

  const clearQueue = () => {
    queue.clear();
    setQueueItems([...queue.getElements()]);
    setHead(null);
    setTail(-1);
  };

  const [inputValue, setInputValue] = useState<string>('');
  return (
    <SolutionLayout title="Очередь">
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
            disabled={inputValue === '' || queueItems[queueItems.length - 1] !== null || head === 6}
            onClick={() => {
              enqueueElement().then();
              setClickedButton(ButtonType.Submit);
            }}
            text={'Добавить'}
          />
          <Button
            isLoader={isChanging && clickedButton === ButtonType.Delete}
            disabled={queueItems.every((el) => el === null)}
            onClick={() => {
              dequeueElement().then();
              setClickedButton(ButtonType.Delete);
            }}
            text={'Удалить'}
          />
        </div>
        <Button
          isLoader={isChanging && clickedButton === ButtonType.Reset}
          onClick={() => {
            clearQueue();
            setClickedButton(ButtonType.Reset);
          }}
          text={'Очистить'}
        />
      </div>
      <div className={styles.circles}>
        {queueItems.map((el, index) => {
          let state: ElementStates | null;
          if (isChanging && queue.getIndex() === index) {
            state = ElementStates.Changing;
          } else {
            state = ElementStates.Default;
          }
          return (
            <Circle
              head={index === head ? HEAD : null}
              tail={index === tail ? TAIL : null}
              letter={el ? el.toString() : ''}
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
