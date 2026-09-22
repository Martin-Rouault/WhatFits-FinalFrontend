import Loader from "@/components/layout/Loader"

export function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Welcome to <span className="text-primary">WhatFits</span>
        </h1>
        <p className="mt-4 text-muted-foreground"></p>
        <Loader />
      </div>
    </div>
  )
}

export default HomePage
