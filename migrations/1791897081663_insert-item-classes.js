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
  INSERT INTO item_classes (item_id, class_id) VALUES 
    (1, 3),
    (1, 5),
    (2, 2),
    (3, 6),
    (4, 4),
    (5, 6),
    (5, 4),
    (6, 3),
    (6, 5),
    (7, 1),
    (8, 2),
    (8, 5),
    (9, 1),
    (10, 2),
    (11, 5)
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
