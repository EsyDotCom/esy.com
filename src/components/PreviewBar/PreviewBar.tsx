import './PreviewBar.css';

// The bar over a piece opened from a preview link (src/lib/preview.ts): this is
// a draft, not the published page, and only people with the link can see it.
// Fixed to the bottom of the screen so it's on view wherever the reader is.
export default function PreviewBar({ exitTo }: { exitTo: string }) {
  return (
    <div className="pvb" role="status">
      <p className="pvb-text">
        <b>Preview: not published.</b> <span>Only people with this link can see it, and search engines never do.</span>
      </p>
      <a className="pvb-exit" href={`/api/preview/exit/?to=${encodeURIComponent(exitTo)}`}>
        Exit preview
      </a>
    </div>
  );
}
