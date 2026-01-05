import React from 'react'

function PageWrapper(props: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-10 sm:px-18 lg:px-24 pb-8">
        {props.children}
    </div>
  )
}

export default PageWrapper