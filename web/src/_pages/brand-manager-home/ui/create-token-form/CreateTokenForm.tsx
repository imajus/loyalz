import { CircleXIcon } from 'lucide-react';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';

import { Button } from '@/shared/components/shadcn/ui/button';
import { Token } from '@/shared/types';
import { toastError } from '@/shared/utils/toast';

import { emptyErrors } from './const';
import { CreateTokenErrors } from './types';
import { validateForm } from './utils';

type PropTypes = {
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
};

export const CreateTokenForm = ({ setIsFormVisible }: PropTypes) => {
  const [formData, setFormData] = useState<Token>({
    token: '',
    blockchain: '',
  });

  const [errors, setErrors] = useState<CreateTokenErrors>(emptyErrors);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isValid, errors } = validateForm(formData);
    setErrors(errors);
    if (!isValid) {
      return;
    }

    const submit = () => {
      try {
        // await createCampaign(formData, signer);
      } catch (e: any) {
        console.error(`Token submission failed: ${e}`);
        toastError('Token submission failed');
      }
      setIsFormVisible(false);
    };

    void submit();

    setIsFormVisible(false);
  };

  return (
    <div className="relative w-96 bg-black/70 p-7 rounded-lg pt-7 text-white">
      <button onClick={() => setIsFormVisible(false)} className="absolute top-2 right-2">
        <CircleXIcon color="white" />
      </button>

      <div className="w-full flex justify-center pb-3">
        <span>New Token</span>
      </div>

      <form onSubmit={handleSubmit} className="w-full h-full flex flex-col gap-3">
        <div className="grid grid-cols-2">
          <label>Token *</label>
          <input
            className="text-black"
            type="text"
            name="token"
            value={formData.token}
            onChange={handleChange}
          />
        </div>
        <span className="pb-3 text-xs text-red-700">{errors.token}</span>
        <div className="grid grid-cols-2">
          <label>Blockchain *</label>
          <input
            className="text-black"
            type="text"
            name="blockchain"
            value={formData.blockchain}
            onChange={handleChange}
          />
        </div>
        <span className="pb-3 text-xs text-red-700">{errors.blockchain}</span>

        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </form>
    </div>
  );
};
