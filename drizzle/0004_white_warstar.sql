ALTER TABLE `members` ADD `reviewed_at` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `members` ADD `reviewed_by` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `members` ADD `review_note` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `members` ADD `accepted_at` text DEFAULT '' NOT NULL;