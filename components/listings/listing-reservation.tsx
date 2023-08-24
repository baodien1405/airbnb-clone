'use client'

import { Range } from 'react-date-range'
import { Calendar } from '../inputs'
import { Button } from '../button'

interface ListingReservationProps {
  price: number
  totalPrice: number
  dateRange: Range
  disabled: boolean
  disableDates: Date[]
  onChangeDate: (value: Range) => void
  onSubmit: () => void
}

export const ListingReservation = ({
  price,
  totalPrice,
  dateRange,
  disabled,
  disableDates,
  onChangeDate,
  onSubmit
}: ListingReservationProps) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>

      <hr />

      <Calendar
        value={dateRange}
        disabledDates={disableDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <hr />

      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>

      <hr />

      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  )
}
