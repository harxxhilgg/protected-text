import { gcm } from "@noble/ciphers/aes.js";
import { bytesToUtf8 } from "@noble/ciphers/utils.js";
import { pbkdf2 } from "@noble/hashes/pbkdf2.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { utf8ToBytes, bytesToHex, hexToBytes } from "@noble/hashes/utils.js";

function concat(...arrays: Uint8Array[]) {
  const total = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(total);

  let offset = 0;

  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
}

// Text encryption
export async function encrypt(
  plaintext: string,
  password: string,
): Promise<string> {
  try {
    // Random values
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const nonce = crypto.getRandomValues(new Uint8Array(12));

    // Derive a 256-bit AES key
    const key = pbkdf2(sha256, utf8ToBytes(password), salt, {
      c: 100_000,
      dkLen: 32,
    });

    // Encrypt
    const cipher = gcm(key, nonce);
    const encrypted = cipher.encrypt(utf8ToBytes(plaintext));

    // Store: salt + nonce + cipher
    const payload = concat(salt, nonce, encrypted);

    // e26558252eaa3b1f024fa7a94fe1bfb0fe7d9b38dc0821673c2b800691e69f5b9b431aee139fa435586c623462b1401a18
    return bytesToHex(payload);
  } catch {
    throw new Error("Failed to encrypt text.");
  }
}

// Text decryption
export async function decrypt(
  encrypted: string,
  password: string,
): Promise<string> {
  try {
    const payload = hexToBytes(encrypted);

    // Extract pieces
    const salt = payload.slice(0, 16);
    const nonce = payload.slice(16, 28);
    const ciphertext = payload.slice(28);

    // Derive same key
    const key = pbkdf2(sha256, utf8ToBytes(password), salt, {
      c: 100_000,
      dkLen: 32,
    });

    // Decrypt
    const cipher = gcm(key, nonce);
    const decrypted = cipher.decrypt(ciphertext);

    // Original Text
    return bytesToUtf8(decrypted);
  } catch {
    throw new Error("Invalid password or corrupted data.");
  }
}
