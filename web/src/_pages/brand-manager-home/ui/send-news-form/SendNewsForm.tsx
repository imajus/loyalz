import { Button } from '@/shared/components/shadcn/ui/button';
import { useWeb3Auth } from '@/shared/hook';
import { toastError } from '@/shared/utils/toast';
import { allowedConsentList, getXmtpClient } from '@/shared/utils/xmtp';
import { BroadcastClient } from '@xmtp/broadcast-sdk';
import { Client } from '@xmtp/xmtp-js';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { emptyNewsErrors } from './const';
import { News, NewsErrors } from './types';
import { validateForm } from './utils';

export const SendNewsForm = () => {
  const [formData, setFormData] = useState<News>({
    text: '',
  });
  const [errors, setErrors] = useState<NewsErrors>(emptyNewsErrors);
  const { provider } = useWeb3Auth();
  const [xmtpUser, setXmtpUser] = useState<Client | null>(null);
  useEffect(() => {
    if (provider) {
      getXmtpClient(provider)
        .then((client) => setXmtpUser(client))
        .catch((err) => toastError(err.message));
    }
  }, [provider]);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    console.log({ formData });

    const submit = async () => {
      try {
        if (xmtpUser) {
          const subscribers = (await allowedConsentList(xmtpUser)).map(({ value }) => value);
          const broadcastClient = new BroadcastClient({
            client: xmtpUser,
            addresses: subscribers,
            cachedCanMessageAddresses: subscribers,
          });
          await broadcastClient.broadcast([formData.text], {});
          setFormData({ text: '' });
        }
      } catch (error) {
        console.error(error);
        toastError('News submission failed');
      }
    };

    void submit();
  };

  return (
    <div className="flex flex-col gap-3 items-start justify-center w-full">
      <span className="text-[14px]">Send news</span>
      <form onSubmit={handleSubmit} className="w-full h-full flex flex-col gap-3">
        <div className="grid w-full">
          <textarea
            className="text-black w-full bg-granite-gray-60% whitespace-pre-wrap resize-none h-[80px] text-md p-2 pr-5 pl-5 rounded-lg border border-slate-300"
            name="text"
            value={formData.text}
            onChange={handleChange}
            style={{ scrollbarWidth: 'none' }}
          />
        </div>
        {errors.text && <span className="pb-3 text-xs text-red-700">{errors.text}</span>}
        <Button className="w-32" type="submit">
          Send news
        </Button>
      </form>
    </div>
  );
};
