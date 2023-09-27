import Image from 'next/image'
import Link from 'next/link'

interface LinksData {
  image: string,
  link: string
}

const Links: LinksData[] = [
  {
    image: '/icons/twitterX.png',
    link: 'https://x.com/niowalkers'
  },
  {
    image: '/icons/discord.png',
    link: 'https://discord.gg/8n6yVgxJ'
  },
  {
    image: '/icons/mail.png',
    link: 'mailto:niowalkers@gmail.com'
  },
  {
    image: '/icons/threads.png',
    link: 'https://www.threads.net/@niowalkers'
  },
  {
    image: '/icons/tiktok.png',
    link: 'https://tiktok.com/@niowalker'
  },
  {
    image: '/icons/instagram.png',
    link: 'https://instagram.com/niowalkers'
  },
  {
    image: '/icons/youtube.png',
    link: 'https://www.youtube.com/channel/UCZgRrsRM0l216mMVs2pdVmA'
  },
]

const Footer = () => {
  return (
    <div className='relative w-full flex-col justify-center items-center gap-2 py-4'>
      <div className='mb-4 flex items-center justify-center sm:gap-4 gap-[6px]'>
        {Links.map((entry, _) => (
          <div key={entry.image} 
          className='relative after:absolute after:content-[""] after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-[100%] after:mt-[4px]
          after:bg-gradient-to-bl after:from-purple-400  after:via-indigo-400 after:to-indigo-800 after:hover:bg-indigo-600 
          after:transition-all after:duration-200 after:ease-in
          transition-all duration-200 ease-in hover:scale-[1.1] pb-1' >
            <Link
              href={entry.link}
              target='_blank'>
              <Image
              className='invert dark:invert-0'
                height={35}
                width={35}
                alt={entry.link}
                src={entry.image}
              ></Image>
            </Link>
          </div>
        ))}
      </div>

      <div className='text-opacity-80 dark:text-white text-black w-full text-center justify-center items-center text-[11px]'>

        @Nio Walkers 2023, All rights reserved. Icons by
        <Link
          href={'https://icons8.com/'}
          target='_blank'
        >
          <span className=' ml-1  text-blue-400 hover:text-blue-600 transition-all duration-200 '>
            Icons8.
          </span>
        </Link>

      </div>
    </div>
  )
}

export default Footer