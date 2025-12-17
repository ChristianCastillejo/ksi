import { gql } from "@/gql";

export const BOOK_CARD_FRAGMENT = gql(`
  fragment BookCardFragment on Book {
    sys {
      id
    }
      
    title
    slug
    price
    author

    stock

    language
    difficulty

    coverImage {
      url
      width
      height
      title
    }
  }
`);

export const GET_ALL_BOOKS_QUERY = gql(`
  query GetAllBooks {
    bookCollection(limit: 20, order: sys_firstPublishedAt_DESC) {
      items {
        ...BookCardFragment
      }
    }
  }
`);


export const GET_BOOK_BY_SLUG_QUERY = gql(`
  query GetBookBySlug($slug: String!, $preview: Boolean) {
    bookCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
      items {
        ...BookCardFragment
        description
        summary
      }
    }
  }
`);

export const WORKSHOP_CARD_FRAGMENT = gql(`
  fragment WorkshopCardFragment on Workshop {
    sys {
      id
    }
      
    title
    slug
    
    dates
    location
    price
    description
    formLink
    brochureLink
    highlights
    scholars
  }
`);

export const GET_ACTIVE_WORKSHOP_QUERY = gql(`
  query GetActiveWorkshop {
    workshopCollection(where: { isActive: true }, limit: 1) {
      items {
       ...WorkshopCardFragment
      }
    }
  }
`);