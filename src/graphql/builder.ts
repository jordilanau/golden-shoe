import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import RelayPlugin from '@pothos/plugin-relay';
import { DateTimeResolver } from 'graphql-scalars';
import { prisma } from '../global/db';

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: { Input: Date; Output: Date };
  };
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  prisma: {
    client: prisma,
  },
  relayOptions: {},
});

builder.addScalarType('DateTime', DateTimeResolver, {});

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    ok: t.boolean({
      args: {
        input: t.arg.boolean({ required: true }),
      },
      resolve: (_parent, args) => args.input,
    }),
  }),
});
