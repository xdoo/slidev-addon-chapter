## MODIFIED Requirements

### Requirement: Deterministic chapter records
The extractor SHALL return chapters once each in presentation order with zero-based `index`, one-based inclusive `startSlide` and `endSlide`, an ordered `slideNumbers` list matching that range, and an ordered readonly `subchapters` collection containing every valid subchapter owned by that chapter.

#### Scenario: Ordered chapter output
- **WHEN** valid chapters start on slides 2 and 5 of a six-slide deck
- **THEN** the output contains two chapters in that order with ranges 2–4 and 5–6

#### Scenario: One-slide chapter
- **WHEN** a chapter declaration is immediately followed by another declaration
- **THEN** the first chapter has equal start and end slide numbers and one slide number

#### Scenario: Existing chapter-only deck
- **WHEN** a valid presentation declares chapters but no subchapters
- **THEN** its chapter IDs, titles, indices, ranges, and slide numbers are unchanged and every chapter has an empty `subchapters` collection
