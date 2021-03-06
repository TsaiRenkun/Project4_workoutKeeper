Create table if not exists users(
 Id serial primary key,
name text,
password text,
salt text,
UNIQUE (name)
);

Create table if not exists bodypart(
 Id serial primary key,
name text,
UNIQUE (name)
);

Create table if not exists workout(
 Id serial primary key,
user_id integer,
completed boolean,
created_at TIMESTAMP DEFAULT CURRENT_DATE,
expire_at TIMESTAMP DEFAULT CURRENT_DATE + 7,
updated_at TIMESTAMP DEFAULT CURRENT_DATE
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON workout
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();



Create table if not exists exercise_workout(
 Id serial primary key,
workout_id integer,
exercise_id integer,
user_id integer,
UNIQUE (workout_id, exercise_id, user_id)
);

Create table if not exists exercise(
 Id serial primary key,
name text,
bodypart_id integer
);

