import { geistMono } from "@/lib/fonts";
import Image from "next/image";

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col w-full max-w-90 sm:max-w-3xl mx-auto pt-10 sm:pt-30 gap-8">
      <h2 className="text-xl sm:text-3xl font-semibold tracking-tight">How it Works?</h2>

      {/* Description - Desktop */}
      <blockquote className="hidden sm:block border-l-4 border-secondary-foreground/70 pl-4 italic text-muted-foreground">
        <p>
          Protected Notepad lets you create encrypted notes that are accessed using a unique slug and a
          <br />
          password. Your note is encrypted before it&apos;s stored, so only someone with both pieces of
          <br />
          information can read it.
        </p>
      </blockquote>

      {/* Description - Mobile */}
      <blockquote className="sm:hidden text-sm border-l-4 border-secondary-foreground/70 pl-4 italic text-muted-foreground">
        <p>
          Protected Notepad lets you create encrypted notes that are accessed using a unique slug and a
          password. Your note is encrypted before it&apos;s stored, so only someone with both pieces of
          information can read it.
        </p>
      </blockquote>

      {/* Create a Unique Slug */}
      <div className="mt-2 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-bold">1. Create a Unique Slug</h3>

        <div className="mt-2 sm:mt-4 flex flex-col gap-4">
          <p className="text-sm sm:text-[16px] text-primary/90">Example:</p>

          <div className={`${geistMono.className} py-3 px-5 text-xs sm:text-sm bg-accent/70 rounded-3xl space-y-1 text-primary/95`}>
            <p>travel-plans</p>
            <p>work-notes</p>
            <p>shopping-list</p>
          </div>

          <ul className="list-disc mt-4 sm:mt-6 ml-4 space-y-0.5 text-sm sm:text-[16px] text-primary/80">
            <li className="pl-1">Choose a memorable slug that you&apos;ll be able recognize easily.</li>
            <li className="pl-1">Your slug is public and does not need to be kept secret. Your site is secured with your password.</li>
            <li className="pl-1">Slugs are unique across the platform, so each slug can only be used once.</li>
          </ul>
        </div>
      </div>

      {/* Write Your Note */}
      <div className="mt-2 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-bold">2. Write Your Note</h3>

        <div className="mt-2 sm:mt-4 text-sm sm:text-[16px] flex flex-col gap-4">
          <p className="text-primary/90">Once you&apos;ve chosen an available slug, you can start writing immediately. Whether it&apos;s quick reminder, code snippet, meeting notes, long-form documentation or even your secrets. Your content stays editable until you&apos;re ready to save it.</p>

          <p className="text-primary/90">Nothing is stored automatically. Your note remains local to your browser until you choose to save it.</p>
        </div>
      </div>

      {/* Choose Password */}
      <div className="mt-2 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-bold">3. Choose Password</h3>

        <div className="mt-2 sm:mt-4 text-sm sm:text-[16px] flex flex-col gap-4">
          <p className="text-primary/90">When saving a new note, you&apos;ll be asked to create a password. This password is used to encrypt your note before it&apos;s stored.</p>

          <p className="text-primary/90">Choose a strong, memorable password. You&apos;ll need the same password every time you want to unlock your note.</p>

          <p className="text-primary/90"><strong>Important: </strong> If you forget your password, your note cannot be recovered. Make sure you store it somewhere safe.</p>
        </div>
      </div>

      {/* Save Securely */}
      <div className="mt-2 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-bold">4. Save Securely</h3>

        <div className="mt-2 sm:mt-4 flex flex-col gap-4">
          <p className="text-sm sm:text-[16px] text-primary/90">When you save your note, the following happens:</p>

          <ul className="text-sm sm:text-[16px] list-decimal ml-6 space-y-0.5 text-primary/80">
            <li className="pl-1">Your note is encrypted using your password.</li>
            <li className="pl-1">Only the decrypted data is sent to the server.</li>
            <li className="pl-1">The encrypted version is stored in the database.</li>
          </ul>

          <p className="text-sm sm:text-[16px] text-primary/90">At no point is your data stored as plain text.</p>
        </div>
      </div>

      {/* Open Your Note Again */}
      <div className="mt-2 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-bold">5. Open Your Note Again</h3>

        <div className="mt-2 sm:mt-4 flex flex-col gap-4">
          <p className="text-sm sm:text-[16px] text-primary/90">To access your note later:</p>

          <ul className="text-sm sm:text-[16px] list-decimal ml-6 space-y-0.5 text-primary/80">
            <li className="pl-1">Enter the same slug you used when creating it.</li>
            <li className="pl-1">Enter the correct password.</li>
            <li className="pl-1">The encrypted note is retrieved.</li>
            <li className="pl-1">It&apos;s decrypted using your password.</li>
            <li className="pl-1">Your original note is displayed.</li>
          </ul>

          <p className="text-sm sm:text-[16px] text-primary/90">Without the correct password, the encrypted data cannot be turned back into readable text.</p>
        </div>
      </div>

      {/* Security */}
      <div className="mt-2 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-bold">6. Security</h3>

        <div className="mt-2 sm:mt-4 flex flex-col gap-4">
          <p className="text-sm sm:text-[16px] text-primary/90">Protected Notepad is designed with privacy in mind.</p>

          <ul className="text-sm sm:text-[16px] list-decimal ml-6 space-y-0.5 text-primary/80">
            <li className="pl-1">Notes are encrypted before they&apos;re stored.</li>
            <li className="pl-1">Only encrypted data is saved in the database.</li>
            <li className="pl-1">Your password is never stored as readable text.</li>
            <li className="pl-1">Anyone without the correct password cannot read your note.</li>
            <li className="pl-1">Forgotten passwords cannot be recovered.</li>
          </ul>
        </div>
      </div>

      {/* Technical Details */}
      <div className="mt-2 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-bold">7. Technical Details</h3>

        <div className="mt-2 sm:mt-4 flex flex-col gap-4">
          <p className="text-sm sm:text-[16px] text-primary/90">We use modern, industry-standard cryptographic techniques to protect your notes.</p>

          <Image
            src="/images/diagram.png"
            alt="Protected Notepad encryption and decryption flow"
            width={600}
            height={600}
            className="mx-auto mt-10 mb-6 mr-30"
            priority
          />

          <div className="mt-0 sm:mt-2 flex flex-col gap-10">
            {/* Encryption */}
            <div className="space-y-4">
              <h4 className="sm:text-lg font-semibold">Encryption</h4>

              <p className="text-sm sm:text-[16px] text-primary/90">Each note is encrypted using <strong>AES-256-GCM</strong>, it&apos;s an authentication algorightm that provides both confidentiality and integrity. This ensures that your note cannot be read or modified without the correct password.</p>
            </div>

            {/* Key Derivation */}
            <div className="space-y-4">
              <h4 className="sm:text-lg font-semibold">Key Derivation</h4>

              <p className="text-sm sm:text-[16px] text-primary/90">Your password is <strong>never used directly</strong> as an encryption key. Instead, a 256-bit encryption key is derived using <strong>PBKDF2-HMAC-SHA256</strong> with <strong>100,000 iterations</strong> and a randomly generated <strong>16-byte salt</strong>. This makes brute-force attacks significantly more expensive.</p>
            </div>

            {/* Random Salt & Nonce */}
            <div className="space-y-4">
              <h4 className="sm:text-lg font-semibold">Random Salt & Nonce</h4>

              <p className="text-sm sm:text-[16px] text-primary/90">Every encrypted note includes:</p>

              <ul className="text-sm sm:text-[16px] list-decimal ml-6 space-y-0.5 text-primary/80">
                <li className="pl-1">A 16-byte random salt used during key derivation.</li>
                <li className="pl-1">A 12-byte random nonce (IV) required for AES-GCM.</li>
              </ul>

              <p className="text-sm sm:text-[16px] text-primary/90">These values are generated securely using the browser&apos;s cryptographically secure random number generator (<span className={`${geistMono.className} mx-1 px-1 py-0 bg-accent rounded-sm`}>crypto.getRandomValues()</span>) and are unique for every encryption.</p>
            </div>

            {/* Stored Data */}
            <div className="space-y-4">
              <h4 className="sm:text-lg font-semibold">Stored Data</h4>

              <p className="text-sm sm:text-[16px] text-primary/90">Only the following information is stored:</p>

              <ul className="text-sm sm:text-[16px] list-decimal ml-6 space-y-0.5 text-primary/80">
                <li className="pl-1">Random salt</li>
                <li className="pl-1">Random nonce</li>
                <li className="pl-1">Encrypted cipertext (including the authentication tag)</li>
              </ul>

              <p className="text-sm sm:text-[16px] text-primary/90">Your original note and password are never stored in plain text.</p>
            </div>

            {/* Password Recovery */}
            <div className="space-y-4">
              <h4 className="sm:text-lg font-semibold">Password Recovery</h4>

              <p className="text-sm sm:text-[16px] text-primary/90">Because the encryption key is derived from your password, the password cannot be recovered. If the password is lost, the encrypted note cannot be decrypted.</p>
            </div>

            {/* Open Source Cryptography */}
            <div className="space-y-4">
              <h4 className="sm:text-lg font-semibold">Open Source Cryptography</h4>

              <p className="text-sm sm:text-[16px] text-primary/90">Protected Notepad uses the excellent @noble/ciphers and @noble/hashes libraries for its cryptographic operations. These libraries are lightweight, audited, and designed with modern web applications in mind.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Keep in Mind */}
      <div className="mt-2 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-bold">8. Keep in Mind</h3>

        <div className="mt-2 sm:mt-4">
          <ul className="list-disc ml-6 space-y-0.5 text-primary/80 text-sm sm:text-[16px]">
            <li className="pl-1">Choose a unique and memorable slug.</li>
            <li className="pl-1">Use a strong password that you won&apos;t forget.</li>
            <li className="pl-1">Your slug identifies your note, while your password protects its contents.</li>
            <li className="pl-1">If you lose your password, there is no way to recover the encrypted note.</li>
          </ul>
        </div>
      </div>

      <div className="my-4 sm:my-20" />
    </div>
  );
}