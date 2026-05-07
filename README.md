Color: 398c36, 6ec13e
- Primary: 6ec13e
- Secondary: 5c3a1a
- Accent: 398c36
- Background: fafdf7 
- Slate: 

Font: 
- Serif: Georgia
- San-serif: Helvetica
- font-mono: Jetbrains Mono, monospace

Style:
- Glassmorphism
  aurora background: primary + secondary split on background.
- Argiculture-oriented AI start up 

TODO:
- Establish based color (Done)
- add logo to design system (Done)
- Establish style (Done)
- Structure file system (Done)
  - 5 html files
  - 1 css file
  - 1 js file
  - 1 folder /mockups
    - 3 html files
- Create full design system. 
- Host design system on AWS 
- select font (Done)

Design System
I. Primitive Tokens
- Color Ramp of Primary, Secondary, Accent, Neutral
- Spacing
- Radius
- Shadow
- Font + scaling

II. Semantic Tokens Matrix
- axis 1: 
  - Background
  - Text
  - Icon
  - Border
  - Status
- axis 2: 
  - Color
  - Spacing
  - Radius
  - Shadow
  - Font + scaling

III. Component Library
Each component must contains:
  Component Preview
  Components token table: includes all component tokens for the corresponding component, these reference defined semantic tokens strictly.
Each component may has Variants, Versions, and Sizes. Size is the optimized version for each text size. Focus on Large text size (22.5px) only.


- Buttons (done)
  - Variants: CTA (Primary), Secondary, Ghost, Disabled, Loading, Caution, Toggle, 
  - Version: Default, Inverted Surface, Icon Only, borderless
  - Size: Small, Medium, Large (focus), XL, 2XL
- Form (done)
  - Variants: Text inputs, Text area, Dropdown, Date Picker, Multi-select, Radio-select, File Upload, Checkbox
  - Version: Default, With-value, Error
  - Size: Small, Medium, Large (focus), XL, 2XL
- SLider: ...
- Cards
  - Variants: Default, Question Card, List Card, Glass-default
  - Version: Default, Inverted Surface, Selected
- Modal Dialog
- Side Panel
- Toast
- Inline Alert
- badge
- Header
- Sidebar
- Text
- Navbar
- Tabs

IV. Assets
- Logo
- Icons
- Images

V. Mockups
- Wiki
- Chatbot
- Hero
