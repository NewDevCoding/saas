import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CTA = () => {
  return (
    <section className='cta-section'>
      <div className='cta-badge'>Start Learning Your Way</div>
      <h2 className='text-3xl font-bold'>
        Build a Personalized Learning Companion
      </h2>
      <h3>Pick a name, subject, voice, & personality<br/>- and start learning through voice conversations that feel natural and fun</h3>
      <Image
        src="/images/cta.svg"
        alt="Call to Action Image"
        width={500}
        height={300}
      ></Image>
      <button className='btn-primary'>
        <Image
          src="/icons/plus.svg"
          alt="Plus Icon"
          width={12}
          height={12}>
        </Image>
        <Link href="companions/new">
          <p>Build a New Companion</p>
        </Link>
      </button>
    </section>
  )
}

export default CTA