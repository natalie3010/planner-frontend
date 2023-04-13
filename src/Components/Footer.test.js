import React from 'react'
import renderer from 'react-test-renderer'
import { Footer } from './Footer'

describe('Testing <Footer/> component', () => {
  it('tests snapshots', () => {
    const component = renderer.create(<Footer />).toJSON()
    expect(component).toMatchSnapshot()
  })
})
