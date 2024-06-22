import React from "react"
import { PasswordInput } from "../ui/password-input"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
const BasePasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <PasswordInput className={`input-class focus-visible:ring-offset-orange-1 bg-black-1 ${className}`} type={type} ref={ref} {...props}/>
  )
}) 

export default BasePasswordInput