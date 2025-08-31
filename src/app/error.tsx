'use client'

import { useEffect } from 'react'

export default function Error({
    error,
}: {
    error: Error & { digest?: string }
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <section className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-8 lg:px-6 lg:py-20">
                <div className="mx-auto max-w-(--breakpoint-sm) text-center">
                    <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl">500</h1>
                    <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">Internal Server Error.</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry something went wrong.</p>
                </div>
            </div>
        </section>
    )
}