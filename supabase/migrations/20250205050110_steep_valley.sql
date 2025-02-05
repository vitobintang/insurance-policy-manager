/*
  # Create policies table

  1. New Tables
    - `policies`
      - `id` (uuid, primary key)
      - `policy_number` (text, unique)
      - `insured_name` (text)
      - `policy_effective_date` (date)
      - `policy_expiration_date` (date)
      - `vehicle_brand` (text)
      - `vehicle_type` (text)
      - `vehicle_year` (integer)
      - `vehicle_price` (numeric)
      - `premium_rate` (numeric)
      - `premium_price` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `user_id` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `policies` table
    - Add policies for authenticated users to:
      - Read their own policies
      - Create new policies
      - Update their own policies
      - Delete their own policies
*/

CREATE TABLE policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_number text UNIQUE NOT NULL,
  insured_name text NOT NULL,
  policy_effective_date date NOT NULL,
  policy_expiration_date date NOT NULL,
  vehicle_brand text NOT NULL,
  vehicle_type text NOT NULL,
  vehicle_year integer NOT NULL,
  vehicle_price numeric NOT NULL,
  premium_rate numeric NOT NULL,
  premium_price numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

-- Enable Row Level Security
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can view their own policies"
  ON policies
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create policies"
  ON policies
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own policies"
  ON policies
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own policies"
  ON policies
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER policies_updated_at
  BEFORE UPDATE ON policies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();