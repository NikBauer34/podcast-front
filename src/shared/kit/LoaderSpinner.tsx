import { Loader } from 'lucide-react'
import React from 'react'
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
export default function LoaderSpinner({className}: {className?: string}) {
  return (
    <div className={`flex-center h-screen w-full ${className}`}>
      <Loader className="animate-spin text-orange-1" size={30} />
    </div>
  )
}
