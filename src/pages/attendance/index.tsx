import type { NextPage } from "next";

import { Checkbox, Table, TableData, Title } from '@mantine/core';
import { ReactNode, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { User } from "@prisma/client";

const Attendance: NextPage = () => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const router = useRouter()
    
    let currentDate = new Date((new Date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })).toString().split(" ").slice(0, 4).join(" ")

    const { data: session, status } = useSession();

    const { data: attendances, isLoading } = api.attendance.getAllTodayAttendance.useQuery({
        companyID: session?.user.companyId as string
    })

    const { data: userData, isLoading: userLoading } = api.admin.getAllUser.useQuery({
        companyId: session?.user.companyId as string
    })

    const tableData: TableData = {
        caption: 'Daftar hadir pada tanggal 14 Januari 2023',
        head: ['Nama', 'Email', 'Status'],
        body: (userData as User[])?.map(user => {
            // id, name, email, status
            return [
                user.id,
                user.name,
                user.email,
                attendances?.some(attendance => attendance.user.id === user.id)
        ];
        }) as ReactNode[][],
    };
    
      const rows = tableData.body?.map((element) => (
        <Table.Tr
          key={element[0] as number}
          bg={selectedRows.includes(element[0] as number) ? 'var(--mantine-color-blue-light)' : undefined}
        >
          <Table.Td>
            <Checkbox
              aria-label="Select row"
              checked={selectedRows.includes(element[0] as number)}
              onChange={(event) =>
                setSelectedRows(
                  event.currentTarget.checked
                    ? [...selectedRows, element[0] as number]
                    : selectedRows.filter((position) => position !== element[0])
                )
              }
            />
          </Table.Td>
          <Table.Td>{element[1]}</Table.Td>
          <Table.Td>{element[2]}</Table.Td>
          <Table.Td className={`font-bold ${element[3] ? 'text-green-400' : 'text-rose-400'}`} >{element[3] ? "Masuk" : "Tidak Masuk"}</Table.Td>
        </Table.Tr>
    ));

    useEffect(() => {
        if(status !== "loading") {
            if (status === "unauthenticated" || session?.user.role !== "admin") {
                router.replace("/")
            }
        }
    }, [session, status])

    return (
        <div>
            {(!isLoading && !userLoading) ? <div className="flex flex-col h-screen w-full items-center justify-center px-16 gap-y-8">
                <div className = "flex flex-col gap-y-2 text-center">
                    <Title order={1}> Attendance List </Title>
                    <Title order={3}> Attendance on {currentDate} </Title>
                </div>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th className="w-min"/>
                            {(tableData.head as ReactNode[]).map((head, key) => ( <Table.Th key={key}> {head} </Table.Th> ))}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </div>: <div className="flex flex-col h-screen w-full items-center justify-center px-16 gap-y-8"> <Title order={1}> Belum ada data </Title> </div>}
        </div>
    )
}

export default Attendance