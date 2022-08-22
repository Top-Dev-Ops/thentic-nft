import { useEffect } from "react"

export default function Layout({ children }) {

  useEffect(() => document?.documentElement.classList.add('dark'))

  return (
    <div className="max-w-7xl min-h-screen mx-auto sm:px-6 lg:px-8 bg-stack-2 py-8">
      {children}
    </div>
  )
}