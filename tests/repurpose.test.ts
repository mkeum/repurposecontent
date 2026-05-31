import { expect, test, describe, vi } from 'vitest'

vi.mock('openai', () => {
  return {
    OpenAI: class {
      chat = {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    'LinkedIn Post': 'Linked content',
                    'Twitter Thread': 'Twitter content',
                    'Social Media Posts': 'Social content',
                    'Email Newsletter': 'Email content',
                    'SEO Summary': 'SEO content',
                    'Blog Excerpt': 'Blog content'
                  })
                }
              }
            ]
          })
        }
      }
    }
  }
})

import { generateRepurposedContent } from '../lib/repurpose'

describe('generateRepurposedContent', () => {
  test('maps OpenAI response to correct internal types', async () => {
    const results = await generateRepurposedContent('test content', 'blog')
    
    expect(results).toHaveLength(6)
    const linkedIn = results.find(r => r.type === 'linkedin_post')
    expect(linkedIn).toBeDefined()
    expect(linkedIn?.content).toBe('Linked content')
  })
})
