import AWS from "aws-sdk";
// const ID = "QI6NZMF168674QVS1GIT";
// const SECRET = "XHv3hFZKfQANCTv83qSzsjDLP698hwR1VbVWIfFV";
// const BUCKET_NAME = "kernel";

const { ID, SECRET } = process.env;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  endpoint: "https://ap-south-1.linodeobjects.com",
});
export default s3;
