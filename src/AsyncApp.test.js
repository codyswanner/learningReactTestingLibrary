/**
 * The following test suites were written with guidance from:
 * https://www.robinwieruch.de/react-testing-library/
 */

import React, {act} from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AsyncApp from './AsyncApp';
import { Search } from './AsyncApp';

describe('App', () => {
    it('renders App component', async () => {
      await(act( async () => {render(<AsyncApp/>)}));
  
      // default to "getByText" or "getByRole"
      // as these are easiest/simplest
      expect(screen.getByText(/Search:/)).toBeInTheDocument();
    });
    it('does not render extra nonsense', async () => {
      await(act( async () => {render(<AsyncApp/>)}));
  
      // Use "queryBy" for a component that may not exist
      expect(screen.queryByText(/extra nonsense/)).toBeNull();
  
      // screen.debug();  // Show DOM heirarchy
    });
    it('renders asynchronous components', async () => {
      await(act( async () => {render(<AsyncApp/>)}));
    });
    it('handles user interaction', async () => {
        await(act( async () => {render(<AsyncApp/>)}));

        // wait for user to resolve
        await screen.findByText(/Signed in as/);

        expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    
        // screen.debug();  // Show DOM heirarchy
    
        // Use "fireEvent" to simulate user interaction
        // (There's only one textbox in this app)
        fireEvent.change(screen.getByRole('textbox'), {
          target: { value: "JavaScript" },
        });
        // userEvent simulates full keyDown, keyUp, etc;
        // see 'Search' > 'calls the onChange callback handler'

        expect(screen.queryByText(/Searches for JavaScript/)).toBeInTheDocument();

      });
  });

describe('Search', () => {
    it('calls the onChange callback handler', async () => {
        const onChange = jest.fn();

        render(
        <Search value="" onChange={onChange}>
            Search:
        </Search>
        );

        // userEvent simulates all actions, keyUp, keyDown, etc.
        // (Much like Selenium)
        await userEvent.type(screen.getByRole('textbox'), 'JavaScript');

        expect(onChange).toHaveBeenCalledTimes(10);
    });
});
