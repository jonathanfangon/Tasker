CREATE DATABASE solo2;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

INSERT INTO users (user_name, user_password) VALUES ('jonathan', 'fangon');

CREATE TABLE todos(
  todo_id SERIAL,
  user_id UUID,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO todos (user_id, description) VALUES ('8a2d425d-44be-4d71-91d3-4661d799a179', 'clean room');

/* Adding date to todos table */

ALTER TABLE todos ADD COLUMN todo_date DATE NOT NULL;

/* Made every user_name in users unique */

ALTER TABLE users ADD UNIQUE (user_name);

/* test date */

INSERT INTO todos (user_id, description, todo_date) VALUES ('8a2d425d-44be-4d71-91d3-4661d799a179', 'wash clothes', '2023-01-01');