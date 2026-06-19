import { useQuery } from '@tanstack/react-query';
import { databases } from '@/services/appwrite';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const DB_ID = 'sentiment_db';

export default function Universities() {
  const { data, isLoading } = useQuery({
    queryKey: ['universitiesData'],
    queryFn: async () => {
      const res = await databases.listDocuments(DB_ID, 'institutions');
      return res.documents;
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Tracked Institutions</h1>
        <p className="text-zinc-400">Manage and monitor public opinion volume per university.</p>
      </div>

      <div className="rounded-md border border-zinc-800 bg-zinc-900 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-950">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-medium">Institution Name</TableHead>
              <TableHead className="text-zinc-400 font-medium text-center">Acronym</TableHead>
              <TableHead className="text-zinc-400 font-medium text-right">Mention Volume</TableHead>
              <TableHead className="text-zinc-400 font-medium text-right">Negative Sentiment</TableHead>
              <TableHead className="text-zinc-400 font-medium text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className="border-zinc-800">
                <TableCell colSpan={5} className="h-24 text-center text-zinc-500">Loading data...</TableCell>
              </TableRow>
            ) : (
              data?.map((uni) => (
                <TableRow key={uni.id} className="border-zinc-800 hover:bg-zinc-800/50 text-white">
                  <TableCell className="font-medium">{uni.name}</TableCell>
                  <TableCell className="text-center text-zinc-400">{uni.acronym}</TableCell>
                  <TableCell className="text-right">{uni.volume.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                     <span className={uni.negativeScore > 70 ? 'text-rose-500 font-bold' : 'text-zinc-300'}>
                        {uni.negativeScore}%
                     </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={
                      uni.status === 'Critical' ? 'bg-rose-500/10 text-rose-500 border-rose-500/50' : 
                      uni.status === 'Warning' ? 'bg-amber-500/10 text-amber-500 border-amber-500/50' : 
                      'bg-teal-500/10 text-teal-500 border-teal-500/50'
                    }>
                      {uni.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
