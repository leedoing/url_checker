import dynamoose from "dynamoose";
import dotenv from "dotenv";

dotenv.config();

const createDynamooseInstance = () => {
  dynamoose.AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
    region: "ap-northeast-2"
  });
};

// const createAndGetCat = async () => {
//   const Cat = dynamoose.model("Cat", { id: Number, name: String });
//   const garfield = new Cat({ id: 6156, name: "Garfield" });
//   await garfield.save();
//   const badCat = await Cat.get(666);
//   return badCat;
// };

const bootStrap = async () => {
  createDynamooseInstance();
  // const badCat = await createAndGetCat();
  // console.log("Never trust a smiling cat. - " + badCat.name);
};

bootStrap();
