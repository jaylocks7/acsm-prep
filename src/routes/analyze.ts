import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { saveAnalysis, getAllAnalyses } from '../services/database';

const router = Router();

// POST will take a field in the req body called 'filePath'
router.post('/',
  body('filePath')
    .exists().withMessage('filePath is required').bail()
    .notEmpty().withMessage('filePath cannot be empty').bail()
    .isString().withMessage('filePath must be a  string').bail()
    .custom((value) => {
      const validExtensions = ['.ts', '.js'];
      const hasValidExtension = validExtensions.some(ext => value.endsWith(ext));
      if (!hasValidExtension) {
        throw new Error('filePath must end with .ts or .js');
      }
      return true;
    }),
  (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const filePath = req.body.filePath;
  //res.send("Hello from Express!")
  console.log('Received filePath: ' + filePath);
  const analysisId = saveAnalysis(filePath, {
    lineCount: 0,
    functions: [],
    imports: [],
    issues: []
  });
  console.log('Saved analysis with ID: ' + analysisId);
  return res.status(201).json({ 
    id: analysisId,
    filePath: filePath,
    message: 'Analysis saved successfully' 
});
})

router.get('/', (_req, res) => {
    const analyses = getAllAnalyses();
    return res.status(200).json(analyses);
});

export default router;