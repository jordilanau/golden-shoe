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

export const ShoeSizeStock = builder.prismaObject('ShoeVariant', {
  variant: 'ShoeSizeStock',
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

builder.mutationField('addVariantToModel', (t) =>
  t.prismaField({
    type: 'ShoeVariant',
    args: {
      shoeSku: t.arg.string({ required: true }),
      size: t.arg.string({ required: true }),
      stock: t.arg.int({ required: true }),
    },
    resolve: async (mutation, _parent, args, _ctx, _info) =>
      await prisma.shoeVariant.create({
        data: {
          sku: Math.random().toString(36).substring(2, 12),
          size: args.size,
          stock: args.stock,
          Shoe: {
            connect: {
              sku: args.shoeSku,
            },
          },
        },
        ...mutation,
      }),
  })
);
