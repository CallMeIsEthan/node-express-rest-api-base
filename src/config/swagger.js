import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce Core API',
      version: '1.0.0',
      description:
        'Modular RESTful API for E-commerce platforms. Built with Node.js, Express, and MongoDB.',
      contact: {
        name: 'Technical Support',
        email: 'admin@yourdomain.com',
      },
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === 'production'
            ? process.env.PRODUCTION_URL || 'https://api.yourdomain.com'
            : `http://localhost:${process.env.PORT || 8000}`,
        description:
          process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token to access protected routes',
        },
      },
      schemas: {
        Address: {
          type: 'object',
          properties: {
            receiverName: { type: 'string' },
            receiverPhone: { type: 'string' },
            street: { type: 'string' },
            city: { type: 'string' },
            country: { type: 'string' },
            postalCode: { type: 'string' },
            isDefault: { type: 'boolean' },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            role: { type: 'string', enum: ['user', 'admin', 'deliveryman'] },
            avatar: { type: 'string' },
            isActive: { type: 'boolean' },
            isVerified: { type: 'boolean' },
            addresses: {
              type: 'array',
              items: { $ref: '#/components/schemas/Address' },
            },
            deletedAt: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { type: 'object' },
          },
        },
      },
      responses: {
        Unauthorized: {
          description: 'Access token is missing or invalid',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } },
        },
        Forbidden: {
          description: 'User does not have permission to access this resource',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } },
        },
        NotFound: {
          description: 'The requested resource was not found',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } },
        },
        BadRequest: {
          description: 'Invalid request data',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
}

const specs = swaggerJSDoc(options)
export { specs }
export default specs
