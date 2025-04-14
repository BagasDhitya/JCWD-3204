import multer from 'multer'

const storage = multer.memoryStorage() // untuk menyimpan file sebelum dilanjutkan ke cloudinary

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // maksimal file hanya 5MB
    },
    fileFilter: (req, file, cb: any) => {
        if (!file.mimetype.startsWith('application/pdf')) {
            return cb(new Error('Only pdf files are allowed'), false)
        }
        cb(null, true)
    }
})