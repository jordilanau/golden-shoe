import { Gender } from '@prisma/client';
import { prisma } from '../../global/db';
import { builder } from '../builder';
import { CategoryValues } from './Category';
import { GenderEnum } from './GenderEnum';
import { ShoeSizeStock } from './ShoeVariant';

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
    category: t.relation('category', { type: CategoryValues }),
    gender: t.expose('gender', { type: GenderEnum }),
    variants: t.relation('variants', { type: ShoeSizeStock }),
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
    sku: t.exposeString('sku'),
    model: t.exposeString('model'),
    description: t.exposeString('description'),
    image: t.exposeString('image'),
    category: t.relation('category', { type: CategoryValues }),
    gender: t.expose('gender', { type: GenderEnum }),
  }),
});

builder.queryField('getAllModels', (t) =>
  t.prismaConnection({
    type: 'Shoe',
    cursor: 'id',
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

builder.mutationField('createModel', (t) =>
  t.prismaField({
    type: 'Shoe',
    nullable: true,
    args: {
      model: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      image: t.arg.string({ required: true }),
      category: t.arg.string({ required: true }),
      gender: t.arg({
        type: GenderEnum,
        required: true,
      }),
    },
    resolve: async (mutation, _parent, args, _ctx, _info) =>
      await prisma.shoe.create({
        data: {
          sku: Math.random().toString(36).substring(2, 12),
          model: args.model,
          description: args.description,
          image: args.image,
          category: {
            connect: {
              category: args.category,
            },
          },
          gender: args.gender as Gender,
        },
        ...mutation,
      }),
  })
);
