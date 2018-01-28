CREATE TABLE pets (
	id SERIAL PRIMARY KEY,
	name VARCHAR(200),
	breed VARCHAR(200),
	color VARCHAR(200),
	checked BOOLEAN
);

CREATE TABLE visits (
id SERIAL PRIMARY KEY,
check_in TIMESTAMP default CURRENT_TIMESTAMP,
check_out TIMESTAMP,
pet_id INT,
FOREIGN KEY (pet_id) REFERENCES pets(id)
);

CREATE TABLE owners (
id SERIAL PRIMARY KEY,
first_name VARCHAR(200),
last_name VARCHAR(200)
);

CREATE TABLE owners_pets (
owner_id INT,
pet_id INT,
FOREIGN KEY (owner_id) REFERENCES owners(id),
FOREIGN KEY (pet_id) REFERENCES pets(id)
);

-- To add DELETE CASCADE: first must remove original fk constraint, then add back with delete cascade
ALTER TABLE owners_pets 
DROP CONSTRAINT owner_id 
FOREIGN KEY (owner_id) REFERENCES owners(id);

ALTER TABLE
ADD CONSTRAINT owner_id 
FOREIGN KEY (owner_id) REFERENCES owners(id)
ON DELETE CASCADE;

ALTER TABLE owners_pets 
DROP CONSTRAINT pet_id 
FOREIGN KEY (pet_id) REFERENCES pets(id);

ALTER TABLE
ADD CONSTRAINT pet_id 
FOREIGN KEY (pet_id) REFERENCES pets(id)
ON DELETE CASCADE;

ALTER TABLE visits
DROP CONSTRAINT pet_id FOREIGN KEY (pet_id) REFERENCES pets(id);

ALTER TABLE visits
ADD CONSTRAINT pet_id
FOREIGN KEY (pet_id) REFERENCES pets(id)
ON DELETE CASCADE;
