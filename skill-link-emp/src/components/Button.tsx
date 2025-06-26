import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  icons?: ReactNode
  title: string
}

export const Button = ({icons,title, ...props}: ButtonProps)=>{
  return(
    <button {...props} className={`${props.className} flex items-center gap-2 justify-center bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200`}>
      {icons && icons}
      <span className="hidden sm:inline">{title}</span>
    </button>
  )
}