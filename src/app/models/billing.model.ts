export interface BillingRecord {
    id?: string | number;
    date: string;
    desc: string;
    amount: number;
    status: string;
    sub_table: string;
}

export interface BillingResponse {
    data: BillingRecord[];
}