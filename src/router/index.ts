import { Router } from 'express'
import authController from '../controllers/auth-controller'
import { EPaths, loginValidationRules } from './constants'

const router = Router()

router.post(
  EPaths.login,
  loginValidationRules,
  authController.login
)

router.post(
  EPaths.registration,
  loginValidationRules,
  authController.registration
)

router.get(EPaths.getUser, authController.getUser)

export default router
