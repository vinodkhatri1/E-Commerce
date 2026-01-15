import React from 'react'
import Commends from "../component/Commends"
const ReviewComments = () => {
  return (
    <div className="w-2xl">
        <h4 className="font-bold text-2xl">Reviews</h4>
        <div className='flex flex-wrap'>
          <Commends/>
          <Commends/>
          <Commends/>
          <Commends/>
          <Commends/>
          </div>
      </div>
  )
}

export default ReviewComments