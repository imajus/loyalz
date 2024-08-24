// @ts-nocheck
'use client';
import moment from 'moment';

export const Signees = ({ signees }) => {
  return (
    <div className="w-full h-44 flex flex-col gap-3 text-black">
      {signees.map((s) => {
        return (
          <div
            className="flex flex-col gap-5 items-center overflow-y-scroll"
            key={s.id}
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex flex-col gap-1 items-center">
              <span className="underline text-xl">{`Signed by ${s.fullname}`}</span>
              <span>{`at ${moment(s.dateSigned).format('LLLL')}`}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
