
import { useState, createContext } from 'react'

export enum Format {
  HH = "HH:mm",
  hh = "h:mma"
}
export const FormatContext = createContext({ format: Format.HH })

export const useFormat = () => {
  const [format, setFormat] = useState(Format.HH)
  const changeFormat = () => {
    setFormat((prevFormat) => prevFormat === Format.HH ? Format.hh : Format.HH)
  }
  return { changeFormat, format }
}

