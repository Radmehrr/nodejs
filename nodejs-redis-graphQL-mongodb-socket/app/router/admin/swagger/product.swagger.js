/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: array
 *              items:
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان محصول
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
 *                      description: the title of product
 *                  category:
 *                      type: string
 *                      description: the title of product
 *                      example: 64e762e80266b14f21b5230c
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                      example: 20
 *                  count:
 *                      type: string
 *                      description: the title of product
 *                      example: 100
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                      example: 0
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                      example: 0
 *                  width:
 *                      type: string
 *                      description: the with of product packet
 *                      example: 0
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                      example: 0
 *                  type:
 *                      type: string
 *                      description: the type of product
 *                      example: virtual - physical
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 *
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Product:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان محصول
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
 *                      description: the title of product
 *                  category:
 *                      type: string
 *                      description: the title of product
 *                      example: 64e762e80266b14f21b5230c
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                      example: 20
 *                  count:
 *                      type: string
 *                      description: the title of product
 *                      example: 100
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                      example: 0
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                      example: 0
 *                  width:
 *                      type: string
 *                      description: the with of product packet
 *                      example: 0
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                      example: 0
 *                  type:
 *                      type: string
 *                      description: the type of product
 *                      example: virtual - physical
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 *
 */

/**
 * @swagger
 *  /admin/product/add:
 *      post:
 *          tags: [Admin-Product]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: created new product
 */

/**
 * @swagger
 *  /admin/product/edit/{id}:
 *      patch:
 *          tags: [Admin-Product]
 *          summary: create and save product
 *          parameters:
 *            - in: path
 *              name: id
 *              type: string
 *              required: true
 *              description: id of product for update
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Product'
 *          responses:
 *              201:
 *                  description: created new product
 */

/**
 * @swagger
 *  /admin/product/remove/{id}:
 *    delete:
 *      tags: [Admin-Product]
 *      summary: delete one product
 *      parameters:
 *        - in: path
 *          type: string
 *          name: id
 *          required: true
 *          example: 64ec4857cc6872bd8b61ca24
 *      responses:
 *        200:
 *          description: success
 */

/**
 * @swagger
 *  /admin/product/list:
 *      get:
 *          tags: [Admin-Product]
 *          summary: get all products
 *          parameters:
 *            - in: query
 *              name: search
 *              type: string
 *              description: text for search in title and short text and text of products
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/product/{id}:
 *    get:
 *      tags: [Admin-Product]
 *      summary: get one product
 *      parameters:
 *        - in: path
 *          type: string
 *          name: id
 *          required: true
 *          example: 64ec4857cc6872bd8b61ca24
 *      responses:
 *        200:
 *          description: success
 */
