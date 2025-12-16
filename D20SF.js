/* D20SF Character Sheet - Sheet Workers (JavaScript) */

/* ===== ATTRIBUTE MODIFIER CALCULATIONS ===== */

/**
 * Calculate ability modifier from ability score
 * Standard D&D formula: (score - 10) / 2, rounded down
 */
const calculateModifier = (score) => {
    return Math.floor((score - 10) / 2);
};

/**
 * Auto-calculate attribute modifiers when ability scores change
 */
const attributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

attributes.forEach(attr => {
    on(`change:${attr}`, function(eventInfo) {
        getAttrs([attr], function(values) {
            const score = parseInt(values[attr]) || 10;
            const modifier = calculateModifier(score);
            
            setAttrs({
                [`${attr}_mod`]: modifier
            });
        });
    });
});

/* ===== INITIATIVE CALCULATION ===== */

/**
 * Update initiative when dexterity modifier changes
 */
on('change:dexterity_mod', function(eventInfo) {
    getAttrs(['dexterity_mod'], function(values) {
        const dexMod = parseInt(values.dexterity_mod) || 0;
        
        setAttrs({
            initiative: dexMod
        });
    });
});

/* ===== REPEATING SECTION: ADD BUTTONS ===== */

/**
 * Add new skill when "Add Skill" button is clicked
 */
on('clicked:add_skill', function(eventInfo) {
    getSectionIDs('repeating_skills', function(ids) {
        const newRowId = generateRowID();
        const newRowAttrs = {};
        newRowAttrs[`repeating_skills_${newRowId}_skill_name`] = 'New Skill';
        newRowAttrs[`repeating_skills_${newRowId}_skill_bonus`] = 0;
        newRowAttrs[`repeating_skills_${newRowId}_skill_proficient`] = 0;
        
        setAttrs(newRowAttrs);
    });
});

/**
 * Add new ability when "Add Ability" button is clicked
 */
on('clicked:add_ability', function(eventInfo) {
    getSectionIDs('repeating_abilities', function(ids) {
        const newRowId = generateRowID();
        const newRowAttrs = {};
        newRowAttrs[`repeating_abilities_${newRowId}_ability_name`] = 'New Ability';
        newRowAttrs[`repeating_abilities_${newRowId}_ability_type`] = 'Active';
        newRowAttrs[`repeating_abilities_${newRowId}_ability_uses`] = 0;
        newRowAttrs[`repeating_abilities_${newRowId}_ability_uses_max`] = 0;
        
        setAttrs(newRowAttrs);
    });
});

/**
 * Add new feat when "Add Feat/Trait" button is clicked
 */
on('clicked:add_feat', function(eventInfo) {
    getSectionIDs('repeating_feats', function(ids) {
        const newRowId = generateRowID();
        const newRowAttrs = {};
        newRowAttrs[`repeating_feats_${newRowId}_feat_name`] = 'New Feat';
        
        setAttrs(newRowAttrs);
    });
});

/**
 * Add new weapon when "Add Weapon" button is clicked
 */
on('clicked:add_weapon', function(eventInfo) {
    getSectionIDs('repeating_weapons', function(ids) {
        const newRowId = generateRowID();
        const newRowAttrs = {};
        newRowAttrs[`repeating_weapons_${newRowId}_weapon_name`] = 'New Weapon';
        newRowAttrs[`repeating_weapons_${newRowId}_weapon_damage`] = '1d6';
        newRowAttrs[`repeating_weapons_${newRowId}_weapon_bonus`] = 0;
        
        setAttrs(newRowAttrs);
    });
});

/**
 * Add new armor when "Add Armor" button is clicked
 */
on('clicked:add_armor', function(eventInfo) {
    getSectionIDs('repeating_armor', function(ids) {
        const newRowId = generateRowID();
        const newRowAttrs = {};
        newRowAttrs[`repeating_armor_${newRowId}_armor_name`] = 'New Armor';
        newRowAttrs[`repeating_armor_${newRowId}_armor_ac`] = 0;
        newRowAttrs[`repeating_armor_${newRowId}_armor_equipped`] = 0;
        
        setAttrs(newRowAttrs);
    });
});

/**
 * Add new item when "Add Item" button is clicked
 */
