import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">Course List</h1>
      <div className="flex gap-20 mb-10">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="200">200</SelectItem>
              <SelectItem value="300">300</SelectItem>
              <SelectItem value="400">400</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="first">First</SelectItem>
              <SelectItem value="second">Second</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Code</TableHead>
            <TableHead>Course Title</TableHead>
            <TableHead>Allocated</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Credit Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">CSC 496.1</TableCell>
            <TableCell>4th and 5th programming languages</TableCell>
            <TableCell>
              <Badge variant="outline">Yes</Badge>
            </TableCell>
            <TableCell>400</TableCell>
            <TableCell>3</TableCell>

            <TableCell className="flex gap-3">
              <Button>Edit</Button>
              <Button>Delete</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">CSC 183.2</TableCell>
            <TableCell>Python programming language</TableCell>
            <TableCell>
              <Badge variant="destructive">No</Badge>
            </TableCell>
            <TableCell>100</TableCell>
            <TableCell>2</TableCell>

            <TableCell className="flex gap-3">
              <Button>Edit</Button>
              <Button>Delete</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
