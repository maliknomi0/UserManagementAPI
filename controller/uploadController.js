const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|mp4|avi|mkv/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        return cb(null, extname && mimetype ? true : new Error('Only images and videos are allowed!'));
    }
}).single('file');

exports.uploadFile = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ status: 'failed', error: err.code === 'LIMIT_FILE_SIZE' ? 'File too large' : err.message });
        }

        if (!req.file) {
            return res.json({ status: 'failed', error: 'No file uploaded' });
        }

        try {
            const fileName = `${Date.now()}_${req.file.originalname}`;
            const uploadDir = path.join(__dirname, '../uploads');
            const filePath = path.join(uploadDir, fileName);
            const isImage = req.file.mimetype.startsWith('image');

            if (isImage) {
                await sharp(req.file.buffer).jpeg({ quality: 70 }).toFile(filePath);
            } else {
                fs.writeFileSync(filePath, req.file.buffer);
            }

            const fileUrl = `${fileName}`;
            res.json({ status: 'success', data: fileUrl });
        } catch (fileError) {
            res.json({ status: 'failed', error: fileError.message });
        }
    });
};
