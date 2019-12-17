import dynamoose from "dynamoose";
import "../db";

const UserSchema = new dynamoose.Schema({
  email: {
    type: String,
    hashKey: true
  },
  passwd: {
    type: String,
    required: true
  },
  salt: String,
  purchase: Number,
  urls: [
    {
      name: String,
      url: String,
      deadLine: String
    }
  ]
});
const model = dynamoose.model("url_checker_users", UserSchema);

export default model;
