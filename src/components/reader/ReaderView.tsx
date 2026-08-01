"use client";

import { setFontSize } from "@/app/features/readerSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

type ReaderViewProps = {
  title: string;
  author: string;
  imageLink: string;
  summary: string;
};

const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 30;
export default function ReaderView({
  title,
  author,
  imageLink,
  summary,
}: ReaderViewProps) {
  const dispatch = useAppDispatch();
  const fontSize = useAppSelector((state) => state.reader.fontSize);

  function updateFontSize(newSize: number) {
    dispatch(setFontSize(newSize));
  }

  function decreaseFontSize() {
    updateFontSize(
      Math.max(MIN_FONT_SIZE, fontSize - 2),
    );
  }

  function increaseFontSize() {
    updateFontSize(
      Math.min(MAX_FONT_SIZE, fontSize + 2),
    );
  }

  return (
    <div className="reader-layout">
      <aside className="reader-sidebar">
        <h2 className="reader-sidebar__title">
          Reading Settings
        </h2>

        <div className="reader-sidebar__control">
          <span className="reader-sidebar__label">
            Font size
          </span>

          <div className="reader-sidebar__buttons">
            <button
              type="button"
              className="reader-sidebar__button"
              onClick={decreaseFontSize}
              disabled={fontSize <= MIN_FONT_SIZE}
              aria-label="Decrease font size"
            >
              A−
            </button>

            <span className="reader-sidebar__value">
              {fontSize}px
            </span>

            <button
              type="button"
              className="reader-sidebar__button"
              onClick={increaseFontSize}
              disabled={fontSize >= MAX_FONT_SIZE}
              aria-label="Increase font size"
            >
              A+
            </button>
          </div>
        </div>
      </aside>

      <article className="reader-page">
        <header className="reader-page__header">
          <img
            className="reader-page__image"
            src={imageLink}
            alt={`Cover of ${title}`}
          />

          <div>
            <h1>{title}</h1>
            <p>{author}</p>
          </div>
        </header>

        <section className="reader-page__summary">
          <h2>Book Summary</h2>

          <p style={{ fontSize: `${fontSize}px` }}>
            {summary}
          </p>
        </section>
      </article>
    </div>
  );
}
