export interface User {
    id: string;
    name: string;
    email: string;
    role: 'owner' | 'tenant_admin' | 'billing_admin' | 'viewer';
}

export const MockAuthService = {
    login: async (email: string, password: string): Promise<{ success: boolean; requiresOtp: boolean }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate simple check
                if (email.includes('error')) {
                    resolve({ success: false, requiresOtp: false });
                } else {
                    // Simulate MFA trigger for specific email
                    const requiresOtp = email.includes('mfa');
                    resolve({ success: true, requiresOtp });
                }
            }, 1500); // 1.5s delay for realism
        });
    },

    signup: async (data: any): Promise<{ success: boolean; error?: string }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (data.email.includes('taken')) {
                    resolve({ success: false, error: 'Email already in use.' });
                } else {
                    resolve({ success: true });
                }
            }, 1500);
        });
    },

    requiresOtp: (): boolean => {
        return false; // Mock state
    }
};
