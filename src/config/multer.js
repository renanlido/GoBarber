/** TODO  Imagens de avatar */
import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  /** NOTE Poderia usar qualquer storage, CDN, Amazon etc, vamos armazenar no
   * storage do multer por enquanto.
   */
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
