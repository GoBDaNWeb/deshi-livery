import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import {Provider} from 'react-redux'
import {store} from './redux/store'
import {MemoryRouter} from 'react-router-dom'

describe('TEST APP', () => {
    test('test', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App/>
                </MemoryRouter>
            </Provider>
        )
        const text = screen.findByText(/Hello/i)
        expect(text).toBeInTheDocument
    })
})