import { prisma } from '../../global/db';
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

builder.queryField('getAllCategories', (t) =>
  t.prismaField({
    type: [CategoryValues],
    resolve: (query, _parent, _args, _ctx, _info) => prisma.category.findMany({ ...query, include: { _count: true } }),
  })
);

builder.queryField('getCategoryById', (t) =>
  t.prismaField({
    type: 'Category',
    args: {
      id: t.arg.int({ required: true }),
    },
    nullable: true,
    resolve: (query, _parent, args, _ctx, _info) => prisma.category.findUnique({ ...query, where: { id: args.id } }),
  })
);

builder.queryField('getCategoryByName', (t) =>
  t.prismaField({
    type: 'Category',
    args: {
      category: t.arg.string({ required: true }),
    },
    nullable: true,
    resolve: async (query, _parent, args, _ctx, _info) =>
      prisma.category.findUnique({ ...query, where: { category: args.category } }),
  })
);

builder.mutationField('createCategory', (t) =>
  t.prismaField({
    type: CategoryValues,
    nullable: true,
    args: {
      category: t.arg.string({ required: true }),
    },
    resolve: async (mutation, _parent, args, _ctx, _info) =>
      await prisma.category.create({ data: { category: args.category } }),
  })
);
