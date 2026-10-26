CREATE TABLE `member_numbers` (
	`number` integer PRIMARY KEY NOT NULL,
	`member_id` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `member_numbers_member_id_unique` ON `member_numbers` (`member_id`);--> statement-breakpoint
CREATE TABLE `registrations` (
	`id` text PRIMARY KEY NOT NULL,
	`program_id` text NOT NULL,
	`member_id` text,
	`account_id` text,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`answer` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'Menunggu' NOT NULL,
	`payment` text DEFAULT 'Tidak berkenaan' NOT NULL,
	`fee` text DEFAULT '0' NOT NULL,
	`attendance` text DEFAULT 'Belum direkod' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`reviewed_by` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `registration_program_phone` ON `registrations` (`program_id`,`phone`);--> statement-breakpoint
ALTER TABLE `members` ADD `member_code` text;--> statement-breakpoint
ALTER TABLE `members` ADD `account_id` text;--> statement-breakpoint
CREATE UNIQUE INDEX `members_member_code_unique` ON `members` (`member_code`);--> statement-breakpoint
CREATE UNIQUE INDEX `members_account_id_unique` ON `members` (`account_id`);--> statement-breakpoint
ALTER TABLE `posts` ADD `signup_mode` text DEFAULT 'Pautan luar' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `eligibility` text DEFAULT 'Terbuka' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `confirmation` text DEFAULT 'Semakan admin' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `capacity` integer;--> statement-breakpoint
ALTER TABLE `posts` ADD `question` text DEFAULT '' NOT NULL;