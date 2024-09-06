import { News, NewsErrors } from '../types';

export const validateForm = (formData: News) => {
  const errors: NewsErrors = { text: '' };

  let isValid = true;
  if (!formData.text) {
    errors.text = 'News text is required';
    isValid = false;
  }

  return { isValid, errors };
};
