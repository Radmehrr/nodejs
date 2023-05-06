const { ConversationModel } = require("../model/conversation");

class NamespaceController {
  async addNamespace(req, res, next) {
    try {
      const { title, endpoint } = req.body;
      console.log(title, endpoint);
      //   await this.findNamespaceWithEndpoint(endpoint);
      const conversation = await ConversationModel.create({ title, endpoint });

      return res.status(200).json({ conversation });
    } catch (error) {
      next(error);
    }
  }
  async getNamespacesList(req, res, next) {
    try {
      const conversation = await conversationModel.find({}, { rooms: 0 });
      return res.status(200).json({ conversation });
    } catch (error) {
      next(error);
    }
  }
  async findNamespaceWithEndpoint(endpoint) {
    const conversation = await ConversationModel.findOne({ endpoint });
    if (conversation) throw { message: "this endpoint already used" };
    return conversation;
  }
}

module.exports = {
  NamespaceController: new NamespaceController(),
};
