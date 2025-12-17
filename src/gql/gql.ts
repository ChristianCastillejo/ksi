/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment BookCardFragment on Book {\n    sys {\n      id\n    }\n      \n    title\n    slug\n    price\n    author\n\n    stock\n\n    language\n    difficulty\n\n    coverImage {\n      url\n      width\n      height\n      title\n    }\n  }\n": typeof types.BookCardFragmentFragmentDoc,
    "\n  query GetAllBooks {\n    bookCollection(limit: 20, order: sys_firstPublishedAt_DESC) {\n      items {\n        ...BookCardFragment\n      }\n    }\n  }\n": typeof types.GetAllBooksDocument,
    "\n  query GetBookBySlug($slug: String!, $preview: Boolean) {\n    bookCollection(where: { slug: $slug }, limit: 1, preview: $preview) {\n      items {\n        ...BookCardFragment\n        description\n        summary\n      }\n    }\n  }\n": typeof types.GetBookBySlugDocument,
    "\n  fragment WorkshopCardFragment on Workshop {\n    sys {\n      id\n    }\n      \n    title\n    slug\n    \n    dates\n    location\n    price\n    description\n    formLink\n    brochureLink\n    highlights\n    scholars\n  }\n": typeof types.WorkshopCardFragmentFragmentDoc,
    "\n  query GetActiveWorkshop {\n    workshopCollection(where: { isActive: true }, limit: 1) {\n      items {\n       ...WorkshopCardFragment\n      }\n    }\n  }\n": typeof types.GetActiveWorkshopDocument,
};
const documents: Documents = {
    "\n  fragment BookCardFragment on Book {\n    sys {\n      id\n    }\n      \n    title\n    slug\n    price\n    author\n\n    stock\n\n    language\n    difficulty\n\n    coverImage {\n      url\n      width\n      height\n      title\n    }\n  }\n": types.BookCardFragmentFragmentDoc,
    "\n  query GetAllBooks {\n    bookCollection(limit: 20, order: sys_firstPublishedAt_DESC) {\n      items {\n        ...BookCardFragment\n      }\n    }\n  }\n": types.GetAllBooksDocument,
    "\n  query GetBookBySlug($slug: String!, $preview: Boolean) {\n    bookCollection(where: { slug: $slug }, limit: 1, preview: $preview) {\n      items {\n        ...BookCardFragment\n        description\n        summary\n      }\n    }\n  }\n": types.GetBookBySlugDocument,
    "\n  fragment WorkshopCardFragment on Workshop {\n    sys {\n      id\n    }\n      \n    title\n    slug\n    \n    dates\n    location\n    price\n    description\n    formLink\n    brochureLink\n    highlights\n    scholars\n  }\n": types.WorkshopCardFragmentFragmentDoc,
    "\n  query GetActiveWorkshop {\n    workshopCollection(where: { isActive: true }, limit: 1) {\n      items {\n       ...WorkshopCardFragment\n      }\n    }\n  }\n": types.GetActiveWorkshopDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment BookCardFragment on Book {\n    sys {\n      id\n    }\n      \n    title\n    slug\n    price\n    author\n\n    stock\n\n    language\n    difficulty\n\n    coverImage {\n      url\n      width\n      height\n      title\n    }\n  }\n"): (typeof documents)["\n  fragment BookCardFragment on Book {\n    sys {\n      id\n    }\n      \n    title\n    slug\n    price\n    author\n\n    stock\n\n    language\n    difficulty\n\n    coverImage {\n      url\n      width\n      height\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllBooks {\n    bookCollection(limit: 20, order: sys_firstPublishedAt_DESC) {\n      items {\n        ...BookCardFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllBooks {\n    bookCollection(limit: 20, order: sys_firstPublishedAt_DESC) {\n      items {\n        ...BookCardFragment\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBookBySlug($slug: String!, $preview: Boolean) {\n    bookCollection(where: { slug: $slug }, limit: 1, preview: $preview) {\n      items {\n        ...BookCardFragment\n        description\n        summary\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBookBySlug($slug: String!, $preview: Boolean) {\n    bookCollection(where: { slug: $slug }, limit: 1, preview: $preview) {\n      items {\n        ...BookCardFragment\n        description\n        summary\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment WorkshopCardFragment on Workshop {\n    sys {\n      id\n    }\n      \n    title\n    slug\n    \n    dates\n    location\n    price\n    description\n    formLink\n    brochureLink\n    highlights\n    scholars\n  }\n"): (typeof documents)["\n  fragment WorkshopCardFragment on Workshop {\n    sys {\n      id\n    }\n      \n    title\n    slug\n    \n    dates\n    location\n    price\n    description\n    formLink\n    brochureLink\n    highlights\n    scholars\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetActiveWorkshop {\n    workshopCollection(where: { isActive: true }, limit: 1) {\n      items {\n       ...WorkshopCardFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetActiveWorkshop {\n    workshopCollection(where: { isActive: true }, limit: 1) {\n      items {\n       ...WorkshopCardFragment\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;