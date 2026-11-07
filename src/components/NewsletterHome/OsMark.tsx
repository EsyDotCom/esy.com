/** An Esy OS app's name as os.esy.com draws it: Black Ops One, lowercase, the first letter teal
 *  (os.esy.com src/components/folio/app/launcher.tsx, Mark). `ink` sets it dark, for paper. */
export const OsMark = ({ name, size = 'md', ink }: { name: string; size?: 'sm' | 'md' | 'lg'; ink?: boolean }) => (
  <span className={`oa-mark is-${size} ${ink ? 'is-ink' : ''}`}>{name}</span>
);
