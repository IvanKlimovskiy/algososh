import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import styles from './list-page.module.css';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { ElementStates } from '../../types/element-states';
import { HEAD, TAIL } from '../../constants/element-captions';
import { DELAY_IN_MS } from '../../constants/delays';
import { ButtonType } from '../../types/button-type';
class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  getSize: () => number;
  getLinkedListItems: () => string[];
}

class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append = (element: T) => {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;

      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }

    this.size++;
  };

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let current = this.head;
        let prev = null;
        let currIndex = 0;

        while (currIndex < index) {
          prev = current;
          current = current?.next || null;
          currIndex++;
        }

        node.next = current;
        prev!.next = node;
      }

      this.size++;
    }
  }

  removeAt(index: number) {
    if (index < 0 || index >= this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      if (index === 0) {
        this.head = this.head?.next || null;
      } else {
        let current = this.head;
        let prev = null;
        let currIndex = 0;

        while (currIndex < index) {
          prev = current;
          current = current?.next || null;
          currIndex++;
        }

        prev!.next = current?.next || null;
      }

      this.size--;
    }
  }

  getSize = () => {
    return this.size;
  };

  getLinkedListItems = (): string[] => {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }

    return res.trim().split(' ');
  };
}

export const ListPage: React.FC = () => {
  const linkedList = useMemo(() => new LinkedList<string>(), []);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndexValue, setInputIndexValue] = useState<string>('');
  const [linkedListItems, setLinkedListItems] = useState<string[]>(['0', '34', '8', '1']);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [buttonAction, setButtonAction] = useState<ButtonType>(ButtonType.Default);
  const [changingIndex, setChangingIndex] = useState<number[] | number | null>(null);
  const [changingIndexArr, setChangingIndexArr] = useState<number[]>([]);
  const [itemAddedByIndex, setItemAddedByIndex] = useState<number | null>();

  useEffect(() => {
    linkedListItems.forEach((item) => linkedList.append(item));
  }, []);

  const onInputValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const onInputIndexValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(+evt.target.value)) setInputIndexValue(evt.target.value);
  };

  const onClickAddHeadButton = async () => {
    setIsChanging(true);
    setButtonAction(ButtonType.AddHead);
    setChangingIndex(0);

    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

    linkedList.insertAt(inputValue, 0);
    setLinkedListItems(linkedList.getLinkedListItems());
    setButtonAction(ButtonType.Default);
    setInputValue('');

    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

    setIsChanging(false);
    setChangingIndex(null);
  };

  const onClickAddTailButton = async () => {
    setIsChanging(true);
    setButtonAction(ButtonType.AddTail);
    setChangingIndex(linkedListItems.length);

    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

    linkedList.insertAt(inputValue, linkedList.getSize());
    setLinkedListItems(linkedList.getLinkedListItems());
    setInputValue('');
    setButtonAction(ButtonType.Default);

    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

    setChangingIndex(null);
    setIsChanging(false);
  };

  const onClickDeleteHeadButton = async () => {
    setIsChanging(true);
    setButtonAction(ButtonType.RemoveHead);

    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

    linkedList.removeAt(0);
    setLinkedListItems(linkedList.getLinkedListItems());
    setButtonAction(ButtonType.Default);

    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

    setIsChanging(false);
  };

  const onClickDeleteTailButton = async () => {
    setIsChanging(true);
    setButtonAction(ButtonType.RemoveTail);

    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

    linkedList.removeAt(linkedList.getSize() - 1);
    setLinkedListItems(linkedList.getLinkedListItems());
    setButtonAction(ButtonType.Default);

    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

    setIsChanging(false);
  };

  const onClickAddByIndexButton = async () => {
    setIsChanging(true);
    setButtonAction(ButtonType.AddByIndex);

    for (let i = 0; i <= +inputIndexValue; i++) {
      setChangingIndex(i);
      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
      setChangingIndexArr((prevChangingIndex) => [...prevChangingIndex, i + 1]);
    }

    setChangingIndex(null);
    setChangingIndexArr([]);

    linkedList.insertAt(inputValue, +inputIndexValue);
    setLinkedListItems(linkedList.getLinkedListItems());
    setItemAddedByIndex(+inputIndexValue);

    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

    setItemAddedByIndex(null);
    setButtonAction(ButtonType.Default);
    setInputValue('');
    setInputIndexValue('');
    setIsChanging(false);
  };

  const onClickDeleteByIndexButton = async () => {
    setIsChanging(true);
    setButtonAction(ButtonType.RemoveByIndex);

    for (let i = 0; i <= +inputIndexValue; i++) {
      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
      setChangingIndexArr((prevChangingIndex) => [...prevChangingIndex, i]);
    }

    setChangingIndex(+inputIndexValue);
    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
    linkedList.removeAt(+inputIndexValue);
    setLinkedListItems(linkedList.getLinkedListItems());
    setChangingIndexArr([]);
    setChangingIndex(null);

    setButtonAction(ButtonType.Default);
    setInputIndexValue('');
    setIsChanging(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <Input
            placeholder="Введите значение"
            extraClass="input"
            isLimitText={true}
            maxLength={4}
            value={inputValue}
            onChange={onInputValueChange}
            disabled={isChanging}
            data-testid="input"
          />
          <Button
            text="Добавить в head"
            extraClass="button"
            onClick={onClickAddHeadButton}
            disabled={!inputValue}
            isLoader={buttonAction === ButtonType.AddHead}
            data-testid="addHeadButton"
          />
          <Button
            text="Добавить в tail"
            extraClass="button"
            onClick={onClickAddTailButton}
            disabled={!inputValue}
            isLoader={buttonAction === ButtonType.AddTail}
            data-testid="addTailButton"
          />
          <Button
            text="Удалить из head"
            extraClass="button"
            onClick={onClickDeleteHeadButton}
            disabled={linkedListItems.length === 0}
            isLoader={buttonAction === ButtonType.RemoveHead}
            data-testid="removeHeadButton"
          />
          <Button
            text="Удалить из tail"
            extraClass="button"
            onClick={onClickDeleteTailButton}
            disabled={linkedListItems.length === 0}
            isLoader={buttonAction === ButtonType.RemoveTail}
            data-testid="removeTailButton"
          />
        </div>
        <div className={styles.row}>
          <Input
            placeholder="Введите индекс"
            extraClass="input"
            value={inputIndexValue}
            onChange={onInputIndexValueChange}
            disabled={isChanging}
            data-testid="indexInput"
          />
          <Button
            text="Добавить по индексу"
            extraClass="button"
            onClick={onClickAddByIndexButton}
            disabled={
              inputIndexValue === '' ||
              +inputIndexValue < 0 ||
              +inputIndexValue > linkedListItems.length - 1 ||
              inputValue === ''
            }
            isLoader={buttonAction === ButtonType.AddByIndex}
            data-testid="addByIndexButton"
          />
          <Button
            text="Удалить по индексу"
            extraClass="button"
            onClick={onClickDeleteByIndexButton}
            disabled={inputIndexValue === '' || +inputIndexValue < 0 || +inputIndexValue > linkedListItems.length - 1}
            isLoader={buttonAction === ButtonType.RemoveByIndex}
            data-testid="removeByIndexButton"
          />
        </div>
      </div>
      <div className={styles.items}>
        {linkedListItems.map((item, index) => {
          return (
            <React.Fragment key={`fragment-${index}`}>
              <Circle
                key={`circle-${index}`}
                index={index}
                letter={
                  buttonAction === ButtonType.RemoveHead && index === 0
                    ? ''
                    : (buttonAction === ButtonType.RemoveTail && index === linkedListItems.length - 1) ||
                      (buttonAction === ButtonType.RemoveByIndex && index === changingIndex)
                    ? ''
                    : item
                }
                head={
                  index === 0 && isChanging && buttonAction === ButtonType.AddHead ? (
                    <Circle
                      letter={inputValue}
                      isSmall={true}
                      state={isChanging ? ElementStates.Changing : ElementStates.Default}
                    />
                  ) : index === linkedListItems.length - 1 && buttonAction === ButtonType.AddTail ? (
                    <Circle
                      letter={inputValue}
                      isSmall={true}
                      state={isChanging ? ElementStates.Changing : ElementStates.Default}
                    />
                  ) : isChanging && buttonAction === ButtonType.AddByIndex && index === changingIndex ? (
                    <Circle
                      letter={inputValue}
                      isSmall={true}
                      state={isChanging ? ElementStates.Changing : ElementStates.Default}
                    />
                  ) : index === 0 ? (
                    HEAD
                  ) : (
                    ''
                  )
                }
                tail={
                  index === 0 && buttonAction === ButtonType.RemoveHead ? (
                    <Circle
                      letter={item}
                      isSmall={true}
                      state={isChanging ? ElementStates.Changing : ElementStates.Default}
                    />
                  ) : (index === linkedListItems.length - 1 && buttonAction === ButtonType.RemoveTail) ||
                    (buttonAction === ButtonType.RemoveByIndex && index === changingIndex) ? (
                    <Circle
                      letter={item}
                      isSmall={true}
                      state={isChanging ? ElementStates.Changing : ElementStates.Default}
                    />
                  ) : index === linkedListItems.length - 1 ? (
                    TAIL
                  ) : (
                    ''
                  )
                }
                state={
                  isChanging && buttonAction === ButtonType.RemoveByIndex && changingIndex === index
                    ? ElementStates.Default
                    : (index === 0 &&
                        isChanging &&
                        inputValue === '' &&
                        changingIndex === 0 &&
                        buttonAction === ButtonType.Default) ||
                      (index === linkedListItems.length - 1 &&
                        isChanging &&
                        inputValue === '' &&
                        changingIndex === linkedListItems.length - 1 &&
                        buttonAction === ButtonType.Default) ||
                      (isChanging && buttonAction === ButtonType.AddByIndex && itemAddedByIndex === index)
                    ? ElementStates.Modified
                    : (isChanging &&
                        buttonAction === ButtonType.AddByIndex &&
                        typeof changingIndexArr[index] === 'number' &&
                        changingIndexArr[index] - 1 === index) ||
                      (isChanging && buttonAction === ButtonType.RemoveByIndex && index === changingIndexArr[index])
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
              />
              {!(index === linkedListItems.length - 1) && <ArrowIcon key={`arrow-${index}`} />}
            </React.Fragment>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
