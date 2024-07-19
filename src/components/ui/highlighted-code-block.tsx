"use client";

import { PartsType } from "@/types/MessageType";
import markdownIt from "markdown-it";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/qtcreator-dark.min.css";
import { CopyIcon } from "@/components/icons/CopyIcon";

interface HighlightedCodeBlockProps {
  part: PartsType;
  role: string;
}

export default function HighlightedCodeBlock({
  part,
  role,
}: HighlightedCodeBlockProps) {
  const codeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCopyClick = (button: HTMLElement) => {
      const preBlock = button.closest("pre");
      const codeBlock = preBlock?.querySelector("code");
      if (codeBlock) {
        navigator.clipboard
          .writeText(codeBlock.innerText)
          .then(() => {
            button.innerHTML = "Copied!";
            setTimeout(() => {
              button.innerHTML = `${CopyIcon} Copy code`;
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const copyButtons = codeContainerRef.current?.querySelectorAll(".copy-btn");
          copyButtons?.forEach((button) => {
            button.removeEventListener("click", handleCopyClick as any);
            button.addEventListener("click", () => handleCopyClick(button as HTMLElement));
          });
        }
      });
    });

    if (codeContainerRef.current) {
      observer.observe(codeContainerRef.current, {
        childList: true,
        subtree: true,
      });

      const copyButtons = codeContainerRef.current.querySelectorAll(".copy-btn");
      copyButtons.forEach((button) => {
        button.addEventListener("click", () => handleCopyClick(button as HTMLElement));
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [part.text]);

  return (
    part.text && (
      <div
        ref={codeContainerRef}
        className={`${role === "model" && "leading-9"}`}
        dangerouslySetInnerHTML={{
          __html: new markdownIt({
            html: true,
            breaks: true,
            highlight: function (str, lang) {
              if (lang && hljs.getLanguage(lang)) {
                try {
                  return (
                    '<pre class="bg-gray-700 rounded-md pt-8 relative">' +
                    `<button class="absolute text-xs flex items-center gap-x-1.5 z-30 top-2 right-2 text-white copy-btn">${CopyIcon} Copy code</button>` +
                    '<code class="hljs">' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    "</code></pre>"
                  );
                } catch (__) { }
              }
              return (
                '<pre class="bg-gray-700 rounded-md pt-8 relative">' +
                `<button class="absolute text-xs flex items-center gap-x-1.5 z-30 top-2 right-2 text-white copy-btn">${CopyIcon} Copy code</button>` +
                '<code class="hljs">' +
                markdownIt().utils.escapeHtml(str) +
                "</code></pre>"
              );
            },
          }).render(part.text),
        }}
      />
    )
  );
}
