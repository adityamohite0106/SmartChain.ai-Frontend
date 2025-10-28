"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  children,
  className,
  ...props
}) {
  return (
    <label
      {...props}
      className={cn(
        "block text-sm font-medium text-gray-700 mb-1",
        className
      )}
    >
      {children}
    </label>
  );
}

export { Label }
