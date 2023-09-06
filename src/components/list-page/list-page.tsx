import React from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './list-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Input placeholder={'Введите значение'} isLimitText={true} maxLength={4} extraClass={styles.input} />
          <div className={styles.buttonsWrapper}>
            <Button extraClass={styles.button} text={'Добавить в head'} />
            <Button extraClass={styles.button} text={'Добавить в tail'} />
            <Button extraClass={styles.button} text={'Удалить из head'} />
            <Button extraClass={styles.button} text={'Удалить из tail'} />
          </div>
        </div>
        <div className={styles.bottom}>
          <Input placeholder={'Введите индекс'} extraClass={styles.input} />
          <div className={styles.buttonsWrapper}>
            <Button extraClass={styles.button} text={'Добавить по индексу'} />
            <Button extraClass={styles.button} text={'Удалить по индексу'} />
          </div>
        </div>
      </div>
    </SolutionLayout>
  );
};
