import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import { LOCALE_EN, LOCALE_DE } from '../../../constants/locales'
import configureStore from '../../../configureStore'
import history from '../../../utils/history'
import LanguageProvider from '../../LanguageProvider'
import { actions } from '../../LanguageProvider/redux'
import LocaleToggle from '../index'

describe('<LocaleToggle />', () => {
  let store
  const mockedChangeLocale = jest
    .spyOn(actions, 'changeLocale')
    .mockImplementation(() => ({ type: 'test', locale: 'any' } as any))

  beforeAll(() => {
    store = configureStore({}, history)
  })

  it('should match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <LanguageProvider>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>,
    )
    expect(container.firstChild).toMatchSnapshot()
    expect(mockedChangeLocale).not.toHaveBeenCalled()
  })

  it(`should present the default '${LOCALE_EN}' english language option`, () => {
    const { queryByDisplayValue } = render(
      <Provider store={store}>
        <LanguageProvider>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>,
    )
    expect(queryByDisplayValue(LOCALE_EN)).toBeInTheDocument()
    expect(mockedChangeLocale).not.toHaveBeenCalled()
  })

  it('should dispatch changeLocale when user selects a new option', () => {
    const { container } = render(
      <Provider store={store}>
        <LanguageProvider>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>,
    )
    const newLocale = LOCALE_DE
    const select = container.querySelector('select')!
    fireEvent.change(select, { target: { value: newLocale } })
    expect(mockedChangeLocale).toHaveBeenCalledWith(newLocale)
  })
})
