import React from 'react'
import Commends from "../component/Commends" // Check path spelling (Comments vs Commends)

const ReviewComments = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <h4 className="font-bold text-2xl mb-6 text-gray-800">Customer Reviews</h4>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Mocking multiple comments for the grid */}
          <Commends/>
          <Commends/>
          <Commends/>
          <Commends/>
        </div>
      </div>
  )
}

export default ReviewComments