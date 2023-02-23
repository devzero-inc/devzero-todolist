CREATE DATABASE IF NOT EXISTS `todolist-app`;
USE `todolist-app`;

CREATE TABLE users (
  `user_id` varchar(36) NOT NULL,
  `name` text,
  `email` text,
  PRIMARY KEY (`user_id`)
);

DELIMITER //
CREATE TRIGGER before_insert_users_table
  BEFORE INSERT ON users
  FOR EACH ROW
  BEGIN
    IF new.user_id IS NULL THEN
        SET new.user_id = uuid();
    END IF;
  END;//
DELIMITER ;

INSERT INTO users
  (`user_id`, `name`, `email`)
VALUES
  ('99f5a6a6-b31e-11ed-a595-0242ac130002', 'debo', 'debo@example.com'),
  ('2323a8c9-g31e-1243-rgfb-asdaac13aedf', 'cdp', 'cdp@example.com');
