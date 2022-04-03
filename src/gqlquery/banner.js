import { gql } from '@apollo/client'

export const GET_MAINBANNER_DATA = gql`
  query getMainBannerData {
    mainbanner {
      data {
        id
        attributes {
          title
          description
          bannerImage {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`
