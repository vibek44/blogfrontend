import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/component/Blog'

test('component renders title and author by default',() => {

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

test('component renders url and likes when button is clicked for details',async() => {

  const blog={
    title: 'Curbs tips on Sync and async executions',
    author: 'Geeks o Geeks',
    url: 'https://www.geeksforgeeks.org/synchronous-and-asynchronous-in-javascript/',
    likes: 29,
    user: {
      username: 'chhetri',
      name: 'chhetri',
    },
  }
  const user= {
    username: 'chhetri',
    name: 'chhetri',
    id: '659adc49556707640dee96a8'
  }
  render(<Blog blog={blog} user={user}  />)

  const user1=userEvent.setup()
  const button=screen.getByText('view')
  await user1.click(button)
  const element=screen.getByText('https://www.geeksforgeeks.org/synchronous-and-asynchronous-in-javascript/')
  const element2=screen.getByText('29')
  screen.debug(element)
  expect(element).toBeDefined()
  expect(element2).toBeDefined()

})

test.only('when like button is clicked twice,event handler component receieved is called twice ',async() => {

  const blog={
    title: 'shout out to health blending guide',
    author: 'Food matters',
    url: 'https://www.foodmatters.com/',
    likes: 20,
    user: {
      username: 'bhim',
      name: 'bhim',
      id: '65982042496a5febabf94716'
    },
    id: '65a149e80b31643208ba5677'
  }
  const user= {
    username: 'bhim',
    name: 'bhim',
    id: '65982042496a5febabf94716'
  }

  const handleBlogLike=jest.fn()
  render(<Blog blog={blog} user={user} handleBlogLike={handleBlogLike} />)

  const user1=userEvent.setup()
  const button=screen.getByText('view')
  await user1.click(button)
  const buttonlikes=screen.getByText('like')
  await user1.click(buttonlikes)
  await user1.click(buttonlikes)
  //screen.debug(element)
  expect(handleBlogLike.mock.calls).toHaveLength(2)

})

