import httpStatus from 'http-status'
import { createUser, loginUserWithEmail } from '../services/userService.js'
import catchAsync from '../utils/catchAsync.js'
import * as tokenService from '../services/tokenService.js'

const registerUser = catchAsync(async (req, res) => {
  const { name, password, email } = req.body
  const newUser = await createUser({ name, password, email })
  console.log(req.t('auth:register:success'))
  res.status(httpStatus.CREATED).json({
    success: true,
    message: req.t('auth:register:success'),
    data: newUser,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const user = await loginUserWithEmail(email, password)
  const tokens = await tokenService.generateAuthTokens(user)
  res.status(httpStatus.OK).json({
    success: true,
    message: req.t('auth:login:success'),
    data: { user, tokens },
  })
})

export { registerUser, loginUser }
