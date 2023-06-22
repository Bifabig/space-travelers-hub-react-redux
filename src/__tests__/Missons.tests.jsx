import { render } from '@testing-library/react';
import Rockets from '../routes/Rockets';

test('renders Rockets correctly', () => {
  const { container } = render(
    <Rockets />,
  );
  expect(container).toMatchSnapshot();
});
