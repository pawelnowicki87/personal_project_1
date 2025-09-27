
CREATE EXTENSION IF NOT EXISTS btree_gist;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status') THEN
    CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS patient (
  patient_id       BIGSERIAL PRIMARY KEY,
  name             VARCHAR(200) NOT NULL,
  email            VARCHAR(255) NOT NULL UNIQUE,
  phone            VARCHAR(50),
  address          VARCHAR(400),
  date_of_birth    DATE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT patient_email_chk CHECK (position('@' in email) > 1)
);

CREATE TABLE IF NOT EXISTS specialization (
  specialization_id  BIGSERIAL PRIMARY KEY,
  name               VARCHAR(150) NOT NULL UNIQUE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS doctor (
  doctor_id              BIGSERIAL PRIMARY KEY,
  name                   VARCHAR(200) NOT NULL,
  email                  VARCHAR(255) NOT NULL UNIQUE,
  phone                  VARCHAR(50),
  specialization_id      BIGINT NOT NULL REFERENCES specialization(specialization_id) ON UPDATE CASCADE ON DELETE RESTRICT,
  consultation_duration  INT NOT NULL DEFAULT 20,  
  working_hours          VARCHAR(100),              
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT doctor_email_chk CHECK (position('@' in email) > 1),
  CONSTRAINT consultation_duration_chk CHECK (consultation_duration BETWEEN 5 AND 240)
);
CREATE INDEX IF NOT EXISTS idx_doctor_specialization ON doctor(specialization_id);

CREATE TABLE IF NOT EXISTS doctor_availability (
  availability_id  BIGSERIAL PRIMARY KEY,
  doctor_id        BIGINT NOT NULL REFERENCES doctor(doctor_id) ON UPDATE CASCADE ON DELETE CASCADE,
  day_of_week      INT NOT NULL, 
  start_time       TIME NOT NULL,
  end_time         TIME NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT dow_chk CHECK (day_of_week BETWEEN 1 AND 7),
  CONSTRAINT time_order_chk CHECK (start_time < end_time)
);
CREATE UNIQUE INDEX IF NOT EXISTS uq_doctor_availability_slot
  ON doctor_availability(doctor_id, day_of_week, start_time, end_time);

CREATE TABLE IF NOT EXISTS appointment (
  appointment_id  BIGSERIAL PRIMARY KEY,
  patient_id      BIGINT NOT NULL REFERENCES patient(patient_id) ON UPDATE CASCADE ON DELETE RESTRICT,
  doctor_id       BIGINT NOT NULL REFERENCES doctor(doctor_id)   ON UPDATE CASCADE ON DELETE RESTRICT,
  date            DATE NOT NULL,
  start_time      TIME NOT NULL,
  end_time        TIME NOT NULL,
  status          appointment_status NOT NULL DEFAULT 'scheduled',
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT appt_time_order_chk CHECK (start_time < end_time)
);

ALTER TABLE appointment
  ADD COLUMN IF NOT EXISTS start_ts TIMESTAMP GENERATED ALWAYS AS (date::timestamp + start_time) STORED;
ALTER TABLE appointment
  ADD COLUMN IF NOT EXISTS end_ts   TIMESTAMP GENERATED ALWAYS AS (date::timestamp + end_time)   STORED;
ALTER TABLE appointment
  ADD COLUMN IF NOT EXISTS appt_range TSRANGE GENERATED ALWAYS AS (tsrange(start_ts, end_ts, '[)')) STORED;

CREATE UNIQUE INDEX IF NOT EXISTS uq_doctor_exact_slot
  ON appointment(doctor_id, date, start_time, end_time);
CREATE INDEX IF NOT EXISTS idx_appt_doctor_date ON appointment(doctor_id, date);
CREATE INDEX IF NOT EXISTS idx_appt_patient_date ON appointment(patient_id, date);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='excl_doctor_appt_overlap') THEN
    ALTER TABLE appointment
      ADD CONSTRAINT excl_doctor_appt_overlap
      EXCLUDE USING gist (doctor_id WITH =, appt_range WITH &&);
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='excl_patient_appt_overlap') THEN
    ALTER TABLE appointment
      ADD CONSTRAINT excl_patient_appt_overlap
      EXCLUDE USING gist (patient_id WITH =, appt_range WITH &&);
  END IF;
END$$;

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='tr_patient_updated_at') THEN
    CREATE TRIGGER tr_patient_updated_at BEFORE UPDATE ON patient
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='tr_specialization_updated_at') THEN
    CREATE TRIGGER tr_specialization_updated_at BEFORE UPDATE ON specialization
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='tr_doctor_updated_at') THEN
    CREATE TRIGGER tr_doctor_updated_at BEFORE UPDATE ON doctor
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='tr_availability_updated_at') THEN
    CREATE TRIGGER tr_availability_updated_at BEFORE UPDATE ON doctor_availability
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='tr_appointment_updated_at') THEN
    CREATE TRIGGER tr_appointment_updated_at BEFORE UPDATE ON appointment
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END$$;
