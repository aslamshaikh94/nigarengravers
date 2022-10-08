import React from 'react'
import Banner from '@views/Home/Banner'
import Getintouch from '@views/Home/Getintouch'
import Whatwedo from '@views/Home/Whatwedo'

const Home = () => {
  return (
    <div>
      <Banner />
      {/* <PageWrapper> */}
      {/* Image Gallery */}
      <Whatwedo />

      {/* Get in touch form */}

      <Getintouch />

      {/* </PageWrapper> */}
    </div>
  )
}

export default Home
