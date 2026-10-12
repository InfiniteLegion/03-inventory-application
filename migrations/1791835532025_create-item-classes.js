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
  pgm.createTable("item_classes", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    item_id: {
      type: "integer",
      references: "items(id)",
      onDelete: "CASCADE",
    },
    class_id: {
      type: "integer",
      references: "classes(id)",
      onDelete: "CASCADE",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("item_classes");
};
