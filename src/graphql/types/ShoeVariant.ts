import { builder } from '../builder';

builder.prismaObject('ShoeVariant', {
  fields: (t) => ({
    id: t.exposeID('id'),
    sku: t.exposeString('sku'),
    size: t.exposeString('size'),
    stock: t.exposeInt('stock'),
  }),
});
