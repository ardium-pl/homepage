import {spawnSync} from 'node:child_process'
import {existsSync, readFileSync} from 'node:fs'
import path from 'node:path'

const mode = process.argv[2]

if (!mode || (mode !== 'development' && mode !== 'production')) {
  console.error('Usage: node scripts/deploy-with-env.mjs <development|production>')
  process.exit(1)
}

const envFile = path.resolve(process.cwd(), `.env.${mode}`)

if (!existsSync(envFile)) {
  console.error(`Missing env file: ${envFile}`)
  process.exit(1)
}

const envContent = readFileSync(envFile, 'utf8')

for (const rawLine of envContent.split(/\r?\n/)) {
  const line = rawLine.trim()

  if (!line || line.startsWith('#')) continue

  const equalIndex = line.indexOf('=')
  if (equalIndex === -1) continue

  const key = line.slice(0, equalIndex).trim()
  const value = line.slice(equalIndex + 1).trim()

  process.env[key] = value
}

const result = spawnSync('npx', ['sanity', 'deploy'], {
  stdio: 'inherit',
  shell: true,
  env: process.env,
})

process.exit(result.status ?? 1)
