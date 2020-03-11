import { useContext } from 'react'
import moment from "moment";
import { FormatContext } from './useFormat'

export const DisplayTime = ({ time }: { time: string }) => {
  const { format } = useContext(FormatContext)
  return <>{moment(time, "hhmm").format(format)}</>
}
