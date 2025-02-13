import React from 'react'

function Hero() {
  return (
    <div>
        <section className="bg-black">
            <div className='flex items-baseline 
            justify-center pt-20' >
            <h2 className='text-white border
            px-3 p-2 rounded-full 
            text-center border-white'>See What's New | <span className='text-sky-300'>AI Diagram</span></h2>
            </div>

  <div className="mx-auto h-screen max-w-screen-xl px-4 py-10 lg:flex">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl text-sky-300 font-extrabold sm:text-5xl">
        AI co-pilot
        <strong className="font-extrabold text-white sm:block"> for technical design</strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed text-slate-200">
      Deliver accurate, consistent designs faster
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded-sm bg-white px-12 py-3 text-sm font-medium text-black shadow-sm hover:bg-white focus:ring-3 focus:outline-hidden sm:w-auto"
          href="#"
        >
          Try Eraser
        </a>

      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Hero