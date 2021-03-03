import React from 'react'
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'
import FormComp from './FormComponent'
import '@testing-library/jest-dom/extend-expect'

const renderComponent = (props) => render(<FormComp {...props} />)

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
  it('Should render Information with TestId', async () => {
    const { findByTestId, getByText, getByTestId } = renderComponent()
    fireEvent.click(getByText('Analisar Poder'))
    await waitForElementToBeRemoved(getByTestId('test-loader'), {timeout: 4500})
    const testInfo = await findByTestId('test-informations')
    expect(testInfo).toBeInTheDocument()
  })
  it('Should dont render Information after button click', () => {
    const { queryByText } = renderComponent()
    fireEvent.click(queryByText('Analisar Poder'))
    expect(queryByText('test-informations')).toBe(null)
  })
})

describe('<FormComp />, Functionalities working', () => {
  it('Should change Enemy Image when other Option is selected', () => {
    const { getByDisplayValue, getByAltText } = renderComponent()
    fireEvent.change(getByDisplayValue('Vegeta'), {
      target: { value: 'nappa' },
    })
    const selectEl = getByAltText('Nappa analisando poder de luta')
    expect(selectEl).toBeInTheDocument()
  })
  it('Should show loading when Button is clicked', () => {
    const { getByText, getByTestId } = renderComponent()
    fireEvent.click(getByText('Analisar Poder'))
    expect(getByTestId('test-loader')).toBeInTheDocument()
  })
  it('Should show correct User Information when Button is clicked', async () => {
    const { getByLabelText, getByText, findByTestId, getByTestId } = renderComponent()
    fireEvent.change(getByLabelText('Nome'), { target: { value: 'TESTE' } })
    fireEvent.change(getByLabelText('Poder'), { target: { value: '1' } })
    fireEvent.click(getByText('Analisar Poder'))
    await waitForElementToBeRemoved(getByTestId('test-loader'), {timeout: 4500})
    const testInfo = await findByTestId('test-informations')
    expect(testInfo).toBeInTheDocument()
    expect(testInfo.textContent).toEqual('TESTE tem 1 de poder de luta!')
  })
  it('Should change Enemy Image when Power is over 9000', async () => {
    const { getByLabelText, getByText, findByTestId, getByAltText, getByTestId } = renderComponent()
    const testImg = getByAltText('Vegeta analisando poder de luta')
    fireEvent.change(getByLabelText('Nome'), { target: { value: 'TESTE' } })
    fireEvent.change(getByLabelText('Poder'), { target: { value: '10000' } })
    fireEvent.click(getByText('Analisar Poder'))
    await waitForElementToBeRemoved(getByTestId('test-loader'), {timeout: 4500})
    const testInfo = await findByTestId('test-informations')
    expect(testInfo).toBeInTheDocument()
    expect(testImg.alt).toMatch('Vegeta diz, O poder de luta dele é mais de 9000')
  })
  it('Should change Enemy Image when Power is less than 9001', async () => {
    const { getByLabelText, getByText, findByTestId, getByAltText, getByTestId } = renderComponent()
    const testImg = getByAltText('Vegeta analisando poder de luta')
    fireEvent.change(getByLabelText('Nome'), { target: { value: 'TESTE' } })
    fireEvent.change(getByLabelText('Poder'), { target: { value: '1' } })
    fireEvent.click(getByText('Analisar Poder'))
    await waitForElementToBeRemoved(getByTestId('test-loader'), {timeout: 4500})
    const testInfo = await findByTestId('test-informations')
    expect(testInfo).toBeInTheDocument()
    expect(testImg.alt).toMatch('Vegeta diz, Você é fraco')
  })
})

describe('<FormComp />, Behavior', () => {
  it('Should show default User Information when Button is clicked without informations', async () => {
    const { findByTestId, getByText, getByTestId } = renderComponent()
    fireEvent.click(getByText('Analisar Poder'))
    await waitForElementToBeRemoved(getByTestId('test-loader'), {timeout: 5000})  
    const testInfo = await findByTestId('test-informations')
    expect(testInfo).toBeInTheDocument()
    expect(testInfo.textContent).toMatch('Kakaroto tem 0 de poder de luta!')
  })
})

describe('<FormComp />, Extras', () => {
  it('Should get number', () => {
    const { getByLabelText, rerender } = renderComponent({ number: 1 })
    expect(getByLabelText('numbertest').value).toBe('1')
    rerender(<FormComp number={2} />)
    expect(getByLabelText('numbertest').value).toBe('2')
  })
})
