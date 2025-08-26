import {describe, it, expect, beforeEach, vi} from 'vitest';

// mock db pool
vi.mock('../db', () => {
    return {
        pool: {
            query: vi.fn(),
        },
    };
});

import {menuRepository} from '../../repositories/menuRepository';
import {pool} from '../../db';

const mockQuery = pool.query as unknown as ReturnType<typeof vi.fn>;

describe('menuRepository (unit)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('getMenusByUserId returns rows', async () => {
        mockQuery.mockResolvedValueOnce({
            rows: [
                {
                    menuId: 1,
                    userId: 42,
                    name: 'Weekly',
                    description: 'Notes',
                    isActive: true,
                    updatedAt: '2025-08-20T10:00:00Z',
                    createdAt: '2025-08-01T10:00:00Z',
                },
            ],
        });

        const res = await menuRepository.getMenusByUserId(42);

        expect(mockQuery).toHaveBeenCalledTimes(1);
        expect(mockQuery.mock.calls[0][1]).toEqual([42]);        // parameters
        expect(res).toHaveLength(1);
        expect(res[0].name).toBe('Weekly');
    });

    it('getMenuById returns: single row or null', async () => {
        mockQuery.mockResolvedValueOnce({
            rows: [{
                menuId: 7,
                userId: 1,
                name: 'Dinners',
                description: null,
                isActive: true,
                updated_at: 'x',
                created_at: 'y'
            }],
        });
        const found = await menuRepository.getMenuById(7);
        expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [7]);
        expect(found?.menuId).toBe(7);

        mockQuery.mockResolvedValueOnce({rows: []});
        const notFound = await menuRepository.getMenuById(999);
        expect(notFound).toBeNull();
    });

    it('create inserts and returns row', async () => {
        mockQuery.mockResolvedValueOnce({
            rows: [{
                menuId: 10, userId: 1, name: 'Lunch', description: 'x', isActive: true,
                updatedAt: 'u', createdAt: 'c',
            }],
        });

        const row = await menuRepository.create({userId: 1, name: 'Lunch', description: 'x', isActive: true});
        expect(mockQuery).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO menu'),
            [1, 'Lunch', 'x', true]
        );
        expect(row.menuId).toBe(10);
    });

    it('update patches fields and returns row (or null)', async () => {
        mockQuery.mockResolvedValueOnce({
            rows: [{
                menuId: 5, userId: 1, name: 'NewName', description: null, isActive: false,
                updatedAt: 'u', createdAt: 'c',
            }],
        });

        const row = await menuRepository.update(5, {name: 'NewName', isActive: false});
        expect(mockQuery).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE menu'),
            [5, 'NewName', null, false]
        );
        expect(row?.name).toBe('NewName');

        mockQuery.mockResolvedValueOnce({rows: []});
        const nothing = await menuRepository.update(999, {name: 'x'});
        expect(nothing).toBeNull();
    });

    it('delete removes a row', async () => {
        mockQuery.mockResolvedValueOnce({rows: []});
        await menuRepository.delete(3);
        expect(mockQuery).toHaveBeenCalledWith(
            expect.stringContaining('DELETE'),
            [3]
        );
    });
});
