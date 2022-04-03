import React, { Suspense } from 'react'
import history from '@history/'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HOME_ROUTE, SIGNIN_ROUTE, ADMIN_ROUTE } from '@constants/routes'
import { ToastContainer } from 'react-toastify'
import Header from '@components/Header'
import Home from '@views/Home'
import Auth from '@views/Auth'
import Admin from '@views/Admin'
import NotFound from '@views/NotFound'
import PrivateRoute from '@shared/PrivateRoute'

const App = () => {
  return (
    <>
      <Router history={history}>
        <Suspense fallback={'Loading'}>
          <Header />
          <Routes>
            <Route exact path={HOME_ROUTE} element={<Home />} />
            <Route exact path={SIGNIN_ROUTE} element={<Auth />} />
            <Route
              exact
              path={ADMIN_ROUTE}
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer autoClose={2000} />
    </>
  )
}

export default App
