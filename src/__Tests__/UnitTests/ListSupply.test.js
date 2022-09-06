import React from 'react'
import { render as testingRender, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { ListSupply } from '../../Containers/ListSupply'

const render = (component) => testingRender(<Provider store={store}>{component}</Provider>)

describe('This will test ListSupply', () => {
  test('renders message', () => {
    render(<ListSupply />)

    // From screen that is rendered
    // Find by text what is passed in as parameter
    expect(screen.getByText('Supply information for')).toBeInTheDocument()
  })
})
