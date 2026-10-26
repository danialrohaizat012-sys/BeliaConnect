CREATE TABLE `members` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`nickname` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`age` text NOT NULL,
	`district` text NOT NULL,
	`state` text NOT NULL,
	`occupation` text NOT NULL,
	`skills` text NOT NULL,
	`interests` text NOT NULL,
	`expectations` text NOT NULL,
	`status` text DEFAULT 'Baharu' NOT NULL,
	`pledge_version` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `members_phone_unique` ON `members` (`phone`);--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`date` text NOT NULL,
	`location` text NOT NULL,
	`url` text NOT NULL,
	`published` text DEFAULT '0' NOT NULL
);
