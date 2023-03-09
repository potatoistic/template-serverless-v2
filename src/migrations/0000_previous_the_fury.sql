CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`username` varchar(256),
	`email` varchar(256),
	`password` text
);
