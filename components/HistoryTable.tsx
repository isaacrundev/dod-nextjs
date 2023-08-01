import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HistoryTable() {
  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Food Name</TableHead>
            <TableHead>Calories</TableHead>
            <TableHead>Carbs (g)</TableHead>
            <TableHead>Fats (g)</TableHead>
            <TableHead>Protein (g)</TableHead>
            {/* <TableHead>Size (g)</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Krispy Kreme Orignal Donut</TableCell>
            <TableCell>0</TableCell>
            <TableCell>20</TableCell>
            <TableCell>40</TableCell>
            <TableCell>300</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
