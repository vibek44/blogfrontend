import React from 'react'
import '@testing-library/jest-dom'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogform from '../src/component/Blogform'



test('verify the form calls event handler it received as props with right details',async() => {

  const handleBlogAdd=jest.fn()
  const user=userEvent.setup()
  render(<Blogform handleBlogAdd={handleBlogAdd} />)
  const submitButton = screen.getByText('Create')

  const titleinput=screen.getByPlaceholderText('write title here')
  const authorinput=screen.getByPlaceholderText('author here')
  const urlinput=screen.getByPlaceholderText('url here')

  await userEvent.type(titleinput, 'The error is still')
  await userEvent.type(authorinput, 'klin. angel')
  await userEvent.type(urlinput, 'https://jestjs.io/docs/getting-started')

  await user.click(submitButton)
  //screen.debug(titleinput)
  //expect(submitButton).toBeDefined()
  //console.log(handleBlogAdd.mock.calls)
  expect(handleBlogAdd.mock.calls).toHaveLength(1)
  expect(handleBlogAdd.mock.calls[0][0].title).toBe('The error is still')
  expect(handleBlogAdd.mock.calls[0][0].author).toBe('klin. angel')
  expect(handleBlogAdd.mock.calls[0][0].url).toBe('https://jestjs.io/docs/getting-started')


})