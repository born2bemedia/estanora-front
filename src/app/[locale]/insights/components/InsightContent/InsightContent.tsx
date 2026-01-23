'use client';

import { useLayoutEffect, useRef } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/kit/button/Button';

import st from './InsightContent.module.scss';

export const InsightContent = ({ content }: { content: string }) => {
  const t = useTranslations('insights');
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
            <div className={st.post__buttons}>
              <Button variant="primary" url="/expertise-and-services" type="link">
                {t('button1', { fallback: 'Explore Solutions' })}
              </Button>
              <Button variant="primary" url="/request-assistance-form" type="link">
                {t('button2', { fallback: 'Get Assistance' })}
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
