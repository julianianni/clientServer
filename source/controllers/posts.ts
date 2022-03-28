/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express'
import axios, { AxiosResponse } from 'axios'
import { filter, isEmpty, map } from 'lodash/fp'
import { updateData } from '../utils/utils'

export interface IJSON_Example {
  id: Number
  title: String
  description: String
}

let PLACEHOLDER_JSON_EXAMPLE: IJSON_Example[] = [
  {
    id: 1,
    title: 'this is a random title',
    description: 'this is a random description',
  },
]

//get all data
const getAllData = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: PLACEHOLDER_JSON_EXAMPLE,
  })
}
//get a specific data by Id
const getDataById = (req: Request, res: Response, next: NextFunction) => {
  const data = filter(
    (item: IJSON_Example) => item.id === Number(req.params.id)
  )(PLACEHOLDER_JSON_EXAMPLE)
  if (isEmpty(data)) throw new Error(`No data found with id ${req.params.id}`)
  return res.status(200).json({
    message: data,
  })
}

// update the data by Id
const updateDataById = (req: Request, res: Response, next: NextFunction) => {
  const title: string = req.body.title ?? null
  const description: string = req.body.description ?? null
  const data = filter(
    (item: IJSON_Example) => item.id === Number(req.params.id)
  )(PLACEHOLDER_JSON_EXAMPLE)

  if (isEmpty(data))
    throw new Error(`No data found for updating with id ${req.params.id}`)

  // in a real example I would save this object to the db instead of this weird functionality
  const newData = updateData({
    data: data[0],
    newTitle: title,
    newDescription: description,
  })

  const newItem = map((item: IJSON_Example) => {
    if (item.id === Number(req.params.id)) return newData
    else return item
  })(PLACEHOLDER_JSON_EXAMPLE)
  //against inmutability.. Just for example purpose
  PLACEHOLDER_JSON_EXAMPLE = newItem

  return res.status(200).json({
    message: newData,
  })
}

const deleteDataById = (req: Request, res: Response, next: NextFunction) => {
  const itemsWIthoutDeleted = filter(
    (item: IJSON_Example) => item.id !== Number(req.params.id)
  )(PLACEHOLDER_JSON_EXAMPLE)

  //against inmutability.. Just for example purpose
  PLACEHOLDER_JSON_EXAMPLE = itemsWIthoutDeleted
  return res.status(200).json({
    message: PLACEHOLDER_JSON_EXAMPLE,
  })
}

const createData = (req: Request, res: Response, next: NextFunction) => {
  const title: string = req.body.title ?? null
  const description: string = req.body.description ?? null

  const lastDataId =
    PLACEHOLDER_JSON_EXAMPLE[PLACEHOLDER_JSON_EXAMPLE.length - 1]?.id

  const newData: IJSON_Example = {
    id: lastDataId ? Number(lastDataId) + 1 : 1,
    title,
    description,
  }
  PLACEHOLDER_JSON_EXAMPLE.push(newData)
  return res.status(200).json({
    message: PLACEHOLDER_JSON_EXAMPLE,
  })
}

export { getAllData, getDataById, updateDataById, deleteDataById, createData }
