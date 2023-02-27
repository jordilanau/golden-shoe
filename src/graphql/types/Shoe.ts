import { Gender } from '@prisma/client';
import { prisma } from '../../global/db';
import { builder } from '../builder';

builder.prismaObject('Shoe', {
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', {
      type: 'DateTime',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'DateTime',
    }),
    sku: t.exposeString('sku'),
    model: t.exposeString('model'),
    description: t.exposeString('description'),
    image: t.exposeString('image'),
    category: t.exposeString('category'),
    gender: t.expose('gender', { type: GenderEnum }),
    variants: t.relation('variants'),
  }),
});

export const ShoeModel = builder.prismaObject('Shoe', {
  variant: 'ShoeModel',
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', {
      type: 'DateTime',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'DateTime',
    }),
    model: t.exposeString('model'),
    description: t.exposeString('description'),
    image: t.exposeString('image'),
    category: t.exposeString('category'),
    gender: t.expose('gender', { type: GenderEnum }),
  }),
});

const GenderEnum = builder.enumType('Gender', {
  values: [Gender.Men, Gender.Women] as const,
});

builder.queryField('getAllModels', (t) =>
  t.prismaField({
    type: ['Shoe'],
    resolve: (query, _parent, _args, _ctx, _info) => prisma.shoe.findMany({ ...query }),
  })
);

builder.queryField('getModelById', (t) =>
  t.prismaField({
    type: 'Shoe',
    args: {
      id: t.arg.int({ required: true }),
    },
    nullable: true,
    resolve: (query, _parent, args, _ctx, _info) => prisma.shoe.findUnique({ ...query, where: { id: args.id } }),
  })
);

builder.queryField('getModelBySku', (t) =>
  t.prismaField({
    type: 'Shoe',
    args: {
      sku: t.arg.string({ required: true }),
    },
    nullable: true,
    resolve: (query, _parent, args, _ctx, _info) =>
      prisma.shoe.findUnique({
        ...query,
        where: { sku: args.sku },
      }),
  })
);
