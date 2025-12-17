import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env.local' });

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error("❌ Error: No variables in .env.local for Contentful");

}

const config: CodegenConfig = {
    schema: [
        {
            [`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`]: {
                headers: {
                    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
                },
            },
        },
    ], documents: ['src/**/*.tsx', 'src/**/*.ts'],
    ignoreNoDocuments: true,
    generates: {
        './src/gql/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            }
        }
    },

};

export default config;