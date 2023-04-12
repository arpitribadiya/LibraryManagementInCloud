const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const AWS = require('aws-sdk');

  
exports.get_aws_secret = async (request, response) => {
  try {

    var client = new AWS.SecretsManager({
        accessKeyId: 'AKIAQHAP7NSQXO7ZR4P2',
        secretAccessKey: 'Lhy3cAHbdl4PTCV40z0FsCM5vtbc6dyK9z2H+ksK',
        region: 'us-east-1' // Your region
    });
    var secret, decodedBinarySecret;
    client.getSecretValue({
        SecretId: 'ArpitCloudProjectSecret'
    }, function(err, data) {
        if (err) {
            if (err.code === 'DecryptionFailureException')
                throw err;
            else if (err.code === 'InternalServiceErrorException')
                throw err;
            else if (err.code === 'InvalidParameterException')
                throw err;
            else if (err.code === 'InvalidRequestException')
                throw err;
            else if (err.code === 'ResourceNotFoundException')
                throw err;
        } else {
            if ('SecretString' in data) {
                secret = data.SecretString;
                const result = JSON.parse(secret);

                fs.appendFileSync('.env', `Admin_Email_ID=${result.TestSecretKey}`);
                
            } else {
                let buff = new Buffer(data.SecretBinary, 'base64');
                decodedBinarySecret = buff.toString('ascii');
            }
        }
        const result = JSON.parse(secret);
        return response.status(200).json({
            message: result.TestSecretKey
          });
    });

   
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};



exports.post_upload_img_to_s3 =  async (request, response) => {
    try{
      AWS.config.update({region: 'us-east-1'});

      const s3 = new AWS.S3({ credentials:{
        accessKeyId: 'AKIAQHAP7NSQXO7ZR4P2',
        secretAccessKey: 'Lhy3cAHbdl4PTCV40z0FsCM5vtbc6dyK9z2H+ksK'
      } 
      });

      const uploadParams = {
        Bucket: 'arpitcloudprojectfinal',
        Key: 'example.jpg',
        Body: fs.createReadStream('./assets/example.jpg'),
        ACL: 'public-read'
      };

      let return_val;
      
      s3.upload(uploadParams, function (err, data) {
        if (err) {
          console.log("Error uploading image:", err);
          return response.json({
            message:  "Error occured in image upload"
        })
        } else {
          return_val = data.Location;
          console.log(return_val);
          console.log("Image uploaded successfully. URL:", data.Location);

          return response.json({
            message:  data.Location
          })
        }
    });
    } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};