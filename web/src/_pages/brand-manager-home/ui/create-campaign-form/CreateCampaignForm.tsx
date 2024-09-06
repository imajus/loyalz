import { ethers } from 'ethers';
import { CircleXIcon } from 'lucide-react';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';

import { Button } from '@/shared/components/shadcn/ui/button';
import { useWeb3Auth } from '@/shared/hook';
import { CreateCampaignInputs } from '@/shared/types';
import { createCampaign } from '@/shared/utils/rollup';
import { toastError } from '@/shared/utils/toast';

import { emptyErrors } from './const';
import { CreateCampaignErrors } from './types';
import { validateForm } from './utils';

type PropTypes = {
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
};

export const CreateCampaignForm = ({ setIsFormVisible }: PropTypes) => {
  const [formData, setFormData] = useState<CreateCampaignInputs>({
    name: '',
    sku: '',
    mintToken: '',
    mintAmount: 0,
    reward: '',
    otherToken: '',
    otherAmount: 0,
  });

  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const { provider } = useWeb3Auth();

  useEffect(() => {
    if (!provider) return;
    const init = async () => {
      if (provider) {
        const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider.getSigner();
        setSigner(signer);
      }
    };

    void init();
  }, [provider]);

  const [errors, setErrors] = useState<CreateCampaignErrors>(emptyErrors);

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

    if (!signer) {
      toastError('Can not create campaign');
    } else {
      const submit = async () => {
        try {
          await createCampaign(formData, signer);
        } catch (e: any) {
          console.error(`Campaign submission failed: ${e}`);
          toastError('Campaign submission failed');
        }
        setIsFormVisible(false);
      };

      void submit();
      return;
    }

    setIsFormVisible(false);
  };

  return (
    <div className="relative w-96 bg-black/70 p-7 rounded-lg pt-7 text-white">
      <button onClick={() => setIsFormVisible(false)} className="absolute top-2 right-2">
        <CircleXIcon color="white" />
      </button>

      <div className="w-full flex justify-center pb-3">
        <span>New Campaign</span>
      </div>

      <form onSubmit={handleSubmit} className="w-full h-full flex flex-col gap-3">
        <div className="grid grid-cols-2">
          <label>Name *</label>
          <input
            className="text-black"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <span className="pb-3 text-xs text-red-700">{errors.name}</span>
        <div className="grid grid-cols-2">
          <label>SKU *</label>
          <input
            className="text-black"
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
          />
        </div>
        <span className="pb-3 text-xs text-red-700">{errors.sku}</span>
        <div className="grid grid-cols-2">
          <label>Mint Token *</label>
          <input
            className="text-black"
            type="text"
            name="mintToken"
            value={formData.mintToken}
            onChange={handleChange}
          />
        </div>
        <span className="pb-3 text-xs text-red-700">{errors.mintToken}</span>
        <div className="grid grid-cols-2">
          <label>Mint Amount *</label>
          <input
            className="text-black"
            type="number"
            name="mintAmount"
            value={formData.mintAmount}
            onChange={handleChange}
            min="0"
          />
        </div>
        <span className="pb-3 text-xs text-red-700">{errors.mintAmount}</span>
        <div className="grid grid-cols-2">
          <label>Reward</label>
          <input
            className="text-black"
            type="text"
            name="reward"
            value={formData.reward}
            onChange={handleChange}
          />
        </div>
        <span className="pb-3 text-xs text-red-700">{errors.reward}</span>
        <div className="grid grid-cols-2">
          <label>Other Token</label>
          <input
            className="text-black"
            type="text"
            name="otherToken"
            value={formData.otherToken}
            onChange={handleChange}
          />
        </div>
        <span className="pb-3 text-xs text-red-700">{errors.otherToken}</span>
        <div className="grid grid-cols-2">
          <label>Other Amount</label>
          <input
            className="text-black"
            type="number"
            name="otherAmount"
            value={formData.otherAmount}
            onChange={handleChange}
            min="0"
          />
        </div>
        <span className="pb-3 text-xs text-red-700">{errors.otherAmount}</span>
        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </form>
    </div>
  );
};
