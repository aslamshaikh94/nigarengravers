import { gql } from '@apollo/client'

export const GET_GALLERY_DATA = gql`
  query getGalleryData {
    galleries {
      data {
        attributes {
          Title
          Media {
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
