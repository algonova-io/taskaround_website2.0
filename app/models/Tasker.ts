export interface TaskerReview {
    id: string | number
    name: string
    rating: number
    date: string      // formatted date string
    text: string
}

export interface Tasker {
    id: string | number
    name: string
    avatar: string
    location: string
}

export interface PartnerStep2 {
    firstName: string
    lastName: string
    email: string
    phone: string
    city: string
}

export interface PartnerStep4 {
    motivation: string
    problemSolving: string
}

export  interface PartnerStep5 {
    resources: string[]
    additionalInfo: string
}

export interface PartnerApplication {
    // Step 2: Personal Details
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;

    // Step 3: Experience
    experience: string; // 'high', 'medium', 'low'

    // Step 4: Motivation & Soft Skills
    motivation: string;
    problemSolving: string; // 'calm', 'ask', 'team'

    // Step 5: Resources
    resources: string[]; // ['tools', 'car', ...]
    additionalInfo: string;
}