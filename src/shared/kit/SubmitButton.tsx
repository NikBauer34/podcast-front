import { Loader } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";
import React from "react";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps & {loading: boolean, text: string, submitText: string}>(({ className, variant, size, asChild = false, loading, text, submitText, ...props }, ref) => {
  return (
    <Button type="submit" className={`text-16 bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-300 hover:bg-black-1 ${className}`} {...props}>
      {loading ? (
        <>
          {submitText}
          <Loader size={20} className="animate-spin ml-2" />
        </>
        ) : (
          <>{text}</>
        )}
    </Button>
  )
})
export default SubmitButton