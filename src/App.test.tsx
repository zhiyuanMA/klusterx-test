import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';

test('renders teams table', () => {
  render(<App />);
  const table = document.querySelector("table");
  const lines = screen.getAllByRole("row").length;
  expect(table).toBeInTheDocument();
  expect(lines).toBeGreaterThan(1); // at least has 1 data line
});

it('renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
