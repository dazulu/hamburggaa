"use client";

export const CSSVariables = ({
  primaryColour,
  secondaryColour,
}: {
  primaryColour: string;
  secondaryColour: string;
}) => {
  return (
    <style jsx global>{`
      :root {
        --primary: ${primaryColour};
        --secondary: ${secondaryColour};

        accent-color: var(--primary);
      }
    `}</style>
  );
};
