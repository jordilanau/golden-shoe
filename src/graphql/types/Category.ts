import { builder } from '../builder';

builder.prismaObject('Category', {
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', {
      type: 'DateTime',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'DateTime',
    }),
    category: t.exposeString('category'),
    Shoe: t.relatedConnection('Shoe', {
      cursor: 'id',
    }),
  }),
});

export const CategoryValues = builder.prismaObject('Category', {
  variant: 'CategoryValues',
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', {
      type: 'DateTime',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'DateTime',
    }),
    category: t.exposeString('category'),
  }),
});
