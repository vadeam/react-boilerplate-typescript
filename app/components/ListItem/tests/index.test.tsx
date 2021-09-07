import { render } from '@testing-library/react'
import React from 'react'

import ListItem from '../index' //

describe('<ListItem />', () => {
  it('should have a class', () => {
    const testClassName = 'some-test-class-name'
    const { container } = render(<ListItem className={testClassName} item="" />)
    expect(container.querySelector('li')?.hasAttribute('class')).toBe(true)
    expect(container.querySelector('li')?.attributes.getNamedItem('class')?.value.endsWith(testClassName)).toBe(true)
  })

  it('should render the content passed to it', () => {
    const content = <div data-testid="test">Hello world!</div>
    const { getByTestId } = render(<ListItem item={content} />)
    expect(getByTestId('test').tagName).toEqual('DIV')
    expect(getByTestId('test')).toHaveTextContent('Hello world!')
  })
})
