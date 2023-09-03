/**
 * @swagger
 *  components:
 *    schemas:
 *      Blog:
 *        type: object
 *        required:
 *          - title
 *          - short_text
 *          - text
 *          - tags
 *          - category
 *          - image
 *        properties:
 *          title:
 *            type: string
 *            description: title of blog
 *          short_text:
 *            type: string
 *            description: summary of text blog
 *          text:
 *            type: string
 *            description: text of blog
 *          tags:
 *            type: string
 *            description: the list of tags for example tags1#tags2#tags3
 *          category:
 *            type: string
 *            description: id of category for foreignField in blog
 *          image:
 *            type: file
 *            description: index picture of blog
 */

/**
 * @swagger
 *  /admin/blog:
 *      get:
 *          tags: [Admin-Blogs]
 *          summary: get all Blogs
 *          responses:
 *              200:
 *                  description: success - get array f blogs
 */

/**
 * @swagger
 *  /admin/blog/add:
 *      post:
 *          tags: [Admin-Blogs]
 *          summary: create blog document
 *          requestBody:
 *            required: true
 *            content:
 *              multipart/form-data:
 *                schema:
 *                  $ref: '#/components/schemas/Blog'
 *          responses:
 *              200:
 *                  description: created
 */

/**
 * @swagger
 *  /admin/blog/update/{id}:
 *      patch:
 *          tags: [Admin-Blogs]
 *          summary: update blog document by id
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  type: string
 *                  example: tag1#tag2#tag3_foo#foo_bar
 *              -   in: formData
 *                  name: category
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  type: file
 *          responses:
 *              200:
 *                  description: updated
 */
/**
 * @swagger
 *  /admin/blog/{id}:
 *    get:
 *      tags: [Admin-Blogs]
 *      summary: get blog by id and populate.
 *      parameters:
 *        -   in: path
 *            name: id
 *            type: string
 *            required: true
 *      responses:
 *        200:
 *          description: success
 */

/**
 * @swagger
 *  /admin/blog/{id}:
 *    delete:
 *      tags: [Admin-Blogs]
 *      summary: remove blog by id
 *      parameters:
 *        -   in: path
 *            name: id
 *            type: string
 *            required: true
 *      responses:
 *        200:
 *          description: success
 */
