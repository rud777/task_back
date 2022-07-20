import express from 'express';
import users from './users';
import project from "./project";
import taskes from "./taskes";

const router = express.Router();

router.get('/',  (req, res, next) => {
  res.json({
    status: "ok"
  });
});


router.use('/users', users);
router.use('/project', project);
router.use('/taskes', taskes);

export default router;
