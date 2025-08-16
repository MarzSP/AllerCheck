import type {Actions} from './$types';

export const actions: Actions = {
    create: async ({request, fetch}) => {
        const form = await request.formData();
        const payload = {
            name: form.get('name'),
            description: form.get('description'),
            isActive: form.get('isActive') === 'on'
        };

        const res = await fetch('/api/menu', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            return {success: false, error: await res.text()};
        }
        return {success: true};
    }
};
