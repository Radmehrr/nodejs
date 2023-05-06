const path = require("path");
const { ConversationModel } = require("../model/conversation");
class roomController {
  async addRoom(req, res, next) {
    try {
      const { name, description, namespace } = req.body;
      //   await this.findRoomWithName(name);
      const room = { name, description };
      const conversation = await ConversationModel.updateOne(
        {
          endpoint: namespace,
        },
        {
          $push: {
            rooms: room,
          },
        }
      );
      return res.status(200).json({ conversation });
    } catch (error) {
      next(error);
    }
  }
  async getRoomList(req, res, next) {
    try {
      const conversation = await conversationModel.find({}, { rooms: 1 });
      return res.status(200).json({ rooms: conversation.rooms });
    } catch (error) {
      next(error);
    }
  }

  async findRoomWithName(name) {
    const conversation = await ConversationModel.findOne({
      "rooms.name": name,
    });
    if (conversation) throw { message: "this name already used" };
  }
}

module.exports = {
  roomController: new roomController(),
};
