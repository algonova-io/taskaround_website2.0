export interface TaskerReview {
    id: string | number
    name: string
    rating: number
    date: string      // formatted date string
    text: string
}

export interface PartnerFormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    city: string
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