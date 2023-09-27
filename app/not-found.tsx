import React from 'react'
import Link from 'next/link'

const notFound = () => {
    return (
        <div className='relative max-w-6xl mx-auto mt-12'>
            <div className='hidden dark:flex blur-[110px] opacity-20 z-[-1] bg-gradient-to-bl from-purple-400 via-indigo-400 to-indigo-700 w-[30vw] aspect-auto h-[40vw] absolute left-0 top-0 rounded-full'></div>

            <section className="px-8 py-12 mx-auto flex flex-col justify-center items-center gap-2">
                <h1 className="text-8xl sm:text-9xl md:text-[200px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-indigo-700">
                    404
                </h1>
                <h2 className="block mb-4 text-xs md:text-sm text-indigo-400 font-medium">
                    Page not found
                </h2>

                <Link href={'/'}>
                    <button
                        style={{ backgroundSize: '300%' }}
                        className="mt-12 hover:[background-position:100%] duration-500  bg-left hover:scale-[1.02] bg-gradient-to-bl from-purple-400  via-indigo-400 to-indigo-800 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-[0.98]">
                        Return
                    </button>
                </Link>

            </section>

        </div>
    )
}

export default notFound