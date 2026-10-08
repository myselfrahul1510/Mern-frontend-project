import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

vi.mock('./services/taskService', () => ({
  default: {
    healthCheck: vi.fn().mockResolvedValue({ success: true }),
    getAllTasks: vi.fn().mockResolvedValue({ data: [] }),
    createTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
  },
}));

describe('MERN Task Manager', () => {
  it('renders the application header', async () => {
    render(<App />);
    expect(screen.getByText('MERN Task Manager')).toBeInTheDocument();
  });

  it('renders the create task form', async () => {
    render(<App />);
    expect(screen.getByText('Create New Task')).toBeInTheDocument();
    expect(screen.getByTestId('title-input')).toBeInTheDocument();
  });
});