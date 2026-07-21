## MODIFIED Requirements

### Requirement: Optional current-chapter highlighting
The component SHALL accept a boolean `highlightCurrent` prop and a `highlightCurrentMode` prop whose values are `hierarchy` (default) or `single`. When `highlightCurrent` is enabled with `hierarchy`, the component SHALL expose the matching chapter and, when present, rendered subchapter entries through accessible semantic state and stable local styling hooks. When enabled with `single`, it SHALL expose current state only on the deepest visible current entry: the active subchapter when subchapters are rendered, otherwise its owning chapter. The component SHALL apply no global CSS side effects.

#### Scenario: Default hierarchy highlights current chapter and subchapter
- **WHEN** `highlightCurrent` and `showSubchapters` are true, `highlightCurrentMode` is omitted, and the current slide belongs to a subchapter in the second chapter
- **THEN** the second chapter entry and that subchapter entry are each marked current with their documented modifier classes and appropriate semantic current state

#### Scenario: Explicit hierarchy mode highlights current chapter and subchapter
- **WHEN** `highlightCurrent` and `showSubchapters` are true, `highlightCurrentMode` is `hierarchy`, and the current slide belongs to a subchapter
- **THEN** the owning chapter and active subchapter are each marked current

#### Scenario: Single mode highlights only the active subchapter
- **WHEN** `highlightCurrent` and `showSubchapters` are true, `highlightCurrentMode` is `single`, and the current slide belongs to a subchapter in the second chapter
- **THEN** only that subchapter entry is marked current
- **AND** its owning chapter entry is not marked current
- **AND** exactly one rendered entry exposes the current semantic state

#### Scenario: Single mode highlights the chapter when no subchapter is active
- **WHEN** `highlightCurrent` is true, `highlightCurrentMode` is `single`, and the current slide belongs to a chapter but precedes its first subchapter
- **THEN** that chapter is marked current
- **AND** no subchapter entry is marked current

#### Scenario: Single mode highlights the visible chapter when subchapters are hidden
- **WHEN** `highlightCurrent` is true, `highlightCurrentMode` is `single`, `showSubchapters` is false or omitted, and the current slide belongs to a subchapter
- **THEN** the owning chapter is marked current
- **AND** exactly one rendered entry exposes the current semantic state

#### Scenario: No current chapter
- **WHEN** the current slide precedes the first declaration
- **THEN** no chapter or subchapter entry is marked current in either highlighting mode

#### Scenario: Existing boolean usage remains compatible
- **WHEN** a consumer passes `highlightCurrent` without `highlightCurrentMode`
- **THEN** the component uses `hierarchy` mode and preserves the existing chapter-plus-subchapter highlighting behavior
