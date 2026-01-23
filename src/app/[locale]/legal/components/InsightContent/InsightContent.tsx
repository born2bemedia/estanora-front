'use client';

import { useLayoutEffect, useRef } from 'react';

import st from './InsightContent.module.scss';

export const InsightContent = ({ content }: { content: string }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const sections = contentRef.current.querySelectorAll('h2');
    const newTitles: { [key: string]: string } = {};

    sections.forEach((section) => {
      const id = section.getAttribute('id') || '';
      const title = section.textContent || '';
      newTitles[title] = id;
    });
  }, [content]);

  return (
    <section className={st.post}>
      <div className="_container">
        <div className={st.post__body}>
          <article className={st.post__article}>
            <div
              className={st.content}
              ref={contentRef}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </article>
        </div>
      </div>
    </section>
  );
};
