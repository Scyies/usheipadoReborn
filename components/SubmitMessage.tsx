import React from "react";

interface Props {
  submitMessage: string;
}

export default function SubmitMessage({submitMessage}: Props) {
  return (
    <div className="p-4 mb-8 bg-pink/70 rounded-full text-center">
      <p className="font-bold text-black">{submitMessage}</p>
    </div>
  );
}
