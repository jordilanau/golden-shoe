import { builder } from './builder';
import './types/Shoe';
import './types/ShoeVariant';

export const schema = builder.toSchema();
