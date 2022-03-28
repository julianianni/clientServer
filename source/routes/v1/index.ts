/** source/routes/posts.ts */
import express from 'express'
import {
  getAllData,
  getDataById,
  updateDataById,
  deleteDataById,
  createData,
} from '../../controllers/posts'
const router = express.Router()

router.get('/v1/posts', getAllData)

router.get('/v1/posts/:id', getDataById)
router.put('/v1/posts/:id', updateDataById)
router.delete('/v1/posts/:id', deleteDataById)
router.post('/v1/posts', createData)

export = router
