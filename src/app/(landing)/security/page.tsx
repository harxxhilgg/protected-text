"use client";

export default function SecurityPage() {
  const hereProps = {
    className: "cursor-pointer font-semibold hover:underline underline-offset-3 hover:text-primary duration-300",
    onClick: () => window.open("https://github.com/harxxhilgg/protected-text", "_blank"),
  };

  return (
    <div className="flex flex-col w-full max-w-90 sm:max-w-3xl mx-auto pt-10 sm:pt-30 gap-10 sm:gap-14">
      {/* Why is it safe? */}
      <div className="flex flex-col gap-5 sm:gap-8">
        <h2 className="text-xl sm:text-3xl font-semibold tracking-tight">Why is it safe?</h2>

        <ol className="flex flex-col gap-4 list-disc text-primary/90 text-sm sm:text-[16px] mx-4">
          <li className="pl-1">Your password isn&apos;t saved to the server - <strong>I can&apos;t decrypt your text</strong> even if I wanted to. Only encrypted text is sent to the server.</li>

          <li className="pl-1"><strong>No registration</strong>, no sessions, <strong>no tracking</strong> or third-party cookies. I don&apos;t even have a concept of a <strong className="italic">&apos;user&apos;</strong> in my system.</li>

          <li className="pl-1">No logging in or out, just close the browser tab and you&apos;re safe.</li>

          <li className="pl-1"><strong>No ads</strong> - I hate ads because they can track you and they&apos;re distracting.</li>

          <li className="pl-1">You don&apos;t have to trust anyone or agree on anything - <strong>check the code yourself.</strong> <span {...hereProps}>(here)</span> All of the code is well written and full of comments so that you can understand in details.</li>

          <li className="pl-1">If someone wants your text, they&apos;ll need the password of that particular site, but they&apos;ll have to find your site first.</li>
        </ol>
      </div>

      {/* Overwrite protection */}
      <div className="flex flex-col gap-5 sm:gap-8">
        <h2 className="text-xl sm:text-3xl font-semibold tracking-tight">Overwrite protection</h2>

        <ol className="flex flex-col gap-4 list-disc text-primary/90 text-sm sm:text-[16px] mx-4">
          <li className="pl-1">You can use the same sub-site from multiple browsers/devices at the same time, without having to worry about ever losing any changes.
          </li>
        </ol>
      </div>

      <div className="my-10" />
    </div>
  );
}