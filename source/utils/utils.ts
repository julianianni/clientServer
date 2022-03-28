import { IJSON_Example } from '../controllers/posts'

export const updateData = ({
  data,
  newTitle,
  newDescription,
}: {
  data: IJSON_Example
  newTitle: string
  newDescription: string
}) => {
  const newData = {
    title: data?.title,
    description: data?.description,
    id: data.id,
  }
  if (newTitle) newData.title = newTitle
  if (newDescription) newData.description = newDescription
  return newData
}
