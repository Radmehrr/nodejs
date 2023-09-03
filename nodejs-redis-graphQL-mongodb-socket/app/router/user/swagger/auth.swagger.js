/**
 * @swagger
 *  components:
 *    schemas:
 *      GetOTP:
 *        type: object
 *        required:
 *          - phone
 *        properties:
 *          phone:
 *            type: string
 *            description: the user phone for signin/signup
 *      CheckOTP:
 *        type: object
 *        required:
 *          - phone
 *          - code
 *        properties:
 *          phone:
 *            type: string
 *            description: the user phone for signin/signup
 *          code:
 *            type: integer
 *            description: received code from GetOTP
 *      RefreshToken:
 *        type: object
 *        required:
 *          - refreshToken
 *        properties:
 *          refreshToken:
 *            type: string
 *            description: enter refresh token
 */

/**
 * @swagger
 * tags:
 *  name: User-Authentication
 *  description: user auth section
 */

/**
 * @swagger
 *  /user/getOtp:
 *    post:
 *      tags: [User-Authentication]
 *      summary: login user with phone number
 *      description: one time password(OTP) login
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/GetOTP'
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetOTP'
 *      responses:
 *        201:
 *          description: Success
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorization
 *        500:
 *          description: InternalServerError
 */

/**
 * @swagger
 *  /user/checkOtp:
 *    post:
 *      tags: [User-Authentication]
 *      summary: check otp value is user controller
 *      description: check one time password with phone and expire date
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/CheckOTP'
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CheckOTP'
 *      responses:
 *        201:
 *           description: Success
 *        400:
 *           description: Bad Request
 *        401:
 *           description: Unauthorization
 *        500:
 *           description: InternalServerError
 */

/**
 * @swagger
 *  /user/refresh-token:
 *    post:
 *      tags: [User-Authentication]
 *      summary: send refresh token for get new token
 *      description: refresh token
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/RefreshToken'
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RefreshToken'
 *      responses:
 *        200:
 *          description: success
 *
 */
