import jwt from 'jsonwebtoken'
import moment from 'moment'
import Token from '../models/tokenModel.js'

const generateToken = (id, expires, type, secret = process.env.JWT_SECRET) => {
  const payload = {
    id,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  }
  return jwt.sign(payload, secret)
}

const saveToken = async (token, id, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: id,
    expires: expires.toDate(),
    type,
    blacklisted,
  })
  return tokenDoc
}

export const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes')
  const accessToken = generateToken(user._id, accessTokenExpires, 'ACCESS')

  const refreshTokenExpires = moment().add(process.env.JWT_REFRESH_EXPIRATION_DAYS, 'days')
  const refreshToken = generateToken(user._id, refreshTokenExpires, 'REFRESH')

  await saveToken(refreshToken, user._id, refreshTokenExpires, 'REFRESH')

  return {
    access: { token: accessToken, expires: accessTokenExpires.toDate() },
    refresh: { token: refreshToken, expires: refreshTokenExpires.toDate() },
  }
}

export const generateResetPasswordToken = async (user) => {
  const expires = moment().add(10, 'minutes')
  const resetToken = generateToken(user._id, expires, 'RESET_PASSWORD')
  await saveToken(resetToken, user._id, expires, 'RESET_PASSWORD')
  return resetToken
}
