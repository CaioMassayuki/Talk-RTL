import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import 'jest-dom/extend-expect'
import FormComp from './FormComponent'

const renderComponent = props => render(<FormComp {...props} />)

afterEach(cleanup)
describe('<FormComp />, Render all elements', () => {
  it('Should render Nome Input with Label', () => {
    const { getByLabelText } = renderComponent()
    expect(getByLabelText('Nome')).toBeInTheDocument()
  })
  it('Should render Poder Input with Placeholder', () => {
    const { getByPlaceholderText } = renderComponent()
    expect(getByPlaceholderText('Ex: 9000')).toBeInTheDocument()
  })
  it('Should render action Button with Text', () => {
    const { getByText } = renderComponent()
    expect(getByText('Analisar Poder')).toBeInTheDocument()
  })
  it('Should render async Image with Alt', () => {
    const { getByAltText } = renderComponent()
    expect(getByAltText('Vegeta analisando poder de luta')).toBeInTheDocument()
  })
  it('Should render async Image with Title', () => {
    const { getByTitle } = renderComponent()
    expect(getByTitle('Analisando poder de luta')).toBeInTheDocument()
  })
  it('Should render Select with DisplayValue', () => {
    const { getByDisplayValue } = renderComponent()
    expect(getByDisplayValue('Vegeta')).toBeInTheDocument()
  })
  it('Should render Main with Role', () => {
    const { getByRole } = renderComponent()
    expect(getByRole('main')).toBeInTheDocument()
  })
  it('Should render Information with TestId', () => {})
})

describe('<FormComp />, Functionalities working', () => {
  it('Should change Enemy Image when other Option is selected', async () => {
    const { getByDisplayValue, findByAltText } = renderComponent()
    fireEvent.change(getByDisplayValue('Vegeta'), {
      target: { value: 'nappa' }
    })

    const selectEl = await findByAltText('Nappa analisando poder de luta')
    expect(selectEl).toBeInTheDocument()
  })
  /*it("Should show correct User Information when Button is clicked", () => {});
  it("Should change Enemy Image when Power is over 9000", () => {});
  it("Should change Enemy Image when Power is less than 9001", () => {});*/
})

describe('<FormComp />, Behavior', () => {
  /*it("Should show default User Information when Button is clicked without informations", () => {});
  it("Should show default Enemy Image if none Options is selected and Button is clicked", () => {});*/
})
