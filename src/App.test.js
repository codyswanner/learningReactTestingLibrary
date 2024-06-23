/**
 * The following test suites were written with guidance from:
 * https://www.robinwieruch.de/react-testing-library/
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { Search } from './App';

describe('App', () => {
  it('renders App component', () => {
    render(<App/>)

    // default to "getByText" or "getByRole"
    // as these are easiest/simplest
    expect(screen.getByText(/Search:/)).toBeInTheDocument();
  });
  it('does not render extra nonsense', () => {
    render(<App/>);

    // Use "queryBy" for a component that may not exist
    expect(screen.queryByText(/extra nonsense/)).toBeNull();

    // See AsyncApp.test.js for an example on
    // testing async apps with "findBy"
  });
  it('handles user interaction', () => {
    render(<App/>)

    // screen.debug();  // Show DOM heirarchy

    // Use "fireEvent" to simulate user interaction
    // (There's only one textbox in this app)
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: "JavaScript" },
    });
    // userEvent simulates full keyDown, keyUp, etc;
    // see 'Search' > 'calls the onChange callback handler'

    // screen.debug();  // Show DOM heirarchy
  });
});

describe('Search', () => {
  it('calls the onChange callback handler', () => {
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    // userEvent simulates all actions, keyUp, keyDown, etc.
    // (Much like Selenium)
    userEvent.type(screen.getByRole('textbox'), 'JavaScript');

    expect(onChange).toHaveBeenCalledTimes(10);
  });
});
