import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { getTable } from "@/lib/getData"

const SeleteTable = async () => {
    const TableDetails = await getTable();
    console.log("Table Details:", TableDetails);
    

  return (
    <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Table</SelectLabel>
        
      </SelectGroup>
    </SelectContent>
  </Select>
  )
}

export default SeleteTable
