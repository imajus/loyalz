import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/shadcn/ui/table';
import { Token } from '@/shared/types';
import { classNames } from '@/shared/utils';

type PropTypes = {
  tokens: Token[];
};

export const TokensListTable = ({ tokens }: PropTypes) => {
  return (
    <Table className="max-h-32 h-fit">
      <TableHeader>
        <TableRow className="sticky top-0 bg-white">
          <TableHead>Token</TableHead>
          <TableHead>Blockchain</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-24 overflow-y-scroll">
        {tokens.map((campaign, idx) => (
          <TableRow key={idx} className={classNames(idx % 2 === 1 && 'bg-slate-200')}>
            <TableCell>{campaign.token}</TableCell>
            <TableCell>{campaign.blockchain}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
