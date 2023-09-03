/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                -   cash
 *                -   special
 *                -   free
 */

/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      example: "64ec9b4cf1590e9f495de344"
 *                  title:
 *                      type: string
 *                      example: "title of course"
 *                  short_text:
 *                      type: string
 *                      example: "summary of course"
 *                  text:
 *                      type: string
 *                      example: "text and describe of course"
 *                  status:
 *                      type: string
 *                      example: "notStarted | completed | Holding"
 *                  price:
 *                      type: integer
 *                      example: 250000
 *                  time:
 *                      type: string
 *                      example: "01:22:34"
 *                  discount:
 *                      type: integer
 *                      example: 20
 *                  studentCount:
 *                      type: integer
 *                      example: 140
 *                  teacher:
 *                      type: string
 *                      example: Radmehr Dehghani
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان دوره
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلد تستی
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  category:
 *                      type: string
 *                      description: the category id of course
 *                      example: 64e74a54e77d8e9543f031e7
 *                  price:
 *                      type: string
 *                      description: the price of course
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the discount of course
 *                      example: 20
 *                  image:
 *                      type: string
 *                      format: binary
 *                  type:
 *                      $ref: '#/components/schemas/Types'
 *          UpdateCourse:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان دوره
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلد تستی
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  category:
 *                      type: string
 *                      description: the category id of course
 *                      example: 64e74a54e77d8e9543f031e7
 *                  price:
 *                      type: string
 *                      description: the price of course
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the discount of course
 *                      example: 20
 *                  image:
 *                      type: string
 *                      format: binary
 *                  type:
 *                      $ref: '#/components/schemas/Types'
 *
 */

/**
 * @swagger
 *  /admin/course/list:
 *      get:
 *          tags: [Admin-Course]
 *          summary: get all of courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in course text, title, short_text
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
 *  /admin/course/add:
 *      post:
 *          tags: [Admin-Course]
 *          summary: create and save course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *          responses:
 *              201:
 *                  description: created new Course
 */

/**
 * @swagger
 *  /admin/course/update/{id}:
 *      patch:
 *          tags: [Admin-Course]
 *          summary: update and save course
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  reuired: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateCourse'
 *          responses:
 *              201:
 *                  description: created new Course
 */

/**
 * @swagger
 *  /admin/course/{id}:
 *      get:
 *          tags: [Admin-Course]
 *          summary: get one course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  example: 64ec9c9e54ac68a1c8558978
 *                  description: find course by id
 *          responses:
 *              200:
 *                  description: success
 */
