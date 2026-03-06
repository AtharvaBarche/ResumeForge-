const ACTION_VERBS = new Set([
  'built', 'developed', 'designed', 'implemented', 'led', 'improved',
  'created', 'optimized', 'automated', 'managed', 'delivered', 'launched',
  'established', 'reduced', 'increased', 'achieved', 'coordinated', 'drove',
])

const NUMBER_PATTERN = /\d|%|\b\d+k\b|\b\d+x\b/i

function getBulletLines(text: string): string[] {
  return text
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function firstWord(str: string): string {
  const m = str.match(/^\s*(\w+)/)
  return m ? m[1].toLowerCase() : ''
}

export function getBulletGuidance(description: string): {
  suggestActionVerb: boolean
  suggestNumber: boolean
} {
  const lines = getBulletLines(description)
  if (lines.length === 0)
    return { suggestActionVerb: false, suggestNumber: false }

  let anyMissingVerb = false
  let anyMissingNumber = false
  for (const line of lines) {
    const first = firstWord(line)
    if (first && !ACTION_VERBS.has(first)) anyMissingVerb = true
    if (!NUMBER_PATTERN.test(line)) anyMissingNumber = true
  }
  return {
    suggestActionVerb: anyMissingVerb,
    suggestNumber: anyMissingNumber,
  }
}
