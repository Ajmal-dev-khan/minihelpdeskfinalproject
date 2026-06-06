import { Router } from 'express';
import { getTickets, createTicket, deleteTicket } from '../controllers/ticketController';
import { validateTicket, validateObjectId } from '../middleware/validateTicket';

const router = Router();

// GET  /tickets?limit=5   → Fetch tickets with limit (Product Feature)
router.get('/', getTickets);

// POST /tickets            → Create ticket (with validation middleware)
router.post('/', validateTicket, createTicket);

// DELETE /tickets/:id      → Delete single ticket (with ID validation)
router.delete('/:id', validateObjectId, deleteTicket);

export default router;
