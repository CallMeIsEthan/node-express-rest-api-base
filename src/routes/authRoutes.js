import express from 'express'

import { registerUser, loginUser } from '../controllers/authController.js'
import validate from '../middlewares/validateMiddleware.js'
import { createUserSchema, loginSchema } from '../validations/userValidation.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication and account access
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with name, email, and password.
 *     tags:
 *       - Auth
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: Secret123
 *               role:
 *                 type: string
 *                 description: Optional. If omitted, defaults to "user".
 *                 example: user
 *     responses:
 *       '201':
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '409':
 *         description: Conflict - Email already exists.
 */
router.post('/register', validate(createUserSchema), registerUser)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     description: Authenticate a user with email and password, returning user info and JWT tokens.
 *     tags:
 *       - Auth
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Secret123
 *     responses:
 *       '200':
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         user:
 *                           $ref: '#/components/schemas/User'
 *                         tokens:
 *                           type: object
 *                           properties:
 *                             access:
 *                               type: object
 *                               properties:
 *                                 token:
 *                                   type: string
 *                                 expires:
 *                                   type: string
 *                                   format: date-time
 *                             refresh:
 *                               type: object
 *                               properties:
 *                                 token:
 *                                   type: string
 *                                 expires:
 *                                   type: string
 *                                   format: date-time
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post('/login', validate(loginSchema), loginUser)

export default router
