import { cacheTag } from "next/cache";
import { print, type DocumentNode } from "graphql";
import { GET_ACTIVE_WORKSHOP_QUERY, GET_BOOK_BY_SLUG_QUERY } from "./queries";
import { GET_ALL_BOOKS_QUERY } from "./queries";

const SPACE = process.env.CONTENTFUL_SPACE_ID;
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const API_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE}`;

if (!SPACE || !TOKEN) {
    throw new Error("Contentful credentials are missing in.env.local");
}

async function fetchGraphQL(query: DocumentNode | string, variables: Record<string, unknown> = {}) {
    if (typeof query === 'object' && Object.keys(query).length === 0) {
        throw new Error("🛑 [GraphQL Codegen] Error: Query vacía. Ejecuta 'npm run codegen'.");
    }

    const queryString = typeof query === 'string' ? query : print(query);

    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ query: queryString, variables }),
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch from Contentful: ${res.statusText}`);
    }

    return res.json();
}


export async function fetchContentfulBooks() {
    "use cache";
    cacheTag("books-collection");

    const response = await fetchGraphQL(GET_ALL_BOOKS_QUERY);
    return response.data.bookCollection.items;
}

export async function fetchContentfulBookBySlug(slug: string) {
    "use cache";
    cacheTag(`book-${slug}`);

    const json = await fetchGraphQL(GET_BOOK_BY_SLUG_QUERY, { slug, preview: false });
    const items = json.data?.bookCollection?.items || [];

    return items.length > 0 ? items[0] : null;
}

export async function fetchContentfulWorkshop() {
    "use cache";
    cacheTag("workshops-collection");

    const json = await fetchGraphQL(GET_ACTIVE_WORKSHOP_QUERY);

    const items = json.data?.workshopCollection?.items || null;

    return items.length > 0 ? items[0] : null;
}
