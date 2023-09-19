import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Тестирование компонента Button', () => {
  test('Button правильно рендерится с текстом', () => {
    const buttonText = 'Нажми меня';
    const tree = renderer.create(<Button text={buttonText} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Button правильно рендерится без текста', () => {
    const buttonText = '';
    const tree = renderer.create(<Button text={buttonText} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Заблокированный Button правильно рендерится', () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Заблокированный Button правильно рендерится', () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Проверка корректности вызова колбэка', () => {
    const onClick = jest.fn();
    const buttonText = 'Нажми меня';
    render(<Button text={buttonText} onClick={onClick} />);
    const link = screen.getByText('Нажми меня');
    fireEvent.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
