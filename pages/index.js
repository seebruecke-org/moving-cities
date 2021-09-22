import Head from 'next/head';
import Image from 'next/image';

import introImage from '../public/images/intro.png'

export default function InterimPage() {
  return <main>
    <Head>
      <title>Moving Cities</title>
    </Head>

    <div className="flex flex-col w-full h-screen items-center justify-center font-raptor text-white bg-gradient-to-br from-pink-300 to-red-300 px-8">
      <div className="w-full max-w-lg">
        <Image src={introImage} />
      </div>

      <div className="-mt-10 relative z-10">
        <h1 className="text-xl md:text-4xl font-bold leading-none text-center">Moving Cities</h1>
        <p className="text-s md:text-m font-bold leading-tight text-center mt-4">Another migration policy is possible</p>
        <p className="text-2xs md:text-s italic mt-8 text-center">... online from October 21, 2021</p>
      </div>
    </div>
  </main>
}
