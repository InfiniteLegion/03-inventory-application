/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.sql(`
    INSERT INTO items (name, price, quantity, rarity, category_id)
    VALUES ('Rust sword', 15, 20, 'common', 1),
           ('Startlight staff', 1200, 2, 'epic', 1),
           ('Elven bow', 450, 5, 'rare', 1),
           ('Shadow dagers', 380, 6, 'rare', 1),
           ('Travelers cloak', 90, 12, 'uncommon', 2),
           ('Plate breastplate', 600, 4, 'rare', 2),
           ('Healing potion', 25, 100, 'common', 3),
           ('Mana potion', 60, 40, 'uncommon', 3),
           ('Dragon skin', 900, 3, 'epic', 4),
           ('Soul Crystal', 5000, 1, 'legendary', 5),
           ('Excalibur', 9999, 1, 'legendary', 5)
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
