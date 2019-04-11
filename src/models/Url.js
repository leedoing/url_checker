import dynamoose from "dynamoose";
import "../db";

const UrlSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  date: {
    type: String,
    rangeKey: true
  },
  aws_resolver: [],
  client_ip: String,
  connect_time: Number,
  header: String,
  http_code: Number,
  email: String,
  iso_code: String,
  namelookup_time: Number,
  pretransfer_time: Number,
  primary_ip: String,
  starttransfer_time: Number,
  total_time: Number,
  ttl: Number,
  url: String
});
const model = dynamoose.model("url_checker_urls", UrlSchema);

export default model;
