import { useCallback } from 'react'
import { AiOutlineMinus } from 'react-icons/ai'

interface CounterProps {
  title: string
  subtitle: string
  value: number
  onChange: (value: number) => void
}

export const Counter = ({ title, subtitle, value, onChange }: CounterProps) => {
  const handleAdd = useCallback(() => {
    onChange(value + 1)
  }, [value, onChange])

  const handleReduce = useCallback(() => {
    if (value === 1) return

    onChange(value - 1)
  }, [value, onChange])

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
          onClick={handleReduce}
        >
          <AiOutlineMinus />
        </div>

        <div className="font-light text-xl text-neutral-600">{value}</div>

        <div
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
          onClick={handleAdd}
        >
          <AiOutlineMinus />
        </div>
      </div>
    </div>
  )
}
