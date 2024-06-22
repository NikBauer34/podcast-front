import React from "react";
import { cn } from "../lib/utils";
import { Input } from "../ui/input";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <Input className={`input-class focus-visible:ring-offset-orange-1 bg-black-1 ${className}`} type={type} ref={ref} {...props}/>
  )
}) 

export default BaseInput