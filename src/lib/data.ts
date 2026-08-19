interface FAQsProps {
  question: string;
  answer: string;
}

export const faqs: FAQsProps[] = [
  {
    question: "I've forgotten my password, what can I do?",
    answer:
      "Passwords are never sent to the server. I only store encrypted text - which is useless data once a password is lost. Also, I don't know who this text belongs to.",
  },
  {
    question: "Please explain 'Trustless Security'.",
    answer:
      "Your password never leaves your device. I only store encrypted content. You don't have to trust me, or anyone else with your password, since only you know it and only you can decrypt your notes. It's like if you're writing a diary with special characters that only you understand. It doesn't matter where you keep this diary, since only you can understand the text that's inside.",
  },
  {
    question: "How can I make encrypted backup of my notes?",
    answer:
      "It's simple: Open your site with Google Chrome or Mozilla Firefox and save the site before decrypting it (Ctrl + S should work). Make sure to save the site while 'Password required' dialog is still visible. To open your encrypted backup, open saved .html file and type in your password.",
  },
  {
    question: "Can I make a site public?",
    answer:
      "You can add the password after the URL of your site, like this: ProtectedText.com/yourSite?yourPassword which will automatically decrypt yourSite with yourPassword.",
  },
  {
    question: `Why do I see the "Verifying you are human..." screen?`,
    answer: `Sometimes the servers come under attack by scammers attempting to steal user data to brute-force weak passwords, or they may launch DDoS attacks to bring the service offline—hoping users will instead visit their phishing sites. When I detect unusually high traffic, I strengthen my security mechanisms to block these attackers. 
      
    As a result, you may see human verification dialogs. Once completed, these allow me to mark you as a legitimate user (by setting a GDPR-compliant cookie) and grant you full access to the site. 
    
    Just remember: if the site isn’t working, you may simply need to reload it to trigger the verification. This helps your browser receive a pass that lets you continue using the site as usual.`,
  },
  {
    question: `Why is my URL changed from "Mark's notes" to "mark-s-notes"?`,
    answer: `Some characters aren't allowed in URL addresses, that's why your URL is redirected to a URL that has some characters replaced with dashes. You can always type in "Mark's notes" and you'll be redirected to the same URL.`,
  },
  {
    question: "Do I have to use a long password?",
    answer:
      "You don't have to, but it's recommended. The longer the password, the harder it is to guess. Note that your text is protected by both the URL and your password. However, if someone discovers your site, they can try many passwords until they guess yours. This is called a brute-force attack, which I mitigate by using Argon2 hashing. Still, to be more secure, use passwords that are complex and longer than 7 characters.",
  },
  {
    question:
      "Can I use a suspicious internet connection (e.g. Starbucks, Burger King, etc.)?",
    answer:
      "Yes. Your password (or password hashes) are never sent over the network, and all data that's sent or received is always encrypted. Your data is decrypted only on your device, and encrypted before it's returned to the server.",
  },
  {
    question:
      "How can you verify that a password is correct if you don't store it anywhere and don't send it to server? How do you authenticate the user?",
    answer: `The server doesn't know anything about authentication; that's all handled in your browser. There are no users on ProtectedText.com, just sites. Passwords are never saved; not even within encrypted text. Decryption of a page will fail if the password is incorrect, so whoever can decrypt the page must have used the correct password. 
    
    The idea is that I don't have to know the password; I just have to make sure that the password is correct - and one way to check that is to try decrypting some well-known text using the provided password. The "well-known" text I'm using is the URL of the current site (which is different, but known, for each site). 
    
    Once you create the password, I store the encrypted URL, and each time the password needs to be tested, I just try decrypting the encrypted URL. If I get the expected URL, I try using the same password for decrypting the whole site (it's possible -- but very unlikely -- that two different passwords correctly decrypt the same URL, but using that wrong password for decrypting everything else will result in gibberish).`,
  },
  {
    question: "How does overwrite protection work?",
    answer:
      "Overwrite protection prevents you from saving any changes if text was changed in the meantime. (The server stores the hash of the newest content, and sends the hash to the client together with the content. The client has to return that same hash when trying to save updated content. The server compares both the stored and received hashes to determine whether the client was served with the latest changes.)",
  },
  {
    question: "What encryption algorithms are used?",
    answer:
      "I use XChaCha20-Poly1305 for authenticated encryption through @noble/ciphers. Document content is encrypted before it is stored on the server.",
  },
  {
    question:
      "Is the server code available somewhere? I'd like to host the service myself.",
    answer:
      "Yes. I've made the source code publicly available in my repository, including an .env.example file for configuration. You can clone the repository, configure your own environment variables and database, and host your own instance.",
  },
  {
    question:
      "How long do you keep sites on your servers? Will they ever expire?",
    answer:
      "Sites aren't deleted automatically. I'll keep them until you delete them yourself.",
  },
  {
    question: "Is there a length limit?",
    answer: `Yes. The server is made to handle maximum limit of 25,000 characters per document. This helps prevent excessively large documents from affecting performance or storage.`,
  },
  {
    question: "Is there some kind of self-destruct mechanism?",
    answer:
      "All that I have are encrypted versions of notes that you store on the servers, so once you delete your notes, that's it.",
  },
];
