import { Router } from 'express';
import { body, validationResult } from 'express-validator';

const router = Router();

// POST will take a field in the req body called 'filePath'
router.post('/', 
  body('filePath')
    .exists().withMessage('filePath is required').bail()
    .notEmpty().withMessage('filePath cannot be empty').bail()
    .isString().withMessage('filePath must be a  string').bail(),
  (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const filePath = req.body.filePath;
  //res.send("Hello from Express!")
  console.log('Received filePath: ' + filePath);
  return res.end();
})

export default router;