/* "The rules" section, four ways (C's cards, and round 2's three):
 *
 *   cards     — C: a grid of cards, every rule open.
 *   accordion — D: numbered titles, each opening on click (native <details>,
 *               so the text is in the HTML and works without JavaScript).
 *   stages    — E: grouped by when you need them: before you write, while
 *               you write, after you publish.
 *   index     — F: a sticky numbered list beside the rules, lighting up as
 *               you scroll (RulesIndexNav).
 */
import { PRINCIPLES, RULE_STAGES, type Principle } from './content';
import RulesIndexNav from './RulesIndexNav';

export type RulesStyle = 'cards' | 'accordion' | 'stages' | 'index';

const nn = (i: number) => String(i + 1).padStart(2, '0');
const byId = (id: string) => PRINCIPLES.find((p) => p.id === id) as Principle;

function Cards() {
  return (
    <div className="ed-cards">
      {PRINCIPLES.map((p) => (
        <section key={p.id} id={p.id} className="ed-card">
          <h3 className="ed-card-title">{p.title}</h3>
          <div className="ed-prose">{p.body}</div>
        </section>
      ))}
    </div>
  );
}

/* D · Accordion: scan the titles, open the one you need. The first starts open. */
function Accordion() {
  return (
    <div className="ed-acc">
      {PRINCIPLES.map((p, i) => (
        <details key={p.id} id={p.id} className="ed-acc-item" open={i === 0}>
          <summary className="ed-acc-sum">
            <span className="ed-acc-n">{nn(i)}</span>
            <span className="ed-acc-title">{p.title}</span>
            <span className="ed-acc-icon" aria-hidden="true" />
          </summary>
          <div className="ed-acc-body ed-prose">{p.body}</div>
        </details>
      ))}
    </div>
  );
}

/* E · By stage: three columns, in the order you'd need them. */
function Stages() {
  return (
    <div className="ed-stages">
      {RULE_STAGES.map((stage, s) => (
        <section key={stage.name} className="ed-stage">
          <p className="ed-stage-step">Step {s + 1}</p>
          <h3 className="ed-stage-name">{stage.name}</h3>
          {stage.ids.map((id) => {
            const p = byId(id);
            return (
              <div key={id} id={id} className="ed-stage-rule">
                <h4 className="ed-stage-rule-title">{p.title}</h4>
                <div className="ed-prose">{p.body}</div>
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}

/* F · Index: the numbered list stays beside you; the rules read like an article. */
function Index() {
  return (
    <div className="ed-index">
      <RulesIndexNav items={PRINCIPLES.map((p, i) => ({ id: p.id, n: nn(i), title: p.title }))} />
      <div className="ed-index-body">
        {PRINCIPLES.map((p, i) => (
          <section key={p.id} id={p.id} className="ed-index-rule">
            <p className="ed-index-n">{nn(i)}</p>
            <h3 className="ed-index-title">{p.title}</h3>
            <div className="ed-prose">{p.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
}

export function Rules({ style }: { style: RulesStyle }) {
  if (style === 'accordion') return <Accordion />;
  if (style === 'stages') return <Stages />;
  if (style === 'index') return <Index />;
  return <Cards />;
}
