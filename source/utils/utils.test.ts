const { updateData } = require('./utils')

test('expect an object to be updated correctly', () => {
  const data = {
    id: 1,
    title: 'my title',
    description: 'title',
  }
  expect(
    updateData({
      data,
      newTitle: 'this is a new title',
      newDescription: 'this is a new title',
    })
  ).toBe({
    id: 1,
    newTitle: 'this is a new title',
    newDescription: 'this is a new title',
  })
})

test('expect the id to not be updated', () => {
  const data = {
    id: 1,
    title: 'my title',
    description: 'title',
  }
  expect(
    updateData({
      data,
      newTitle: 'this is a new title that does not matter',
      newDescription: 'this is a new title',
    }).id
  ).toBe(1)
})
