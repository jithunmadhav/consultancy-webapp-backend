import AWS from 'aws-sdk';
import fs from 'fs';
import formidable from 'formidable';
import { fileTypeFromBuffer } from 'file-type';

export const uploadFiles = async (req, res) => {
    try {
        const AWSCredentials = {
            accessKey: process.env.S3_ACCESS_KEY,
            secret: process.env.S3_SECRET_KEY,
            bucketName: process.env.S3_BUCKET,
        };

        const s3 = new AWS.S3({
            accessKeyId: AWSCredentials.accessKey,
            secretAccessKey: AWSCredentials.secret,
        });

        const uploadToS3 = async (file) => {
            const fileContent = fs.readFileSync(file?.filepath);
            const newFileName = `PetEye/${file?.originalFilename.replace(/\s/g, '')}`;
            const params = {
                Bucket: AWSCredentials.bucketName,
                Key: newFileName,
                Body: fileContent,
                ContentType: file?.mimetype,
            };

            return new Promise((resolve, reject) => {
                s3.upload(params, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    fs.unlinkSync(file.filepath);
                    const uploadData = `https://peteye-drive.s3.ap-south-1.amazonaws.com/${newFileName.replace(/\//g, '/')}`;
                    console.log(`File uploaded successfully. ${data.Location}`);
                    resolve(uploadData);
                });
            });
        };

        const ALLOWED_TYPES = ['application/pdf'];
        const MAX_SIZE = 3 * 1024 * 1024; // 5MB
        const formdata = new formidable.IncomingForm();

        formdata.parse(req, async (_, fields, files) => {
            try {
                const file = files?.file?.[0];
                const fileBuffer = fs.readFileSync(file?.filepath);

                // Check file size
                if (file?.size > MAX_SIZE) {
                    fs.unlinkSync(file?.filepath);
                    return res.json({
                        status: 400,
                        message: 'File size exceeds the limit of 5MB',
                    });
                }

                // Check file type
                const fileTypeInfo = await fileTypeFromBuffer(fileBuffer);
                const mimeType = fileTypeInfo ? fileTypeInfo.mime : file.mimetype;

                if (!ALLOWED_TYPES.includes(mimeType)) {
                    fs.unlinkSync(file?.filepath);
                    return res.json({
                        status: 400,
                        message: 'File type is not allowed. Only images and PDFs are accepted',
                    });
                }

                // Upload to S3
                const getUploadData = await uploadToS3(file);
                return res.json({
                    status: 200,
                    message: { getUploadData },
                });
            } catch (err) {
                return res.json({
                    status: 500,
                    message: err.message,
                });
            }
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

 
