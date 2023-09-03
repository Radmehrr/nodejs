/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   courseId
 *                  -   title
 *              properties:
 *                  courseId:
 *                      type: string
 *                      example: 64ec9b4cf1590e9f495de344
 *                  title:
 *                      type: string
 *                      example: chapter 1 zero - hero javascript
 *                  text:
 *                      type: string
 *                      example: the describe about this chapter
 *          EditChapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: chapter 1 zero - hero javascript
 *                  text:
 *                      type: string
 *                      example: the describe about this chapter
 */

/**
 * @swagger
 *  definitions:
 *      chaptersOfCourseDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: 6279e994c1e47a98d0f356d3
 *                              title:
 *                                  type: string
 *                                  example: title of course
 *                              chapters:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                  example: [{_id: '6279e994c1e47a98d0f356d3', title: "title of chapter", text: "evvdvd"}]
 */

/**
 * @swagger
 *  /admin/chapter/add:
 *      put:
 *          tags: [Admin-Chapter]
 *          summary: create new chapter for course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/list/{courseID}:
 *      get:
 *          tags: [Admin-Chapter]
 *          summary: get Chapters of courses
 *          parameters:
 *              -   in: path
 *                  name: courseID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/chaptersOfCourseDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/remove/{chapterId}:
 *      patch:
 *          tags: [Admin-Chapter]
 *          summary: remove a Chapter by id
 *          parameters:
 *              -   in: path
 *                  name: chapterId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/chaptersOfCourseDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/update/{chapterId}:
 *      patch:
 *          tags: [Admin-Chapter]
 *          summary: update a Chapter by id
 *          parameters:
 *              -   in: path
 *                  name: chapterId
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/chaptersOfCourseDefinition'
 */
