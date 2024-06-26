/**
 * Guided by tutorial https://www.robinwieruch.de/react-testing-library/
 */

import React, {act} from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import App from './ApiFetchApp';

jest.mock('axios');

describe('App', () => {
    test('fetches stories from API and displays them', async () => {
        const stories = [
            { objectID: '1', title: 'Hello There' },
            { objectID: '2', title: 'General Kenobi!'},
        ];

        axios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: { hits: stories } })
        );

        await(act( async () => {render(<App/>)}));

        userEvent.click(screen.getByRole('button'));

        const items = await screen.findAllByRole('listitem');

        expect(items).toHaveLength(2);
    });
});