import { Token } from '@/shared/types';

import { CreateTokenErrors } from '../types';

export const validateForm = (data: Token) => {
  let isValid = true;
  const errors: CreateTokenErrors = {} as CreateTokenErrors;

  // Required fields validation
  if (!data.token) {
    errors.token = 'Token is required';
    isValid = false;
  }

  if (!data.blockchain) {
    errors.blockchain = 'Blockchain is required';
    isValid = false;
  }

  return { isValid, errors };
};
