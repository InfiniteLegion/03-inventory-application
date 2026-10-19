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
  pgm.createTable("items", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    name: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },
    description: {
      type: "text",
    },
    price: {
      type: "integer",
      notNull: true,
      check: "price >= 0",
    },
    quantity: {
      type: "integer",
      notNull: true,
      default: 0,
      check: "quantity >= 0",
    },
    rarity: {
      type: "varchar(20)",
      notNull: true,
      default: "common",
      check: "rarity in ('common', 'uncommon', 'rare', 'epic', 'legendary')",
    },
    category_id: {
      type: "integer",
      notNull: true,
      references: "categories(id)",
      onDelete: "RESTRICT",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("items");
};
