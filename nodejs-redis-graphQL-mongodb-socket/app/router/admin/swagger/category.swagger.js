/**
 * @swagger
 *  components:
 *    schemas:
 *      Category:
 *        type: object
 *        required:
 *          - title
 *        properties:
 *          title:
 *            type: string
 *            description: title of category
 *          parent:
 *            type: string
 *            description: parent of category
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-Category]
 *          summary: create new category title
 *          requestBody:
 *            required: true
 *            content:
 *              application/x-www-form-urlencoded:
 *                schema:
 *                  $ref: '#/components/schemas/Category'
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Category'
 *          responses:
 *              201:
 *                  description: success
 *
 */

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin-Category]
 *          summary: get all parents of categories
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Admin-Category]
 *          summary: get all parents of categories
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: parent
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Admin-Category]
 *          summary: get all categories
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin-Category]
 *          summary: delete category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Admin-Category]
 *          summary: get all categories without populate and nested stracture
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Admin-Category]
 *          summary: find category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Admin-Category]
 *          summary: update category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *            required: true
 *            content:
 *              application/x-www-form-urlencoded:
 *                schema:
 *                  $ref: '#/components/schemas/Category'
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Category'
 *          responses:
 *              200:
 *                  description: success
 */
