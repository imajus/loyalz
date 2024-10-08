import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/shadcn/ui/table';
import { Campaign } from '@/shared/types';
import { classNames } from '@/shared/utils';

type PropTypes = {
  campaigns: Campaign[];
};

export const CampaignsListTable = ({ campaigns }: PropTypes) => {
  return (
    <Table className="max-h-64 h-fit">
      <TableHeader>
        <TableRow className="sticky top-0 bg-white">
          <TableHead>Campaign</TableHead>
          <TableHead>Token</TableHead>
          <TableHead>Token amount</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Reward</TableHead>
          <TableHead>Collab token</TableHead>
          <TableHead>Collab token amount</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
