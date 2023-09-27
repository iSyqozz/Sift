'use client'

import { useState, useEffect } from 'react'
const ScrollProg = () => {

  const [progress, setProgress] = useState(0);



  const updateProgress = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const scrollPercentage = (scrollPosition / maxScroll) * 100;

    setProgress(scrollPercentage);
  }

  const handleResize = () => {
    updateProgress();
  };


  useEffect(() => {
    window.addEventListener('scroll', updateProgress)
    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', handleResize); 
    }
  }, [])

  return (
    <div className='transition-none fixed top-0 left-0 z-30 h-[2px] bg-gradient-to-bl from-purple-400  via-indigo-400 to-indigo-800hover:bg-indigo-600' style={{ width: progress + '%' }} />

  )
}

export default ScrollProg