import { builder } from './builder';
import './types/Category';
import './types/Shoe';
import './types/ShoeVariant';

export const schema = builder.toSchema();
