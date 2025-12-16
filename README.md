# D20SF Character Sheet for Roll20

A custom character sheet for the D20SF Tabletop RPG system, designed for use with Roll20's virtual tabletop platform.

## Features

### Multiple Tabs
The character sheet includes four main tabs that can be switched between:
- **Character**: Basic character information, core attributes, health/resources, and skills
- **Abilities**: Special abilities, feats, and traits
- **Inventory**: Weapons, armor, general items, and currency
- **Notes**: Character background, appearance, and custom notes

### Repeating Sections
The sheet supports Roll20's repeating sections for highly customizable fields:
- **Skills**: Add custom skills with bonuses and proficiency tracking
- **Abilities**: Track special abilities with uses, descriptions, and custom roll formulas
- **Feats & Traits**: Document character feats and traits
- **Weapons**: Manage weapons with attack rolls
- **Armor**: Track armor and equipment status
- **Inventory**: General item tracking with quantity and weight
- **Notes**: Add unlimited custom notes

### Roll20 Integration
- Roll buttons integrated throughout the sheet
- Support for Roll20's roll template syntax
- Attribute references using `@{attribute_name}` syntax
- Inline rolls with `[[dice formula]]` notation

### Sheet Workers (Automatic Calculations)
The sheet includes JavaScript sheetworkers for automated calculations:
- **Attribute Modifiers**: Automatically calculate modifiers from ability scores (Str, Dex, Con, Int, Wis, Cha)
- **Initiative**: Auto-updates based on Dexterity modifier
- **Proficiency Bonus**: Automatically calculated from character level
- **Armor Class**: Dynamically calculates total AC from equipped armor
- **Add Buttons**: Functional "Add" buttons for all repeating sections
- **Sheet Initialization**: All calculated values update when the sheet opens

## File Structure

- `sheet.json` - Roll20 character sheet metadata
- `D20SF.html` - Character sheet HTML structure with embedded sheetworkers (JavaScript)
- `D20SF.css` - Character sheet styling and tab functionality
- `D20SF.js` - Standalone JavaScript file (sheetworkers are embedded in HTML for Roll20)

## Usage

### In Roll20
1. Go to Game Settings in your Roll20 game
2. Select "Custom" as the character sheet template
3. Copy the contents of `D20SF.html` into the HTML Layout tab
4. Copy the contents of `D20SF.css` into the CSS Styling tab
5. Save changes

### For Roll20 Repository Submission
The `sheet.json` file is included for submission to the Roll20 character sheet repository. All three files (`sheet.json`, `D20SF.html`, and `D20SF.css`) should be placed in the appropriate folder.

## Customization

The character sheet is designed to be highly customizable:
- Add new tabs by modifying the tab navigation section
- Create additional repeating sections for new categories
- Customize roll formulas in button values
- Adjust styling in the CSS file

## License

See LICENSE file for details.
