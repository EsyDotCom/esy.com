// Homepage heroes for esy.com as a Marketing Engineering publication
// (2026-09-25). EduStudio (F) is live on the homepage since 2026-09-27; all six
// stay clickable at /prototypes/education/. Each takes the desks resolved against the live
// article list (resolveDesks).
export { default as EduFrontPage } from './EduFrontPage';
export { default as EduSyllabus } from './EduSyllabus';
export { default as EduIssue } from './EduIssue';
// Round 2 (2026-09-27): heroes with Zev's face.
export { default as EduFaceSplit } from './EduFaceSplit';
export { default as EduScene } from './EduScene';
export { default as EduStudio } from './EduStudio';
// Round 3 (2026-09-27): F's phone layouts; desktop is unchanged.
export { EduStudioAfter, EduStudioAvatar, EduStudioProfile } from './EduStudio';
// The promise round (2026-10-06): C is the homepage, B is esy.com/seo.
export { CourseSignup, PROMISES, PromiseStudio } from './promises';
// The homepage's heroes by name (2026-10-09): High floor is live; Portrait is the
// one before it, kept for a one-line revert in src/app/page.js.
export { HomeHeroAtWork, HomeHeroHighFloor, HomeHeroPortrait } from './HomeHeroes';
export type { HeroPromise } from './promises';
export { latestLesson, resolveDesks } from './desks';
export type { Lesson, ResolvedDesk } from './desks';
