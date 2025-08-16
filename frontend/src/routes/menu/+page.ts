import type {PageLoad} from './$types';

/**
 * This file is used to load the menu data for the page
 * @Type {Menu}
 */
type Menu = {
    menuId: number;
    name: string;
    description?: string;
    isActive: boolean;
};

/**
 * Load function for the menu page
 * @param fetch
 */
export const load: PageLoad = async ({fetch}) => {
    // Use the proxy: just call /api/menu
    const res = await fetch('/api/menu');
    if (!res.ok) throw new Error('Failed to load menus');
    const menus = (await res.json()) as Menu[];
    return {menus};
};
