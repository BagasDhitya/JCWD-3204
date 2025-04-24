'use client'
import { useEffect } from "react"
import { useAttendance } from "@/utils/useAttendances"
import { getAuthCookie } from "@/lib/cookies"

export default function Attendances() {
    const { getMonthlyAttendance } = useAttendance()
    const user = getAuthCookie()

    async function handleMonthlyAttendance(userId?: number, startDate?: string, endDate?: string) {

        try {
            const response = await getMonthlyAttendance(userId, startDate, endDate)
            console.log('response : ', response.data)
        } catch (error) {
            console.log('error : ', error)
        }
    }

    useEffect(() => {
        handleMonthlyAttendance()
    }, [])


    return (
        <div>Attendances</div>
    )
}
