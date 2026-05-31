import { expect, test, describe, vi, beforeEach } from 'vitest'
import { getRemainingQuota, getUserUsage } from '@/lib/quota'
import { db } from '@/db'

// Mock the database
vi.mock('@/db', () => ({
  db: {
    select: vi.fn(),
  },
}))

vi.mock('@/lib/stripe', () => ({
  PLANS: [
    { name: 'Starter', quota: 20 },
    { name: 'Pro', quota: 100 },
    { name: 'Business', quota: -1 }
  ],
  stripe: {}
}))

describe('quota utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('getUserUsage returns correct count from database', async () => {
    // Mock db call chain: db.select().from().where()
    const mockSelect = vi.fn().mockReturnThis()
    const mockFrom = vi.fn().mockReturnThis()
    const mockWhere = vi.fn().mockResolvedValue([{ value: 10 }])
    
    ;(db.select as any).mockReturnValue({
      from: mockFrom.mockReturnValue({
        where: mockWhere
      })
    })

    const usage = await getUserUsage('user_123')
    expect(usage).toBe(10)
  })

  test('getRemainingQuota returns 5 for new users (Free tier)', async () => {
    // Mock getUserUsage to return 0
    // We need to mock the entire chain for subscriptions as well
    const mockUsageWhere = vi.fn().mockResolvedValue([{ value: 0 }])
    const mockSubWhere = vi.fn().mockResolvedValue([]) // No subscription

    ;(db.select as any).mockReturnValueOnce({
      from: vi.fn().mockReturnThis().mockReturnValue({
        where: mockSubWhere
      })
    }).mockReturnValueOnce({
      from: vi.fn().mockReturnThis().mockReturnValue({
        where: mockUsageWhere
      })
    })

    const remaining = await getRemainingQuota('user_123')
    expect(remaining).toBe(5)
  })
})
