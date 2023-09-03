/**
 * @swagger
 *  components:
 *      schemas:
 *          Permissions:
 *              type: string
 *              enum:
 *                -   blog
 *                -   course
 *                -   product
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Permission:
 *        type: object
 *        required:
 *          - name
 *          - description
 *        properties:
 *          name:
 *            type: string
 *            description: name of permission
 *          description:
 *            type: string
 *            description: describe of permission
 *      EditPermission:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: name of permission
 *          description:
 *            type: string
 *            description: describe of permission
 */

/**
 * @swagger
 *  /admin/permission/add:
 *      post:
 *          tags: [Admin-RBAC]
 *          summary: create and save Permission
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Permission'
 *          responses:
 *              201:
 *                  description: created new Course
 */

/**
 * @swagger
 *  /admin/permission/list:
 *      get:
 *          tags: [Admin-RBAC]
 *          summary: get all permission
 *          responses:
 *              200:
 *                  description: get all permission
 */

/**
 * @swagger
 *  /admin/permission/update/{id}:
 *      patch:
 *          tags: [Admin-RBAC]
 *          summary: edit and save permission
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditPermission'
 *          responses:
 *              201:
 *                  description: created new Course
 */

/**
 * @swagger
 *  /admin/permission/remove/{id}:
 *      delete:
 *          tags: [Admin-RBAC]
 *          summary: remove Permission
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          responses:
 *              200:
 *                  description: created new Course
 */
