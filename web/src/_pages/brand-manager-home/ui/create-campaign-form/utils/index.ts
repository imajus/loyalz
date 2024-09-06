import { CreateCampaignInputs } from '@/shared/types';

import { CreateCampaignErrors } from '../types';

export const validateForm = (data: CreateCampaignInputs) => {
  let isValid = true;
  const errors: CreateCampaignErrors = {} as CreateCampaignErrors;

  // Required fields validation
  if (!data.name) {
    errors.name = 'Name is required';
    isValid = false;
  }
  if (!data.sku) {
    errors.sku = 'SKU is required';
    isValid = false;
  }
  if (!data.mintToken) {
    errors.mintToken = 'Mint token is required';
    isValid = false;
  }
  if (data.mintAmount <= 0) {
    errors.mintAmount = 'Mint amount must be greater than 0';
    isValid = false;
  }

  // Optional fields validation if needed (you can extend this logic)
  if (data.otherAmount && data.otherAmount < 0) {
    errors.otherAmount = 'Collab token amount cannot be negative';
    isValid = false;
  }

  if (data.otherAmount && data.otherAmount > 0 && !data.otherToken) {
    errors.otherToken = 'Collab token name is required';
    isValid = false;
  }

  return { isValid, errors };
};
