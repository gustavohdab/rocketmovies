function Textarea({ ...rest }) {
  return (
    <textarea
      className=" w-full h-40 sm:h-48 md:h-56 lg:h-64 px-4 py-3 bg-INPUT_500 rounded-[10px] placeholder-GRAY_200 text-WHITE_100 focus:outline-none resize-none border-0"
      {...rest}
    />
  )
}

export default Textarea
