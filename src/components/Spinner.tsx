import { Loader2 } from 'lucide-react'
import React from 'react'

const Spinner = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <Loader2 className='w-8 h-8 animate-spin' />
    </div>
  )
}

export default Spinner