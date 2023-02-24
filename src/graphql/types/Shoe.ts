import { prisma } from '../../global/db';
import { builder } from '../builder';

builder.prismaObject('Shoe', {
  fields: (t) => ({
    id: t.exposeID('id'),
    sku: t.exposeString('sku'),
    model: t.exposeString('model'),
    description: t.exposeString('description'),
    image: t.exposeString('image'),
    category: t.exposeString('category'),
    gender: t.expose('gender', { type: Gender }),
    size: t.exposeString('size'),
    stock: t.exposeInt('stock'),
    variants: t.relation('variants'),
  }),
});

const Gender = builder.enumType('Gender', {
  values: ['Men', 'Women'] as const,
});

builder.queryField('shoes', (t) =>
  t.prismaField({
    type: ['Shoe'],
    resolve: (query, _parent, _args, _ctx, _info) => prisma.shoe.findMany({ ...query }),
  })
);
