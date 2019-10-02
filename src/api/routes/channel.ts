import { Router, Request, Response } from 'express';
import { createChannel, deleteChannel, getAllPosts, getChannelById } from '../controllers/ChannelController';
const router: Router = Router();

router.post('/new', createChannel);
router.delete('/:id', deleteChannel);
router.get('/:id', getChannelById);
router.get('/', getAllPosts);

export const ChannelRouter: Router = router;
