import type {PageLoad} from './$types';

type Menu = {
    menuId: number;
    name: string;
    description?: string;
    isActive: boolean;
};

export const load: PageLoad = async ({fetch}) => {
    // Use the proxy: just call /api/menu
    const res = await fetch('/api/menu');
    if (!res.ok) throw new Error('Failed to load menus');
    const menus = (await res.json()) as Menu[];
    return {menus};
};
