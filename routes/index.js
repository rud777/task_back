import express from 'express';
import users from './users';
import project from "./project";

const router = express.Router();

router.get('/',  (req, res, next) => {
  res.json({
    status: "ok"
  });
});


router.use('/users', users);
router.use('/project', project);

export default router;
