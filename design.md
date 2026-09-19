UNMASKED — Design System & Implementation
Guidelines
1. Document Purpose
This document defines the visual language, design tokens, component behavior, accessibility requirements,
responsive rules, and implementation constraints for:
UNMASKED: Beyond "I'm Fine"
UNMASKED is a reflective mental well-being platform for university students. It helps users explore the gap
between their public persona and internal emotional state, organize cognitive burdens, identify underlying
needs, and commit to one manageable action.
This document is intended to be used by:
Product designers
Frontend developers
UI implementation agents
Design-to-code systems
QA reviewers
Future contributors
The system must prioritize:
Emotional safety
Clarity
User agency
Accessibility
Privacy transparency
Consistent implementation
Low cognitive load
Responsive usability
The design should feel calm and human without becoming vague, decorative, childish, clinical, or difficult to
navigate.
•
•
•
•
•
•
1.
2.
3.
4.
5.
6.
7.
8.
1
2. Product Design Principles
2.1 Warm Humanist Minimalism
The interface should feel:
Calm
Warm
Human
Reflective
Spacious
Non-judgmental
Modern
Quietly tactile
Avoid:
Hospital-like clinical interfaces
Excessive medical symbolism
Childish illustrations
Aggressive gradients
High-chroma neon colors
Gamification-heavy visuals
Excessive floating elements
Decorative animations that distract from reflection
Overly dense dashboards
The product should communicate:
"You are allowed to slow down and understand what you are carrying."
It should not communicate:
"You must optimize yourself, complete your wellness tasks, or fix yourself immediately."
2.2 Emotional Safety Over Visual Novelty
Visual creativity is encouraged, but it must never reduce clarity.
Do not sacrifice:
Readability for aesthetics
Button clarity for minimalism
Error visibility for softness
Crisis-resource discoverability for visual subtlety
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
2
User control for automated behavior
Accessibility for rounded visual treatment
When a visual decision conflicts with usability or emotional safety, usability and emotional safety take
priority.
2.3 User Agency
UNMASKED is a reflective aid, not an authority that defines the user's emotional condition.
The interface must:
Present AI output as suggestions, not diagnoses
Allow users to confirm, reject, edit, or replace AI-generated insights
Avoid definitive psychological labels
Avoid implying that the system fully understands the user
Avoid forcing users to disclose sensitive information
Allow users to skip or leave optional reflections
Make destructive actions explicit and reversible where possible
Preferred language:
"Mungkin kebutuhan yang sedang muncul adalah..."
Avoid:
"Masalah emosionalmu adalah..."
2.4 Privacy-First Communication
The product is designed around local-first storage and no mandatory account.
Privacy claims must be accurate and must not be exaggerated.
Only communicate claims that are technically true for the implemented architecture.
For example:
"Disimpan di browser ini" is acceptable if data is genuinely stored locally.
"Tidak dikirim ke server" must only be used if the relevant data is actually not transmitted.
"100% anonim" must not be used if external AI processing receives identifiable or sensitive data.
AI processing and data transmission behavior must be clearly disclosed.
•
•
•
•
•
•
•
•
•
•
•
•
•
3
Privacy messaging must distinguish between:
Local browser storage
Temporary in-memory session data
Data sent to an AI service
Data permanently stored
Data deleted by the user
3. Design Tokens
3.1 Token Source of Truth
All implementation must use the tokens defined in this section.
Do not introduce alternative primary, secondary, background, or surface colors without updating this
document.
The foundational visual system is:
Warm Bone
Muted Sage
Soft Terracotta
Deep Slate
Soft Neutral Surfaces
The earlier bluish-lavender palette is not part of the canonical UNMASKED color system.
3.2 Color Palette
Light Theme
colors:
background:
DEFAULT: "#FAF9F6"
subdued: "#F4F5F0"
surface:
DEFAULT: "#FFFFFF"
subtle: "#F8F8F5"
muted: "#F2EFE9"
elevated: "#FFFFFF"
text:
1.
2.
3.
4.
5.
•
•
•
•
•
4
primary: "#1E293B"
secondary: "#475569"
muted: "#64748B"
inverse: "#FFFFFF"
border:
DEFAULT: "#E2E8F0"
subtle: "#E8E8E2"
strong: "#CBD5E1"
primary:
DEFAULT: "#4A6B5D"
hover: "#3D584C"
active: "#344C41"
subtle: "#E8EFEA"
contrast: "#FFFFFF"
accent:
DEFAULT: "#C86D51"
hover: "#B75D45"
active: "#A9503B"
subtle: "#FBE9E3"
contrast: "#FFFFFF"
Dark Theme
dark:
background:
DEFAULT: "#0F172A"
subdued: "#111C2D"
surface:
DEFAULT: "#1E293B"
subtle: "#243244"
muted: "#263143"
elevated: "#27374A"
text:
primary: "#F1F5F9"
secondary: "#CBD5E1"
muted: "#94A3B8"
inverse: "#0F172A"
border:
DEFAULT: "#334155"
subtle: "#29384A"
5
strong: "#475569"
primary:
DEFAULT: "#8FB9A5"
hover: "#A5CBB5"
active: "#B8D8C5"
subtle: "#20382F"
contrast: "#10251B"
accent:
DEFAULT: "#E39A7E"
hover: "#EDB09A"
active: "#F2C0AC"
subtle: "#422B27"
contrast: "#2A1712"
Color Usage Rules
primary is the main action color.
accent is reserved for warmth, emotional emphasis, personal insight, and human connection.
accent must not automatically become the default secondary button color across the entire
application.
Do not use accent color for every highlighted element.
Do not use color as the only method of communicating meaning.
All semantic colors must be paired with text labels and/or icons.
3.3 Semantic Color Taxonomy
Semantic colors represent the Circle of Control categories.
Within Control
within-control:
background: "#D1FAE5"
foreground: "#047857"
border: "#A7F3D0"
Meaning:
Things the user can directly influence or act on today.
•
•
•
•
•
•
6
Influence & Communication
influence:
background: "#FEF3C7"
foreground: "#B45309"
border: "#FDE68A"
Meaning:
Things that require communication, negotiation, boundaries, or collaboration.
Outside Control
outside-control:
background: "#F1F5F9"
foreground: "#475569"
border: "#CBD5E1"
Meaning:
Things the user cannot directly control, including past events, systemic conditions, or other
people's perceptions.
Crisis & Immediate Support
crisis:
background: "#FFE4E6"
foreground: "#BE123C"
border: "#FECDD3"
Meaning:
Access to immediate support and safety resources.
Semantic Rules
Semantic colors must not be used as decorative color categories.
Every semantic badge must include a readable label.
Do not communicate category meaning through color alone.
Crisis support must remain visually distinguishable from ordinary informational content.
Crisis colors should be calm but sufficiently prominent.
Crisis UI must not be hidden solely to preserve minimalism.
•
•
•
•
•
•
7
4. Typography
4.1 Font Families
Headings
Plus Jakarta Sans
Used for:
Page titles
Section headings
Hero headlines
Primary navigation emphasis
Important calls to action
Body
Inter
Used for:
Paragraphs
Form labels
Helper text
Descriptions
Reflection content
Metadata
Fallback stack:
font-family:
"Plus Jakarta Sans",
"Inter",
system-ui,
-apple-system,
BlinkMacSystemFont,
"Segoe UI",
sans-serif;
•
•
•
•
•
•
•
•
•
•
•
8
4.2 Type Scale
typography:
display:
fontFamily: "Plus Jakarta Sans"
fontSize: "3.5rem"
lineHeight: "1.15"
fontWeight: 600
letterSpacing: "-0.03em"
display-mobile:
fontFamily: "Plus Jakarta Sans"
fontSize: "2.25rem"
lineHeight: "1.2"
fontWeight: 600
letterSpacing: "-0.02em"
heading-xl:
fontFamily: "Plus Jakarta Sans"
fontSize: "2.5rem"
lineHeight: "1.2"
fontWeight: 600
letterSpacing: "-0.02em"
heading-lg:
fontFamily: "Plus Jakarta Sans"
fontSize: "2rem"
lineHeight: "1.3"
fontWeight: 600
letterSpacing: "-0.015em"
heading-md:
fontFamily: "Plus Jakarta Sans"
fontSize: "1.5rem"
lineHeight: "1.35"
fontWeight: 600
letterSpacing: "-0.01em"
heading-sm:
fontFamily: "Plus Jakarta Sans"
fontSize: "1.25rem"
lineHeight: "1.4"
fontWeight: 500
letterSpacing: "-0.005em"
body-lg:
9
fontFamily: "Inter"
fontSize: "1.125rem"
lineHeight: "1.7"
fontWeight: 400
body-md:
fontFamily: "Inter"
fontSize: "1rem"
lineHeight: "1.65"
fontWeight: 400
body-sm:
fontFamily: "Inter"
fontSize: "0.875rem"
lineHeight: "1.55"
fontWeight: 400
label-lg:
fontFamily: "Plus Jakarta Sans"
fontSize: "0.875rem"
lineHeight: "1.4"
fontWeight: 600
label-md:
fontFamily: "Plus Jakarta Sans"
fontSize: "0.8125rem"
lineHeight: "1.4"
fontWeight: 600
label-sm:
fontFamily: "Plus Jakarta Sans"
fontSize: "0.75rem"
lineHeight: "1.35"
fontWeight: 500
Typography Rules
Do not use text smaller than 12px for meaningful UI information.
Do not use uppercase text for long sentences.
Avoid excessive letter spacing.
Use relaxed line-height for reflective content.
Use narrower line lengths for long-form text.
Body content should generally remain within 60–75ch .
Headings must wrap naturally rather than being forced into extremely narrow containers.
Do not use overly thin font weights for essential information.
•
•
•
•
•
•
•
•
10
5. Spacing System
Use a consistent spacing scale.
spacing:
1: "0.25rem"
2: "0.5rem"
3: "0.75rem"
4: "1rem"
5: "1.25rem"
6: "1.5rem"
8: "2rem"
10: "2.5rem"
12: "3rem"
16: "4rem"
20: "5rem"
Layout Spacing
layout:
desktop-gutter: "1.5rem"
mobile-gutter: "1rem"
desktop-section-gap: "4rem"
mobile-section-gap: "2.5rem"
card-padding: "1.5rem"
card-padding-mobile: "1.25rem"
Spacing Principles
Use whitespace to create hierarchy, not to hide missing structure.
Avoid excessive empty space inside compact controls.
Maintain tighter spacing within related content groups.
Use larger spacing between unrelated sections.
Reflection content should feel spacious but not inefficient.
Mobile layouts must not require excessive scrolling due to unnecessary padding.
6. Layout & Responsive Rules
6.1 General Layout
The application uses a flexible layout system rather than forcing every page into a bento grid.
•
•
•
•
•
•
11
Desktop
Minimum target width: 1024px
Maximum content width: 1280px
Horizontal page padding: 24px
Tablet
Width: 640px–1023px
Horizontal page padding: 20px
Mobile
Width: below 640px
Horizontal page padding: 16px
6.2 Layout Patterns by Page Type
Landing Page
May use:
Bento-inspired sections
Split hero layouts
Horizontal process previews
Asymmetric visual compositions
Reflection Journey
Must prioritize:
Single focused content area
Minimal distractions
Clear step progression
Readable form width
Strong next-action hierarchy
Do not force a dense dashboard layout into the reflection journey.
•
•
•
•
•
•
•
•
•
12
Reflection Canvas
May use:
Bento grid
Summary cards
Responsive asymmetric blocks
The layout must collapse gracefully into a readable vertical flow on mobile.
My Space
Should use:
Structured list layouts
Timeline patterns
Expandable cards
Clear data hierarchy
Avoid unnecessary decorative bento compositions when users are reviewing history.
Crisis Support
Must use:
High-clarity content structure
Clearly labeled actions
Strong information hierarchy
Easy access to phone/contact actions
Minimal decorative distraction
6.3 Responsive Behavior
Desktop
Multi-column layouts are allowed.
Two-column reflection inputs may be used.
Cards may form asymmetric compositions.
Navigation may remain horizontal.
Tablet
Two-column layouts may collapse when content becomes cramped.
Primary actions must remain visible.
Cards should use balanced widths.
Avoid forcing three narrow columns.
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
13
Mobile
Default to single-column flow.
Convert horizontal stepper into compact scrollable or stacked navigation.
Stack comparison panels vertically.
Ensure action buttons are full-width or comfortably tappable.
Avoid horizontal overflow.
Do not place essential text inside narrow fixed-width cards.
Preserve clear separation between content sections.
7. Border Radius
Use a restrained radius hierarchy.
radius:
control: "0.75rem"
card: "1.25rem"
large-card: "1.5rem"
modal: "1.5rem"
pill: "9999px"
Usage
Inputs: 12px
Standard cards: 20px
Large feature cards: 24px
Modals: 24px
Buttons and chips: pill-shaped when appropriate
Do not use maximum rounding on every element.
Avoid nesting multiple heavily rounded containers unnecessarily.
The interface should feel organic, not inflated or excessively bubble-like.
8. Elevation, Borders & Surfaces
8.1 Surface Hierarchy
Base Canvas
#FAF9F6
•
•
•
•
•
•
•
•
•
•
•
•
•
•
14
Standard Card
background: #FFFFFF
border: 1px solid #E2E8F0
Subtle Section
background: #F4F5F0
Elevated Overlay
background: #FFFFFF
border: 1px solid #E2E8F0
shadow: subtle ambient shadow
8.2 Shadow Rules
Use shadows sparingly.
Preferred:
box-shadow:
0 4px 20px -2px rgba(30, 41, 59, 0.04),
0 12px 32px -4px rgba(74, 107, 93, 0.05);
Use stronger shadows only for:
Modals
Dropdowns
Floating panels
Elevated interactive surfaces
Do not use large dramatic shadows to create visual hierarchy.
Borders should remain sufficient to distinguish surfaces even when shadows are disabled.
9. Component System
Every reusable component must define its states.
•
•
•
•
15
Minimum required states:
Default
Hover
Focus-visible
Active / Pressed
Selected
Disabled
Loading
Error
Success
Empty
Not every component requires every state visually, but its behavior must be defined.
9.1 Buttons
Primary Button
Use for the main action of a section or screen.
Background: primary
Text: primary contrast
Shape: pill
Minimum height: 44px
Horizontal padding: 20–28px
Examples:
Mulai Membuka Topeng
Mulai Refleksi
Lanjut Mengurai Beban
Selesaikan Refleksi
Secondary Button
Use for supporting actions.
Background: transparent or white
Border: standard border
Text: primary text
•
•
•
•
16
Accent Button
Use selectively for:
Personal insight confirmation
Human connection emphasis
Emotionally meaningful but non-critical actions
Do not use terracotta as a generic secondary button throughout the application.
Destructive Button
Use for:
Delete all local data
Clear session
Irreversible actions
Destructive actions must remain visually recognizable and must not be disguised as neutral actions.
9.2 Button Rules
Buttons must have accessible names.
Icon-only buttons require accessible labels.
Disabled buttons must not be the only explanation for unavailable actions.
Loading buttons must prevent duplicate submissions.
Do not use hover-only information for essential actions.
Buttons must not rely solely on color to communicate their purpose.
Touch targets must be at least 44 × 44px .
9.3 Inputs & Textareas
Standard Input
Background: #FFFFFF
Border: #E2E8F0
Radius: 12px
Padding: 14px 16px
Minimum height: 44px
•
•
•
•
•
•
•
•
•
•
•
•
•
17
Focus State
border-color: #4A6B5D;
box-shadow: 0 0 0 3px rgba(74, 107, 93, 0.15);
Rules
Every input must have a visible or accessible label.
Placeholder text must not replace the label.
Helper text must explain what the user can enter.
Textareas should support comfortable multi-line writing.
Avoid excessively small input heights.
Preserve entered content when validation fails.
Do not clear user input unexpectedly.
9.4 Validation & Error States
Errors must be clear without being shaming.
Preferred approach:
Explicit error message
Clear association with the affected field
Accessible error semantics
Subtle but distinguishable error styling
Actionable correction guidance
Example:
Tuliskan minimal satu hal sebelum melanjutkan.
Avoid:
Input tidak valid.
Avoid relying only on a red border.
Error styling must remain visually distinct from:
Neutral helper text
Success messages
Informational messages
Crisis support
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
18
9.5 Chips & Tags
Used for:
Persona selection
Emotional reflection tags
Burden categories
Semantic categories
Filters
States
Default
Hover
Selected
Focus
Disabled
Selected chips should use:
Background: primary subtle
Border: primary
Text: primary
Chips must remain readable without color perception.
9.6 Cards
Cards should have a clear purpose.
Every card should communicate at least one of:
A meaningful piece of information
A user action
A reflection prompt
A summary
A decision
A navigation destination
Avoid cards that exist only to decorate the page.
•
•
•
•
•
•
•
•
•
•
•
19
Card Rules
Standard padding: 24px
Mobile padding: 20px
Standard radius: 20px
Border: subtle neutral border
Use shadows only when elevation is meaningful
Avoid excessive nested cards
Avoid placing too many competing actions inside one card
10. Motion & Interaction
10.1 Motion Philosophy
Motion should feel:
Gentle
Predictable
Intentional
Non-distracting
Supportive of comprehension
Motion must never be required to understand essential information.
10.2 Motion Tokens
motion:
fast: "150ms"
standard: "200ms"
calm: "300ms"
easing: "cubic-bezier(0.2, 0.8, 0.2, 1)"
Use:
150ms for small state changes
200ms for ordinary transitions
300ms for cards and meaningful transitions
Avoid applying 300ms indiscriminately to every property.
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
20
10.3 Reduced Motion
The application must respect:
@media (prefers-reduced-motion: reduce)
When reduced motion is enabled:
Disable decorative movement
Replace sliding transitions with instant or opacity transitions
Disable continuous ambient animations
Avoid animated card movement
Preserve functionality without animation
Keep breathing exercises usable through static instructions or simplified timing
10.4 Breathing Exercise
The breathing exercise is an active user tool, not a permanently animated decoration.
Rules:
Animation starts only when the user initiates the exercise.
The user can pause or stop it.
The user can read the instructions without animation.
The interface must indicate the current phase using text, not animation alone.
The exercise must respect reduced-motion preferences.
The animation must not interfere with navigation or scrolling.
The prompt references both a 4-7-8 breathing exercise and a separate box-breathing tool. These must not
be treated as identical patterns.
Each breathing tool must explicitly define:
Inhale duration
Hold duration
Exhale duration
Optional pause
Number of cycles
Stop behavior
10.5 Hover & Active States
Cards should not jump aggressively on hover.
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
21
Preferred interaction:
Slight border change
Subtle shadow adjustment
Small opacity or background shift
No large vertical translation
No excessive glow
All interactions must also work on touch devices.
11. Accessibility Requirements
UNMASKED must target WCAG 2.2 AA principles where reasonably applicable.
11.1 General Requirements
Minimum touch target: 44 × 44px
Keyboard navigable
Visible :focus-visible state
Semantic HTML
Proper heading hierarchy
Accessible form labels
Accessible button names
No color-only communication
Sufficient text contrast
Logical tab order
Screen-reader-compatible interactive elements
No keyboard traps
No auto-playing essential motion
11.2 Focus State
Focus must remain clearly visible.
Preferred:
outline: 2px solid #4A6B5D;
outline-offset: 3px;
Do not remove focus indicators merely for visual cleanliness.
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
22
11.3 Contrast
All text and controls must be tested for contrast.
Particular attention must be given to:
Muted text
Amber semantic labels
Slate semantic labels
Placeholder text
Disabled controls
Dark mode buttons
Small metadata
Badge text
Do not assume that a visually soft palette automatically satisfies accessibility requirements.
11.4 Screen Reader Behavior
Interactive controls must expose meaningful labels.
Examples:
aria-label="Hapus semua data lokal"
aria-label="Tutup panel refleksi"
aria-label="Pilih kategori Dalam Kendaliku"
Decorative icons must not create unnecessary screen-reader noise.
12. Privacy & Sensitive Data UX
12.1 Privacy Messaging
Privacy messaging must be specific and technically accurate.
Preferred:
Data refleksimu disimpan di browser ini.
If AI processing occurs:
•
•
•
•
•
•
•
•
23
Sebagian isi refleksi dapat diproses oleh layanan AI untuk menghasilkan saran reflektif.
Do not claim:
Semua data selalu berada di perangkatmu.
unless this is technically true for the entire flow.
12.2 Local Storage
The My Space page uses IndexedDB for persistent local data where applicable.
The interface must explain:
Where data is stored
Whether it is stored locally
Whether it is synced
Whether clearing browser data affects it
Whether data can be exported
Whether AI-generated insights are stored
How to delete all local data
12.3 Destructive Data Deletion
The "Hapus Semua Data Lokal & Sesi Sekarang Juga" action must:
Be clearly destructive
Require confirmation
Explain what will be deleted
Avoid ambiguous wording
Not delete data before confirmation
Provide clear completion feedback
Handle failure gracefully
Example confirmation:
Semua sesi refleksi dan data lokal yang tersimpan di browser ini akan dihapus. Tindakan ini
tidak dapat dibatalkan.
•
•
•
•
•
•
•
•
•
•
•
•
•
•
24
13. Product-Specific Screen Guidelines
13.1 Landing Page — /
Purpose
Introduce UNMASKED and encourage users to begin a reflection without requiring an account.
Required Structure
Header
Hero
Problem showcase
Four-step journey preview
Privacy and ethics trust section
Crisis support access
Footer
Header
Navigation:
Tentang
Cara Kerja
Dukungan Krisis
Mulai Membuka Topeng
Rules:
Keep navigation minimal.
Primary CTA must remain visually prominent.
Mobile navigation must not become crowded.
Crisis support must remain discoverable.
Hero
The hero should communicate:
Emotional relevance
Non-judgmental tone
University-student context
Clear product purpose
Low-friction entry
Primary CTA:
Mulai Refleksi
1.
2.
3.
4.
5.
6.
7.
•
•
•
•
•
•
•
•
•
•
•
•
•
25
Supporting privacy text must be technically accurate.
Interactive Hero Visual
The persona-versus-reality slider is a visual storytelling device.
Rules:
Must not be required to understand the hero message.
Must work with keyboard and touch.
Must have an accessible label.
Must not depend exclusively on hover.
Must have a usable mobile alternative.
Must not imply a clinical diagnosis.
Avoid overly dramatic emotional imagery.
13.2 Reflection Journey — /journey
Purpose
Guide the user through four reflective stages:
MASK
LOAD
NEED
ACTION
General Rules
Keep the interface focused.
Display one primary task at a time.
Show clear progress.
Preserve user input.
Avoid unnecessary navigation.
Make optional fields clearly optional.
Allow users to go back without losing data.
Avoid overwhelming users with multiple competing actions.
13.3 MASK
Purpose
Help users explore the gap between public presentation and internal experience.
•
•
•
•
•
•
•
1.
2.
3.
4.
•
•
•
•
•
•
•
•
26
Layout
Desktop:
Two-column comparison
Mobile:
Stacked sections
Required Elements
Public persona tags
Internal feeling tags
Optional custom input
Reveal slider or comparison interaction
Empathetic validation message
Continue action
UX Rules
Do not imply that a mismatch is inherently unhealthy.
Avoid judgmental wording.
Do not force users to choose emotionally intense tags.
Allow custom input.
Ensure selected states are clearly visible.
Support keyboard and touch interaction.
13.4 LOAD
Purpose
Help users externalize and categorize burdens.
Required Elements
Brain dump textarea
AI parsing trigger
Burden cards
Three-column Circle of Control board
Drag-and-drop interaction
Manual alternative for users who cannot or do not want to drag
Let It Go action for outside-control cards
Drag-and-Drop Rules
Drag-and-drop must not be the only interaction method.
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
27
Provide:
Keyboard-accessible movement
Select destination menu
Move buttons
Clear drop-zone labels
Screen-reader announcements where appropriate
Let It Go Animation
The dissolving animation is optional and decorative.
It must not imply that the underlying problem has disappeared in real life.
Use language that frames it as:
Melepaskan hal yang tidak dapat kukendalikan untuk saat ini.
Avoid:
Masalah ini sudah selesai.
13.5 NEED
Purpose
Present AI-generated reflective suggestions.
Required Elements
Loading state
Three insight cards
Reflective mirror prompt
Confirm action
Reject/edit action
Write-your-own alternative
AI Output Rules
AI-generated content must be presented as tentative.
Preferred:
Mungkin ada kebutuhan untuk beristirahat tanpa merasa bersalah.
•
•
•
•
•
•
•
•
•
•
•
28
Avoid:
Kamu sebenarnya mengalami emotional exhaustion.
Avoid diagnostic language.
Loading State
The loading state must:
Explain that the system is preparing reflections
Avoid implying clinical analysis
Provide a calm visual indicator
Not block the entire application unnecessarily
Handle slow or failed requests
Provide retry behavior
Example:
Sedang menyusun beberapa kemungkinan refleksi dari jawabanmu...
13.6 ACTION
Purpose
Help the user choose exactly one manageable next step.
Required Elements
Three low-barrier action cards
Single-choice selector
Clear action descriptions
Completion navigation
Rules
Exactly one action must be selected.
Selection must be visually and semantically clear.
Do not frame unselected actions as failures.
Avoid creating a new productivity burden.
Action cards must be understandable without opening additional panels.
Each action should realistically take less than five minutes.
Example Actions
Grounding / breathing
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
29
Boundary-setting script
Short physical pause
13.7 Reflection Canvas — /canvas
Purpose
Synthesize the completed reflection into a meaningful, readable summary.
Layout
Desktop may use a bento-inspired summary layout.
Mobile must become a clear vertical sequence.
Required Blocks
Topeng yang Kubuka
Beban yang Kutata
Kesadaran Intiku
Komitmen Mikroku
Rules
The canvas is a reflection summary, not a performance dashboard.
Avoid scores, rankings, streaks, or productivity metrics.
Avoid making the user feel evaluated.
The committed action must be visually important but not gamified aggressively.
Confetti must be subtle, optional, and disabled under reduced motion.
Completion must not imply emotional recovery or resolution.
Export
The PNG export must:
Preserve readable typography
Avoid exposing unnecessary private metadata
Provide a clear export status
Work on supported browsers
Handle export failure gracefully
Session Closure
The user must be able to:
Save locally
•
•
1.
2.
3.
4.
•
•
•
•
•
•
•
•
•
•
•
•
30
Export
Copy selected scripts
Close the session
Clear temporary session data
13.8 My Space — /my-space
Purpose
Provide a private local space for reviewing previous reflections.
Required Elements
Privacy status
Repeated-theme insight
Session history
Expandable session cards
Delete-all-data action
Rules
Clearly explain local storage behavior.
Avoid presenting patterns as diagnoses.
Use tentative wording for repeated themes.
Allow users to delete individual sessions if supported.
Avoid making historical data feel like surveillance.
Avoid excessive analytics-style charts.
Do not use emotional data to produce scores or rankings.
Preferred:
Tema yang beberapa kali muncul dalam refleksimu.
Avoid:
Analisis kondisi mentalmu.
13.9 Crisis Support — /support
Purpose
Provide immediate access to professional and emergency support resources.
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
31
Design Priority
Clarity and discoverability take precedence over decorative minimalism.
Required Elements
Clear supportive introduction
Emergency contact information
Direct call actions on mobile
Campus counseling guidance
Independent grounding exercise
Medical and ethical disclaimer
Rules
Crisis support must be accessible without completing the reflection journey.
Do not hide emergency resources behind multiple interactions.
Phone numbers must be verified before production release.
Contact information must include geographic/contextual scope.
Do not imply that UNMASKED replaces professional help.
Avoid alarmist language while maintaining clear urgency.
Do not make the crisis page visually indistinguishable from an ordinary informational page.
Crisis CTA
The crisis CTA should be:
Clearly labeled
Easy to locate
High enough in visual hierarchy
Not disguised as a decorative badge
Accessible on mobile
Available from the landing page and relevant persistent navigation areas
14. Persistent Grounding / Support Access
A persistent support entry may be used if it does not obstruct content.
Requirements
Must not cover buttons or form fields.
Must respect mobile safe areas.
Must not appear as an alarming emergency notification by default.
Must have an accessible label.
Must be dismissible or minimizable where appropriate.
Must remain discoverable through navigation.
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
32
Must not interrupt the user's reflection flow unnecessarily.
Preferred tone:
Butuh jeda? Buka alat grounding.
Avoid overly alarming labels unless the user explicitly enters a crisis-related flow.
15. Empty, Loading, Error & Success States
Every major screen must define these states.
Empty State
Should explain:
What is missing
Why it matters
What the user can do next
Loading State
Should explain:
What is being processed
Whether the user needs to wait
Whether cancellation or navigation is possible
Error State
Should explain:
What failed
Whether the user's data is safe
What action can be taken next
Success State
Should confirm:
What happened
Whether data was saved
What the next available action is
•
•
•
•
•
•
•
•
•
•
•
•
•
33
Avoid generic messages such as:
Something went wrong.
unless accompanied by useful context.
16. Content & Microcopy Principles
Use Indonesian that feels:
Natural
Warm
Direct
Respectful
Modern
Non-clinical
Appropriate for university students
Avoid:
Overly formal medical terminology
Infantilizing language
Excessive motivational clichés
Forced positivity
Shame-based language
Absolutist psychological claims
Overly poetic copy that obscures the action
Preferred tone:
Pelan-pelan saja. Kita urai satu hal terlebih dahulu.
Avoid:
Kamu harus segera memperbaiki hidupmu.
17. Implementation Constraints
17.1 Consistency
Do not introduce:
New colors without token approval
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
34
Arbitrary border radii
Unspecified shadows
Random font sizes
Inconsistent button shapes
Different spacing systems per page
Unnecessary component variants
17.2 Component Reuse
Prefer reusable components such as:
Button
IconButton
Card
Badge
Chip
Input
Textarea
RadioCard
ProgressStepper
InsightCard
BurdenCard
EmptyState
LoadingState
ErrorState
Modal
Toast
SupportBanner
Components should receive variants through props rather than duplicating near-identical implementations.
17.3 No Unnecessary Overengineering
Do not introduce:
Complex animation libraries for simple transitions
Excessive state management for local interactions
Unnecessary chart libraries
Heavy visual effects
Decorative 3D assets
Unnecessary gradients
Complex layout systems where standard CSS Grid/Flexbox is sufficient
•
•
•
•
•
•
•
•
•
•
•
•
•
35
18. Quality Checklist Before Release
Visual
[ ] Colors follow the canonical token system
[ ] No conflicting color definitions exist
[ ] Typography hierarchy is consistent
[ ] Radius usage is restrained
[ ] Shadows are subtle
[ ] Layout does not feel excessively dense
[ ] Mobile layout is readable
UX
[ ] Every screen has a clear primary action
[ ] User can navigate backward without losing data
[ ] AI output can be rejected or edited
[ ] Drag-and-drop has a non-drag alternative
[ ] Crisis support is easy to access
[ ] Destructive actions require confirmation
[ ] Empty/loading/error states are implemented
Accessibility
[ ] Keyboard navigation works
[ ] Focus states are visible
[ ] Touch targets are sufficiently large
[ ] Inputs have accessible labels
[ ] Color is not the only information carrier
[ ] Reduced motion is supported
[ ] Text contrast is tested
[ ] Screen-reader labels are meaningful
Privacy
[ ] Privacy claims match actual architecture
[ ] Local storage behavior is explained
[ ] AI data processing is disclosed accurately
[ ] Delete-all-data behavior is clear
[ ] Sensitive data is not exposed unnecessarily in exports
Emotional Safety
[ ] No diagnostic claims
[ ] No shame-based validation
[ ] No forced positivity
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
36
[ ] No excessive gamification
[ ] No misleading claims of emotional recovery
[ ] Crisis resources are clear and accessible
[ ] User retains agency over AI-generated insights
19. Final Design Direction
UNMASKED should feel like a quiet, trustworthy space where students can pause, reflect, and identify one
manageable next step.
The interface should be:
Warm, spacious, tactile, clear, private, and emotionally respectful.
It should not become:
A clinical dashboard, productivity tracker, therapy replacement, or gamified self-improvement
application.
The design system must balance emotional softness with functional clarity.
Softness is expressed through:
Warm surfaces
Muted sage
Restrained terracotta
Generous spacing
Gentle motion
Human language
Calm visual hierarchy
Clarity is protected through:
Consistent tokens
Explicit component states
Accessible interactions
Clear error handling
Strong crisis-resource visibility
Accurate privacy communication
Responsive layouts
User-controlled AI interpretation
The final implementation should feel calm without becoming ambiguous, minimal without becoming
incomplete, and empathetic without compromising usability.
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
37