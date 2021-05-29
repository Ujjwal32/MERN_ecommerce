const cloudinary = require('cloudinary').v2
require('dotenv').config()


cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
  });
  //cloudinary.uploader.destroy('zombie', function(result) { console.log(result) }); zombie - public id
const Cloudinary = {
    upload: async (
      image,
      folder,
      { width, height }
    ) => {
      const res = await cloudinary.uploader.upload(image, {
        folder: `buy-it/${folder}`,
        transformation: { width, height, crop: "fill" },
        overwrite: true,
        invalidate: true,
      });
      return res.secure_url;
    },
  };
module.exports = Cloudinary