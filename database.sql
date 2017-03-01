//users table:
CREATE TABLE users(
	id SERIAL PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password character varying(255) NOT NULL,
  user_type character varying(80),
  first_name character varying(80),
  last_name character varying(80),
  street_address character varying(80),
  city character varying(80),
  state character varying(2),
  zip integer(10),
  phone_number integer
	);

//facilities table:
CREATE TABLE facilities(
	id SERIAL PRIMARY KEY,
  contact_person text,
  street_address character varying(80),
  city character varying(80),
  state character varying(2),
  zip integer(10),
  description text,
  handicap accessibility boolean,
  level integer,
  image_url text,
  cost boolean,
  approved boolean,
  accessibility_id text
	);


//facility_availability table:
CREATE TABLE facility_availability(
	id SERIAL PRIMARY KEY,
	facility_id integer REFERENCES facilities,
  date date,
  start_time time,
  end_time time
	);

  //facility_reservation table:
	CREATE TABLE facility_reservation(
	id SERIAL PRIMARY KEY,
	reservation_id integer REFERENCES users,
	facility_availability_id integer REFERENCES facility_availability,
	approved boolean
	);

  //accessbility table
	CREATE TABLE accessbility(
	id SERIAL PRIMARY KEY,
	facility_id integer REFERENCES facilities
	);
1 Comment Collapse
