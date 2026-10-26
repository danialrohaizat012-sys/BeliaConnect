ALTER TABLE `posts` ADD `poster` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `images` text DEFAULT '[]' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `cost_type` text DEFAULT 'Belum ditetapkan' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `price` text DEFAULT '' NOT NULL;