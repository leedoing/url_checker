import dynamoose from "dynamoose";
import "../db";

const UserSchema = new dynamoose.Schema({
  email: {
    type: String,
    hashKey: true
  },
  purchase: String,
  deadLine: Date,
  urls: [
    {
      name: String,
      url: String
    }
  ]
});

const model = dynamoose.model("User", UserSchema);
const test = new model({ email: "dfdf@na.com" });
export default model;
