CREATE DATABASE IF NOT EXISTS `todolist-app`;
USE `todolist-app`;

CREATE TABLE todos (
    `todo_id` varchar(36) NOT NULL,
    user_id varchar(36),
    description VARCHAR(255) NOT NULL,
    completed BOOLEAN,
    due_date DATE,
    priority ENUM('high', 'med', 'low'),
    PRIMARY KEY (`todo_id`),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

DELIMITER //
CREATE TRIGGER before_insert_todos_table
  BEFORE INSERT ON todos
  FOR EACH ROW
  BEGIN
    IF new.todo_id IS NULL THEN
        SET new.todo_id = uuid();
    END IF;
  END;//
DELIMITER ;

INSERT INTO todos
  (`todo_id`, `user_id`, `description`, `completed`, `due_date`, `priority`)
VALUES
  ('6bb2a6d2-b34d-11ed-afa1-0242ac120002', '99f5a6a6-b31e-11ed-a595-0242ac130002', 'todo - 1', false, STR_TO_DATE('01-15-2026','%m-%d-%Y'), 'med'),
  ('26fea522-be64-42d9-9eb9-2a2a4ea93276', '99f5a6a6-b31e-11ed-a595-0242ac130002', 'todo - 2', false, STR_TO_DATE('06-22-2024','%m-%d-%Y'), 'low'),
  ('0f43f682-d234-44b4-971b-687ed1dac03b', '2323a8c9-g31e-1243-rgfb-asdaac13aedf', 'todo - 1', false, STR_TO_DATE('07-25-2024','%m-%d-%Y'), 'high');
