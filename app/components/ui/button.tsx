import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-gray-300",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm hover:shadow-md dark:shadow-gray-800/50",
        outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:text-gray-50",
        // ... autres variants
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
) 