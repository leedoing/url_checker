import dynamoose from "dynamoose";
import "../db";
import bkfd2Password from "pbkdf2-password";

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
  purchase: String,
  deadLine: Date,
  urls: [
    {
      name: String,
      url: String
    }
  ]
});
const model = dynamoose.model("url_checker_users", UserSchema);
// const user2 = {
//   email: "test@gscdn.com",
//   passwd: "dfdfaf"
// };
// const userField = new model(user2);
// userField.save();

UserSchema.methods.comparePassword = function(inputEmail, inputPassword, cb) {
  const hasher = bkfd2Password();
  if (inputEmail === this.email) {
    return hasher(
      { password: inputPassword, salt: this.salt },
      (err, pass, salt, hash) => {
        if (hash === this.passwd) {
          cb(null, true);
        } else {
          cb("err");
        }
      }
    );
  }
};

export default model;
