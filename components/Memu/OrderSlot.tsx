import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getOrderSlots } from "@/lib/getData"
import { format } from "date-fns"
import Link from "next/link";

const OrderSlot = async () => {
    const slotsOrder = await getOrderSlots();
    return (
        <div className=''>
            <h2 className='py-4 text-center text-2xl font-bold tracking-tighter'>
                Current Time Slots
            </h2>

            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 cursor-pointer'>
                

                    {slotsOrder.map((slot: any) => (
                        <Link href={`/${slot._id}`} className='hover:scale-105 transition-all'>
                        <Card key={slot}>
                            {slot.cart.map((item: any) => (
                                <CardHeader key={slot.item} className="p-3">
                                    <CardTitle className="text-lg">
                                        {item.table ? `Table: ${item.table}` : "No Table Assigned"}
                                    </CardTitle>
                                    <CardDescription>
                                        {item.item.productname} <br />
                                        <span className='text-sm text-gray-500'>
                                            {format(new Date(slot.createdAt), "yyyy-MM-dd HH:mm:ss")}
                                        </span>
                                    </CardDescription>
                                </CardHeader>
                            ))}

                            <CardFooter>
                                <div className='flex justify-between items-center'>
                                    <span className='text-lg font-semibold'>
                                        Total: {slot.cart.reduce((acc: number, item: any) => acc + (item.item.price * item.quantity), 0)} ¥
                                    </span>
                                    <span className='text-sm text-gray-500'>
                                        Status: {slot.status}
                                    </span>
                                </div>
                            </CardFooter>
                        </Card>
                        </Link>

                    ))}


                
            </div>

        </div>
    )
}

export default OrderSlot
