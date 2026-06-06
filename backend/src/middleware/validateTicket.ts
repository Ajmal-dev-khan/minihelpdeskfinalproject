import { Request, Response, NextFunction } from 'express';

// ✅ ENGINEERING FEATURE: Frontend + Backend Validation
// This middleware validates ticket creation data on the backend

export const validateTicket = (req: Request, res: Response, next: NextFunction): void => {
  const { subject, description, priority } = req.body;
  const errors: { field: string; message: string }[] = [];

  // Validate subject
  if (!subject || typeof subject !== 'string' || subject.trim() === '') {
    errors.push({ field: 'subject', message: 'Subject is required' });
  } else if (subject.trim().length < 3) {
    errors.push({ field: 'subject', message: 'Subject must be at least 3 characters long' });
  } else if (subject.trim().length > 100) {
    errors.push({ field: 'subject', message: 'Subject cannot exceed 100 characters' });
  }

  // Validate description
  if (!description || typeof description !== 'string' || description.trim() === '') {
    errors.push({ field: 'description', message: 'Description is required' });
  } else if (description.trim().length < 10) {
    errors.push({ field: 'description', message: 'Description must be at least 10 characters long' });
  } else if (description.trim().length > 1000) {
    errors.push({ field: 'description', message: 'Description cannot exceed 1000 characters' });
  }

  // Validate priority
  const allowedPriorities = ['Low', 'Medium', 'High'];
  if (!priority || typeof priority !== 'string' || priority.trim() === '') {
    errors.push({ field: 'priority', message: 'Priority is required' });
  } else if (!allowedPriorities.includes(priority)) {
    errors.push({ field: 'priority', message: 'Priority must be Low, Medium, or High' });
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed. Please fix the errors below.',
      errors,
    });
    return;
  }

  next();
};

// Validate MongoDB ObjectId
export const validateObjectId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  const objectIdRegex = /^[a-fA-F0-9]{24}$/;

  if (!objectIdRegex.test(id)) {
    res.status(400).json({
      success: false,
      message: 'Invalid ticket ID format',
    });
    return;
  }

  next();
};
