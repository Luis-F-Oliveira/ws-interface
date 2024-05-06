import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "92bc3f4a",
            amount: 50,
            status: "processing",
            email: "a@example.com",
        },
        {
            id: "3a7e81d6",
            amount: 75,
            status: "success",
            email: "b@example.com",
        },
        {
            id: "e5f2a1b9",
            amount: 120,
            status: "failed",
            email: "c@example.com",
        },
        {
            id: "6d9a8c2e",
            amount: 90,
            status: "pending",
            email: "d@example.com",
        },
        {
            id: "fb3c6d54",
            amount: 110,
            status: "processing",
            email: "e@example.com",
        },
        {
            id: "18e94d7c",
            amount: 85,
            status: "success",
            email: "f@example.com",
        },
        {
            id: "4f3b29ae",
            amount: 95,
            status: "failed",
            email: "g@example.com",
        },
        {
            id: "0cd6e8fa",
            amount: 70,
            status: "pending",
            email: "h@example.com",
        },
        {
            id: "78a1b2c3",
            amount: 105,
            status: "processing",
            email: "i@example.com",
        },
        {
            id: "b9d4e2f5",
            amount: 80,
            status: "success",
            email: "j@example.com",
        },
        {
            id: "4c5d6e7f",
            amount: 65,
            status: "failed",
            email: "k@example.com",
        },
        {
            id: "3e9f1a8c",
            amount: 115,
            status: "pending",
            email: "l@example.com",
        },
        {
            id: "2b3c4d5e",
            amount: 55,
            status: "processing",
            email: "n@example.com",
        },
        {
            id: "d6e7f8a9",
            amount: 125,
            status: "success",
            email: "o@example.com",
        },
        {
            id: "1a2b3c4d",
            amount: 45,
            status: "failed",
            email: "p@example.com",
        },
        {
            id: "5e6f7a8b",
            amount: 135,
            status: "pending",
            email: "q@example.com",
        },
        {
            id: "9c0d1e2f",
            amount: 60,
            status: "processing",
            email: "r@example.com",
        },
        {
            id: "8a7b6c5d",
            amount: 140,
            status: "success",
            email: "s@example.com",
        },
        {
            id: "f9e8d7c6",
            amount: 40,
            status: "failed",
            email: "t@example.com",
        },
    ]
}

export default async function Page() {
    const data = await getData()

    return (
        <div className="pt-2">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
