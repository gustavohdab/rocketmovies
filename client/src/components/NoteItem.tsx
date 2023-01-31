import React from "react"
import { FiPlus, FiX } from "react-icons/fi"

interface NoteItemProps {
  isNew?: boolean
  value?: string
  onClick?: () => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

function NoteItem({ isNew, value, onClick, onChange, ...rest }: NoteItemProps) {
  return (
    <div
      className={`
      flex items-center rounded-lg m-4
      ${isNew ? "bg-transparent" : "bg-INPUT_500"}
      text-GRAY_300
      ${isNew ? "border-2 border-GRAY_200 border-dashed " : "border-none"}
    `}
    >
      <input
        type="text"
        value={value}
        readOnly={!isNew}
        onChange={onChange}
        {...rest}
        className="h-10 sm:h-12 md:h-14 lg:h-16 w-full flex flex-wrap p-3 bg-transparent text-WHITE placeholder-GRAY_300 focus:outline-none capitalize"
      />

      <button
        type="button"
        onClick={onClick}
        className="border-none bg-none m-4 text-PINK text-2xl"
      >
        {isNew ? <FiPlus /> : <FiX />}
      </button>
    </div>
  )
}

export default NoteItem
