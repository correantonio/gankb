import React from 'react';
import { cn } from '@/lib/utils';

import { CheckCheck, X } from 'lucide-react';
const ListItem = ({ text, status = 'success', className}) => {
  const STATUS_CONFIG = {
    success: {
      Icon: CheckCheck,
      iconColor: 'text-gank-600__main',
    },
    error: {
      Icon: X,
      iconColor: 'text-gank-mutted-100',
    },
  };


  const { Icon, iconColor } = STATUS_CONFIG[status] || STATUS_CONFIG.success;

  return (
    <li className={cn('flex items-center gap-2', className)}>
      <Icon className={`${iconColor}`} width={24} height={24} strokeWidth={1.5} />
      <span>{text}</span>
    </li>
  );
};

export default ListItem;