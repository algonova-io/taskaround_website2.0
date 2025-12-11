export type NewTask = NewTaskStep1 & NewTaskStep2 & NewTaskStep3;

export interface NewTaskStep1 {
    what: string;
    brand: string;
    condition: 'new' | 'used' | '';
    hasManual: 'yes' | 'no' | '';
}

export interface NewTaskStep2 {
    location: string;
    date: string;
    time: string;
    notes: string;
}

export interface NewTaskStep3 {
    name: string;
    email: string;
    phone: string;
}