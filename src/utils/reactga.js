import ReactGA from 'react-ga'
export const ReactGAInitialize = () => {
  ReactGA.initialize('UA-90470647-1', {
    debug: true,
    titleCase: false,
    gaOptions: {
      userId: 123
    }
  })
  ReactGA.pageview(window.location.pathname + window.location.search)
}
