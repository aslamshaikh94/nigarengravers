import ReactGA from 'react-ga'
export const ReactGAInitialize = () => {
  ReactGA.initialize('G-6LCJ1VGWGZ', {
    debug: true,
    titleCase: false,
    gaOptions: {
      userId: 123
    }
  })
  ReactGA.pageview(window.location.pathname + window.location.search)
}
