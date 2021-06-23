import { Router } from 'express'
import appController from '../controllers/app-controller'
import authController from '../controllers/auth-controller'
import { EPaths, loginValidationRules } from './constants'

const router = Router()

router.post(EPaths.login, loginValidationRules, authController.login)

router.post(EPaths.registration, loginValidationRules, authController.registration)

router.get(EPaths.getUser, appController.getUser)

router.get(EPaths.getAppData, appController.getAppData)

export default router
