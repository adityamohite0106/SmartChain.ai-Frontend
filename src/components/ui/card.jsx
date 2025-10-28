import * as React from "react"

// Card
export function Card({ children, className = "", ...props }) {
  return (
    <div
      {...props}
      className={`p-6 bg-white rounded-lg shadow ${className}`}
    >
      {children}
    </div>
  )
}

// CardHeader
export function CardHeader({ children, className = "", ...props }) {
  return (
    <div
      {...props}
      className={`pb-3 ${className}`}
    >
      {children}
    </div>
  )
}

// CardTitle
export function CardTitle({ children, className = "", ...props }) {
  return (
    <h3
      {...props}
      className={`text-base font-medium text-gray-900 ${className}`}
    >
      {children}
    </h3>
  )
}

// CardContent
export function CardContent({ children, className = "", ...props }) {
  return (
    <div
      {...props}
      className={`space-y-4 text-sm ${className}`}
    >
      {children}
    </div>
  )
}