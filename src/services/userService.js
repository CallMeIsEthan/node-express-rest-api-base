import httpStatus from 'http-status'

import ApiError from '../utils/ApiError.js'

import User from './../models/userModel.js'

const getUsers = async (filter, options) => {
  const users = await User.find(filter, null, options)
  return users
}
// getUserById(userId)
const createUser = async (userData) => {
  const userExists = await User.findOne({ email: userData.email })
  if (userExists) {
    throw new ApiError(httpStatus.CONFLICT, 'auth:register.emailExists')
  }
  const newUser = await User.create(userData)
  newUser.password = undefined
  return newUser
}

const loginUserWithEmail = async (email, password) => {
  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'auth:login.failed')
  }
  user.password = undefined
  return user
}
// updateUser(userId, updateData)
// softDeleteUser(userId)
// restoreUser(userId)
// addUserAddress(userId, addressData)
// updateUserAddress(userId, addressId, updateData)
// removeUserAddress(userId, addressId)
// setDefaultAddress(userId, addressId)
// updateUserProfile(userId, profileData)
// changeUserPassword(userId, oldPassword, newPassword)
// updateLastLogin(userId)
// addToWishlist(userId, productId)
// removeFromWishlist(userId, productId)
export { getUsers, createUser, loginUserWithEmail }
