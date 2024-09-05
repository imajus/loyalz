import { Campaign } from '@/shared/types';
import { classNames } from '@/shared/utils';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../shadcn/ui/table';

type PropTypes = {
  campaigns: Campaign[];
};

export const CampaignsListTable = ({ campaigns }: PropTypes) => {
  return (
    <Table className="h-40">
      <TableHeader>
        <TableRow className="sticky top-0 bg-white">
          <TableHead>Campaign</TableHead>
          <TableHead>Token</TableHead>
          <TableHead>Token amount</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Reward</TableHead>
          <TableHead>Collab token</TableHead>
          <TableHead>Collab token amount</TableHead>
          <TableHead>Blockchain</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-40 overflow-y-scroll">
        {campaigns.map((campaign, idx) => (
          <TableRow key={idx} className={classNames(idx % 2 === 1 && 'bg-slate-200')}>
            <TableCell>{campaign.name}</TableCell>
            <TableCell>{campaign.mintToken}</TableCell>
            <TableCell>{campaign.mintAmount}</TableCell>
            <TableCell>{campaign.productName}</TableCell>
            <TableCell>{campaign.reward}</TableCell>
            <TableCell>{campaign.otherToken}</TableCell>
            <TableCell>{campaign.otherAmount}</TableCell>
            <TableCell>{campaign.blockchain}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
