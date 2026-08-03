import React from 'react'
import { cn } from '@/lib/utils'
import Badge from './Badge'
import TypeH2 from '../typography/TypeH2Wrapper'

const SectionHeader = ({badgeIcon, badgeLabel, title, label, className}) => {
  return (
    <header className={cn('mb-10 lg:mb-20', className)}>
      <Badge icon={badgeIcon}>{badgeLabel}</Badge>
      <TypeH2 className="mb-2">{title}</TypeH2>
      <p>{label}</p>
    </header>
  )
}

export default SectionHeader
