import { Request, Response } from 'express';
import Ticket from '../models/Ticket';

// ─────────────────────────────────────────────
// GET /tickets?limit=5|10|20
// PRODUCT FEATURE: Limit Items by Number
// ─────────────────────────────────────────────
export const getTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const allowedLimits = [5, 10, 20];
    const requestedLimit = parseInt(req.query.limit as string);

    // Validate the limit value — only 5, 10, 20 are accepted
    const limit = allowedLimits.includes(requestedLimit) ? requestedLimit : 10;

    const totalCount = await Ticket.countDocuments();

    const tickets = await Ticket.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: tickets.length,
      totalCount,
      limit,
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch tickets.',
    });
  }
};

// ─────────────────────────────────────────────
// POST /tickets
// ENGINEERING FEATURE: Backend Validation
// ─────────────────────────────────────────────
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subject, description, priority } = req.body;

    // Note: validation middleware already ran before this
    // This is a secondary layer at the DB model level
    const ticket = new Ticket({
      subject: subject.trim(),
      description: description.trim(),
      priority,
      status: 'Open',
    });

    const savedTicket = await ticket.save();

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully!',
      ticket: savedTicket,
    });
  } catch (error: any) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => ({
        field: err.path,
        message: err.message,
      }));
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Could not create ticket.',
    });
  }
};

// ─────────────────────────────────────────────
// DELETE /tickets/:id
// BASE REQUIREMENT
// ─────────────────────────────────────────────
export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: 'Ticket not found. It may have already been deleted.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Ticket "${ticket.subject}" deleted successfully.`,
      deletedTicket: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Could not delete ticket.',
    });
  }
};
