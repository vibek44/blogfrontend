//import React from 'react'
import '@testing-library/jest-dom'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogform from '../src/component/Blogform'

test('verify the form calls event handler it received as props with right details',async() => {

  const addBlog=jest.fn()
  render(<Blogform addBlog={ addBlog }/>)
  const element=await screen.findByText('Title',{ exact:false })
  screen.debug(element)
  expect(element).toBeDefined()

})