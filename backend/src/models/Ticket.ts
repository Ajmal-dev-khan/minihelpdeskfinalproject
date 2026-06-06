import mongoose, { Document, Schema } from 'mongoose';

export interface ITicket extends Document {
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: Date;
}

const ticketSchema = new Schema<ITicket>(
  {
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      minlength: [3, 'Subject must be at least 3 characters long'],
      maxlength: [100, 'Subject cannot exceed 100 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters long'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      trim: true,
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: 'Priority must be one of: Low, Medium, High',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['Open', 'In Progress', 'Closed'],
        message: 'Status must be one of: Open, In Progress, Closed',
      },
      default: 'Open',
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: false },
  }
);

export default mongoose.model<ITicket>('Ticket', ticketSchema);
