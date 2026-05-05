import { type SchemaTypeDefinition } from 'sanity'
import caseStudy from './case-study'
import category from './category'
import colors from './colors'
import post from './post'
import tag from './tag'
import table from "./table";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [caseStudy,category,colors,post,tag,table],
}
