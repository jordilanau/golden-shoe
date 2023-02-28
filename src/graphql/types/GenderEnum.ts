import { Gender } from '@prisma/client';
import { builder } from '../builder';

export const GenderEnum = builder.enumType('Gender', {
  values: [Gender.Men, Gender.Women] as const,
});
