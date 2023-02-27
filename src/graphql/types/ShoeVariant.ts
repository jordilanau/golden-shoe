import { prisma } from '../../global/db';
import { builder } from '../builder';
import { ShoeModel } from './Shoe';

builder.prismaObject('ShoeVariant', {
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', {
      type: 'DateTime',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'DateTime',
    }),
    sku: t.exposeString('sku'),
    size: t.exposeString('size'),
    stock: t.exposeInt('stock'),
    shoe: t.relation('Shoe', { type: ShoeModel }),
  }),
});

builder.queryField('getVariantById', (t) =>
  t.prismaField({
    type: 'ShoeVariant',
    args: {
      id: t.arg.int({ required: true }),
    },
    nullable: true,
    resolve: (query, _parent, args, _ctx, _info) => prisma.shoeVariant.findUnique({ ...query, where: { id: args.id } }),
  })
);

builder.queryField('getVariantBySku', (t) =>
  t.prismaField({
    type: 'ShoeVariant',
    args: {
      sku: t.arg.string({ required: true }),
    },
    nullable: true,
    resolve: (query, _parent, args, _ctx, _info) =>
      prisma.shoeVariant.findUnique({ ...query, where: { sku: args.sku } }),
  })
);
