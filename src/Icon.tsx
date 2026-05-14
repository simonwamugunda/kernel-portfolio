import React from 'react'

type Props = {
  label: string
}

export default function Icon({ label }: Props) {
  return (
    <span aria-hidden className="text-sm font-bold">
      {label}
    </span>
  )
}

