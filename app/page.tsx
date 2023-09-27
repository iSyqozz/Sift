import Image from 'next/image'
import Link from 'next/link'
import { Collections } from '@components'
import { Suspense } from 'react'

const collectionfallback = () => {
  const amounts = [1, 2, 3, 4, 5]
  return (
    <div className='mt-16  w-full mx-auto flex flex-wrap justify-evenly items-center max-sm:flex-col gap-2'>
      {
        amounts.map((entry) => {
          return <div key={entry}
            className=' animate-pulse mt-4 h-[300px] aspect-[11/16] rounded-xl  bg-slate-500 bg-opacity-20'>
          </div>
        })
      }
    </div>
  )
}

const Home = async () => {
  return (
    <div className='relative max-w-6xl mx-auto mt-12'>
      <div className='hidden dark:flex blur-[110px] opacity-20 z-[-1] bg-gradient-to-bl from-purple-400 via-indigo-400 to-indigo-700 w-[30vw] aspect-auto h-[40vw] absolute left-0 top-0 rounded-full'></div>
      <div className='hidden dark:flex blur-[110px] opacity-20 z-[-1] bg-gradient-to-bl from-purple-400 via-indigo-400 to-indigo-700 w-[30vw] aspect-auto h-[40vw] absolute bottom-0 right-0 rounded-full'></div>

      <section className="px-8 py-12 mx-auto flex flex-col justify-center items-center gap-2">
        <h1 className="text-8xl sm:text-9xl md:text-[200px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-indigo-700">
          Sift
        </h1>
        <h2 className="block mb-4 text-xs md:text-sm text-indigo-400 font-medium">
          By Nio Walkers
        </h2>
        <h3 className="text-base md:text-lg text-slate-700 my-4 md:my-6 max-w-[65%] text-center">
          Discover the most trending collections across marketplaces and stay ahead of the game.
        </h3>

        <div className='flex gap-3 items-center justify-center'>

          <Link target='_blank' href={'https://magiceden.io/'}>
            <Image
              className=' cursor-pointer hover:scale-[1.2] duration-100'
              width={20}
              height={20}
              alt='magiceden'
              src={'/icons/magiceden.png'}
            ></Image>
          </Link>

          <Link target='_blank' href='https://www.tensor.trade/'>
            <svg className=' cursor-pointer hover:scale-[1.2] duration-100 dark:bg-transparent bg-black rounded-full' viewBox="0 0 1263 1280" xmlns="http://www.w3.org/2000/svg" width="22px" height="22px"><path d="M552.5 144 55 643h217.5L409 506.5V992l143.5 143.5V144ZM712 144l497.5 499H992L855.5 506.5V992L712 1135.5V144Z" fill="white"></path></svg>
          </Link>

          <div className='text-lg  text-indigo-400'>and more...</div>

        </div>

        <Link href={'/collections'}>
          <button
            style={{ backgroundSize: '300%' }}
            className="mt-12 hover:[background-position:100%] duration-500  bg-left hover:scale-[1.02] bg-gradient-to-bl from-purple-400  via-indigo-400 to-indigo-800 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-[0.98]">
            Explore Collections
          </button>
        </Link>


        <div className='w-full h-[2px] mt-12 bg-slate-500 bg-opacity-80'></div>
        <Suspense fallback={collectionfallback()} >
          <Collections />
        </Suspense>
      </section>
    </div>
  )
}

export default Home