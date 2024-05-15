import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("Destination:", "public/images/");
      cb(null, "public/images/");
    },
    filename: (req, file, cb) => {
      console.log("File:", file, "IMAGE DETAILS");
      cb(null, Date.now() + file.originalname);
    },
  });
  
  // Create multer instance
  export const upload = multer({
    storage: storage
  });