import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Тестирование компонента Circle', () => {
  test('Тестирование компонента Circle без буквы', () => {
    const letter = '';
    const tree = renderer.create(<Circle letter={letter} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Тестирование компонента Circle с буквой', () => {
    const letter = 'М';
    const tree = renderer.create(<Circle letter={letter} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Тестирование компонента Circle с head', () => {
    const head = 'top';
    const tree = renderer.create(<Circle head={head} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Тестирование компонента Circle с react-элементом в head', () => {
    const tree = renderer.create(<Circle head={<Circle letter={'test'} />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Тестирование компонента Circle с tail', () => {
    const tail = 'tail';
    const tree = renderer.create(<Circle tail={tail} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Тестирование компонента Circle с react-элементом в tail', () => {
    const tree = renderer.create(<Circle tail={<Circle letter={'test'} />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Тестирование компонента Circle с index', () => {
    const tree = renderer.create(<Circle index={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Тестирование компонента Circle с пропом is Small === true', () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Тестирование компонента Circle в состоянии default', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Тестирование компонента Circle в состоянии changing', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Тестирование компонента Circle в состоянии modified', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
