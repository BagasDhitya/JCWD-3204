export interface Staff {
    id?: number,
    branch_id: number,
    name: string,
    email: string,
    phone?: string,
    position: string,
    shift_start?: Date,
    shift_end?: Date
}