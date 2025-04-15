import { pbkdf2, randomBytes } from 'node:crypto'

async function hashPassword(
  password: string,
  salt = randomBytes(16).toString('hex')
) {
  const hash = await new Promise<Buffer>((resolve, reject) => {
    pbkdf2(password, salt, 1000, 64, `sha512`, (err, result) =>
      err ? reject(err) : resolve(result)
    )
  })
  return {
    hash: hash.toString('hex'),
    salt,
  }
}

async function comparePasswords({
  password,
  salt,
  hash,
}: {
  password: string
  salt: string
  hash: string
}) {
  return hash === (await hashPassword(password, salt)).hash
}

export const passwordService = { comparePasswords, hashPassword }
