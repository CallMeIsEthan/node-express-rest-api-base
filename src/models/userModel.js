import crypto from 'node:crypto'

import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import USER_ROLES from '../constants/roles.js'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/da06cl33e/image/upload/v1769907509/user_riubgs.jpg',
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: [],
      },
    ],
    addresses: [
      {
        receiverName: {
          type: String,
          required: true,
          trim: true,
        },
        receiverPhone: {
          type: String,
          required: true,
          trim: true,
        },
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
      },
    ],
    lastLoginAt: Date,
  },
  {
    timestamps: true,
  }
)

// --- Methods ---

// Unique index on email, ignoring soft-deleted users
userSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null }, name: 'unique_active_email_index' }
)

// Exclude soft-deleted users from queries by default
userSchema.pre(/^find/, function (next) {
  this.find({ deletedAt: null })
  next()
})

// Methods for soft delete
userSchema.methods.softDelete = async function () {
  this.deletedAt = new Date()
  return await this.save()
}

// Method to restore soft-deleted user
userSchema.methods.restore = async function () {
  this.deletedAt = null
  return await this.save()
}

// Check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// --- Middlewares (Hooks) ---

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Automatically handle unique default address
userSchema.pre('save', async function (next) {
  if (this.isModified('addresses')) {
    const defaultAddress = this.addresses.find((addr) => addr.isDefault)
    if (defaultAddress) {
      this.addresses.forEach((addr) => {
        if (addr !== defaultAddress) addr.isDefault = false
      })
    }
  }
  next()
})

const User = mongoose.model('User', userSchema)
export default User
