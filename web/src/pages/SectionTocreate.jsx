import React from 'react'

function SectionTocreate() {
  return (
    <div>
        {[1,2,3].map((_,i)=>(
                <div key={i} className='hello text-2xl text-teal-400'>
                    <p>hello mohamed</p>
                </div>
        )
        )}
    </div>
  )
}

export default SectionTocreate
