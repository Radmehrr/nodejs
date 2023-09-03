/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseId
 *                  -   chapterId
 *                  -   text
 *                  -   video
 *                  -   title
 *                  -   type
 *              properties:
 *                  courseId:
 *                      type: string
 *                      example: 64ec9b4cf1590e9f495de344
 *                  chapterId:
 *                      type: string
 *                      example: 64ecc5ae3d01a0fe7c879112
 *                  title:
 *                      type: string
 *                      description: episode type (lock, open)
 *                      example: the title of this Episode
 *                  text:
 *                      type: string
 *                      description: episode type (lock, open)
 *                      example: the describe about this Episode
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   open
 *                          -   lock
 *                  video:
 *                      type: string
 *                      description: the file of video
 *                      format: binary
 *          EditEpisode:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: episode type (lock, open)
 *                      example: the title of this Episode
 *                  text:
 *                      type: string
 *                      description: episode type (lock, open)
 *                      example: the describe about this Episode
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   open
 *                          -   lock
 *                  video:
 *                      type: string
 *                      description: the file of video
 *                      format: binary
 */

/**
 * @swagger
 *  /admin/episode/add:
 *      post:
 *          tags: [Admin-Episode]
 *          summary: create new episode for course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
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
 *  /admin/episode/edit/{episodeId}:
 *      patch:
 *          tags: [Admin-Episode]
 *          summary: update episode of chapter
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: episodeId
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/EditEpisode'
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
 *  /admin/episode/remove/{episodeId}:
 *      delete:
 *          tags: [Admin-Episode]
 *          summary: remove episode By id
 *          parameters:
 *              -   in: path
 *                  name: episodeId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
