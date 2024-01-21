import Reac from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../src/component/Blog'

test('component renders content',() => {

  const blog={
    title:'The moon is shaded by the sun',
    author:'albert krishna'
  }
  const { container } = render(<Blog blog={blog}/>)
  const div=container.querySelector('.title')
  const div2=container.querySelector('.author')
  expect(div).toHaveTextContent(
    'The moon is shaded by the sun',
  )
  expect(div2).toHaveTextContent(
    'albert krishna',
  )

})