import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import type { Ticket, User } from '../types';

interface Props {
  ticket: Ticket;
  creator?: User | undefined;
  pos: { top: number; left: number };
  onClose?: () => void;
}

const TicketPopover: React.FC<Props> = ({ ticket, creator, pos, onClose }) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const el = (
    <div
      style={{ position: 'absolute', top: pos.top, left: pos.left, zIndex: 9999 }}
      className="w-80 bg-white border border-gray-200 rounded shadow-lg p-3 text-sm"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-900">{ticket.title}</div>
          <div className="text-xs text-gray-500">ID: {ticket.id} • Priority: {ticket.priority}</div>
        </div>
      </div>
      <div className="mt-2 text-gray-700">{ticket.description}</div>
      <div className="mt-3 text-xs text-gray-500">Created by: {creator?.name || 'Unknown'}</div>
    </div>
  );

  return ReactDOM.createPortal(el, document.body);
};

export default TicketPopover;