on('clicked:add_item', function(eventInfo) {
    getSectionIDs('repeating_inventory', function(ids) {
        const newRowId = generateRowID();
        const newRowAttrs = {};
        newRowAttrs[`repeating_inventory_${newRowId}_item_name`] = 'New Item';
        newRowAttrs[`repeating_inventory_${newRowId}_item_quantity`] = 1;
        
        setAttrs(newRowAttrs);
    });
});

/**
 * Add new note when "Add Note" button is clicked
 */
on('clicked:add_note', function(eventInfo) {
    getSectionIDs('repeating_notes', function(ids) {
        const newRowId = generateRowID();
        const newRowAttrs = {};
        newRowAttrs[`repeating_notes_${newRowId}_note_title`] = 'New Note';
        
        setAttrs(newRowAttrs);
    });
});

/* ===== ARMOR CLASS CALCULATION ===== */

/**
 * Calculate total AC from base AC and equipped armor
 * This recalculates whenever armor is equipped/unequipped or AC values change
 */
on('change:repeating_armor', function(eventInfo) {
    getSectionIDs('repeating_armor', function(ids) {
        const attrs = ['ac'];
        
        // Gather all armor attributes
        ids.forEach(id => {
            attrs.push(`repeating_armor_${id}_armor_ac`);
            attrs.push(`repeating_armor_${id}_armor_equipped`);
        });
        
        getAttrs(attrs, function(values) {
            let baseAC = parseInt(values.ac) || 10;
            let totalAC = baseAC;
            
            // Add AC from equipped armor
            ids.forEach(id => {
                const equipped = parseInt(values[`repeating_armor_${id}_armor_equipped`]) || 0;
                const armorAC = parseInt(values[`repeating_armor_${id}_armor_ac`]) || 0;
                
                if (equipped === 1) {
                    totalAC += armorAC;
                }
            });
            
            // Note: This is a simple additive model
            // You may want to implement different logic for your game system
            setAttrs({
                ac: totalAC
            });
        });
    });
});

/* ===== SHEET INITIALIZATION ===== */

/**
 * Initialize all modifiers when sheet opens
 * This ensures all calculated values are up to date
 */
on('sheet:opened', function(eventInfo) {
    getAttrs(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'], function(values) {
        const updates = {};
        
        attributes.forEach(attr => {
            const score = parseInt(values[attr]) || 10;
            const modifier = calculateModifier(score);
            updates[`${attr}_mod`] = modifier;
        });
        
        // Also update initiative
        updates.initiative = parseInt(updates.dexterity_mod) || 0;
        
        setAttrs(updates);
    });
});

/* ===== PROFICIENCY BONUS CALCULATION ===== */

/**
 * Calculate proficiency bonus based on character level
 * Standard D&D 5e formula: +2 at level 1, increasing by 1 every 4 levels
 */
on('change:level', function(eventInfo) {
    getAttrs(['level'], function(values) {
        const level = parseInt(values.level) || 1;
        const proficiencyBonus = Math.floor((level - 1) / 4) + 2;
        
        setAttrs({
            proficiency_bonus: proficiencyBonus
        });
    });
});

/* ===== SKILL BONUS CALCULATION ===== */

/**
 * Auto-calculate skill bonuses when proficiency or relevant modifier changes
 * This is a simplified version - you may want to add attribute selection per skill
 */
on('change:repeating_skills:skill_proficient change:proficiency_bonus', function(eventInfo) {
    const repeatingAttrs = eventInfo.sourceAttribute.split('_');
    const rowId = repeatingAttrs[2];
    
    if (rowId) {
        getAttrs([
            `repeating_skills_${rowId}_skill_proficient`,
            `repeating_skills_${rowId}_skill_bonus`,
            'proficiency_bonus'
        ], function(values) {
            const isProficient = parseInt(values[`repeating_skills_${rowId}_skill_proficient`]) || 0;
            const profBonus = parseInt(values.proficiency_bonus) || 2;
            const baseBonus = parseInt(values[`repeating_skills_${rowId}_skill_bonus`]) || 0;
            
            // If proficient, add proficiency bonus
            if (isProficient === 1) {
                setAttrs({
                    [`repeating_skills_${rowId}_skill_bonus`]: baseBonus + profBonus
                });
            }
        });
    }
});
