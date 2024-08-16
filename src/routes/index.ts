import { Router, Request, Response } from 'express';


const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Bootcamp Backend API');
   
  
});


export default router;