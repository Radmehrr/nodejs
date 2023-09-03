/**
 * @swagger
 *  /admin/user/list:
 *      get:
 *          tags: [Admin-User]
 *          summary: get all of Users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in user first_name, last_name, phone,username,email
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */

/**
 * @swagger
 *  /admin/user/profile:
 *      get:
 *          tags: [Admin-User]
 *          summary: get user profile
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateProfile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      example: Radmehr
 *                  last_name:
 *                      type: string
 *                      example: Dehghani
 *                  email:
 *                      type: string
 *                      example: Radmehr.co.pro@gmail.com
 *                  username:
 *                      type: string
 *                      example: Radmehr_D
 */

/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  first_name:
 *                                      type: string
 *                                      example: "user first_name"
 *                                  last_name:
 *                                      type: string
 *                                      example: "user last_name"
 *                                  username:
 *                                      type: string
 *                                      example: "username"
 *                                  email:
 *                                      type: string
 *                                      example: "the_user_email@example.com"
 *                                  mobile:
 *                                      type: string
 *                                      example: "09332255768"
 */

/**
 * @swagger
 *  /admin/user/update-profile:
 *      patch:
 *          tags: [Admin-User]
 *          summary: update user detail and profile
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateProfile'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateProfile'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
