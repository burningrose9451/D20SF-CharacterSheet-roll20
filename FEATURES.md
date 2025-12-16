# D20SF Character Sheet Features

## Roll20 Integration Features

### Tab System
The character sheet uses Roll20's radio button-based tab system with CSS styling:
- Four main tabs: Character, Abilities, Inventory, Notes
- Tab state is preserved using `attr_sheet_tab` attribute
- Pure CSS tab switching (no JavaScript required for tabs)

### Sheet Workers (JavaScript)
The sheet includes automatic calculations via Roll20 sheetworkers:
- **Attribute Modifiers**: Auto-calculated from ability scores using formula `(score - 10) / 2` rounded down
- **Initiative**: Automatically set to Dexterity modifier
- **Proficiency Bonus**: Auto-calculated from level (+2 at level 1, +1 every 4 levels)
- **Armor Class**: Dynamically calculates from base AC + equipped armor bonuses
- **Add Buttons**: All "Add" buttons in repeating sections are functional via sheetworkers
- **Sheet Initialization**: All calculated values refresh when the sheet opens

### Repeating Sections
The sheet includes 7 repeating sections for customizable content:

1. **repeating_skills** - Custom skills with:
   - Skill name
   - Bonus modifier
   - Proficiency checkbox
   - Roll button for 1d20 + bonus checks

2. **repeating_abilities** - Special abilities with:
   - Ability name and type
   - Usage tracking (current/max)
   - Full text description
   - Custom roll formula
   - Roll button with description display

3. **repeating_feats** - Feats and traits with:
   - Feat name
   - Full description

4. **repeating_weapons** - Weapons with:
   - Weapon name
   - Damage dice (e.g., 1d8)
   - Weapon type
   - Attack bonus
   - Attack roll button (attack + damage)

5. **repeating_armor** - Armor and equipment with:
   - Armor name
   - AC bonus
   - Armor type
   - Equipped checkbox

6. **repeating_inventory** - General items with:
   - Item name
   - Quantity
   - Weight
   - Description

7. **repeating_notes** - Custom notes with:
   - Note title
   - Note content

### Roll Buttons
The sheet includes roll buttons for:
- All 6 core attributes (Str, Dex, Con, Int, Wis, Cha)
- Initiative rolls
- Custom skills
- Special abilities
- Weapon attacks (with separate attack and damage rolls)

### Roll Templates
All rolls use Roll20's default roll template with:
- Named roll output
- Inline dice notation `[[formula]]`
- Attribute references `@{attribute_name}`

### Attribute References
Key attributes available for roll formulas:
- Core stats: `@{strength}`, `@{dexterity}`, `@{constitution}`, `@{intelligence}`, `@{wisdom}`, `@{charisma}`
- Character info: `@{character_name}`, `@{level}`, `@{class}`
- Combat stats: `@{hp}`, `@{hp_max}`, `@{ac}`, `@{initiative}`
- Currency: `@{gold}`, `@{silver}`, `@{copper}`

### Responsive Design
The sheet includes responsive breakpoints:
- Desktop: Full multi-column layouts
- Tablet (768px): Reduced columns
- Mobile (480px): Single column stacked layout

## Customization Examples

### Adding a New Tab
1. Add a new radio input to the tab navigation
2. Add a new tab label with appropriate styling
3. Create a new tab-content div
4. Update CSS selectors for the new tab

### Adding a New Repeating Section
1. Create a fieldset with class `repeating_<section_name>`
2. Define the row structure with appropriate attributes
3. Add an "Add" button using `type="action"`
4. Style the section in CSS

### Creating Custom Roll Buttons
Format: `&{template:default} {{name=Roll Name}} {{roll=[[dice formula]]}}`

Example for custom ability:
```html
<button type="roll" name="roll_custom" 
  value="&{template:default} {{name=Fireball}} {{roll=[[8d6]]}} {{DC=[[15]]}}">
  Cast Spell
</button>
```

## Technical Notes

### Roll20 Specifics
- All sheet attributes must use the `attr_` prefix
- Repeating sections must use the `repeating_` prefix
- Tab switching uses the `.charsheet` prefix for CSS selectors
- All styling requires the `.charsheet` prefix to work in Roll20

### Best Practices
- Keep attribute names lowercase with underscores
- Use semantic naming for repeating sections
- Include descriptive roll button names
- Provide default values where appropriate
- Use appropriate input types (number, text, checkbox)

## Testing Recommendations

To test this sheet in Roll20:
1. Create a new game or use an existing one
2. Go to Game Settings → Character Sheet Template
3. Select "Custom"
4. Paste HTML and CSS into respective tabs
5. Create a test character
6. Verify:
   - All tabs switch correctly
   - Repeating sections can be added/removed
   - Roll buttons output correctly
   - Attributes save and load properly
   - Layout is responsive
