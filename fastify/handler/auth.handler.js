import fastify from "../server.js";
import { User } from "../model/user.model.js";

export const registerHandler = async (req, reply) => {
  const { username, password, firstName, lastName } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    username,
    password: await fastify.bcrypt.hash(password),
  });

  await newUser.save();
  reply.json(newUser);
};
export const loginHandler = async (req, reply) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: { username },
  });
  if (!user) return reply.status(404).send({ message: "Not found any user!" });
  const compareResult = await fastify.bcrypt.compare(password, user.password);
  if (compareResult) {
    user.accessToken = fastify.jwt.sign({ username }, { expiresIn: "1m" });
    await user.save();
    reply.send({
      message: "logged in successFully",
      accessToken: user.accessToken,
    });
  }

  reply.status(404).send({
    message: "username or password is wrong!",
  });
  reply.json(newUser);
};
